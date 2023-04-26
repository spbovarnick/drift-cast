import { useState, useEffect } from "react";
import { postReport, getReports } from "../../../utils/backend";
import Report from "../Report";

export default function ReportSection({ siteCode }) {
    const [file, setFile] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        siteCode: siteCode,
        userName: '',
        tripDate: '',
        gageHeight: '',
        report: '',
        image: undefined,
    })
    const [reports, setReports] = useState([])

    useEffect(() => {
        getReports(siteCode)
            .then(reports => setReports([...reports]))
                .then(() => getMaxDateTime())
    }, [])

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
            tripDate: "",
            gageHeight: "",
            report: '',
            image: undefined,
        })
        setFile(false)
    }

    async function refreshReports() {
            getReports(siteCode)
                .then(newReports => setReports(newReports))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // how to handle if report includes image
        if (file) {
            const formData = new FormData()
            for (const [key, value] of Object.entries(createFormData)) {
                formData.append(key, value)
            }
            postReport(formData)
                .then(() => {
                    refreshReports()
                }, 60000)
        // how to handle if form does not include image
        } else if (!file) {
            postReport(createFormData)
                .then(() => refreshReports())
        }
        submissionReset()
    }

    let maxDate = new Date()
    
    let reportElements = [<p key="0">No reports yet.</p>]
    if (reports.length > 0) {
        reportElements = reports.map(report => {
            return <Report key={report._id} report={report} refreshReports={refreshReports} maxDate={maxDate} />
        })
    }

    let toggleText = 'ADD REPORT'
    if (showForm) {
        toggleText = 'CLOSE'
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

    return (
        <div className="mt-20 flex flex-wrap justify-center">
            <div className="w-5/6 max-w-screen-lg">
                <div className="">
                    <p className="text-lg text-center">Angler Reports</p>
                    <button
                        onClick={toggleForm}
                        className="bg-lime-400 p-2 rounded-full"
                    >{toggleText}</button>
                </div>
                { showForm && 
                <div>
                    <form 
                        onSubmit={handleSubmit}
                        className="text-blue-800"    
                    >
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
                        <input 
                            className="rounded-md border-blue-400"
                            type="datetime-local"
                            max={getMaxDateTime()}
                            onChange={handleInputChange}
                            name="tripDate"
                            value={createFormData.tripDate}
                        />
                        <input 
                            className="rounded-md border-blue-400"
                            type="number"
                            min="0"
                            onChange={handleInputChange}
                            name="gageHeight"
                            value={createFormData.gageHeight}
                        />
                        <textarea 
                            className="rounded-md border-blue-400"
                            required
                            placeholder="Share your report"
                            onChange={handleInputChange}
                            name="report"
                            value={createFormData.report}
                        />
                        <input 
                            className="rounded-md border-blue-400"
                            type="file" 
                            accept="image/*"
                            name="image"
                            onChange={handleInputChange}
                        />
                        <button className="bg-lime-400 rounded-full p-2" type="Submit">Submit Report</button>
                    </form>
                    </div>
                }
                {reportElements}
            </div>
        </div>
    )
}