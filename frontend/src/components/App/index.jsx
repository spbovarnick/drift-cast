import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getData } from '../../../utils/api'
import { defineConditions } from '../../../utils/api'
import NavBar from '../NavBar'
import Footer from '../Footer'
import Card from '../Card'
import DetailsPage from '../DetailsPage'
import HomePage from '../HomePage'


function App() {
  const [riverData, setRiverData] = useState([])
  const [detailPage, setDetailPage] = useState()
  const [conditions, setConditions] = useState()
  

  let staticGaugeHeights = [
    {   
        name: "Sandy River",
        goodLow: 8.5,
        goodHigh: 9,
        perfectHigh: 10.5,
        highHigh: 11,
        tooHighHigh: 15,
    },
    {
        name: "Wilson River",
        goodLow: 3.5,
        goodHigh: 4.8,
        perfectHigh: 5.4,
        highHigh: 6.5,
        tooHighHigh: 10.5,
    },
    {
        name: "Clackamas River",
        goodLow: 8,
        goodHigh: 10,
        perfectHigh: 13,
        highHigh: 15,
        tooHighHigh: 18,
    }
  ]

  // const defineConditions = async (height, goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh) => {
  //   let conditions
  //   if (height <= goodLow ) {
  //       // console.log("too low")
  //       conditions = {description: "Too Low", color: "blue-950", fullDescription: "The river is too low to fish. Stay home."}
  //     } else if (goodLow < height && height < goodHigh ) {
  //       // console.log("good")
  //       conditions = {description: "Good", color: "teal-800", fullDescription: "The level is good, but lower than perfect"}
  //     } else if (goodHigh < height && height <= perfectHigh  ) {
  //       // console.log("perfect")
  //       conditions = {description: "Perfect", color: "green-600", fullDescription: "The river is at the perfect level. Tight lines!"}
  //     } else if (perfectHigh < height && height <= highHigh ) {
  //       // console.log("high")
  //       conditions = {description: "High", color: "yellow-400", fullDescription: "The river is high, but fishable."}
  //     } else if (highHigh < height && height <= tooHighHigh ) {
  //       // console.log("too high")
  //       conditions = {description: "Too high", color: "orange-500", fullDescription: "The river is too high, stay home or proceed with caution."}
  //     } else if (tooHighHigh < height) {
  //       // console.log("serious danger")
  //       conditions = {description: "Serious Danger", color: "red-600", fullDescription: "Flood conditions, stay home."}
  //   }
  //   console.log(conditions)
  //   return conditions
  // }


  useEffect(() => {
  getData("https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=14142500,%2014301500,%2014210000&parameterCd=00060,00065&siteStatus=all")
    .then((res) => {
      let arr = []
      for (let i = 0; i < res.value.timeSeries.length; i += 1) {
        // a bunch of logic to get the rivery name capitalized from the object's "siteName" key
        let nameVar = res.value.timeSeries[i].sourceInfo.siteName.toLowerCase()
        const index = nameVar.indexOf("river")
        let name = nameVar.slice(0, index + 5).split(" ")
        for (let x = 0; x < name.length; x++) {
          name[x] = name[x].charAt(0).toUpperCase() + name[x].substring(1)
        }
        name = name.join(" ")
        let goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh
        staticGaugeHeights.forEach((q) => {
          if (q.name === name) {
            goodLow = q.goodLow
            goodHigh = q.goodHigh
            perfectHigh = q.perfectHigh
            highHigh = q.highHigh
            tooHighHigh = q.tooHighHigh
          }
        })
        arr.push( {
          "name": name,
          "siteCode": res.value.timeSeries[i].sourceInfo.siteCode[0].value,
          "siteName": res.value.timeSeries[i].sourceInfo.siteName,
          "latitude": res.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
          "longitude": res.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
          "flow": parseInt(res.value.timeSeries[i].values[0].value[0].value), 
          "height": parseInt(res.value.timeSeries[i += 1].values[0].value[0].value),
          "goodLow": goodLow,
          "goodHigh": goodHigh,
          "perfectHigh": perfectHigh,
          "highHigh": highHigh,
          "tooHighHigh": tooHighHigh,
          "conditions": defineConditions(height, goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh),
        },)
      }
      
      return arr
    })
    .then(res => setRiverData(res))
  }, [])  

  let allRivers = <p>River data loading...</p>
  if (Object.keys(riverData).length > 0){
      allRivers = riverData
        .map((river, i) => 
          <Card 
            key={i}  
            riverData={river}
            setDetailPage={setDetailPage}
            setConditions={setConditions}
          />
        )
  }
    

  return (
    <>
      <NavBar />


      <Routes>
        <Route
          path='/'
          element={
            <HomePage 
            allRivers={allRivers}
            />
          }
        />
        <Route 
          path='/details/:id'
          element={
            <DetailsPage 
            riverData={detailPage}
            setDetailPage={setDetailPage}
            staticGaugeHeights={staticGaugeHeights}
            conditions={conditions}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App
