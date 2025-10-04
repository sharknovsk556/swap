import { useState, useEffect } from 'react'
import axios from 'axios'

export const useTokenPrices = () => {
  const [tokenPrices, setTokenPrices] = useState({
    NKTx: 0,
    ETH: 0,
    USDC: 1,
    USDT: 1
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchTokenPrices = async () => {
    try {
      setIsLoading(true)
      
      // Fetch NKTx price from Birdeye API
      const nktxResponse = await axios.get(
        "https://public-api.birdeye.so/defi/price?address=nktxHBwMUTBPJJtr8Z8mcbS4m6zCeEDVuDRHfMAWmWB&ui_amount_mode=raw",
        {
          headers: {
            "X-API-KEY": "249da5373f5143778fb38423a65b6e7c",
            "x-chain": "solana"
          }
        }
      )

      if (nktxResponse.data?.data) {
        setTokenPrices(prev => ({
          ...prev,
          NKTx: parseFloat(nktxResponse.data.data.value)
        }))
      }

      // Fetch ETH price from CoinGecko API
      try {
        const ethResponse = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        if (ethResponse.data?.ethereum?.usd) {
          setTokenPrices(prev => ({
            ...prev,
            ETH: ethResponse.data.ethereum.usd
          }))
        }
      } catch (ethError) {
        console.log("ETH price fetch failed, using fallback")
        setTokenPrices(prev => ({
          ...prev,
          ETH: 2400 // Fallback price
        }))
      }

    } catch (error) {
      console.error("Failed to fetch token data:", error)
      // Use fallback prices
      setTokenPrices({
        NKTx: 0.0005,
        ETH: 2400,
        USDC: 1,
        USDT: 1
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenPrices()
    
    // Update prices every 10 minutes
    const interval = setInterval(fetchTokenPrices, 600000)
    
    return () => clearInterval(interval)
  }, [])

  return { tokenPrices, isLoading, refetch: fetchTokenPrices }
}
