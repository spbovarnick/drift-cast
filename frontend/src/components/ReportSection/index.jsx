import { useState } from "react";
import { postReport } from "../../../utils/backend";

export default function ReportSection() {
    const [file, setFile] = useState()
    const [createFormData, setCreateFormData] = useState({
        userName: '',
        tripDate: '',
        tripTime: '',
        report: '',
        image: undefined,
    })

    const handleInputChange = (event) => {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value,
        })
    }
  

    const submissionReset = () => {
        setCreateFormData({
            userName: '',
            tripDate: '',
            tripTime: '',
            report: '',
            image: undefined,
        })
        setFile(undefined)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (file) {
            const formData = new FormData()
            for (const [key, value] of Object.entries(createFormData)) {
                formData.append(key, value)
            }
            formData.append("image", file)
            postReport(formData)
            submissionReset()
        } else if (!file) {
            postReport({...createFormData})
            submissionReset()
        }
    }

    let maxDate = new Date().toISOString().split("T")[0];
    let maxTime = new Date().toISOString().split("T")[1].split(".")[0];
  
    return (
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
    )
}