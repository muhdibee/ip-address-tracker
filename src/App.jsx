import { useState } from 'react'

function App() {

  return (
    <div className='app-container'>
      <div className='hero-image-container'>
        <div className='search-container'>
          <p>IP Address Tracker</p>
          <form>
            <input type='text'></input>
            <input type="submit" value="" />
          </form>

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
