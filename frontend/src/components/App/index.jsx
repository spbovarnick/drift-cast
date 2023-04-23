import { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import Footer from '../Footer'
import Card from '../Card'


function App() {
  const [riverData, setRiverData] = useState([
    { "Sandy": {
        "flow": undefined, 
        "height": undefined
    }}, 
    {"Wilson": {
        "flow": undefined, 
        "height": undefined
    }}, 
    {"Clackamas": {
        "flow": undefined, 
        "height": undefined}}  ])


const getData = async (string) => {
    try {
      const res = await axios.get(string)
      const {data} = res
      console.log(data.value.timeSeries[0].values[0].value[0].value)
      console.log(data.value.timeSeries[1].values[0].value[0].value)
      console.log(data.value.timeSeries[2].values[0].value[0].value)
      // console.log(data.value.timeSeries[3].values[0].value[0].value)
      return data

    } catch (error) {
      console.log(error)
    }
  }

useEffect(() => {
getData("https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=14142500,%2014301500,%2014210000&parameterCd=00060,00065&siteStatus=all&")
    .then((res) => {
        setRiverData([
            {"Sandy": {
                "flow": parseInt(res.value.timeSeries[0].values[0].value[0].value), 
                "height": parseInt(res.value.timeSeries[1].values[0].value[0].value)
            }}, 
            {"Wilson": {
                "flow": parseInt(res.value.timeSeries[2].values[0].value[0].value), 
                "height": parseInt(res.value.timeSeries[3].values[0].value[0].value)
            }}, 
            {"Clackamas": {
                "flow": parseInt(res.value.timeSeries[4].values[0].value[0].value), 
                "height": parseInt(res.value.timeSeries[5].values[0].value[0].value)}}],
        )
    })
}, [])

let riverInfo = <p>River data loading...</p>
if (Object.keys(riverData).length > 0){
    riverInfo = riverData
      .map((river, i) => {
        <Card 
          key={i}  
          riverData={river}
        />
      })
}
  

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
