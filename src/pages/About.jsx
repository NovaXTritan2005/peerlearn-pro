import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Send, Users, Target } from 'lucide-react'
import CosmicBackground from '../components/CosmicBackground'
import Card from '../components/Card'
import { about } from '../content'

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create mailto link with prefilled data
    const subject = encodeURIComponent('Research Collaboration Inquiry')
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Page URL: ${window.location.href}

Message:
${formData.message}
    `)
    
    window.location.href = `mailto:${about.contact.email}?subject=${subject}&body=${body}`
    
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="relative min-h-screen">
      <CosmicBackground intensity={0.2} speed={0.3} />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="text-indigo-400" size={32} />
            <h1 className="text-4xl font-bold text-white">{about.title}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {about.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card title={about.mission.title} subtitle="Our Vision">
              <div className="flex items-start gap-3">
                <Target className="text-indigo-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-300 leading-relaxed">
                  {about.mission.content}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card title={about.team.title} subtitle="Interdisciplinary Expertise">
              <div className="flex items-start gap-3">
                <Users className="text-indigo-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-300 leading-relaxed">
                  {about.team.content}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card title={about.contact.title} subtitle="Connect with Us">
            <p className="text-gray-300 mb-6 leading-relaxed">
              {about.contact.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Send size={18} className="text-indigo-400" />
                  {about.contact.feedbackForm.title}
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={about.contact.feedbackForm.namePlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={about.contact.feedbackForm.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder={about.contact.feedbackForm.messagePlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-vertical"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {about.contact.feedbackForm.submitButton}
                  </button>
                </form>
              </div>

              {/* Direct Contact Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Direct Contact</h4>
                <div className="space-y-4">
                  <a
                    href={`mailto:${about.contact.email}`}
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <Mail size={20} className="text-indigo-400 group-hover:text-indigo-300" />
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div className="text-sm text-gray-400">{about.contact.email}</div>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/cosmic-research-lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <Linkedin size={20} className="text-indigo-400 group-hover:text-indigo-300" />
                    <div>
                      <div className="font-medium text-white">{about.contact.linkedin}</div>
                      <div className="text-sm text-gray-400">Professional network</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/NovaXTritan2005/peerlearn-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <Github size={20} className="text-indigo-400 group-hover:text-indigo-300" />
                    <div>
                      <div className="font-medium text-white">{about.contact.github}</div>
                      <div className="text-sm text-gray-400">Source code & collaboration</div>
                    </div>
                  </a>
                </div>

                {/* Research Areas */}
                <div className="mt-6 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <h5 className="font-medium text-indigo-200 mb-3">Research Areas of Interest</h5>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Behavioral Finance',
                      'Cognitive Biases',
                      'Decision Science',
                      'Data Visualization',
                      'Financial Analytics',
                      'Risk Assessment'
                    ].map((area) => (
                      <span
                        key={area}
                        className="px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded text-xs font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-8 border border-indigo-500/20">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Collaborate?</h3>
            <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
              Whether you're a researcher, institution, or industry professional, we're always interested in meaningful collaborations that advance our understanding of behavioral patterns in financial decision-making.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#/methodology"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
              >
                Learn Our Methodology
              </a>
              <a
                href="#/dashboard"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
              >
                Explore Our Data
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}