"use client"
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='fixed top-1/2 left-1/2 backdrop-blur-md'>
      <ThreeDots
  color="#4fa94d"
  width="50"
  visible={true}
  />
    </div>
  )
}

export default Loader
