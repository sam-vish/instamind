import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { Results } from './components/Results';
import { PrivacyDisclaimer } from './components/PrivacyDisclaimer';
import { Sidebar } from './components/Sidebar';
import { AnalysisResult, ChatSession } from './types';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('instamind-sessions');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load sessions', e);
      }
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('instamind-sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const analyzeWithGemini = async (urls: string[]): Promise<AnalysisResult> => {
    const apiKey = 'AIzaSyAEY2ubzjXYX-CfoeS1IZjeCNRkvZN0G3o';
    
    const prompt = `You are a mental health analyzer. Look at these Instagram profile URLs and give an honest assessment. Not all profiles are positive - some might show signs of problems.

Profiles to check:
${urls.map((url, index) => `${index + 1}. ${url}`).join('\n')}

Give your analysis in JSON format. Use simple, clear English:

{
  "summary": "A simple summary of what you found",
  "overallStatus": "HEALTHY" or "UNHEALTHY" (be honest - vary this based on the profile),
  "needsSupport": true if you see warning signs, false if things look okay,
  "sentiment": {
    "positive": number from 0 to 100,
    "negative": number from 0 to 100,
    "neutral": number from 0 to 100
  },
  "mentalHealthIndicators": {
    "anxiety": number from 0 to 100,
    "depression": number from 0 to 100,
    "stress": number from 0 to 100,
    "wellbeing": number from 0 to 100
  },
  "posts": [
    {
      "url": "the profile url",
      "caption": "What you noticed about their posting style",
      "status": "HEALTHY" or "UNHEALTHY",
      "sentiment": "positive" or "negative" or "neutral",
      "concerns": ["list any red flags you see"],
      "supportMessage": "A simple, direct message based on what you found"
    }
  ],
  "recommendations": ["simple advice - be direct and helpful"]
}

Be neutral. Not everyone is doing great. If you see problems, say so. Use simple words. Be honest.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API error:', errorData);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        throw new Error('No response from Gemini API');
      }

      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse Gemini response');
      }
    } catch (error) {
      console.error('Gemini analysis error:', error);
      throw error;
    }
  };

  const handleAnalyze = async (urls: string[]) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Call Gemini API
      const data = await analyzeWithGemini(urls);
      
      // Create new session
      const newSession: ChatSession = {
        id: Date.now().toString(),
        urls,
        result: data,
        timestamp: Date.now(),
        title: urls.length === 1 
          ? urls[0].split('/').pop() || 'Analysis'
          : `${urls.length} Profiles Analysis`
      };
      
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setError(null);
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setError(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
  };

  const handleRenameSession = (sessionId: string, newTitle: string) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, title: newTitle } : s
    ));
  };

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden flex">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto px-4 py-8 relative z-10">
          <div className="container mx-auto max-w-6xl space-y-8">
            {!currentSession && (
              <UrlInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
            )}
            
            {error && (
              <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 text-center animate-slideInUp">
                <p className="text-red-300 font-medium">Error: {error}</p>
              </div>
            )}
            
            {currentSession && <Results data={currentSession.result} />}
            
            <PrivacyDisclaimer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;