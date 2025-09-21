/**
 * Content strings for the Cosmic Research Lab
 * All user-facing text for easy editing and internationalization
 */

export const SITE_CONTENT = {
  // Site metadata
  siteTitle: "Cosmic Research Lab — Deep Research Analysis",
  siteDescription: "Production-grade research showcase analyzing sunk-cost fallacy patterns in financial institutions using advanced data visualization and cosmic-themed interface design.",
  
  // Navigation
  nav: {
    home: "Home",
    researchIndex: "Research Index",
    dashboard: "Dashboard", 
    methodology: "Methodology",
    about: "About/Contact"
  },

  // Home page
  home: {
    hero: {
      title: "Deep Research Analysis",
      subtitle: "Cosmic Research Lab",
      description: "Explore comprehensive research on behavioral patterns in financial institutions through advanced data visualization and real-time cosmic backgrounds.",
      ctaPrimary: "Explore Research Index",
      ctaSecondary: "Open Dashboard"
    },
    preview: {
      title: "What's inside?",
      researchCard: {
        title: "Research Index",
        subtitle: "Comprehensive Data Explorer",
        description: "Interactive leaderboard and detailed per-file reports with advanced filtering, sorting, and search capabilities."
      },
      dashboardCard: {
        title: "Sunk-Cost Dashboard", 
        subtitle: "Risk Analysis & Visualization",
        description: "Dynamic Plotly charts, risk rankings, and contextual examples with exportable data insights."
      }
    }
  },

  // Research Index page
  researchIndex: {
    title: "Deep Research — Index",
    description: "Comprehensive analysis of financial institution risk patterns with interactive filtering and detailed reporting.",
    leaderboardTitle: "Bank Risk Leaderboard",
    reportsTableTitle: "Per-File Research Reports",
    emptyState: {
      title: "No reports found",
      description: "Try adjusting your search criteria or clearing the current filters.",
      action: "Clear all filters"
    },
    columns: {
      id: "#",
      bank: "Bank",
      year: "Year", 
      risk: "Risk Score",
      confidence: "Confidence",
      presence: "Presence Rate",
      report: "Report"
    }
  },

  // Dashboard page
  dashboard: {
    title: "Sunk-Cost Fallacy Analysis",
    description: "Interactive dashboard showcasing risk analysis through advanced data visualization and contextual behavioral examples.",
    chartTitle: "Sunk-Cost Risk by Bank",
    rankingsTitle: "Risk Rankings & Analysis",
    examplesTitle: "Contextual Examples (Top)",
    bankProfile: {
      title: "Bank Profile",
      metrics: "Key Metrics",
      topExcerpts: "Top 3 Excerpts"
    }
  },

  // Methodology page
  methodology: {
    title: "Research Methodology",
    subtitle: "Understanding Our Risk Scoring System",
    description: "Our comprehensive approach to analyzing behavioral patterns combines quantitative risk assessment with qualitative contextual analysis.",
    sections: {
      overview: {
        title: "Overview",
        content: "Our methodology employs a multi-dimensional approach to assess sunk-cost fallacy patterns in financial institutions, combining statistical analysis with behavioral psychology principles."
      },
      scoring: {
        title: "Risk Scoring Algorithm",
        content: "Risk scores are calculated using a weighted combination of commitment escalation indicators, loss aversion metrics, and strategic decision-making patterns identified through natural language processing."
      },
      dataCollection: {
        title: "Data Collection Process", 
        content: "We analyze public financial reports, regulatory filings, and strategic communications using advanced text mining techniques and expert review protocols."
      },
      validation: {
        title: "Validation Framework",
        content: "All findings undergo peer review and cross-validation against established behavioral finance literature and industry benchmarks."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How often is the data updated?",
          answer: "Research data is updated quarterly following the release of major financial institution reports and regulatory filings."
        },
        {
          question: "What is the confidence interval for risk scores?",
          answer: "Our risk scores have a 95% confidence interval with margins of error typically below ±0.3 points on our 10-point scale."
        },
        {
          question: "Can I access the raw data?",
          answer: "Aggregated data is available for download in CSV format. Raw analysis data is available to qualified researchers upon request."
        }
      ]
    }
  },

  // About/Contact page
  about: {
    title: "About the Cosmic Research Lab",
    description: "A cutting-edge research initiative combining behavioral finance analysis with advanced data visualization technologies.",
    mission: {
      title: "Our Mission",
      content: "To advance understanding of behavioral patterns in financial decision-making through rigorous research, innovative visualization, and open scientific collaboration."
    },
    team: {
      title: "Research Team",
      content: "Our interdisciplinary team combines expertise in behavioral economics, data science, financial analysis, and user experience design."
    },
    contact: {
      title: "Get in Touch",
      description: "Interested in collaboration, accessing our data, or learning more about our methodology? We'd love to hear from you.",
      email: "research@cosmiclab.dev",
      linkedin: "Connect on LinkedIn", 
      github: "View on GitHub",
      feedbackForm: {
        title: "Request Feedback",
        namePlaceholder: "Your name",
        emailPlaceholder: "Email address", 
        messagePlaceholder: "Tell us about your research interests or collaboration ideas...",
        submitButton: "Send Message"
      }
    }
  },

  // Common UI elements
  ui: {
    loading: "Loading...",
    error: "An error occurred",
    retry: "Try again",
    exportCsv: "Export CSV",
    search: "Search...",
    filter: "Filter",
    sort: "Sort",
    clearFilters: "Clear all filters",
    showMore: "Show more",
    showLess: "Show less",
    close: "Close",
    open: "Open",
    skip: "Skip",
    replay: "Replay",
    mute: "Mute",
    unmute: "Unmute",
    comfortableView: "Comfortable view",
    compactView: "Compact view"
  },

  // Einstein intro
  einsteinIntro: {
    caption: "Request for Personal Feedback",
    subtitle: "A message from the cosmic research lab",
    skipButton: "Skip Introduction",
    controls: {
      replay: "Replay video",
      mute: "Mute video", 
      unmute: "Unmute video",
      skip: "Skip video"
    }
  },

  // Accessibility
  a11y: {
    skipToContent: "Skip to main content",
    mainNavigation: "Main navigation",
    cosmicBackground: "Cosmic background visualization",
    openInNewTab: "Opens in new tab",
    sortColumn: "Sort by this column",
    filterBy: "Filter by",
    expandSection: "Expand section",
    collapseSection: "Collapse section"
  }
};

// Export individual sections for easier importing
export const { siteTitle, siteDescription } = SITE_CONTENT;
export const { nav, home, researchIndex, dashboard, methodology, about, ui, einsteinIntro, a11y } = SITE_CONTENT;