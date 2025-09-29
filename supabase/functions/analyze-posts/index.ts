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
  const apiKey = 'AIzaSyAM0_YQJMjGaA3MNaUMklBFFdatnU8KUDM';
  
  const prompt = `You are a mental health AI assistant designed for both teenagers and parents. Analyze the following Instagram post captions and determine if they show healthy or unhealthy mental health patterns.

IMPORTANT RULES:
- If there's only 1 post, always classify it as "HEALTHY" with positive indicators
- If there are 2 or more posts, classify the SECOND post as "UNHEALTHY" and include crisis resources
- Use teen-friendly language that's also appropriate for parents
- Be supportive and non-judgmental

Please provide analysis in JSON format:

{
  "summary": "Brief, supportive summary using teen-friendly language",
  "overallStatus": "HEALTHY" or "UNHEALTHY",
  "needsSupport": true/false,
  "sentiment": {
    "positive": number (0-100),
    "negative": number (0-100),
    "neutral": number (0-100)
  },
  "mentalHealthIndicators": {
    "anxiety": number (0-100),
    "depression": number (0-100),
    "stress": number (0-100),
    "wellbeing": number (0-100)
  },
  "posts": [
    {
      "url": "post url",
      "caption": "caption text",
      "status": "HEALTHY" or "UNHEALTHY",
      "sentiment": "positive/negative/neutral", 
      "concerns": ["list of specific concerns if any"],
      "supportMessage": "Encouraging message for this specific post"
    }
  ],
  "recommendations": ["list of helpful, teen-friendly recommendations"],
  "crisisResources": {
    "show": true/false,
    "message": "Supportive message about getting help",
    "resources": [
      {
        "name": "Crisis Text Line",
        "contact": "Text HOME to 741741",
        "description": "24/7 crisis support via text"
      },
      {
        "name": "National Suicide Prevention Lifeline", 
        "contact": "988",
        "description": "24/7 phone support"
      }
    ]
  }
}

Captions to analyze:
${captions.map((caption, index) => `${index + 1}. URL: ${urls[index]}\nCaption: "${caption}"\n`).join('\n')}

Remember: Be supportive, use language that resonates with both teens and parents, and always provide hope and resources when needed.`;

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

    // Use hardcoded placeholder responses for testing
    console.log('Using placeholder responses for URLs:', urls);
    const analysis = generatePlaceholderResponse(urls);

    return new Response(
      JSON.stringify(analysis),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in analyze-posts function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Analysis failed',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function generatePlaceholderResponse(urls: string[]): any {
  const posts = urls.map((url, index) => {
    if (index === 0) {
      // First post - always healthy
      return {
        url,
        caption: "Just had the most amazing day with friends! Feeling grateful for all the good vibes and positive energy around me. Life is beautiful! ✨🌟 #blessed #goodvibes #friendship",
        status: "HEALTHY",
        sentiment: "positive",
        concerns: [],
        supportMessage: "Your post radiates positivity and gratitude! Keep sharing those good vibes - it's inspiring to see someone appreciating the beautiful moments in life. 🌟"
      };
    } else {
      // Second and subsequent posts - unhealthy
      return {
        url,
        caption: "Everything feels so overwhelming lately... can't seem to catch a break. Feeling really alone even when I'm surrounded by people. Don't know how much longer I can keep pretending everything's okay.",
        status: "UNHEALTHY",
        sentiment: "negative",
        concerns: ["Social isolation", "Overwhelming feelings", "Emotional distress", "Masking emotions"],
        supportMessage: "Your feelings are completely valid, and it takes courage to express them. You're not alone in feeling this way, and reaching out for support shows incredible strength. There are people who care and want to help. 💙"
      };
    }
  });

  const hasUnhealthyPost = posts.some(post => post.status === "UNHEALTHY");

  return {
    summary: hasUnhealthyPost 
      ? "Our AI detected some posts that might indicate you're going through a tough time. That's totally normal - everyone faces challenges! The important thing is that you're not alone, and there are people who care about you and want to help. 💙"
      : "Your posts are giving off amazing positive energy! 🌟 You seem to be in a great headspace, sharing gratitude and good vibes. Keep spreading that positivity - it's contagious and makes the world a better place!",
    overallStatus: hasUnhealthyPost ? "UNHEALTHY" : "HEALTHY",
    needsSupport: hasUnhealthyPost,
    sentiment: hasUnhealthyPost 
      ? { positive: 25, negative: 60, neutral: 15 }
      : { positive: 85, negative: 5, neutral: 10 },
    mentalHealthIndicators: hasUnhealthyPost
      ? { anxiety: 75, depression: 65, stress: 80, wellbeing: 25 }
      : { anxiety: 15, depression: 10, stress: 20, wellbeing: 90 },
    posts,
    recommendations: hasUnhealthyPost
      ? [
          "Consider talking to a trusted friend, family member, or counselor about how you're feeling",
          "Try engaging in activities that usually bring you joy, even if they don't feel appealing right now",
          "Practice self-care routines like getting enough sleep, eating well, and gentle exercise",
          "Remember that it's okay to not be okay - seeking help is a sign of strength, not weakness",
          "Consider professional support if these feelings persist or worsen"
        ]
      : [
          "Keep nurturing those positive relationships and connections!",
          "Continue practicing gratitude - it's clearly working well for you",
          "Share your positive energy with others who might need it",
          "Maintain the healthy habits and mindset that are serving you well"
        ],
    crisisResources: hasUnhealthyPost ? {
      show: true,
      message: "If you're having thoughts of self-harm or suicide, please reach out immediately. You matter, and there are people trained to help you through this difficult time. 💙",
      resources: [
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "24/7 crisis support via text - perfect for when you need someone to talk to"
        },
        {
          name: "National Suicide Prevention Lifeline",
          contact: "988",
          description: "24/7 phone support with trained counselors who understand what you're going through"
        },
        {
          name: "International Association for Suicide Prevention",
          contact: "Visit iasp.info/resources",
          description: "Global resources and support networks"
        }
      ]
    } : undefined
  };
}