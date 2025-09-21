import React, { useEffect, useRef, useState } from 'react';

/**
 * RiskChart - Plotly.js bar chart component (no CDN)
 * Dynamically loads Plotly.js for the risk analysis chart
 */
export default function RiskChart({ data = [], title = "Sunk-Cost Risk by Bank" }) {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data.length) return;

    // Dynamically import Plotly to avoid bundle bloat
    const loadPlotly = async () => {
      try {
        setIsLoading(true);
        const Plotly = await import('plotly.js/dist/plotly.min.js');
        
        if (!chartRef.current) return;

        // Prepare data for Plotly
        const sortedData = [...data].sort((a, b) => b.riskScore - a.riskScore);
        const banks = sortedData.map(item => item.bank);
        const riskScores = sortedData.map(item => item.riskScore);
        const presenceRates = sortedData.map(item => 
          parseFloat(item.presenceRate.replace('%', ''))
        );

        // Define color scale based on risk scores
        const colors = riskScores.map(score => {
          if (score >= 8.5) return '#dc2626'; // Red for high risk
          if (score >= 7.5) return '#f59e0b'; // Orange for medium-high risk
          if (score >= 6.5) return '#eab308'; // Yellow for medium risk
          return '#16a34a'; // Green for low risk
        });

        const plotData = [
          {
            x: banks,
            y: riskScores,
            type: 'bar',
            marker: {
              color: colors,
              line: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 1
              }
            },
            hovertemplate: `
              <b>%{x}</b><br>
              Risk Score: %{y}<br>
              Presence Rate: ${presenceRates.map((rate, i) => `%{x[${i}]}`).join('')}%<br>
              <extra></extra>
            `,
            text: riskScores.map(score => score.toFixed(1)),
            textposition: 'outside'
          }
        ];

        const layout = {
          title: {
            text: title,
            font: {
              family: 'Inter, system-ui, sans-serif',
              size: 20,
              color: '#f9fafb'
            }
          },
          xaxis: {
            title: {
              text: 'Banks',
              font: { color: '#d1d5db' }
            },
            tickfont: { color: '#d1d5db' },
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            tickangle: -45
          },
          yaxis: {
            title: {
              text: 'Risk Score',
              font: { color: '#d1d5db' }
            },
            tickfont: { color: '#d1d5db' },
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            range: [0, 10]
          },
          paper_bgcolor: 'rgba(0, 0, 0, 0)',
          plot_bgcolor: 'rgba(0, 0, 0, 0)',
          font: {
            family: 'Inter, system-ui, sans-serif',
            color: '#f9fafb'
          },
          margin: {
            l: 60,
            r: 40,
            t: 80,
            b: 120
          },
          showlegend: false
        };

        const config = {
          responsive: true,
          displayModeBar: true,
          modeBarButtonsToRemove: [
            'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d',
            'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'
          ],
          displaylogo: false,
          toImageButtonOptions: {
            format: 'png',
            filename: 'risk-chart',
            height: 600,
            width: 1000,
            scale: 2
          }
        };

        await Plotly.default.newPlot(chartRef.current, plotData, layout, config);
        setIsLoading(false);

      } catch (err) {
        console.error('Error loading Plotly:', err);
        setError('Failed to load chart');
        setIsLoading(false);
      }
    };

    loadPlotly();

    // Cleanup
    return () => {
      if (chartRef.current) {
        // Plotly cleanup
        import('plotly.js/dist/plotly.min.js').then(Plotly => {
          if (Plotly.default.purge && chartRef.current) {
            Plotly.default.purge(chartRef.current);
          }
        }).catch(() => {
          // Ignore cleanup errors
        });
      }
    };
  }, [data, title]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        import('plotly.js/dist/plotly.min.js').then(Plotly => {
          Plotly.default.Plots.resize(chartRef.current);
        }).catch(() => {
          // Ignore resize errors
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return (
      <div className="bg-white/5 rounded-lg border border-white/10 p-8">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">Chart Error</div>
          <div className="text-gray-400">{error}</div>
          <div className="mt-4 text-sm text-gray-500">
            Please check your internet connection and try refreshing the page.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-10">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-gray-300">Loading chart...</div>
          </div>
        </div>
      )}
      
      <div 
        ref={chartRef} 
        className="w-full h-96"
        style={{ minHeight: '400px' }}
      />
      
      {data.length === 0 && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No data available for chart
        </div>
      )}
    </div>
  );
}