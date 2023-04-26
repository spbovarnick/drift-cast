import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="w-full border-t-2 border-blue-200 bg-white absolute top-screen font-serif text-blue-800">
            <div className="flex justify-center h-10 p-2">
                <Link to="/">
                    <p className="p-2 hover:scale-110 hover:opacity-75 transition-all">Home</p>
                </Link>
                <Link to="/about">
                    <p className="p-2 hover:scale-110 hover:opacity-75 transition-all">About</p>
                </Link>
                <Link to="/rivers">
                    <p className="p-2 hover:scale-110 hover:opacity-75 transition-all">Rivers</p>
                </Link>
            </div>
            <div className="flex justify-center pb-2">
                <p className="text-blue-500">&copy; DriftCast, Sam Bovarnick all rights reserved</p>
            </div>
        </footer>
    )
}