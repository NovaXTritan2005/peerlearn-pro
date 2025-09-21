import React, { useState, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Settings } from 'lucide-react';

/**
 * DataTable - Virtualized, sortable, filterable table with CSV export
 * High-performance table for large datasets with react-window
 */
export default function DataTable({ data = [], columns = [], title = "Data Table" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [rowDensity, setRowDensity] = useState('comfortable'); // 'comfortable' or 'compact'
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(row =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
        } else {
          return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, filters]);

  const handleSort = useCallback((key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(current => ({
      ...current,
      [key]: value
    }));
  }, []);

  const exportToCSV = useCallback(() => {
    if (!processedData.length) return;

    const headers = columns.map(col => col.header || col.key).join(',');
    const rows = processedData.map(row =>
      columns.map(col => {
        const value = row[col.key];
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-export.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [processedData, columns, title]);

  const getSortIcon = useCallback((key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={14} className="text-gray-400" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={14} className="text-indigo-400" />
      : <ArrowDown size={14} className="text-indigo-400" />;
  }, [sortConfig]);

  // Row renderer for react-window
  const Row = useCallback(({ index, style }) => {
    const row = processedData[index];
    const isSelected = selectedRows.has(index);
    const rowHeight = rowDensity === 'compact' ? 40 : 56;

    return (
      <div
        style={{ ...style, height: rowHeight }}
        className={`
          flex items-center border-b border-gray-700/50 px-4 hover:bg-white/5 transition-colors
          ${isSelected ? 'bg-indigo-500/10 border-indigo-500/30' : ''}
          ${index % 2 === 0 ? 'bg-white/2' : ''}
        `}
      >
        {columns.map((column, colIndex) => (
          <div
            key={column.key}
            className={`
              flex-shrink-0 text-sm truncate
              ${colIndex === 0 ? 'w-16' : 'w-32 min-w-32'}
              ${column.align === 'right' ? 'text-right' : 'text-left'}
              ${column.width ? `w-${column.width}` : ''}
            `}
            style={{ width: column.width || (colIndex === 0 ? 64 : 128) }}
          >
            {column.render ? column.render(row[column.key], row, index) : row[column.key]}
          </div>
        ))}
      </div>
    );
  }, [processedData, columns, selectedRows, rowDensity]);

  const rowHeight = rowDensity === 'compact' ? 40 : 56;
  const headerHeight = 60;
  const containerHeight = Math.min(600, headerHeight + (processedData.length * rowHeight));

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
      {/* Header with controls */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRowDensity(current => current === 'compact' ? 'comfortable' : 'compact')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Toggle row density"
            >
              <Settings size={16} className="text-gray-300" />
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors"
              disabled={!processedData.length}
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search all columns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="text-sm text-gray-300">
            {processedData.length} of {data.length} rows
          </div>
        </div>
      </div>

      {/* Table header */}
      <div className="flex items-center bg-gray-800/50 border-b border-gray-700/50 px-4" style={{ height: headerHeight }}>
        {columns.map((column, index) => (
          <div
            key={column.key}
            className={`
              flex items-center gap-2 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors
              ${index === 0 ? 'w-16' : 'w-32 min-w-32'}
              ${column.width ? `w-${column.width}` : ''}
            `}
            style={{ width: column.width || (index === 0 ? 64 : 128) }}
            onClick={() => handleSort(column.key)}
          >
            {column.header || column.key}
            {getSortIcon(column.key)}
          </div>
        ))}
      </div>

      {/* Virtualized table body */}
      <div style={{ height: Math.max(200, containerHeight - headerHeight - 100) }}>
        {processedData.length > 0 ? (
          <List
            height={Math.max(200, containerHeight - headerHeight - 100)}
            itemCount={processedData.length}
            itemSize={rowHeight}
          >
            {Row}
          </List>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p>No data found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-indigo-400 hover:text-indigo-300 text-sm mt-1"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}