import { useState } from "react"
import { updateReport, deleteReport } from "../../../utils/backend"

export default function Report({ report, maxDate, maxTime, refreshReports }) {
    const [file, setFile] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updateFormData, setUpdateFormData] = useState({
        userName: report.userName,
        tripDate: report.tripDate,
        tripTime: report.tripTime,
        report: report.report,
        image: report.image,
    })


    const handleInputChange = (event) => {
        setUpdateFormData({
            ...updateFormData,
            [event.target.name]: event.target.value
        })
        event.target.name === "image" && setFile(true)
    }
    // console.log(updateFormData.image)
    // console.log((updateFormData))
    const handleSubmit = (event) => {
        event.preventDefault()
        setShowUpdateForm(false)
        if (file) {
            const uFormData = new FormData()
            // formData.append("test", "value")
            for (const [key, value] of Object.entries(updateFormData)) {
                uFormData.append(key, value)
            }
            updateReport(uFormData, report._id)
        // how to handle if form does not include image
        } else if (!file) {
            console.log(updateFormData)
            updateReport(updateFormData, report._id)
        }
    }

    let reportElement =
        <div className="border-2">
            <p className="">{report.userName}</p>
            <p className="">{report.report}</p>
            <img className="w-80" src={report.imageUrl}/>
            <div>
                <button
                    onClick={() => {setShowUpdateForm(true)}}
                    className=""
                >Update Report</button>
                <button
                    onClick={() => {deleteReport(report._id).then(() => refreshReports() )}}
                >Delete</button>
            </div>
        </div>

    if (showUpdateForm) {
        reportElement =
            <form onSubmit={handleSubmit}>
                <input 
                    required
                    type="text"
                    placeholder="Your username"
                    onChange={handleInputChange}
                    name="userName"
                    value={updateFormData.userName}
                />
                <input 
                    type="date"
                    max={maxDate}
                    onChange={handleInputChange}
                    name="tripDate"
                    value={updateFormData.tripDate}
                />
                <input 
                    type="time"
                    max={maxTime}
                    onChange={handleInputChange}
                    name="tripTime"
                    value={updateFormData.tripTime}
                />
                <textarea 
                    required
                    placeholder="Share your report"
                    onChange={handleInputChange}
                    name="report"
                    value={updateFormData.report}
                />
                <input 
                    type="file" 
                    accept="image/*"
                    name="image"
                    onChange={handleInputChange}
                />
                <button type="Submit">Submit Report</button>
            </form>
    }

    return reportElement
}