import axios from "axios";

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
const imgAuthHeaders = { headers: { 
    'Authorization': localStorage.getItem('userToken'), 
    'Content-Type': 'multipart/form-data'
} }

export const getUser = async (userId) => {
    const user = await axios.get(`/api/users/${userId}`)
    return user.data
}

export const signUp = async (user) => {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export const logIn = async (user) => {
    const { data } = await axios.post('/api/users/login', user)
    return data
}

export const getReports = async (siteCode) => {
    const { data } = await axios.get(`/api/reports/river/${siteCode}`)
    return data
}

export const postReport = async (report) => {
    if (report.image) {
        const { data } = await axios.post('/api/reports', report, imgAuthHeaders)
        return data
    } else if (!report.image) {
        const { data } = await axios.post('/api/reports', report, authHeader)
        return data
    }
}

export const updateReport = async (report, id) => {
    if (report.image) {
        const { data } = await axios.put(`/api/reports/${id}`, report, imgAuthHeaders)
        return data
    } else if (!report.image) {
        const { data } = await axios.put(`/api/reports/${id}`, report, authHeader)
        return data
    }
}

export const  deleteReport = async (id) => {
    const { data } = await axios.delete(`/api/reports/${id}`, { headers: { 'Authorization': localStorage.getItem('userToken') } })
}