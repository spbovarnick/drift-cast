import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getData } from "../../../utils/api"
import { defineConditions } from "../../../utils/api"

export default function DetailsPage({ riverData, setDetailPage, staticGaugeHeights, conditions }) {

    const {id} = useParams()
   
    useEffect(() => {
        if (!riverData) {
            getData(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${id}&parameterCd=00060,00065&siteStatus=all`)
                .then((res) => {
                    // console.log(res)
                    let obj = {}
                    for (let i = 0; i < res.value.timeSeries.length; i += 1) {
                    // a bunch of logic to get the rivery name capitalized from the object's "siteName" key
                    let nameVar = res.value.timeSeries[i].sourceInfo.siteName.toLowerCase()
                    const index = nameVar.indexOf("river")
                    let name = nameVar.slice(0, index + 5).split(" ")
                    for (let x = 0; x < name.length; x++) {
                        name[x] = name[x].charAt(0).toUpperCase() + name[x].substring(1)
                    }
                    name = name.join(" ")
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
                        obj.flow = parseInt(res.value.timeSeries[i].values[0].value[0].value), 
                        obj.height = parseInt(res.value.timeSeries[i += 1].values[0].value[0].value),
                        obj.goodLow = goodLow,
                        obj.goodHigh = goodHigh,
                        obj.perfectHigh = perfectHigh,
                        obj.highHigh = highHigh,
                        obj.tooHighHigh = tooHighHigh
                        obj.conditions = defineConditions(obj.height, goodLow, goodHigh, perfectHigh, highHigh, tooHighHigh)
                    }
                    // console.log(obj)
                    return obj
                })
                    .then(res => setDetailPage(res))
        }
    }, [])

    let detailsContent = <p>Loading...</p>
    if (riverData) {
        detailsContent = <div className="w-5/6">
            <p className="text-center text-blue-800 text-xl font-medium">{riverData.name}</p>
            <div className={`border-2 border-${riverData.conditions.color} rounded-md`}>
                <p className={`text-center text-${riverData.conditions.color}`}>{riverData.conditions.fullDescription}</p>
                
            </div>
        </div>
    }
    console.log(conditions)
    
    return (
        <div className="flex justify-center">
            
        {detailsContent}
       
        </div>
    )
}