import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Week from './Week'

const Homepage = () => {
  return (
    <>
      <div className='card'>
        <div className='columns container'>      
        <Week day={'Monday'}/>
        <Week day={'Monday'}/>
        <Week day={'Monday'}/>
        </div>
      </div>

    </>
  )
}

export default Homepage
