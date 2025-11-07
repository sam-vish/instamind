import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Clock, Edit2, Check, X } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, newTitle: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleStartEdit = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const handleSaveEdit = (sessionId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(sessionId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-purple-500/30 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/30">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-5 h-5" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sessions.length === 0 ? (
          <div className="text-center text-gray-500 mt-8 px-4">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No analysis yet</p>
            <p className="text-xs mt-1">Start by analyzing a profile</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              onMouseEnter={() => setHoveredId(session.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectSession(session.id)}
              className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                currentSessionId === session.id
                  ? 'bg-purple-600/30 border border-purple-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {editingId === session.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit(session.id);
                          if (e.key === 'Escape') handleCancelEdit(e as any);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-white/10 border border-purple-500/50 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-sm font-semibold text-white truncate">
                        {session.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(session.timestamp)}</span>
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                        session.result.overallStatus === 'HEALTHY'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}
                    >
                      {session.result.overallStatus}
                    </span>
                  </div>
                </div>
                {editingId === session.id ? (
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={(e) => handleSaveEdit(session.id, e)}
                      className="p-1.5 hover:bg-green-500/20 rounded-lg transition-colors duration-200"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ) : hoveredId === session.id && (
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={(e) => handleStartEdit(session, e)}
                      className="p-1.5 hover:bg-purple-500/20 rounded-lg transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4 text-purple-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-purple-500/30">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {sessions.length} {sessions.length === 1 ? 'analysis' : 'analyses'}
          </p>
        </div>
      </div>
    </div>
  );
};
