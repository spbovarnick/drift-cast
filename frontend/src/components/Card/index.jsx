import { useState } from "react"

export default function Card({ riverData }) {
   const [conditionCheck, setConditionCheck] = useState()


    let conditions


    if (riverData.height <= riverData.goodLow ) {
        // console.log("too low")
        conditions = {description: "Too Low", color: "blue-950", fullDescription: "The river is too low to fish. Stay home."}
    } else if (riverData.goodLow < riverData.height && riverData.height < riverData.goodHigh ) {
        // console.log("good")
        conditions = {description: "Good", color: "teal-800", fullDescription: "The level is good, but lower than perfect"}
    } else if (riverData.goodHigh < riverData.height && riverData.height <= riverData.perfectHigh  ) {
        // console.log("perfect")
        conditions = {description: "Perfect", color: "green-600", fullDescription: "The river is at the perfect level. Tight lines!"}
    } else if (riverData.perfectHigh < riverData.height && riverData.height <= riverData.highHigh ) {
        // console.log("high")
        conditions = {description: "High", color: "yellow-400", fullDescription: "The river is high, but fishable."}
    } else if (riverData.highHigh < riverData.height && riverData.height <= riverData.tooHighHigh ) {
        // console.log("too high")
        conditions = {description: "Too high", color: "orange-500", fullDescription: "The river is too high, stay home or proceed with caution."}
    } else if (riverData.tooHighHigh < riverData.height) {
        // console.log("serious danger")
        conditions = {description: "Serious Danger", color: "red-600", fullDescription: "Flood conditions, stay home."}
    }
    

    let renderCard = <p>River data is loading...</p>
    if (riverData) {
        renderCard = <div className={`border-2 bg-${conditions.color} rounded-md border-${conditions.color} h-96 w-[36rem] p-4`}>
            <p className={`mb-4 text-blue-800 font-medium text-lg text-center`}>{riverData.name}</p>
            <div className="flex h-4/5">
                <iframe
                    className="mr-2 h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${riverData.latitude},${riverData.longitude}&maptype=satellite&zoom=7`}
                />
                <div className="flex flex-col  w-full">
                    <div className={`self-center ml-2 h-48 w-48 border-2 border-${conditions.color} rounded-full bg-${conditions.color} flex justify-center items-center`}>
                        <p className="uppercase">{conditions.description}</p>
                    </div>
                    <p className="mt-4 pl-4">{conditions.fullDescription}</p>
                </div>
            </div>

        </div>
    }


    return (
        <>
            {renderCard}
        </>
    )
}