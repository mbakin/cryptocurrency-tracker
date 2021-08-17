import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'
import './Home.css'

const Home = () => {

  const [ coins, setCoins] = useState([])
  const [search , setSearch] = useState('')

  useEffect( () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
         .then(response => {
           setCoins(response.data)
         }).catch(error => alert(error))
         
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-search-text"> Search a Currency </h1>
        <form >
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>  
      {filteredCoins.map(coin => {
        return(
          <Coin 
          key={coin.id}
          name={coin.name} 
          price={coin.current_price}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}     
    </div>
  )
}

export default Home
