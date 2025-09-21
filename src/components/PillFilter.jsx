import React from 'react';
import { X } from 'lucide-react';

/**
 * PillFilter - Bank chips for leaderboard filtering
 * Displays bank risk scores as interactive pill chips
 */
export default function PillFilter({ 
  items = [], 
  selectedBank = null, 
  onBankSelect, 
  onClearFilter 
}) {
  if (!items.length) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-sm font-medium text-gray-300 mr-2">
          Bank Risk Scores:
        </h3>
        
        {items.map(({ bank, score }) => (
          <button
            key={bank}
            onClick={() => onBankSelect(bank)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 transform hover:scale-105 hover:shadow-lg
              ${selectedBank === bank
                ? 'bg-indigo-600 text-white shadow-indigo-500/50 shadow-lg ring-2 ring-indigo-400'
                : 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/20'
              }
            `}
            aria-label={`Filter by ${bank} (Risk Score: ${score})`}
          >
            <span className="font-semibold">{bank}</span>
            <span className={`
              px-2 py-0.5 rounded-full text-xs font-bold
              ${selectedBank === bank
                ? 'bg-white/20 text-white'
                : 'bg-indigo-500/30 text-indigo-200'
              }
            `}>
              {score.toFixed(1)}
            </span>
          </button>
        ))}

        {selectedBank && (
          <button
            onClick={onClearFilter}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium
                     bg-red-500/20 text-red-200 hover:bg-red-500/30 border border-red-500/30
                     transition-all duration-200 transform hover:scale-105"
            aria-label="Clear bank filter"
          >
            <X size={14} />
            Clear Filter
          </button>
        )}
      </div>

      {selectedBank && (
        <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-sm text-indigo-200">
            <span className="font-medium">Filtering by:</span> {selectedBank} 
            <span className="ml-2 text-indigo-300">
              (Risk Score: {items.find(item => item.bank === selectedBank)?.score.toFixed(1)})
            </span>
          </p>
        </div>
      )}
    </div>
  );
}