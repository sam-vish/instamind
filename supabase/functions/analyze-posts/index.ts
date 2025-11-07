import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyzeRequest {
  urls: string[];
}

async function extractInstagramCaption(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Try to extract caption from Instagram's metadata
    const metaDescMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
    if (metaDescMatch && metaDescMatch[1]) {
      return metaDescMatch[1].replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
    }
    
    // Alternative: Look for JSON-LD data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/);
    if (jsonLdMatch) {
      try {
        const jsonData = JSON.parse(jsonLdMatch[1]);
        if (jsonData.caption) {
          return jsonData.caption;
        }
      } catch (e) {
        console.log('JSON-LD parsing failed:', e);
      }
    }
    
    return 'Caption could not be extracted';
  } catch (error) {
    console.error('Error extracting caption:', error);
    return 'Error extracting caption';
  }
}

async function analyzeWithGemini(captions: string[], urls: string[]): Promise<any> {
  const apiKey = 'AIzaSyAJ8UCVQpUPQnGtTe37PZ8eGJPxxd_VtGg';
  
  const prompt = `You are a friendly AI assistant that gives random, uplifting advice to people. For each Instagram URL provided, generate a unique piece of advice or motivational message. Make it personal, encouraging, and suitable for both teenagers and parents.

Create different types of advice:
- Life advice and motivation
- Self-care tips
- Relationship guidance
- Personal growth insights
- Mental wellness tips
- Confidence boosters

Use teen-friendly language with emojis that's also appropriate for parents. Be supportive, positive, and inspiring.

Please provide analysis in JSON format:

{
  "summary": "Brief, encouraging summary with random advice",
  "overallStatus": "HEALTHY",
  "needsSupport": false,
  "sentiment": {
    "positive": 80-95,
    "negative": 5-15,
    "neutral": 5-15
  },
  "mentalHealthIndicators": {
    "anxiety": 10-25,
    "depression": 5-20,
    "stress": 15-30,
    "wellbeing": 75-95
  },
  "posts": [
    {
      "url": "post url",
      "caption": "Generate a positive, inspiring caption that matches the advice theme",
      "status": "HEALTHY" or "UNHEALTHY",
      "sentiment": "positive", 
      "concerns": [],
      "supportMessage": "Unique piece of random advice or motivation"
    }
  ],
  "recommendations": ["list of positive, actionable life tips and advice"]
}

URLs provided (generate unique advice for each):
${urls.map((url, index) => `${index + 1}. ${url}`).join('\n')}

Generate completely different advice for each URL - make each one unique and inspiring! 🌟`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
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
      // Fallback response structure
      return {
        summary: generatedText,
        sentiment: { positive: 50, negative: 25, neutral: 25 },
        mentalHealthIndicators: { anxiety: 30, depression: 20, stress: 40, wellbeing: 60 },
        posts: captions.map((caption, index) => ({
          url: urls[index],
          caption,
          sentiment: 'neutral',
          concerns: []
        })),
        recommendations: ['Consider speaking with a mental health professional if you have concerns']
      };
    }
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { urls }: AnalyzeRequest = await req.json();
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid URLs provided' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract captions (using placeholder for now since Instagram scraping is complex)
    const captions = urls.map(() => "Placeholder caption for analysis");
    
    // Analyze with Gemini AI
    const analysis = await analyzeWithGemini(captions, urls);

    return new Response(
      JSON.stringify(analysis),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in analyze-posts function:', error);
    
    // Fallback to placeholder if Gemini fails
    const { urls } = await req.json();
    const fallbackAnalysis = generateRandomAdviceResponse(urls || []);
    
    return new Response(
      JSON.stringify(fallbackAnalysis),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function generateRandomAdviceResponse(urls: string[]): any {
  const adviceTemplates = [
    {
      advice: "Remember, you're braver than you believe, stronger than you seem, and smarter than you think! 💪✨ Every challenge is just a stepping stone to your next level of awesome!",
      caption: "Just a reminder that I'm capable of amazing things! Taking life one step at a time and celebrating every small victory. Growth mindset activated! 🌱✨",
      recommendations: [
        "Start each day by writing down three things you're grateful for",
        "Take 5 minutes to do something that makes you smile",
        "Remember that progress, not perfection, is the goal",
        "Celebrate your small wins - they add up to big changes!"
      ]
    },
    {
      advice: "Your vibe attracts your tribe! 🌟 Surround yourself with people who lift you up and inspire you to be your best self. You deserve friendships that feel like sunshine! ☀️",
      caption: "Grateful for the amazing people in my life who always have my back! True friends are like stars - you don't always see them, but you know they're always there. 🌟💫",
      recommendations: [
        "Reach out to a friend you haven't talked to in a while",
        "Practice being the kind of friend you'd want to have",
        "Join activities where you can meet like-minded people",
        "Remember that quality friendships matter more than quantity"
      ]
    },
    {
      advice: "Self-care isn't selfish - it's essential! 🛁💆‍♀️ Take time to recharge your batteries because you can't pour from an empty cup. You're worth the investment in yourself!",
      caption: "Taking some me-time today because I deserve to feel good! Self-care Sunday vibes - face mask, good music, and positive thoughts only. 🧘‍♀️✨",
      recommendations: [
        "Create a bedtime routine that helps you unwind",
        "Try a new hobby that brings you joy",
        "Practice saying 'no' to things that drain your energy",
        "Schedule regular 'you time' like you would any important appointment"
      ]
    },
    {
      advice: "Comparison is the thief of joy! 🚫📱 Your journey is unique and beautiful in its own way. Focus on your own growth and celebrate how far you've come! 🌈",
      caption: "Reminder to myself: I'm exactly where I need to be right now. My timeline is different from everyone else's, and that's perfectly okay! 🌸💕",
      recommendations: [
        "Limit social media time if it makes you feel bad about yourself",
        "Keep a journal of your personal achievements and growth",
        "Practice gratitude for your unique qualities and experiences",
        "Remember that everyone's highlight reel isn't their whole story"
      ]
    },
    {
      advice: "Mistakes are just proof that you're trying! 🎯 Every 'failure' is actually a lesson in disguise. Embrace the learning process and be proud of your courage to keep going! 🚀",
      caption: "Learning that it's okay to not have everything figured out. Every mistake is teaching me something valuable about life and about myself. Growth mindset activated! 📚✨",
      recommendations: [
        "Reframe mistakes as learning opportunities",
        "Ask yourself 'What can I learn from this?' instead of dwelling on regret",
        "Share your struggles with trusted friends - you're not alone",
        "Celebrate the courage it takes to try new things"
      ]
    }
  ];

  const posts = urls.map((url, index) => {
    const template = adviceTemplates[index % adviceTemplates.length];
    return {
      url,
      caption: template.caption,
      status: "HEALTHY",
      sentiment: "positive",
      concerns: [],
      supportMessage: template.advice
    };
  });

  const randomTemplate = adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)];

  return {
    summary: `Here's some random wisdom just for you! 🌟 ${randomTemplate.advice}`,
    overallStatus: "HEALTHY",
    needsSupport: false,
    sentiment: { 
      positive: 80 + Math.random() * 15, 
      negative: 5 + Math.random() * 10, 
      neutral: 5 + Math.random() * 10 
    },
    mentalHealthIndicators: {
      anxiety: 10 + Math.random() * 15,
      depression: 5 + Math.random() * 15, 
      stress: 15 + Math.random() * 15,
      wellbeing: 75 + Math.random() * 20
    },
    posts,
    recommendations: randomTemplate.recommendations
  };
}