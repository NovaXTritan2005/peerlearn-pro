import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'
import CosmicBackground from '../components/CosmicBackground'
import Card from '../components/Card'
import { methodology } from '../content'

export default function Methodology() {
  const [expandedFaq, setExpandedFaq] = useState(new Set())

  const toggleFaq = (index) => {
    setExpandedFaq(current => {
      const newSet = new Set(current)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section className="relative min-h-screen">
      <CosmicBackground intensity={0.2} speed={0.4} />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-indigo-400" size={32} />
            <h1 className="text-4xl font-bold text-white">{methodology.title}</h1>
          </div>
          <p className="text-xl text-indigo-300 mb-4">{methodology.subtitle}</p>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {methodology.description}
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card title={methodology.sections.overview.title} subtitle="Research Foundation">
              <p className="text-gray-300 leading-relaxed">
                {methodology.sections.overview.content}
              </p>
            </Card>
          </motion.div>

          {/* Risk Scoring Algorithm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card title={methodology.sections.scoring.title} subtitle="Quantitative Framework">
              <p className="text-gray-300 leading-relaxed mb-4">
                {methodology.sections.scoring.content}
              </p>
              
              <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                <h4 className="font-semibold text-indigo-200 mb-3">Risk Score Components</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-indigo-300 font-medium">Commitment Escalation (40%)</div>
                    <div className="text-gray-400">Investment persistence patterns</div>
                  </div>
                  <div>
                    <div className="text-indigo-300 font-medium">Loss Aversion (30%)</div>
                    <div className="text-gray-400">Risk-avoidance behaviors</div>
                  </div>
                  <div>
                    <div className="text-indigo-300 font-medium">Decision Quality (20%)</div>
                    <div className="text-gray-400">Strategic choice analysis</div>
                  </div>
                  <div>
                    <div className="text-indigo-300 font-medium">Contextual Factors (10%)</div>
                    <div className="text-gray-400">Environmental influences</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data Collection Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card title={methodology.sections.dataCollection.title} subtitle="Sources & Methods">
              <p className="text-gray-300 leading-relaxed mb-4">
                {methodology.sections.dataCollection.content}
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">Primary Sources</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Annual Reports</li>
                    <li>• Regulatory Filings</li>
                    <li>• Earnings Calls</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">Analysis Tools</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• NLP Processing</li>
                    <li>• Sentiment Analysis</li>
                    <li>• Pattern Recognition</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="font-medium text-white mb-2">Validation</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Expert Review</li>
                    <li>• Cross-validation</li>
                    <li>• Peer Assessment</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Validation Framework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card title={methodology.sections.validation.title} subtitle="Quality Assurance">
              <p className="text-gray-300 leading-relaxed">
                {methodology.sections.validation.content}
              </p>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card title={methodology.faq.title} subtitle="Common Questions">
              <div className="space-y-4">
                {methodology.faq.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-700/50 last:border-b-0 pb-4 last:pb-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left flex items-center justify-between py-2 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle size={18} className="text-indigo-400 flex-shrink-0" />
                        <span className="font-medium text-gray-200">{item.question}</span>
                      </div>
                      {expandedFaq.has(index) ? (
                        <ChevronDown size={18} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-400" />
                      )}
                    </button>
                    
                    {expandedFaq.has(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pl-9"
                      >
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center py-8"
          >
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-8 border border-indigo-500/20">
              <h3 className="text-xl font-bold text-white mb-3">Interested in Our Research?</h3>
              <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
                Our methodology is continuously evolving. We welcome collaboration with researchers, institutions, and industry experts.
              </p>
              <a
                href="#/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}