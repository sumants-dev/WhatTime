import React, { useEffect, useState } from 'react'
import moment from 'moment'
import AvalibilityStaticButton from './smallComponents/AvalibilityStaticButton'

const WeeklyAvalibility = ({time, day, isOwner}) => {
  const hours =  [...Array(24).keys()]

  return(
    <>
      <div className='column is-narrow-mobile'>              
        <h1 className='is-size-4'> {moment(time).add(day, 'd').format('ddd MM DD')} </h1>
    
        {
          hours.map(hour => {
            if(hour >= 7 && hour <= 21) {
              return(
                <AvalibilityStaticButton time = {time} day = {day} hour = {hour} isOwner = {isOwner}/>
            )}
            else {
              return(
                <>
                </>
              )
            }
          })
          
        }
      </div>
    </>
  )

}

export default WeeklyAvalibility
