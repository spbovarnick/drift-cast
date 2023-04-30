import { useState, useEffect } from "react"
import { updateReport, deleteReport } from "../../../utils/backend"
import { getData } from "../../../utils/api"
import { getUser } from "../../../utils/backend"
import placeholder from "../../assets/static/placeholder.jpg"



export default function Report({ report, getMaxDateTime, refreshReports, buttonPsuedos, siteCode, currentUser, currentUserId }) {
    const [file, setFile] = useState(false)
    const [reportUser, setReportUser] = useState("")
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [tripDate, setTripDate] = useState(false)
    const [updateFormData, setUpdateFormData] = useState({
        siteCode: siteCode,
        tripDate: report.tripDate,
        gageHeight: report.gageHeight,
        report: report.report,
        image: report.image,
    })
    
    useEffect(() => {
        getUser(report.userId)
            .then((user) => {
               return user
            })
                .then(res => setReportUser(res))
    }, [])

    useEffect(() => {
        if (updateFormData.tripDate) {
            getData(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${siteCode}&startDT=${updateFormData.tripDate}&parameterCd=00060,00065&siteStatus=all`)
            .then((res) => {
                let gageHeight = {"gageHeight": parseInt(res.value.timeSeries[1].values[0].value[0].value)}
                return gageHeight
            })
                .then((res) => {
                    return setUpdateFormData({
                        ...updateFormData,
                        ...res
                    })
                })
                .catch((error) => {
                    console.log(error.message)
                    alert("The date and time you entered may be too recent to generate the gage height data for your report. You can wait and retry, or update your report later.")
                })
        }
    }, [tripDate])

    const handleInputChange = (event) => {
        if (event.target.name === "image"){
            setUpdateFormData({
                ...updateFormData,
                [event.target.name]: event.target.files[0]
            })
            setFile(true)
        } else {
            setUpdateFormData({
                ...updateFormData,
                [event.target.name]: event.target.value
            })
        }
    }

    for (const [key, value] of Object.entries(updateFormData)) {
        if (value === null) {
            setUpdateFormData({...updateFormData, [key]: ""})
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setShowUpdateForm(false)
        if (file) {
            const uFormData = new FormData()
            for (const [key, value] of Object.entries(updateFormData)) {
                uFormData.append(key, value)
            }
            updateReport(uFormData, report._id)
                .then(() => {
                        refreshReports()
                })
                    .then(() => setFile(false))
        // how to handle if form does not include image
        } else if (!file) {
            updateReport(updateFormData, report._id)
                .then(() => refreshReports())
        }
    }

    const toggler = () => {
        setShowUpdateForm(!showUpdateForm)
    }

    let toggleText = 'UPDATE REPORT'
    if (showUpdateForm) {
        toggleText = "X"
    }

    const readableDateMaker = (date) => {
        if (date) {
            let readableDate = new Date(date)
            return readableDate.toString().slice(0,24)
        } else {
            return null
        }
    }

    
    const readableCreatedAt = readableDateMaker(report.createdAt)
    const readableUpdatedAt = readableDateMaker(report.updatedAt)
    const readableTripDate = readableDateMaker(report.tripDate)
    
    let updatedDiv
    if (report.updatedAt !== report.createdAt) {
        updatedDiv = <div>
            <p className="m-1"><span className="font-medium">Updated at:</span> {readableUpdatedAt}</p>
        </div>
    }

    let gageAndTrip = <div className="md:border-t-2"></div>
    if (report.tripDate) {
        gageAndTrip = <div className="flex flex-col md:flex-row md:justify-between md:border-2 md:rounded-md">
            <p className="m-1"><span className="font-medium">Trip date and time:</span> {readableTripDate}</p>
            <p className="m-1"><span className="font-medium">Gage Height:</span> {report.gageHeight} feet</p>
        </div>
    }
    
    let actions
    if (currentUserId === report.userId) {
        actions = 
            <div className="flex justify-between">
                <button
                    onClick={() => {toggler()}}
                    className={`${buttonPsuedos}`}
                >{toggleText}</button>
                <button
                    onClick={() => {deleteReport(report._id).then(() => refreshReports() )}}
                    className="hover:opacity-70 active:shadow-inner active:outline active:outline-2 outline-red-800 transition-all active:opacity-100 bg-red-600 font-medium rounded-full p-2 w-fit text-white"
                >Delete</button>
            </div>
    }

    let reportElement =
        <div className="p-4 m-4 border-2 rounded-md text-blue-800">
            <div className={"flex flex-col md:flex-row md:justify-between"}>
                <p className="m-1"><span className="font-medium">Reported by:</span> {reportUser.username}</p> 
                <p className="m-1"><span className="font-medium">Posted at:</span> {readableCreatedAt}</p>
                {updatedDiv}
            </div>
            {gageAndTrip}
            <div className="flex flex-col md:flex-row md: justify-around mt-4">
                <div className="md:w-1/2">
                    <p className="font-medium">Report details:</p>
                    <p className="h-fit border-2 rounded-md p-2 my-2 border-blue-200 overflow-auto">{report.report}</p>
                </div>
                <img 
                    className="w-80 border-2 border-white my-2 rounded-md" 
                    src={report.imageUrl ? report.imageUrl : placeholder}
                />
            </div>
            {actions}
        </div>

    if (showUpdateForm) {
        reportElement =
            <div className="p-4 m-4 border-2 rounded-md text-blue-800 bg-sky-100">
                <button 
                    onClick={() => {toggler()}}
                    className={`${buttonPsuedos}`}
                    >{toggleText}</button>
                <form 
                    className="flex flex-col text-blue-800 m-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-start">
                        <div className="flex flex-col m-2">
                            <label>Trip date and time:</label>
                            <input 
                                className="rounded-md border-blue-400"
                                type="datetime-local"
                                max={getMaxDateTime()}
                                onChange={(e) => {
                                    handleInputChange(e)
                                    setTimeout(() => {
                                        setTripDate(true)
                                    }, 1000)
                                }}
                                name="tripDate"
                                value={updateFormData.tripDate ? updateFormData.tripDate.slice(0, 16) : ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-around md: justify-start md:self-center w-full">
                        <div className="flex flex-col w-5/6 max-w-lg m-2">
                            <label>Trip report:</label>
                            <textarea 
                                className="rounded-md border-blue-400 h-32"
                                required
                                placeholder="Share your report"
                                onChange={handleInputChange}
                                name="report"
                                value={updateFormData.report}
                            />
                        </div>
                        <div className="flex flex-col justify-end md:items-center">
                            <label>Photo:</label>
                            <input 
                                className="rounded-md border-blue-400 w-min"
                                type="file" 
                                accept="image/*"
                                name="image"
                                onChange={(event) => {
                                    const file = event.target.files[0]
                                    if (file.size > 3000000 ) {
                                        alert("File must be smaller than 3MB")
                                        return
                                    } else {
                                        handleInputChange(event)
                                }}}
                            />
                        </div>
                    </div>
                    <button className={`${buttonPsuedos}`} type="Submit">Submit Report</button>
                </form>
            </div>
    }

    return reportElement
}