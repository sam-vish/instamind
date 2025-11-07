import React from 'react';
import { Brain, Heart, ArrowLeft } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Brain className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300 transform group-hover:scale-110" />
              <Heart className="w-4 h-4 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-gradient">
                InstaMind
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                AI-Powered Mental Health Insights
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>
        </div>
      </div>
    </header>
  );
};