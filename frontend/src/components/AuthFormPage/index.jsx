import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend";

export default function AuthFormPage({ buttonPsuedos }) {
    const [authFormData, setAuthFormData] = useState({
        email: '',
        username: '',
        password: '',
    })

    const navigate = useNavigate()
    const { formType } = useParams()

    let actionText
    formType === 'login' ? actionText = "Log In" : actionText = "Sign Up"

    const handleInputChange = (event) => {
        setAuthFormData({
            ...authFormData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formType === 'login') {
            const { token } = await logIn(authFormData)
            localStorage.setItem('userToken', token)
        } else {
            const { token } = await signUp(authFormData)
            localStorage.setItem('userToken', token)
        }
        navigate('/')
    }

    return (
        <>
        <h1>{actionText}</h1>
        
        <form
            className=""
            onSubmit={handleSubmit}
        >
            <label className="" htmlFor="email">
                Email
            </label>
            <input
                className=""
                id="email"
                name="email"
                type="email"
                onChange={handleInputChange}
                required
                placeholder="Email address"
            />

            <label className="" htmlFor="username">
                Username
            </label>
            <input
                className=""
                id="username"
                name="username"
                type="text"
                minLength="4"
                onChange={handleInputChange}
                required
                placeholder="Username"
            />
            
            <label className="" htmlFor="">
                Password
            </label>
            <input
                className=""
                id="password"
                name="password"
                type="password"
                minLength="6"
                onChange={handleInputChange}
                required
                placeholder="Password"
            />
            <button
                type="submit"
                className={`uppercase ${buttonPsuedos}`}>
                {actionText}
            </button>
        </form>
        </>
    );
}