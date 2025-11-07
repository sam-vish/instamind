import React, { useState } from 'react';
import { Plus, Trash2, Link, Loader, Brain, Upload, Sparkles } from 'lucide-react';

interface UrlInputProps {
  onAnalyze: (urls: string[]) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const updateUrl = (value: string) => {
    setUrl(value);
    setError('');
  };

  const validateUrls = () => {
    if (!url.trim()) {
      setError('Please enter an Instagram URL');
      return [];
    }

    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/;
    if (!instagramRegex.test(url.trim())) {
      setError('Please enter a valid Instagram profile URL');
      return [];
    }

    setError('');
    return [url.trim()];
  };

  const handleAnalyze = () => {
    const validUrls = validateUrls();
    if (validUrls.length > 0) {
      onAnalyze(validUrls);
    }
  };

  const hasValidUrl = url.trim();

  return (
    <div className="relative group animate-slideInUp">
      {/* Glowing background effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-gradient-slow" />
      
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 shadow-xl">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            <span className="text-cyan-300 text-sm font-bold tracking-wide">INSTAGRAM VIBE CHECK</span>
            <Upload className="w-5 h-5 text-pink-400 animate-bounce" />
          </div>
          
          <h2 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Drop Your Insta Profile! 📱
          </h2>
          <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto">
            Paste your Instagram profile URL below and we'll check if it's giving off 
            <span className="text-green-400 font-bold"> healthy vibes </span> or 
            <span className="text-orange-400 font-bold"> need some attention </span> 💙
          </p>
        </div>

        <div className="mb-8">
          <div className="group/item animate-slideInUp">
            <div className="relative max-w-2xl mx-auto">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within/item:text-purple-400 transition-colors duration-300" />
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(e.target.value)}
                placeholder="https://instagram.com/username"
                className={`w-full pl-14 pr-4 py-6 bg-white/5 backdrop-blur-sm border-2 rounded-2xl text-white text-lg placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-white/10 ${
                  error
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    : 'border-white/20 focus:border-purple-500/50'
                }`}
              />
              {url && !error && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-3 text-center animate-shake">{error}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !hasValidUrl}
            className="group/analyze relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transform-gpu overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover/analyze:opacity-100 transition-opacity duration-300 animate-gradient-slow" />
            
            <div className="relative flex items-center space-x-2">
              {isLoading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  <span>Analyzing Profile...</span>
                  <div className="flex space-x-1 ml-2">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6 group-hover/analyze:animate-pulse" />
                  <span>Analyze with AI</span>
                  <Upload className="w-5 h-5 group-hover/analyze:translate-y-[-2px] transition-transform duration-300" />
                </>
              )}
            </div>
          </button>
        </div>

        {/* Progress indicator when analyzing */}
        {isLoading && (
          <div className="mt-6 animate-slideInUp">
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress" />
            </div>
            <p className="text-center text-gray-400 text-sm mt-2">
              Processing your Instagram profile with AI...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};