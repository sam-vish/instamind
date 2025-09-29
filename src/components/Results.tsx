import React from 'react';
import { SentimentChart } from './SentimentChart';
import { MentalHealthChart } from './MentalHealthChart';
import { PostsList } from './PostsList';
import { AnalysisResult } from '../types';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Sparkles, BarChart3, Phone, MessageSquare, Heart, Shield } from 'lucide-react';

interface ResultsProps {
  data: AnalysisResult;
}

export const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-slideInUp">
      {/* Health Status Banner */}
      <div className={`relative group animate-slideInUp`}>
        <div className={`absolute -inset-1 bg-gradient-to-r ${data.overallStatus === 'HEALTHY' ? 'from-green-600 to-emerald-600' : 'from-orange-600 to-red-600'} rounded-3xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-500`} />
        <div className={`relative bg-black/40 backdrop-blur-xl border ${data.overallStatus === 'HEALTHY' ? 'border-green-500/30' : 'border-orange-500/30'} rounded-3xl p-8 shadow-2xl`}>
          <div className="text-center">
            <div className={`inline-flex items-center space-x-4 bg-gradient-to-r ${data.overallStatus === 'HEALTHY' ? 'from-green-900/40 to-emerald-900/40' : 'from-orange-900/40 to-red-900/40'} backdrop-blur-sm border ${data.overallStatus === 'HEALTHY' ? 'border-green-500/30' : 'border-orange-500/30'} rounded-full px-8 py-4 mb-6 shadow-xl`}>
              {data.overallStatus === 'HEALTHY' ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-400 animate-pulse" />
                  <span className="text-2xl font-black text-green-300 tracking-wide">HEALTHY VIBES! ✨</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-8 h-8 text-orange-400 animate-pulse" />
                  <span className="text-2xl font-black text-orange-300 tracking-wide">NEEDS SOME LOVE 💙</span>
                </>
              )}
            </div>
            
            <h2 className={`text-4xl font-black mb-4 bg-gradient-to-r ${data.overallStatus === 'HEALTHY' ? 'from-green-300 to-emerald-300' : 'from-orange-300 to-red-300'} bg-clip-text text-transparent`}>
              {data.overallStatus === 'HEALTHY' ? 
                "Your posts are radiating positive energy! 🌟" : 
                "Time to check in with someone who cares 💝"
              }
            </h2>
            
            <p className="text-gray-200 text-xl leading-relaxed max-w-3xl mx-auto font-medium">
              {data.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Resources - Show when unhealthy */}
      {data.needsSupport && data.crisisResources?.show && (
        <div className="relative group animate-slideInUp">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
          <div className="relative bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-900/40 to-pink-900/40 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-6 shadow-xl">
                <Heart className="w-6 h-6 text-red-400 animate-pulse" />
                <span className="text-xl font-black text-red-300 tracking-wide">YOU'RE NOT ALONE 💙</span>
              </div>
              
              <h3 className="text-3xl font-black text-white mb-4 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                Someone's Always Here to Help
              </h3>
              
              <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto font-medium mb-8">
                {data.crisisResources.message || "It's totally okay to reach out when you need support. These amazing people are here 24/7 just for you! 💝"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {data.crisisResources.resources?.map((resource, index) => (
                <div key={index} className="group/resource bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6 hover:bg-white/15 hover:border-red-400/50 transition-all duration-300 hover:scale-105 transform-gpu">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                      {resource.name.includes('Text') ? (
                        <MessageSquare className="w-6 h-6 text-white" />
                      ) : (
                        <Phone className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{resource.name}</h4>
                      <p className="text-gray-400 text-sm">{resource.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                    <span className="text-2xl font-black text-white bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                      {resource.contact}
                    </span>
                  </div>
                </div>
              )) || [
                {
                  name: "Crisis Text Line",
                  contact: "Text HOME to 741741", 
                  description: "24/7 crisis support via text"
                },
                {
                  name: "National Suicide Prevention Lifeline",
                  contact: "988",
                  description: "24/7 phone support"
                }
              ].map((resource, index) => (
                <div key={index} className="group/resource bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6 hover:bg-white/15 hover:border-red-400/50 transition-all duration-300 hover:scale-105 transform-gpu">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                      {resource.name.includes('Text') ? (
                        <MessageSquare className="w-6 h-6 text-white" />
                      ) : (
                        <Phone className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{resource.name}</h4>
                      <p className="text-gray-400 text-sm">{resource.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                    <span className="text-2xl font-black text-white bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                      {resource.contact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Summary Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">🤖 AI Deep Dive</h2>
              <p className="text-gray-400 font-medium">What our smart AI discovered</p>
            </div>
            <div className="ml-auto">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <p className="text-gray-200 leading-relaxed text-lg font-medium">{data.summary}</p>
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