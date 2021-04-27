import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './smallComponents/Navbar'

const Login = () => {
  const history = useHistory()

  return (
    <>
      <Navbar/>
      <section className='section'>
        <div className='columns'>
          <div className='column'>
          </div>
          <div className='column'>
            <button className='button is-large is-danger is-outlined has-text-centered' onClick = {(e) => {window.location.href='/auth/google/'}}>  Login With Google  </button>
          </div>
          <div className='column'>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login