import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Menu, X } from 'lucide-react'

const Header = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: '🏠 Home', icon: '🏠' },
    { id: 'swap', label: '🔄 Swap', icon: '🔄' }
  ]

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background-dark/95 backdrop-blur-xl shadow-card' 
          : 'bg-background-dark/80 backdrop-blur-xl'
      } border-b border-border-color`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-effect">
              <span className="text-black font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-text-primary">Nakamoto Capital</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-primary text-black shadow-glow'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Wallet Button */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWalletConnect}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                isWalletConnected
                  ? 'bg-success text-black glow-effect'
                  : 'bg-gradient-primary text-black hover:shadow-glow'
              }`}
            >
              <Wallet size={16} />
              {isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-primary text-black'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
