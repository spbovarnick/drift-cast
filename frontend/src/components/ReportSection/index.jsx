import { useState, useEffect } from "react";
import { postReport, getReports } from "../../../utils/backend";
import { getData } from "../../../utils/api";
import Report from "../Report";

export default function ReportSection({ siteCode, buttonPsuedos }) {
    const [file, setFile] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [tripDate, setTripDate] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        siteCode: siteCode,
        userName: '',
        tripDate: '',
        gageHeight: '',
        report: '',
        image: '',
    })
    const [reports, setReports] = useState([])

    useEffect(() => {
        getReports(siteCode)
            .then(reports => setReports([...reports]))
    }, [])

    useEffect(() => {
        if (createFormData.tripDate) {
            getData(`https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=${siteCode}&startDT=${createFormData.tripDate}&parameterCd=00060,00065&siteStatus=all`)
            .then((res) => {
                console.log(parseInt(res.value.timeSeries[1].values[0].value[0].value))
                let gageHeight = {"gageHeight": parseInt(res.value.timeSeries[1].values[0].value[0].value)}
                return gageHeight
            })
                .then((res) => {
                    return setCreateFormData({
                        ...createFormData,
                        ...res
                    })
                })
                .catch((error) => {
                    console.log(error.message)
                    alert("The date and time you entered may be too recent to generate the gage height data for your report. You can wait and retry, or update your report later.")
                })
        }
    }, [tripDate])

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleInputChange = (event) => {
        if (event.target.name === "image") {
            setCreateFormData({
                ...createFormData,
                [event.target.name]: event.target.files[0]
            })
            setFile(true)
        } else {
            setCreateFormData({
                ...createFormData,
                [event.target.name]: event.target.value,
            })
        }
    }
    
    const submissionReset = () => {
        setCreateFormData({
            siteCode: siteCode,
            userName: '',
            tripDate: '',
            gageHeight: '',
            report: '',
            image: '',
        })
        setFile(false)
        setTripDate(false)
        toggleForm()
    }

    async function refreshReports() {
            getReports(siteCode)
                .then(newReports => setReports(newReports))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (file) {
            const formData = new FormData()
            for (const [key, value] of Object.entries(createFormData)) {
                formData.append(key, value)
            }
            postReport(formData)
                .then(() => {
                    setTimeout(() => {
                        refreshReports()
                    }, 10000)
                })
        // how to handle if form does not include image
        } else if (!file) {
            postReport(createFormData)
                .then(() => refreshReports())
        }
        submissionReset()
    }

    function getMaxDateTime() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = today.getDate();
        day = day < 10 ? "0" + day : day;
        let hours = today.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        let minutes = today.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let seconds = today.getSeconds();
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
    
    let reportElements = [<p key="0">No reports yet.</p>]
    if (reports.length > 0) {
        reportElements = reports.map(report => {
            return <Report 
                key={report._id}
                report={report}
                siteCode={siteCode}
                refreshReports={refreshReports}
                getMaxDateTime={getMaxDateTime}
                buttonPsuedos={buttonPsuedos}
                />
        })
    }

    let toggleText = 'ADD REPORT'
    if (showForm) {
        toggleText = 'CLOSE'
    }

   

    return (
        <div className="mt-20 flex flex-wrap justify-center">
            <div className="w-5/6 max-w-screen-lg">
                <div className="p-4">
                    <p className="text-lg text-center text-blue-800 font-bold">Angler Reports</p>
                    <button
                        onClick={toggleForm}
                        className={`${buttonPsuedos}`}
                    >{toggleText}</button>
                </div>
                { showForm && 
                    <form 
                        onSubmit={handleSubmit}
                        className="flex flex-col text-blue-800 m-4"    
                    >
                        <div className="flex flex-col md:flex-row items-start md:justify-around">
                            <div className="flex flex-col m-2">
                                <label>Username: </label>
                                <input 
                                    className="rounded-md border-blue-400"
                                    required
                                    type="text"
                                    placeholder="Your username"
                                    onChange={handleInputChange}
                                    name="userName"
                                    value={createFormData.userName}
                                />
                            </div>
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
                                    value={createFormData.tripDate}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-around md:self-center w-full">
                            <div className="flex flex-col w-5/6 max-w-lg m-2">
                                <label>Trip report:</label>
                                <textarea 
                                    className="rounded-md border-blue-400 h-32"
                                    required
                                    placeholder="Share your report"
                                    onChange={handleInputChange}
                                    name="report"
                                    value={createFormData.report}
                                />
                            </div>
                            <div className="flex flex-col justify-end md:items-center">
                                <label>Photo:</label>
                                <input 
                                    className="rounded-md border-blue-400 w-min"
                                    type="file" 
                                    accept="image/*"
                                    name="image"
                                    // onChange={handleFileUpload}
                                    onChange={(event) => {
                                        const file = event.target.files[0]
                                        if (file.size > 3000000 ) {
                                            console.log('too big')
                                            alert("File must be smaller than 3MB")
                                            return
                                        } else {
                                            handleInputChange(event)
                                    }}}
                                />
                            </div>
                        </div>
                        <button className={`${buttonPsuedos} self-end my-4`} type="Submit">SUBMIT REPORT</button>
                    </form>
                }
                {reportElements}
            </div>
        </div>
    )
}