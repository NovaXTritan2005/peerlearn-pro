import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Building, Zap } from 'lucide-react';

/**
 * ExamplesList - Contextual examples cards
 * Displays rich contextual examples with expandable details
 */
export default function ExamplesList({ examples = [], title = "Contextual Examples" }) {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    setExpandedItems(current => {
      const newSet = new Set(current);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!examples.length) {
    return (
      <div className="bg-white/5 rounded-lg border border-white/10 p-8">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="text-center text-gray-400">
          <Building size={32} className="mx-auto mb-2 opacity-50" />
          <p>No examples available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Zap className="text-indigo-400" size={20} />
        {title}
      </h3>
      
      <div className="space-y-4">
        {examples.map((example, index) => {
          const isExpanded = expandedItems.has(index);
          
          return (
            <div
              key={index}
              className="bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200"
            >
              {/* Header */}
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Building size={18} className="text-indigo-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">{example.bank}</h4>
                    <p className="text-sm text-gray-300">{example.mechanism}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 px-2 py-1 bg-white/10 rounded">
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </span>
                  {isExpanded ? (
                    <ChevronDown size={18} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expandable content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/10">
                  <div className="pt-4 space-y-4">
                    {/* Mechanism details */}
                    <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                      <h5 className="font-medium text-indigo-200 mb-2">Psychological Mechanism</h5>
                      <p className="text-white font-medium">{example.mechanism}</p>
                    </div>

                    {/* Micro-reason */}
                    <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                      <h5 className="font-medium text-orange-200 mb-2">Micro-reason</h5>
                      <p className="text-gray-200">{example.note}</p>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
                      <h5 className="font-medium text-gray-200 mb-2">Contextual Excerpt</h5>
                      <blockquote className="text-gray-300 italic leading-relaxed">
                        "{example.excerpt}"
                      </blockquote>
                    </div>

                    {/* Analysis tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-2 py-1 bg-red-500/20 text-red-200 rounded text-xs font-medium">
                        High Risk Indicator
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-200 rounded text-xs font-medium">
                        Cognitive Bias
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs font-medium">
                        Strategic Impact
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div>
            Total Examples: <span className="text-white font-medium">{examples.length}</span>
          </div>
          <div>
            Expanded: <span className="text-white font-medium">{expandedItems.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
}