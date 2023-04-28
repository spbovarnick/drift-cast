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

    const handleInputChange = (event) => {
        setAuthFormData({
            ...authFormData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formType === 'login') {
            const data = await logIn(authFormData)
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('userName', data.userName)
        } else {
            const data = await signUp(authFormData)
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('userName', data.userName)
        }
        navigate('/')
    }

    let emailElement
    if (formType !== 'login') {
        emailElement = 
        <div className="flex flex-col m-2">
            <label htmlFor="email">
                Email
            </label>
            <input
                className="rounded-md border-blue-400"
                id="email"
                name="email"
                type="email"
                onChange={handleInputChange}
                required
                placeholder="Email address"
            />
        </div>
    }

    let actionText
    formType === 'login' ? actionText = "Log In" : actionText = "Sign Up"

    console.log(localStorage)
    console.log(localStorage.userName)
    return (
        <div className="h-screen mt-8">
            <h1 className="text-center text-blue-800 text-2xl font-bold mb-4">{actionText}</h1>
            
            <div className="flex justify-center mt-12">
                <form
                    className="flex flex-col text-blue-800 p-8 bg-sky-100 rounded-lg p-2"
                    onSubmit={handleSubmit}
                >
                    {/* <div className="flex flex-col m-2">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            className="rounded-md border-blue-400"
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleInputChange}
                            required
                            placeholder="Email address"
                        />
                    </div> */}
                    {emailElement}
                    <div className="flex flex-col w-5/6 max-w-lg m-2">
                        <label htmlFor="username">
                            Username
                        </label>
                        <input
                            className="rounded-md border-blue-400"
                            id="username"
                            name="username"
                            type="text"
                            minLength="4"
                            onChange={handleInputChange}
                            required
                            placeholder="Username"
                        />
                        <p className="text-xs">Minimum 4 characters</p>
                    </div>
                    <div className="flex flex-col w-5/6 max-w-lg m-2">
                        <label htmlFor="">
                            Password
                        </label>
                        <input
                            className="rounded-md border-blue-400"
                            id="password"
                            name="password"
                            type="password"
                            minLength="6"
                            onChange={handleInputChange}
                            required
                            placeholder="Password"
                        />
                        <p className="text-xs">Minimum 8 characters</p>
                    </div>
                    <button
                        type="submit"
                        className={`uppercase mt-4 self-center ${buttonPsuedos}`}>
                        {actionText}
                    </button>
                </form>
            </div>
        </div>
    );
}