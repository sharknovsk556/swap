import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, FileText, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

const TokenCard = ({ tokenPrices, isLoading }) => {
  const tokenInfo = {
    name: 'Nakamoto Capital Gov',
    symbol: 'NKTx',
    logo: '/assets/images/nktx.png',
    contractAddress: 'nktxHBwMUTBPJJtr8Z8mcbS4m6zCeEDVuDRHfMAWmWB',
    totalSupply: '10,000,000',
    protocol: 'Solana SPL',
    mintAuth: 'YES',
    lockedLP: '0%'
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenInfo.contractAddress)
    toast.success('Contract address copied!')
  }

  const formatPrice = (price) => {
    if (isLoading) return 'Loading...'
    if (price === 0) return '$0.0000'
    return `$${price.toFixed(5)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-8 relative overflow-hidden group"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-primary" />
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          {/* Token Logo */}
          <div className="relative">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-primary p-1">
              <div className="w-full h-full bg-background-card rounded-lg flex items-center justify-center">
                <img 
                  src="/assets/images/nktx.png" 
                  alt="NKTx Token" 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-2xl font-bold gradient-text hidden">NKTx</span>
              </div>
            </div>
            <div className="absolute -inset-1 bg-gradient-primary rounded-lg opacity-30 blur-md -z-10" />
          </div>

          {/* Token Info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">
              {tokenInfo.name}
            </h2>
            <div className="text-4xl font-bold gradient-text">
              {formatPrice(tokenPrices.NKTx)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://solscan.io/token/${tokenInfo.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-black rounded-xl font-medium text-sm hover:shadow-glow transition-all"
          >
            <ExternalLink size={16} />
            Solscan
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://whitepaper.nakamotocapital.fund/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-black rounded-xl font-medium text-sm hover:shadow-glow transition-all"
          >
            <FileText size={16} />
            Whitepaper
          </motion.a>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <iframe
          src="https://birdeye.so/tv-widget/nktxHBwMUTBPJJtr8Z8mcbS4m6zCeEDVuDRHfMAWmWB?chain=solana&viewMode=pair&chartInterval=15&chartType=Line&chartTimezone=America%2FLos_Angeles&chartLeftToolbar=show&theme=dark&cssCustomProperties=--tv-color-platform-background%3A%230b1022&cssCustomProperties=--tv-color-pane-background%3A%230b1022&chartOverrides=mainSeriesProperties.lineStyle.color%3A%2335d0e0&chartOverrides=paneProperties.backgroundGradientStartColor%3Argba%2811%2C+16%2C+34%2C+1%29&chartOverrides=paneProperties.backgroundGradientEndColor%3Argba%2811%2C+16%2C+34%2C+1%29"
          className="w-full h-80 rounded-xl border-0"
          allowFullScreen
        />
        <p className="text-text-primary text-sm mt-2 text-center">
          "The launch of the coin was too successful — we hit $0.50 and many dumped, crashing the price early. That's why the chart looks like that."
        </p>
      </div>

      {/* Token Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-text-muted/20">
          <span className="text-text-muted font-medium">CA</span>
          <div className="flex items-center gap-2">
            <span className="text-text-primary font-mono">
              {tokenInfo.contractAddress.slice(0, 6)}...{tokenInfo.contractAddress.slice(-3)}
            </span>
            <button
              onClick={copyAddress}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Copy size={14} className="text-text-muted" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-text-muted/20">
          <span className="text-text-muted font-medium">Total Supply</span>
          <span className="text-text-primary font-medium">{tokenInfo.totalSupply}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-text-muted/20">
          <span className="text-text-muted font-medium">Protocol</span>
          <span className="text-text-primary font-medium">{tokenInfo.protocol}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-text-muted/20">
          <span className="text-text-muted font-medium">Mint Auth</span>
          <span className="text-text-primary font-medium">{tokenInfo.mintAuth}</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-text-muted font-medium">Locked LP</span>
          <span className="text-text-primary font-medium">{tokenInfo.lockedLP}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TokenCard
