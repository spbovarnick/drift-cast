import axios from "axios"

export const getData = async (url) => {
    try {
        const res = await axios.get(url)
        const {data} = res
        return data
      } catch (error) {
        console.log(error)
      }
}

export const defineConditions = (height, goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh) => {
  let conditions
  if (height <= goodLow ) {
      conditions = {description: "Too Low", color: "blue-950", fullDescription: "The river is too low to fish. Stay home."}
    } else if (goodLow < height && height < goodHigh ) {
      conditions = {description: "Good", color: "teal-800", fullDescription: "The level is good, but lower than perfect"}
    } else if (goodHigh < height && height <= perfectHigh  ) {
      conditions = {description: "Perfect", color: "green-600", fullDescription: "The river is at the perfect level. Tight lines!"}
    } else if (perfectHigh < height && height <= highHigh ) {
      conditions = {description: "High", color: "yellow-400", fullDescription: "The river is high, but fishable."}
    } else if (highHigh < height && height <= tooHighHigh ) {
      conditions = {description: "Too high", color: "orange-500", fullDescription: "The river is too high, stay home or proceed with caution."}
    } else if (tooHighHigh < height) {
      conditions = {description: "Serious Danger", color: "red-600", fullDescription: "Flood conditions, stay home."}
  }
  return conditions
}

export const nameMaker = (siteName) => {
  let nameVar = siteName.toLowerCase()
  const index = nameVar.indexOf("river")
  let name = nameVar.slice(0, index + 5).split(" ")
  for (let x = 0; x < name.length; x++) {
      name[x] = name[x].charAt(0).toUpperCase() + name[x].substring(1)
  }
  name = name.join(" ")
  if (name === "Mckenzie River") {
      name = "McKenzie River"
      return name
  }
  return name
}