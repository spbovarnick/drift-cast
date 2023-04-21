import { toFormData } from "axios";
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
  
    const handleSubmit = (event) => {
        event.preventDefault()
        postReport({ ...createFormData })
        setCreateFormData({
            userName: '',
            tripDate: '',
            tripTime: '',
            report: '',
            image: undefined,
        })
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
                onChange={handleInputChange}
                name="image"
                value={createFormData.image}
            />
            <button type="Submit">Submit Report</button>
        </form>
    )
}