import { useState } from "react"
import { updateReport, deleteReport } from "../../../utils/backend"

export default function Report({ report, getMaxDateTime, refreshReports, buttonPsuedos }) {
    const [file, setFile] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updateFormData, setUpdateFormData] = useState({
        userName: report.userName,
        tripDate: report.tripDate,
        gageHeight: report.gageHeight,
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
                    setTimeout(() => {
                        refreshReports()
                    }, 60000)
                })
        // how to handle if form does not include image
        } else if (!file) {
            updateReport(updateFormData, report._id)
                .then(() => refreshReports())
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
                    className={`${buttonPsuedos}`}
                >Update Report</button>
                <button
                    onClick={() => {deleteReport(report._id).then(() => refreshReports() )}}
                    className={`${buttonPsuedos}`}
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
                    max={getMaxDateTime()}
                    onChange={handleInputChange}
                    name="tripDate"
                    value={updateFormData.tripDate}
                />
                <input 
                    type="number"
                    max="0"
                    onChange={handleInputChange}
                    name="gageHeight"
                    value={updateFormData.gageHeight}
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
                <button className={`${buttonPsuedos}`} type="Submit">Submit Report</button>
            </form>
    }

    return reportElement
}