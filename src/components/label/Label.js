import React from 'react'
import './label.css'

const Label = ({ item }) => {
  return (
    <div className='type-label'>
        <span>{item}</span>
    </div>
  )
}

export default Label