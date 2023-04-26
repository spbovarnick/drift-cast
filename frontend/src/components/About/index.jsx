import about from "../../assets/static/about.jpg"

export default function About() {

    return (
        <div className="flex justify-center mb-16">
            <div className="flex flex-col w-5/6 max-w-screen-lg text-blue-800">
                <p className="text-center text-xl font-bold">About</p><br/><br/>
                <div className="flex flex-col md:flex-row">
                    <div className="w-5/6 m-2" >
                        <p>Taking notes from surf forecasting apps like Magic Seaweed and Surfline, DriftCast is the product of its creators singular obsession with fly fishing. Previously, forecasting fishing conditions required accessing the barebones National Weather Service hydrography pages and cross-referencing those real-time datum with experiential notes. <br/><br/>
                        
                        But what's an angler to do if they haven't visited a stream before? 
                        Typically tight-lipped, getting information about a river or stream from other anglers is a notoriously difficult task. <br/><br/>
                        
                        DriftCast throws the gates wide oepn. We use the USGS API to get real-time gage heighths and flow volumes. Those data points are then checked against condition ranges developed from years of experience in the water. No matter your level of experience on a given stream, DriftCast provides a one-stop shop for checking conditions. <br/><br/>
                        </p>
                    </div>
                    <div className="self-center">
                        <img className="border-2 border-white rounded-md m-2" src={about} />
                    </div>
                </div>
            </div>
        </div>
    )
}