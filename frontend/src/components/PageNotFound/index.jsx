import dryRiver from "../../assets/static/dryRiver.jpeg"


export default function PageNotFound() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row m-16">
                <div className="mb-4">
                    <p className="text-blue-800 font-bold text-3xl">404</p>
                    <p className="text-blue-800 font-medium">Uh oh, looks like that route ain't flowing!</p>
                </div>
                <img 
                    src={dryRiver} 
                    className="rounded-full md:w-96"
                />
            </div>
        </div>
    )
}