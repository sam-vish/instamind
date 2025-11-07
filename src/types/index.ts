export interface AnalysisResult {
  summary: string;
  overallStatus: 'HEALTHY' | 'UNHEALTHY';
  needsSupport: boolean;
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
    status: 'HEALTHY' | 'UNHEALTHY';
    sentiment: 'positive' | 'negative' | 'neutral';
    concerns: string[];
    supportMessage?: string;
  }>;
  recommendations: string[];
  crisisResources?: {
    show: boolean;
    message: string;
    resources: Array<{
      name: string;
      contact: string;
      description: string;
    }>;
  };
}

export interface ChatSession {
  id: string;
  urls: string[];
  result: AnalysisResult;
  timestamp: number;
  title: string;
}