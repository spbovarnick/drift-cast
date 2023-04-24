import { Link } from "react-router-dom"

export default function Card({ riverData, setDetailPage }) {

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
        renderCard = <div className={`border-2 rounded-md border-${conditions.color} w-64 h-auto md:h-96  md:w-[36rem] p-4`}>
            <p className={`mb-4 text-blue-800 font-medium text-lg text-center`}>{riverData.name}</p>
            <div className="flex flex-col md:flex-row h-4/5">
                <iframe
                    className="mr-2 h-5/6"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${riverData.latitude},${riverData.longitude}&maptype=satellite&zoom=7`}
                />
                <div className="flex flex-col  w-full">
                    <div className={`self-center mt-4 md:mt-0 ml-2 h-48 w-48 border-2 border-${conditions.color} rounded-full bg-${conditions.color} flex justify-center items-center`}>
                        <p className="uppercase">{conditions.description}</p>
                    </div>
                    <p className="mt-4 pl-4">{conditions.fullDescription}</p>
                </div>
            </div>

        </div>
    }


    return (
        <Link to={`/details/${riverData.siteCode}`} onClick={() => setDetailPage(riverData)}>
            {renderCard}
        </Link>
    )
}