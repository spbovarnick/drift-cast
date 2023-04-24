import { useState } from "react"

export default function Card({ riverData }) {
   const [conditionCheck, setConditionCheck] = useState()


    let conditions


    if (riverData.height <= riverData.goodLow ) {
        console.log("too low")
        conditions = {description: "Too Low", color: "blue-950"}
    } else if (riverData.goodLow < riverData.height && riverData.height < riverData.goodHigh ) {
        console.log("good")
        conditions = {description: "Good", color: "teal-800"}
    } else if (riverData.goodHigh < riverData.height && riverData.height <= riverData.perfectHigh  ) {
        console.log("perfect")
        conditions = {description: "Perfect", color: "green-600"}
    } else if (riverData.perfectHigh < riverData.height && riverData.height <= riverData.highHigh ) {
        console.log("high")
        conditions = {description: "High", color: "yellow-400"}
    } else if (riverData.highHigh < riverData.height && riverData.height <= riverData.tooHighHigh ) {
        console.log("too high")
        conditions = {description: "Too high", color: "orange-500"}
    } else if (riverData.tooHighHigh < riverData.height) {
        console.log("serious danger")
        conditions = {description: "Serious Danger", color: "red-600"}
    }
    

    return (
        <div className={`border-2 border-${conditions.color}`}>
            <p className="">{riverData.name}</p>
            <iframe
                className=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${riverData.latitude},${riverData.longitude}&maptype=satellite&zoom=7`}
             />

        </div>
    )
}