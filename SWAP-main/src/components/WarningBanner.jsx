import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const WarningBanner = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-primary text-black py-3 px-4 text-center font-medium text-sm shadow-lg"
    >
      <div className="flex items-center justify-center gap-2">
        <span>🎉</span>
        <span>We're airdropping NFT packs for NKTx holders!</span>
        <a
          href="https://nft.nakamotocapital.fund/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 bg-black/10 rounded-md hover:bg-black/20 transition-colors font-semibold"
        >
          Check out the official site
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  )
}

export default WarningBanner
