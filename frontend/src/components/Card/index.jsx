import axios from "axios"
import { useEffect, useState } from "react"

export default function Card() {
    const [rawData, setRawData ] = useState()
    
    
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
        getData("https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=14142500,%2014301500&parameterCd=00060,00065&siteStatus=all&")
            .then(res => setRawData(res))
      }, [])

    return (
        null
    )
}