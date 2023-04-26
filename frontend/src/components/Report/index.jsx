import { useState } from "react"
import { updateReport, deleteReport } from "../../../utils/backend"
import placeholder from "../../assets/static/placeholder.jpg"



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

    const toggler = () => {
        setShowUpdateForm(!showUpdateForm)
    }

    let toggleText = 'UPDATE REPORT'
    if (showUpdateForm) {
        toggleText = "X"
    }

    let reportElement =
        <div className="p-4 m-4 border-2 rounded-md text-blue-800">
            <p className=""><span className="font-medium">User:</span> {report.userName}</p>
            <div className="flex flex-col md:flex-row md: justify-around mt-4">
                <div className="md:w-1/2">
                    <p className="font-medium">Report details:</p>
                    <p className="h-60 border-2 rounded-md p-2 my-2 border-blue-200 overflow-auto">{report.report}</p>
                </div>
                <img className="w-80 border-2 border-white my-2 rounded-md" src={report.imageUrl ? report.imageUrl : placeholder}/>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={() => {toggler()}}
                    className={`${buttonPsuedos}`}
                >{toggleText}</button>
                <button
                    onClick={() => {deleteReport(report._id).then(() => refreshReports() )}}
                    className="hover:opacity-70 active:shadow-inner active:outline active:outline-2 outline-red-800 transition-all active:opacity-100 bg-red-600 font-medium rounded-full p-2 w-fit text-white"
                >Delete</button>
            </div>
        </div>

    if (showUpdateForm) {
        reportElement =
            <div className="p-4 m-4 border-2 rounded-md text-blue-800">
                <button 
                    onClick={() => {toggler()}}
                    className={`${buttonPsuedos}`}
                    >{toggleText}</button>
                <form 
                    className="flex flex-col text-blue-800 m-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col md:flex-row items-start md:justify-around">
                        <div className="flex flex-col m-2">
                            <label>Username: </label>
                            <input 
                                required
                                className="rounded-md border-blue-400"
                                type="text"
                                placeholder="Your username"
                                onChange={handleInputChange}
                                name="userName"
                                value={updateFormData.userName}
                            />
                        </div>
                        <div className="flex flex-col m-2">
                            <label>Trip date and time:</label>
                            <input 
                                className="rounded-md border-blue-400"
                                type="date"
                                max={getMaxDateTime()}
                                onChange={handleInputChange}
                                name="tripDate"
                                value={updateFormData.tripDate}
                            />
                        </div>
                        <div className="flex flex-col m-2">
                            <label>Gage Height:</label>
                            <input 
                                className="rounded-md border-blue-400" 
                                type="number"
                                max="0"
                                onChange={handleInputChange}
                                name="gageHeight"
                                value={updateFormData.gageHeight}
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
                                value={updateFormData.report}
                            />
                        </div>
                        <div className="flex flex-col justify-end md:items-center">
                            <label>Photo:</label>
                            <input 
                                className="rounded-md border-blue-400 w-min"
                                type="file" 
                                accept="image/*"
                                name="image"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button className={`${buttonPsuedos}`} type="Submit">Submit Report</button>
                </form>
            </div>
    }

    return reportElement
}