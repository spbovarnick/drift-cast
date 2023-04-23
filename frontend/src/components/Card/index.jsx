import { useState } from "react"

export default function Card({ riverData }) {
   const [gaugeHeights, setGaugeHeights] = useState([
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
            goodHigh: 6,
            perfectHigh: 5.4,
            highHigh: 9,
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
    ])

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
            goodHigh: 6,
            perfectHigh: 5.4,
            highHigh: 9,
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


    gaugeHeights.forEach((e) => {
        if (e.name === riverData.name) {
            if (riverData.height <= e.goodLow ) {
                console.log("too low")
            } else if (e.goodLow < riverData.height && riverData.height <= e.goodHigh ) {
                console.log("good")
            } else if (e.goodHigh < riverData.height && riverData.height <= perfectHigh  ) {
                console.log("perfect")
            } else if (e.perfectHigh < riverData.height && riverData.height <= e.highHigh ) {
                console.log("high")
            } else if (e.highHigh < riverData.height && riverData.height <= e.tooHighHigh ) {
                console.log("too high")
            } else if (e.tooHighHigh < riverData.height ) {
                console.log("serious danger")
            }
        }
    })

    if (riverData.name === "Sandy River" && riverData.height <= 8.5 ) {
        console.log("too low")
    } else if (riverData.name === "Sandy River" && 8.5 < riverData.height && riverData.height <= 9 ) {
        console.log("good")
    } else if (riverData.name === "Sandy River" && 9 < riverData.height && riverData.height <= 10.5  ) {
        console.log("perfect")
    } else if (riverData.name === "Sandy River" && 10.5 < riverData.height && riverData.height <= 11 ) {
        console.log("high")
    } else if (riverData.name === "Sandy River" && 11 < riverData.height && riverData.height <= 15 ) {
        console.log("too high")
    } else if (riverData.name === "Sandy River" && 15 < riverData.height && riverData.height ) {
        console.log("serious danger")
    }


    return (
        <div className="">
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