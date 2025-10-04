import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import StatsSection from './components/StatsSection'
import TokenCard from './components/TokenCard'
import SwapInterface from './components/SwapInterface'
import WarningBanner from './components/WarningBanner'
import Footer from './components/Footer'
import { useTokenPrices } from './hooks/useTokenPrices'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const { tokenPrices, isLoading } = useTokenPrices()

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-dark to-background-card">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(28, 36, 62, 0.95)',
            color: '#ffffff',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
      
      <WarningBanner />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-6 pt-32 pb-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <StatsSection />
              <TokenCard tokenPrices={tokenPrices} isLoading={isLoading} />
            </motion.div>
          )}
          
          {activeTab === 'swap' && (
            <motion.div
              key="swap"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <SwapInterface tokenPrices={tokenPrices} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
