import { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import Footer from '../Footer'
import Card from '../Card'


function App() {

  

  return (
    <>
      <NavBar />

      <h1 className='border-2'>Hello</h1>
      
      <Card />

      <Footer />
    </>
  )
}

export default App
