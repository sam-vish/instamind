import React, { useState } from 'react';
import { Plus, Trash2, Link, Loader, Brain, Upload, Sparkles } from 'lucide-react';

interface UrlInputProps {
  onAnalyze: (urls: string[]) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze, isLoading }) => {
  const [urls, setUrls] = useState<string[]>(['', '', '']);
  const [errors, setErrors] = useState<string[]>([]);

  const addUrlField = () => {
    setUrls([...urls, '']);
    setErrors([...errors, '']);
  };

  const removeUrlField = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setUrls(newUrls.length ? newUrls : ['']);
    setErrors(newErrors.length ? newErrors : ['']);
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    const newErrors = [...errors];
    newErrors[index] = '';
    setErrors(newErrors);
  };

  const validateUrls = () => {
    const newErrors: string[] = [];
    const validUrls: string[] = [];

    urls.forEach((url, index) => {
      if (!url.trim()) {
        newErrors[index] = '';
        return;
      }

      const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?$/;
      if (!instagramRegex.test(url.trim())) {
        newErrors[index] = 'Please enter a valid Instagram post URL';
        return;
      }

      newErrors[index] = '';
      validUrls.push(url.trim());
    });

    setErrors(newErrors);
    return validUrls;
  };

  const handleAnalyze = () => {
    const validUrls = validateUrls();
    if (validUrls.length > 0) {
      onAnalyze(validUrls);
    }
  };

  const hasValidUrls = urls.some(url => url.trim());

  return (
    <div className="relative group animate-slideInUp">
      {/* Glowing background effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-gradient-slow" />
      
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 shadow-xl">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            <span className="text-cyan-300 text-sm font-bold tracking-wide">MULTI-POST VIBE CHECK</span>
            <Upload className="w-5 h-5 text-pink-400 animate-bounce" />
          </div>
          
          <h2 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Drop Your Insta Links! 📱
          </h2>
          <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto">
            Paste your Instagram post links below and we'll check if they're giving off 
            <span className="text-green-400 font-bold"> healthy vibes </span> or 
            <span className="text-orange-400 font-bold"> need some attention </span> 💙
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {urls.map((url, index) => (
            <div key={index} className="group/item animate-slideInUp" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="relative">
                    <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/item:text-purple-400 transition-colors duration-300" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => updateUrl(index, e.target.value)}
                      placeholder={`Instagram post URL ${index + 1}`}
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-white/10 ${
                        errors[index]
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                          : 'border-white/20 focus:border-purple-500/50'
                      }`}
                    />
                    {url && !errors[index] && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  {errors[index] && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-shake">{errors[index]}</p>
                  )}
                </div>
                
                {urls.length > 1 && (
                  <button
                    onClick={() => removeUrlField(index)}
                    className="flex-shrink-0 p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110 transform-gpu"
                    type="button"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={addUrlField}
            className="group/btn flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-105 hover:border-purple-500/30 transform-gpu"
            type="button"
          >
            <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
            <span>Add Another URL</span>
          </button>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || !hasValidUrls}
            className="group/analyze relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transform-gpu overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover/analyze:opacity-100 transition-opacity duration-300 animate-gradient-slow" />
            
            <div className="relative flex items-center space-x-2">
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Analyzing Posts...</span>
                  <div className="flex space-x-1 ml-2">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 group-hover/analyze:animate-pulse" />
                  <span>Analyze with AI</span>
                  <Upload className="w-4 h-4 group-hover/analyze:translate-y-[-2px] transition-transform duration-300" />
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
              Processing your Instagram posts with AI...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};