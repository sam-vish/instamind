import React from 'react';
import { SentimentChart } from './SentimentChart';
import { MentalHealthChart } from './MentalHealthChart';
import { PostsList } from './PostsList';
import { AnalysisResult } from '../types';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Sparkles, BarChart3 } from 'lucide-react';

interface ResultsProps {
  data: AnalysisResult;
}

export const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-slideInUp">
      {/* Summary Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">AI Analysis Summary</h2>
              <p className="text-gray-400">Comprehensive mental health insights</p>
            </div>
            <div className="ml-auto">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <p className="text-gray-200 leading-relaxed text-lg">{data.summary}</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative group animate-slideInLeft">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sentiment Analysis</h3>
                <p className="text-gray-400 text-sm">Emotional tone breakdown</p>
              </div>
            </div>
            <SentimentChart data={data.sentiment} />
          </div>
        </div>

        <div className="relative group animate-slideInRight">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mental Health Indicators</h3>
                <p className="text-gray-400 text-sm">Wellbeing assessment</p>
              </div>
            </div>
            <MentalHealthChart data={data.mentalHealthIndicators} />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <div className="relative group animate-slideInUp animation-delay-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">AI Recommendations</h2>
                <p className="text-gray-400">Personalized wellness suggestions</p>
              </div>
            </div>
            <div className="grid gap-4">
              {data.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="group/rec flex items-start space-x-4 p-6 bg-green-900/20 backdrop-blur-sm border border-green-500/20 rounded-2xl hover:bg-green-900/30 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02] transform-gpu"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-200 leading-relaxed group-hover/rec:text-white transition-colors duration-300">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Posts Details */}
      <PostsList posts={data.posts} />
    </div>
  );
};