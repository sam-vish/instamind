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
  
  const prompt = `Analyze the following Instagram post captions for mental health indicators. Please provide a comprehensive analysis in JSON format with the following structure:

{
  "summary": "Overall analysis summary of the mental health indicators found",
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
      "sentiment": "positive/negative/neutral",
      "concerns": ["list of specific concerns if any"]
    }
  ],
  "recommendations": ["list of helpful recommendations"]
}

Captions to analyze:
${captions.map((caption, index) => `${index + 1}. URL: ${urls[index]}\nCaption: "${caption}"\n`).join('\n')}

Please be sensitive and professional in your analysis. Focus on identifying patterns that might indicate mental health concerns while being supportive and non-judgmental.`;

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

    // Extract captions from Instagram posts
    console.log('Extracting captions from:', urls);
    const captions = await Promise.all(
      urls.map(url => extractInstagramCaption(url))
    );

    console.log('Extracted captions:', captions);

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