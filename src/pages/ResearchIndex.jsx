import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Database, ExternalLink } from 'lucide-react'
import CosmicBackground from '../components/CosmicBackground'
import PillFilter from '../components/PillFilter'
import DataTable from '../components/DataTable'
import { parseIndexHtml } from '../utils/dataParser'
import { researchIndex } from '../content'

export default function ResearchIndex() {
  const [data, setData] = useState({ leaderboard: [], rows: [] })
  const [selectedBank, setSelectedBank] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/index.html')
        if (!response.ok) throw new Error('Failed to load data')
        
        const htmlContent = await response.text()
        const parsedData = parseIndexHtml(htmlContent)
        setData(parsedData)
      } catch (err) {
        setError(err.message)
        console.error('Error loading research data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter data by selected bank
  const filteredRows = useMemo(() => {
    if (!selectedBank) return data.rows
    return data.rows.filter(row => row.bank === selectedBank)
  }, [data.rows, selectedBank])

  // Table columns configuration
  const tableColumns = [
    { key: 'id', header: researchIndex.columns.id, width: 60 },
    { key: 'bank', header: researchIndex.columns.bank, width: 150 },
    { key: 'year', header: researchIndex.columns.year, width: 80 },
    { 
      key: 'risk', 
      header: researchIndex.columns.risk, 
      width: 100,
      render: (value) => (
        <span className={`font-medium ${
          value >= 8.5 ? 'text-red-400' :
          value >= 7.5 ? 'text-orange-400' :
          value >= 6.5 ? 'text-yellow-400' : 'text-green-400'
        }`}>
          {value.toFixed(1)}
        </span>
      )
    },
    { key: 'confidence', header: researchIndex.columns.confidence, width: 100 },
    { 
      key: 'presence', 
      header: researchIndex.columns.presence, 
      width: 120,
      render: (value) => (value * 100).toFixed(0) + '%'
    },
    { 
      key: 'href', 
      header: researchIndex.columns.report, 
      width: 120,
      render: (value) => (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm"
        >
          Open <ExternalLink size={12} />
        </a>
      )
    }
  ]

  if (error) {
    return (
      <section className="relative min-h-[88vh]">
        <CosmicBackground intensity={0.5} speed={0.5} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Data Loading Error</h2>
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
      <CosmicBackground intensity={0.3} speed={0.8} />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-indigo-400" size={32} />
            <h1 className="text-3xl font-bold text-white">{researchIndex.title}</h1>
          </div>
          <p className="text-gray-300 max-w-3xl">
            {researchIndex.description}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading research data...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Bank Risk Leaderboard Pills */}
            <PillFilter
              items={data.leaderboard}
              selectedBank={selectedBank}
              onBankSelect={setSelectedBank}
              onClearFilter={() => setSelectedBank(null)}
            />

            {/* Research Reports Table */}
            <DataTable
              data={filteredRows}
              columns={tableColumns}
              title={researchIndex.reportsTableTitle}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}