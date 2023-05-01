// navbar cribbed from https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/navbars
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";


export default function NavBar({ setCurrentUser, setCurrentUserId }) {
    const [navbarOpen, setNavbarOpen] = useState(false);

    useEffect(() => {
      setCurrentUserId(localStorage.getItem("userId"))
    }, [])

    const logout = () => {
        localStorage.removeItem("userToken")
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        setCurrentUser("")
        setCurrentUserId("")
    }

    let userActionElements = 
      <>
      <Link to='/auth/login'>
          <li className="nav-item">
              <span
              className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75 hover:scale-110 transition-all"
              >Log In</span>
          </li>
      </Link>
      <Link to='/auth/signup'>
          <li className="nav-item">
              <span
              className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75 hover:scale-110 transition-all"
              >Sign Up</span>
          </li>
      </Link>
      </>
    let token = localStorage.getItem("userToken")
    let userName = localStorage.getItem("userName")
    let loggedInAs
    if (token) {
      userActionElements = 
        <>
        <li 
          className="nav-item cursor-pointer"
          onClick={logout}
        >
            <span
            className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75 hover:scale-110 transition-all"
            >Log Out</span>
        </li>
        </>;
        loggedInAs = <>
          <li>
              <span
              className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800"
              ><i className="fa fa-user fa-lg mr-2"></i>Logged in as {userName}
              </span>
          </li>
          <li>
              <span
              className="hidden lg:inline ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800"
              > | </span>
          </li>
        </>
    }

    return (
        <nav className="relative flex flex-wrap items-center justify-between py-3 mb-3 border-b-2 border-blue-200">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" >
                <span
                  className="hover:scale-125 hover:opacity-75 transition-all text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-blue-800 font-serif text-2xl"
                >
                DriftCast
                </span>
            </Link>
            <button
              className="text-blue-800 cursor-pointer  leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fa fa-bars text-2xl" aria-hidden="true"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                {loggedInAs}
                <Link to='/'>
                    <li className="nav-item">
                        <span
                        className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75 hover:scale-110 transition-all"
                        >Home</span>
                    </li>
                </Link>    
                <Link to="/rivers">
                    <li className="nav-item">
                        <span
                        className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75 hover:scale-110 transition-all"
                        >Rivers</span>
                    </li>
                </Link>
                <Link to="/about" >
                    <li className="nav-item">
                        <span
                        className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75 hover:scale-110 transition-all"
                        >About</span>
                    </li>
                </Link>
                {userActionElements}
            </ul>
          </div>
        </div>
      </nav>
    )

}