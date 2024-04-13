import { useState } from 'react'

function App() {

  return (
    <div className='app-container'>
      <div className='hero-image-container'>
        <div className='search-container'>
          <p>IP Address Tracker</p>
          <div className="search-field">
            <form>
              <input type='text' placeholder='Search for any IP address or domain'></input>
              <input type="submit" value=">"  style={{background: '#000000', color: 'white'}}/>
            </form>
          </div>
        </div>
      </div>
      <div className='result-container'>
        <div className='result-info'>

        </div>

      </div>
      

      <div class="attribution">
        Coded by <a href="#">Muhammad Ibrahim</a>. {/*Add my portfolio URL */}
      </div>
    </div>
  )
}

export default App
