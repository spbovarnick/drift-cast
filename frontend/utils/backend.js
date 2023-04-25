import axios from "axios";

export async function postReport(report) {
    console.log(report.image)
    if (report.image) {
        const { data } = await axios.post(
            '/api/reports', 
            report, 
            { headers: {'Content-Type': 'multipart/form-data'}})
        return data
    } else if (!report.image) {
        const { data } = await axios.post('/api/reports', report)
        return data
    }
    console.log(data)
}
