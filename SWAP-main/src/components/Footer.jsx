import React from 'react'
import { motion } from 'framer-motion'
import { Twitter, MessageCircle, Send } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      icon: <Twitter size={20} />,
      href: 'https://x.com/NKT_DAO',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Discord',
      icon: <MessageCircle size={20} />,
      href: 'https://discord.gg/YmeZCFbR3A',
      color: 'hover:text-indigo-400'
    },
    {
      name: 'Telegram',
      icon: <Send size={20} />,
      href: 'https://t.me/+cbHnU7hQPPU1NDg0',
      color: 'hover:text-blue-500'
    }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-primary text-sm mb-4 font-medium">
          Nakamoto Capital © 2025 — Swap NKTx now and join the DAO!
        </p>
        
        <div className="flex items-center justify-center gap-6 mb-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-border-color text-text-secondary transition-all duration-300 ${link.color} hover:bg-white/20 hover:border-primary/50`}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.name}</span>
            </motion.a>
          ))}
        </div>
        
        <div className="text-xs text-text-muted">
          <p>Built with React, Vite, and Framer Motion for a dynamic DeFi experience</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
