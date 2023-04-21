import axios from "axios";

export async function postReport(report) {
    const { data } = await axios.post('/api/reports', report)
    console.log(data)
    return data
}