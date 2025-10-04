import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, Settings, BarChart3, ChevronDown, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'

const SwapInterface = ({ tokenPrices, isLoading }) => {
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [sellToken, setSellToken] = useState('ETH')
  const [buyToken, setBuyToken] = useState('USDC')
  const [showSellDropdown, setShowSellDropdown] = useState(false)
  const [showBuyDropdown, setShowBuyDropdown] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', price: tokenPrices.ETH, icon: '/assets/images/token/eth_logo.png' },
    { symbol: 'NKTx', name: 'Nakamoto Capital Gov', price: tokenPrices.NKTx, icon: '/assets/images/nktx.png' },
    { symbol: 'USDC', name: 'USD Coin', price: tokenPrices.USDC, icon: '/assets/images/token/token_usdt.svg' },
    { symbol: 'USDT', name: 'Tether USD', price: tokenPrices.USDT, icon: '/assets/images/token/token_usdt.svg' }
  ]

  const calculateConversion = (amount, fromToken, toToken) => {
    if (!amount || amount <= 0) return 0
    
    const fromPrice = tokens.find(t => t.symbol === fromToken)?.price || 0
    const toPrice = tokens.find(t => t.symbol === toToken)?.price || 0
    
    if (fromPrice === 0 || toPrice === 0) return 0
    
    const usdValue = amount * fromPrice
    const convertedAmount = usdValue / toPrice
    
    return convertedAmount
  }

  const handleSellAmountChange = (value) => {
    setSellAmount(value)
    if (value && !isNaN(value)) {
      const converted = calculateConversion(parseFloat(value), sellToken, buyToken)
      setBuyAmount(converted > 0 ? converted.toFixed(6) : '')
    } else {
      setBuyAmount('')
    }
  }

  const handleBuyAmountChange = (value) => {
    setBuyAmount(value)
    if (value && !isNaN(value)) {
      const converted = calculateConversion(parseFloat(value), buyToken, sellToken)
      setSellAmount(converted > 0 ? converted.toFixed(6) : '')
    } else {
      setSellAmount('')
    }
  }

  const flipTokens = () => {
    const tempSell = sellToken
    const tempSellAmount = sellAmount
    
    setSellToken(buyToken)
    setBuyToken(tempSell)
    setSellAmount(buyAmount)
    setBuyAmount(tempSellAmount)
  }

  const selectToken = (token, isSell) => {
    if (isSell) {
      setSellToken(token.symbol)
      setShowSellDropdown(false)
    } else {
      setBuyToken(token.symbol)
      setShowBuyDropdown(false)
    }
    
    // Recalculate if there's an amount
    if (sellAmount && isSell) {
      const converted = calculateConversion(parseFloat(sellAmount), token.symbol, buyToken)
      setBuyAmount(converted > 0 ? converted.toFixed(6) : '')
    } else if (buyAmount && !isSell) {
      const converted = calculateConversion(parseFloat(buyAmount), token.symbol, sellToken)
      setSellAmount(converted > 0 ? converted.toFixed(6) : '')
    }
  }

  const handleSwap = () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true)
      toast.success('Wallet connected!')
    } else {
      toast.success('Swap initiated!')
    }
  }

  const getExchangeRate = () => {
    const sellPrice = tokens.find(t => t.symbol === sellToken)?.price || 0
    const buyPrice = tokens.find(t => t.symbol === buyToken)?.price || 0
    
    if (sellPrice > 0 && buyPrice > 0) {
      const rate = sellPrice / buyPrice
      return `1 ${sellToken} ≈ ${rate >= 1 ? rate.toFixed(2) : rate.toFixed(6)} ${buyToken}`
    }
    return `1 ${sellToken} ≈ 1.0 ${buyToken}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-8 relative overflow-hidden group">
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold gradient-text">🔄 Swap Tokens</h2>
          <div className="flex gap-3">
            <button className="p-3 bg-white/10 border border-border-color rounded-xl text-text-secondary hover:text-text-primary transition-colors hover:bg-white/20">
              <Settings size={18} />
            </button>
            <button className="p-3 bg-white/10 border border-border-color rounded-xl text-text-secondary hover:text-text-primary transition-colors hover:bg-white/20">
              <BarChart3 size={18} />
            </button>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xl">💡</span>
            <p className="text-base text-primary font-medium">
              A fee of 0.3% is applied on every swap for liquidity providers
            </p>
          </div>
        </div>

        {/* Swap Form */}
        <div className="space-y-6">
          {/* Sell Token */}
          <div className="bg-white/5 border border-border-color rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                💸 Sell
              </label>
              <span className="text-sm px-3 py-1.5 bg-white/10 rounded-lg text-text-muted font-medium">
                Balance: 0.00
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <input
                type="number"
                value={sellAmount}
                onChange={(e) => handleSellAmountChange(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent border-0 outline-none text-text-primary text-3xl sm:text-4xl font-bold placeholder-text-muted min-w-0 py-2"
              />
              <div className="relative flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setShowSellDropdown(!showSellDropdown)}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-secondary text-black rounded-xl font-semibold hover:shadow-glow transition-all w-full sm:min-w-[140px]"
                >
                  <img 
                    src={tokens.find(t => t.symbol === sellToken)?.icon} 
                    alt={sellToken}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="text-base">{sellToken}</span>
                  <ChevronDown size={14} />
                </button>
                
                {showSellDropdown && (
                  <div className="absolute top-full right-0 mt-3 bg-background-card border border-border-color rounded-xl p-3 min-w-48 z-10 shadow-card">
                    {tokens.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => selectToken(token, true)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <img 
                          src={token.icon} 
                          alt={token.symbol}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{token.symbol}</span>
                          <span className="text-xs text-text-muted">{token.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Flip Button */}
          <div className="flex justify-center py-2">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={flipTokens}
              className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center text-black font-bold text-2xl shadow-card hover:shadow-glow transition-all"
            >
              <ArrowUpDown size={24} />
            </motion.button>
          </div>

          {/* Buy Token */}
          <div className="bg-white/5 border border-border-color rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                💰 Buy
              </label>
              <span className="text-sm px-3 py-1.5 bg-white/10 rounded-lg text-text-muted font-medium">
                Balance: 0.00
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <input
                type="number"
                value={buyAmount}
                onChange={(e) => handleBuyAmountChange(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent border-0 outline-none text-text-primary text-3xl sm:text-4xl font-bold placeholder-text-muted min-w-0 py-2"
              />
              <div className="relative flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setShowBuyDropdown(!showBuyDropdown)}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-accent text-black rounded-xl font-semibold hover:shadow-glow transition-all w-full sm:min-w-[140px]"
                >
                  <img 
                    src={tokens.find(t => t.symbol === buyToken)?.icon} 
                    alt={buyToken}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="text-base">{buyToken}</span>
                  <ChevronDown size={14} />
                </button>
                
                {showBuyDropdown && (
                  <div className="absolute top-full right-0 mt-3 bg-background-card border border-border-color rounded-xl p-3 min-w-48 z-10 shadow-card">
                    {tokens.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => selectToken(token, false)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <img 
                          src={token.icon} 
                          alt={token.symbol}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{token.symbol}</span>
                          <span className="text-xs text-text-muted">{token.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSwap}
          disabled={!sellAmount || !buyAmount}
          className={`w-full py-5 px-8 rounded-2xl font-bold text-xl uppercase tracking-wider transition-all mt-8 ${
            isWalletConnected
              ? 'bg-success text-black glow-effect'
              : 'bg-gradient-primary text-black hover:shadow-glow'
          } ${(!sellAmount || !buyAmount) ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center justify-center gap-3">
            <Wallet size={24} />
            {isWalletConnected ? 'Swap' : 'Connect Wallet'}
          </div>
        </motion.button>

        {/* Price Info */}
        {(sellAmount && buyAmount) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 bg-white/5 border border-border-color rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between text-base">
              <span className="text-text-muted font-medium">💱 Exchange Rate</span>
              <span className="text-text-primary font-semibold">{getExchangeRate()}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-text-muted font-medium">⛽ Network Fee</span>
              <span className="text-text-primary font-semibold">~$12.50</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-text-muted font-medium">💎 Platform Fee</span>
              <span className="text-text-primary font-semibold">0.3%</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default SwapInterface
