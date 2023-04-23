import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="w-full border-t-2 border-blue-200 absolute bottom-0 font-serif text-blue-800">
            <div>
                <div className="flex justify-center h-10 p-2">
                    <Link to="#">
                        <span className="p-2">Home</span>
                    </Link>
                    <Link to="#">
                        <span className="p-2">About</span>
                    </Link>
                    <Link to="#">
                        <span className="p-2">Rivers</span>
                    </Link>
                </div>
                <div className="flex justify-center pb-2">
                    <span className="text-blue-500">&copy; DriftCast, Sam Bovarnick all rights reserved</span>
                </div>
            </div>
        </footer>
    )
}