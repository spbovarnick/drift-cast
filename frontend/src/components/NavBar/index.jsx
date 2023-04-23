// navbar cribbed from https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/navbars
import { Link } from "react-router-dom"
import { useState } from "react";


export default function NavBar() {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="relative flex flex-wrap items-center justify-between py-3 mb-3 border-b-2 border-blue-200">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="#" >
                <span
                className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-blue-800 font-serif text-2xl"
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
                <Link to='#'>
                    <li className="nav-item">
                        <span
                        className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75"
                        >Home</span>
                    </li>
                </Link>    
                <Link to="#">
                    <li className="nav-item">
                        <span
                        className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75"
                        >Rivers</span>
                    </li>
                </Link>
                <Link to="#" >
                    <li className="nav-item">
                        <span
                        className="ml-2 px-3 py-2 flex items-center font-serif font-bold leading-snug text-blue-800 hover:opacity-75"
                        >About</span>
                    </li>
                </Link>
            </ul>
          </div>
        </div>
      </nav>
    )

}