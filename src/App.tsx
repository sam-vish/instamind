import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { Results } from './components/Results';
import { PrivacyDisclaimer } from './components/PrivacyDisclaimer';
import { AnalysisResult } from './types';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (urls: string[]) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/analyze-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze posts');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
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

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="space-y-8">
          <UrlInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
          
          {error && (
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 text-center animate-slideInUp">
              <p className="text-red-300 font-medium">Error: {error}</p>
            </div>
          )}
          
          {results && <Results data={results} />}
          
          <PrivacyDisclaimer />
        </div>
      </main>
    </div>
  );
}

export default App;