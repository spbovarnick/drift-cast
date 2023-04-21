import { useState } from "react";
import { postReport } from "../../../utils/backend";

export default function ReportSection() {
    const [file, setFile] = useState()
    const [createFormData, setCreateFormData] = useState({
        userName: '',
        tripDate: '',
        tripTime: '',
        
    })

    const handleInputChange = (event) => {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value,
        })
    }
  
    const handleSubmit = (event) => {
        event.preventDefault()
        postReport({})
        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)
    axios.post("/api/posts", formData, { headers: {'Content-Type': 'multipart/form-data'}})
    }

    let maxDate = new Date().toISOString().split("T")[0];
    let maxTime = new Date().toISOString().split("T")[1].split(".")[0];
  
    return (
        <form onSubmit={handleSubmit}>
            <input 
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
                placeholder="Share your report"
                onChange={handleInputChange}
                name="tripReport"
                value={createFormData.report}
            />
            <input 
                onChange={e => setFile(e.target.files[0])}
                type="file" 
                accept="image/*"
            />
            <button type="Submit">Submit Report</button>
        </form>
    )
}