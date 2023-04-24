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


export const defineConditions = (height, goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh) => {
  let conditions
  if (height <= goodLow ) {
      // console.log("too low")
      conditions = {description: "Too Low", color: "blue-950", fullDescription: "The river is too low to fish. Stay home."}
    } else if (goodLow < height && height < goodHigh ) {
      // console.log("good")
      conditions = {description: "Good", color: "teal-800", fullDescription: "The level is good, but lower than perfect"}
    } else if (goodHigh < height && height <= perfectHigh  ) {
      // console.log("perfect")
      conditions = {description: "Perfect", color: "green-600", fullDescription: "The river is at the perfect level. Tight lines!"}
    } else if (perfectHigh < height && height <= highHigh ) {
      // console.log("high")
      conditions = {description: "High", color: "yellow-400", fullDescription: "The river is high, but fishable."}
    } else if (highHigh < height && height <= tooHighHigh ) {
      // console.log("too high")
      conditions = {description: "Too high", color: "orange-500", fullDescription: "The river is too high, stay home or proceed with caution."}
    } else if (tooHighHigh < height) {
      // console.log("serious danger")
      conditions = {description: "Serious Danger", color: "red-600", fullDescription: "Flood conditions, stay home."}
  }
  console.log(conditions)
  return conditions
}