import axios from "axios"
import { useEffect, useState } from "react"

export default function Card() {
    const [rawData, setRawData ] = useState()
    const [riverData, setRiverData] = useState({ "Sandy": {"flow": undefined, "height": undefined}, "Wilson": {"flow": undefined, "height": undefined}, "Clackamas": {"flow": undefined, "height": undefined}  })
    
    
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
        // .then((res) => setRawData(res))
        .then((res) => {
            setRiverData({
                "Sandy": {
                    "flow": parseInt(res.value.timeSeries[0].values[0].value[0].value), 
                    "height": parseInt(res.value.timeSeries[1].values[0].value[0].value)}, 
                "Wilson": {
                    "flow": parseInt(res.value.timeSeries[2].values[0].value[0].value), 
                    "height": parseInt(res.value.timeSeries[3].values[0].value[0].value)}, 
                "Clackamas": {
                    "flow": parseInt(res.value.timeSeries[4].values[0].value[0].value), 
                    "height": parseInt(res.value.timeSeries[5].values[0].value[0].value)},
            })
        })
    }, [])


      
    return (
        null
    )
}