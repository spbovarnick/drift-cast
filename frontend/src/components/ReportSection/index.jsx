import { useState, useEffect } from "react";
import { postReport, getReports } from "../../../utils/backend";
import Report from "../Report";

export default function ReportSection({ siteCode }) {
    const [file, setFile] = useState(false)
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
    }, [])

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

    let maxDate = new Date().toISOString().split("T")[0];
    
    let reportElements = [<p key="0">No reports yet.</p>]
    if (reports.length > 0) {
        reportElements = reports.map(report => {
            return <Report key={report._id} report={report} refreshReports={refreshReports} maxDate={maxDate} />
        })
    }

    

    return (
        <div className="mt-20 flex flex-wrap justify-center">
            <div className="w-5/6">
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
                        type="number"
                        min="0"
                        onChange={handleInputChange}
                        name="gageHeight"
                        value={createFormData.gageHeight}
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
                        onChange={handleInputChange}
                    />
                    <button type="Submit">Submit Report</button>
                </form>
                {reportElements}
            </div>
        </div>
    )
}