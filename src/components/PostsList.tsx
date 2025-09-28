import React from 'react';
import { ExternalLink, AlertTriangle, Smile, Meh, Heart, MessageCircle } from 'lucide-react';

interface Post {
  url: string;
  caption: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  concerns: string[];
}

interface PostsListProps {
  posts: Post[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-400" />;
      case 'negative':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Meh className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getSentimentGradient = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'from-green-600 to-emerald-600';
      case 'negative':
        return 'from-red-600 to-pink-600';
      default:
        return 'from-indigo-600 to-purple-600';
    }
  };

  const getSentimentBorder = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-green-500/30';
      case 'negative':
        return 'border-red-500/30';
      default:
        return 'border-indigo-500/30';
    }
  };

  return (
    <div className="relative group animate-slideInUp animation-delay-600">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Individual Post Analysis</h2>
            <p className="text-gray-400">Detailed breakdown of each post</p>
          </div>
        </div>
        
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`group/post relative overflow-hidden animate-slideInUp`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${getSentimentGradient(post.sentiment)} rounded-2xl blur opacity-20 group-hover/post:opacity-30 transition-opacity duration-500`} />
              
              <div className={`relative bg-black/40 backdrop-blur-xl border ${getSentimentBorder(post.sentiment)} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 transform-gpu`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gradient-to-r ${getSentimentGradient(post.sentiment)} rounded-xl`}>
                      {getSentimentIcon(post.sentiment)}
                    </div>
                    <div>
                      <span className="text-white font-semibold capitalize text-lg">
                        {post.sentiment} Sentiment
                      </span>
                      <p className="text-gray-400 text-sm">Post #{index + 1}</p>
                    </div>
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" />
                    <span className="text-sm font-medium">View Post</span>
                  </a>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <h4 className="font-semibold text-white">Caption Analysis</h4>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <p className="text-gray-200 leading-relaxed">
                      {post.caption || 'No caption available'}
                    </p>
                  </div>
                </div>

                {post.concerns.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <h4 className="font-semibold text-white">Identified Concerns</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.concerns.map((concern, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 text-orange-300 rounded-full text-sm font-medium hover:bg-orange-500/30 transition-colors duration-300"
                        >
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};