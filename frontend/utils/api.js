import axios from "axios"

export async function getData(url) {
    try {
        const res = await axios.get(url)
        const {data} = res
        // console.log(data.value.timeSeries[0].values[0].value[0].value)
        // console.log(data.value.timeSeries[1].values[0].value[0].value)
        // console.log(data.value.timeSeries[2].values[0].value[0].value)
        // console.log(data.value.timeSeries[3].values[0].value[0].value)
        return data
  
      } catch (error) {
        console.log(error)
      }
}