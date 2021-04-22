import React, { useEffect, useState } from 'react'

const Week = (props) => {
  const {day} = props

  const boxedHours = (time) => {
    return (
      <>
        <div className='columns has-background-primary-light' id = {time}>
          <div className='box p-0'>
           3
          </div>
        </div>
      </>
    )
  }

  const times = [...Array(24).keys()]

  return (
    <>
      <div className='column'>
        <div className='columns'>
          <h1 className='title'> {day} </h1>
        </div>
        {
          times.map(time => {
            return boxedHours(time)
          })
        }
      </div>
    </>
  )

}

export default Week