import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getData, nameMaker } from "../../../utils/api"
import { defineConditions } from "../../../utils/api"
import ReportSection from "../ReportSection"

export default function DetailsPage({ riverData, setDetailPage, staticGaugeHeights, conditions, setConditions, buttonPsuedos, currentUser, currentUserId }) {
    const [weather, setWeather] = useState()

    const {id} = useParams()
   
    useEffect(() => {
        if (!riverData) {
            getData(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${id}&parameterCd=00060,00065&siteStatus=all`)
                .then((res) => {
                    let obj = {}
                    for (let i = 0; i < res.value.timeSeries.length; i += 1) {
                        let name = nameMaker(res.value.timeSeries[i].sourceInfo.siteName)
                        let goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh
                        staticGaugeHeights.forEach((q) => {
                            if (q.name === name) {
                            goodLow = q.goodLow
                            goodHigh = q.goodHigh
                            perfectHigh = q.perfectHigh
                            highHigh = q.highHigh
                            tooHighHigh = q.tooHighHigh
                            }
                        })
                        obj.name = name,
                        obj.siteCode = res.value.timeSeries[i].sourceInfo.siteCode[0].value,
                        obj.siteName = res.value.timeSeries[i].sourceInfo.siteName,
                        obj.latitude = res.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                        obj.longitude = res.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                        obj.flow = res.value.timeSeries[i].values[0].value[0].value, 
                        obj.height = res.value.timeSeries[i += 1].values[0].value[0].value,
                        obj.goodLow = goodLow,
                        obj.goodHigh = goodHigh,
                        obj.perfectHigh = perfectHigh,
                        obj.highHigh = highHigh,
                        obj.tooHighHigh = tooHighHigh
                    }
                    return obj
                })
                    .then((res) => setDetailPage(res))
                        
        }
    }, [riverData])

    useEffect(() => {
        if (!conditions && riverData) {
            setConditions(defineConditions(riverData.height, riverData.goodLow, riverData.goodHigh, riverData.perfectHigh, riverData.highHigh, riverData.tooHighHigh))
        }
    }, [conditions, riverData, setConditions, defineConditions])


    useEffect(() => {
        if (riverData) {
            getData(`https://api.weather.gov/points/${riverData.latitude},${riverData.longitude}`)
                .then(res => getData(res.properties.forecastHourly))
                    .then(res => setWeather(res.properties.periods[0]))
        }
    }, [riverData])

    let weatherElements
    if (weather) {
        weatherElements = 
        <div className="border-2 rounded-md border-blue-400 p-4 mb-4 w-full mr-1">
            <p className="font-bold text-lg text-center mb-2 border-b-2">Weather Conditions</p>
            <p><span className="font-medium">Short forecast: </span>{weather.shortForecast}</p>
            <p><span className="font-medium">Temperature: </span>{weather.temperature} &#8457;</p>
            <p><span className="font-medium">Wind: </span>{weather.windSpeed}</p>
            <p><span className="font-medium">Chance of precipitation: </span>{weather.probabilityOfPrecipitation.value}%</p>
            <p><span className="font-medium">Humidity: </span>{weather.relativeHumidity.value}</p>
        </div>
    }

    let detailsContent = <p>Loading...</p>
    if (riverData && conditions) {
        detailsContent = <div className="w-5/6 max-w-screen-lg mt-4">
            <p className="text-center text-blue-800 text-xl font-bold mb-8">{riverData.name}</p>
            <div className="p-4">
                <div className="flex flex-col md:flex-row h-4/5">
                    <iframe
                        className="mr-2 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${riverData.latitude},${riverData.longitude}&maptype=satellite&zoom=7`}
                    />
                    <div className="flex flex-col  w-full">
                        <div className={`self-center mt-4 md:mt-0 ml-2 h-48 w-48 border-2 border-${conditions.color} rounded-full bg-${conditions.color} flex justify-center items-center`}>
                            <p className="uppercase">{conditions.description}</p>
                        </div>
                        <p className={`p-2 mt-4 text-center underline underline-offset-4 text-blue-800 font-medium border-4 rounded-md border-${conditions.color}`}>{conditions.fullDescription}</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-4 text-blue-800">
                    {weatherElements}
                    <div className="border-2 rounded-md border-blue-400 p-4 w-full ml-1 h-fit">
                        <p className="font-bold text-lg text-center mb-2 border-b-2">Stream Conditions</p>
                        <p className="mb-2"><span className="font-medium">Gauge height: </span>{riverData.height} feet</p>
                        <p><span className="font-medium">Flow: </span>{riverData.flow} cfs</p>
                    </div>
                </div>
            </div>
        </div>;
    }
    
    return (
        <div>
        <div className="flex flex-wrap justify-center">
            
        {detailsContent}
        </div>
        { riverData && <ReportSection 
            currentUserId={currentUserId}
            currentUser={currentUser}
            siteCode={riverData.siteCode}
            buttonPsuedos={buttonPsuedos}
        /> }
        </div>
    )
}