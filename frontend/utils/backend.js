import axios from "axios";

export async function postReport(report) {
    console.log(report.image)
    const { data } = await axios.post('/api/reports', 
        report, 
        { headers: {'Content-Type': 'multipart/form-data'}})
    console.log(data)
    return data
}