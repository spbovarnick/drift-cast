import axios from "axios";

export const getReports = async (siteCode) => {
    const { data } = await axios.get(`/api/reports/river/${siteCode}`)
    return data
}

export const postReport = async (report) => {
    if (report.image) {
        const { data } = await axios.post(
            '/api/reports', 
            report, 
            { headers: {'Content-Type': 'multipart/form-data'}}
        )
        console.log(data)
        return data
    } else if (!report.image) {
        const { data } = await axios.post('/api/reports', report)
        console.log(data)
        return data
    }
}

export const updateReport = async (report, id) => {
    if (report.image) {
        console.log(`with image: ${report.image}`)
        const { data } = await axios.put(
            `/api/reports/${id}`, 
            report,
            { headers: {'Content-Type': 'multipart/form-data'}}
        )
        // console.log(data)
        return data
    } else if (!report.image) {
        console.log(`without image: ${report.image}`)
        const { data } = await axios.put(`/api/reports/${id}`)
        return data
    }
}