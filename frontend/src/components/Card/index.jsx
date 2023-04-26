import { Link } from "react-router-dom"
import { defineConditions } from "../../../utils/api"

export default function Card({ riverData, setDetailPage, setConditions }) {
    
    
    
    let renderCard = <p>River data is loading...</p>
    let conditions
    if (riverData) {
        conditions = defineConditions(riverData.height, riverData.goodLow, riverData.goodHigh, riverData.perfectHigh, riverData.highHigh, riverData.tooHighHigh)
        renderCard = <div className={`hover:drop-shadow-lg hover:scale-105 transition-all bg-white border-4 rounded-md border-${conditions.color} w-64 h-auto md:h-96  md:w-[36rem] p-4`}>
            <p className={`mb-4 text-blue-800 font-medium text-lg text-center`}>{riverData.name}</p>
            <div className="flex flex-col md:flex-row h-4/5">
                <iframe
                    className="mr-2 h-5/6 border-2 border-white rounded-md"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${riverData.latitude},${riverData.longitude}&maptype=satellite&zoom=7`}
                />
                <div className="flex flex-col  w-full">
                    <div className={`self-center mt-4 md:mt-0 ml-2 h-48 w-48 border-2 border-${conditions.color} rounded-full bg-${conditions.color} flex justify-center items-center`}>
                        <p className="uppercase">{conditions.description}</p>
                    </div>
                    <p className="mt-4 pl-4 text-blue-800 text-medium">{conditions.fullDescription}</p>
                </div>
            </div>
        </div>;
        
    }
    
    return (
        <Link to={`/details/${riverData.siteCode}`} onClick={() => {setConditions(conditions), setDetailPage(riverData)}}>
            {renderCard}
        </Link>
    )
}