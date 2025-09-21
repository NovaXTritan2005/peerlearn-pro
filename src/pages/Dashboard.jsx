import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Building, X } from 'lucide-react'
import CosmicBackground from '../components/CosmicBackground'
import RiskChart from '../components/RiskChart'
import DataTable from '../components/DataTable'
import ExamplesList from '../components/ExamplesList'
import Card from '../components/Card'
import { parseDashboardHtml } from '../utils/dataParser'
import { dashboard } from '../content'

export default function Dashboard() {
  const [data, setData] = useState({ rankings: [], examples: [] })
  const [selectedBank, setSelectedBank] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBankDrawer, setShowBankDrawer] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.BASE_URL}data/dashboard.html`)
        if (!response.ok) throw new Error('Failed to load data')
        
        const htmlContent = await response.text()
        const parsedData = parseDashboardHtml(htmlContent)
        setData(parsedData)
      } catch (err) {
        setError(err.message)
        console.error('Error loading dashboard data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Table columns for rankings
  const rankingColumns = [
    { key: 'bank', header: 'Bank', width: 150 },
    { 
      key: 'riskScore', 
      header: 'Risk Score', 
      width: 100,
      render: (value) => (
        <span className={`font-bold ${
          value >= 8.5 ? 'text-red-400' :
          value >= 7.5 ? 'text-orange-400' :
          value >= 6.5 ? 'text-yellow-400' : 'text-green-400'
        }`}>
          {value.toFixed(1)}
        </span>
      )
    },
    { key: 'presenceRate', header: 'Presence Rate', width: 120 },
    { key: 'avgConfidence', header: 'Avg Confidence', width: 120 },
    { key: 'mechanisms', header: 'Key Mechanisms', width: 250 },
    { key: 'effects', header: 'Primary Effects', width: 300 }
  ]

  const handleBankSelect = (bank) => {
    setSelectedBank(bank)
    setShowBankDrawer(true)
  }

  const selectedBankData = useMemo(() => {
    if (!selectedBank) return null
    return data.rankings.find(item => item.bank === selectedBank)
  }, [selectedBank, data.rankings])

  const selectedBankExamples = useMemo(() => {
    if (!selectedBank) return []
    return data.examples.filter(item => item.bank === selectedBank).slice(0, 3)
  }, [selectedBank, data.examples])

  if (error) {
    return (
      <section className="relative min-h-[88vh]">
        <CosmicBackground intensity={0.5} speed={0.5} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Dashboard Loading Error</h2>
            <p className="text-gray-300">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen">
      <CosmicBackground intensity={0.2} speed={0.6} />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-indigo-400" size={32} />
            <h1 className="text-3xl font-bold text-white">{dashboard.title}</h1>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {dashboard.description}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Risk Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RiskChart data={data.rankings} title={dashboard.chartTitle} />
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rankings Table */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <DataTable
                  data={data.rankings}
                  columns={rankingColumns}
                  title={dashboard.rankingsTitle}
                />
              </motion.div>

              {/* Contextual Examples */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ExamplesList
                  examples={data.examples}
                  title={dashboard.examplesTitle}
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Bank Profile Drawer */}
      {showBankDrawer && selectedBankData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Building className="text-indigo-400" size={24} />
                <h3 className="text-xl font-bold text-white">{selectedBank}</h3>
              </div>
              <button
                onClick={() => setShowBankDrawer(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <Card title="Key Metrics" subtitle="Risk Assessment Summary">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Risk Score</div>
                    <div className={`text-2xl font-bold ${
                      selectedBankData.riskScore >= 8.5 ? 'text-red-400' :
                      selectedBankData.riskScore >= 7.5 ? 'text-orange-400' :
                      selectedBankData.riskScore >= 6.5 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {selectedBankData.riskScore.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Presence Rate</div>
                    <div className="text-2xl font-bold text-indigo-400">{selectedBankData.presenceRate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Avg Confidence</div>
                    <div className="text-2xl font-bold text-green-400">{selectedBankData.avgConfidence}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Primary Mechanisms</div>
                  <p className="text-white">{selectedBankData.mechanisms}</p>
                </div>
              </Card>

              {selectedBankExamples.length > 0 && (
                <Card title="Top Examples" subtitle="Contextual Analysis">
                  <div className="space-y-4">
                    {selectedBankExamples.map((example, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="font-medium text-indigo-300 mb-1">{example.mechanism}</div>
                        <div className="text-sm text-gray-400 mb-2">{example.note}</div>
                        <blockquote className="text-sm text-gray-300 italic">"{example.excerpt}"</blockquote>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}