import { useState } from "react"
import { updateReport } from "../../../utils/backend"

export default function Report({ report, maxDate, maxTime }) {
    const [file, setFile] = useState()
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updateFormData, setUpdateFormData] = useState({
        userName: report.userName,
        tripDate: undefined,
        tripTime: undefined,
        report: report.report,
        image: report.image,
    })

    console.log(report.image)

    const handleInputChange = (event) => {
        setUpdateFormData({
            ...updateFormData,
            [event.target.name]: event.target.value
        })
    }
    // console.log(updateFormData.image)
    console.log((updateFormData))
    const handleSubmit = (event) => {
        event.preventDefault()
        setShowUpdateForm(false)
        if (file) {
            const formData = new FormData()
            console.log(file)
            console.log(updateFormData)

            for (const [key, value] of Object.entries(updateFormData)) {
                formData.append(key, value)
            }
            formData.set("image", file)
            console.log(formData)
            updateReport(formData, report._id)
        // how to handle if form does not include image
        } else if (!file) {
            console.log(updateFormData)
            updateReport(updateFormData, report._id)
        }
    }

    let reportElement =
        <div className="">
            <p className="">{report.userName}</p>
            <p className="">{report.report}</p>
            <div>
                <button
                    onClick={() => {setShowUpdateForm(true)}}
                    className=""
                >Update Report</button>
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
                    onChange={e => setFile(e.target.files[0])}
                />
                <button type="Submit">Submit Report</button>
            </form>
    }

    return reportElement
}