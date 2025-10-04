import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: <DollarSign size={24} />,
      label: 'TVL Nakamoto Capital',
      value: '$1,240,500',
      change: '+2.4%',
      changeType: 'positive',
      description: 'Valor total bloqueado nos pools Nakamoto Capital'
    },
    {
      icon: <TrendingUp size={24} />,
      label: '24h Volume',
      value: '$356,212',
      change: '-1.1%',
      changeType: 'negative',
      description: 'Volume 24h Nakamoto Capital'
    },
    {
      icon: <Users size={24} />,
      label: 'Usuários Ativos',
      value: '700',
      change: '~',
      changeType: 'neutral',
      description: 'Usuários interagindo nas últimas 24 horas'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className="glass-card p-6 relative overflow-hidden group"
        >
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          
          {/* Icon */}
          <div className="absolute top-5 right-5 text-text-primary/30">
            {stat.icon}
          </div>

          <div className="space-y-2">
            <p className="text-text-muted text-xs font-medium uppercase tracking-wider">
              {stat.label}
            </p>
            
            <div className="flex items-baseline gap-3">
              <h3 className={`text-3xl font-bold ${
                index === 0 ? 'gradient-text' : 
                index === 1 ? 'gradient-text-secondary' : 
                'gradient-text-accent'
              }`}>
                {stat.value}
              </h3>
              
              <span className={`px-2 py-1 rounded-md text-sm font-bold ${
                stat.changeType === 'positive' 
                  ? 'bg-success/20 text-success' 
                  : stat.changeType === 'negative'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-text-muted/20 text-text-muted'
              }`}>
                {stat.change}
              </span>
            </div>
            
            <p className="text-text-muted text-xs leading-relaxed">
              {stat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  )
}

export default StatsSection
