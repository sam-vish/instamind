export interface AnalysisResult {
  summary: string;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  mentalHealthIndicators: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
  };
  posts: Array<{
    url: string;
    caption: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    concerns: string[];
  }>;
  recommendations: string[];
}