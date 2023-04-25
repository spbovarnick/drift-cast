import { useState, useEffect } from "react";
import { postReport, getReports } from "../../../utils/backend";
import Report from "../Report";

export default function ReportSection({ siteCode }) {
    const [file, setFile] = useState()
    const [createFormData, setCreateFormData] = useState({
        siteCode: siteCode,
        userName: '',
        tripDate: undefined,
        tripTime: undefined,
        report: '',
        image: undefined,
    })
    const [reports, setReports] = useState([])

    useEffect(() => {
        getReports(siteCode)
            .then(reports => setReports([...reports]))
            // .then(reports => console.log(reports))
    }, [])

    const handleInputChange = (event) => {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value,
        })
    }
  

    const submissionReset = () => {
        setCreateFormData({
            siteCode: siteCode,
            userName: '',
            tripDate: undefined,
            tripTime: undefined,
            report: '',
            image: undefined,
        })
        setFile(undefined)
    }

    function refreshReports() {
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
            formData.append("image", file)
            postReport(formData)
        // how to handle if form does not include image
        } else if (!file) {
            postReport(createFormData)
        }
        submissionReset()
    }

    let maxDate = new Date().toISOString().split("T")[0];
    let maxTime = new Date().toISOString().split("T")[1].split(".")[0];
    
    
    let reportElements = [<p key="0">No reports yet.</p>]
    if (reports.length > 0) {
        reportElements = reports.map(report => {
            return <Report key={report._id} report={report} maxDate={maxDate} maxTime={maxTime} />
        })
    }

    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    required
                    type="text"
                    placeholder="Your username"
                    onChange={handleInputChange}
                    name="userName"
                    value={createFormData.userName}
                />
                <input 
                    type="date"
                    max={maxDate}
                    onChange={handleInputChange}
                    name="tripDate"
                    value={createFormData.tripDate}
                />
                <input 
                    type="time"
                    max={maxTime}
                    onChange={handleInputChange}
                    name="tripTime"
                    value={createFormData.tripTime}
                />
                <textarea 
                    required
                    placeholder="Share your report"
                    onChange={handleInputChange}
                    name="report"
                    value={createFormData.report}
                />
                <input 
                    type="file" 
                    accept="image/*"
                    name="image"
                    onChange={e => setFile(e.target.files[0])}
                />
                <button type="Submit">Submit Report</button>
            </form>
            {reportElements}
        </>
    )
}