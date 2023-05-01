import about from "../../assets/static/about.JPG"

export default function About() {

    return (
        <div className="mt-8 flex justify-center mb-16">
            <div className="flex flex-col w-5/6 max-w-screen-lg text-blue-800">
                <p className="text-center text-xl font-bold">About</p><br/><br/>
                <div className="flex flex-col md:flex-row md:self-center nd">
                    <div className=" m-2" >
                        <p>Taking notes from surf forecasting apps like Magic Seaweed and Surfline, DriftCast is the product of its creator's singular obsession with fly fishing. Previously, forecasting fishing conditions required accessing the barebones National Weather Service hydrography pages and cross-referencing those real-time datum with experiential notes. <br/><br/>
                        
                        But what's an angler to do if they haven't visited a stream before? 
                        Typically tight-lipped, many anglers aren't keen to share information about a rivers or streams. <br/><br/>
                        
                        DriftCast throws the gates wide oepn. We use the USGS and NWS APIs to get real-time gage heighths, flow volumes, and atmospheric conditions. Those data points are then checked against condition ranges developed from years of experience in the water. No matter your level of experience on a given stream, DriftCast provides a one-stop shop for checking conditions. <br/><br/>
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <img className=" w-5/6 border-2 border-white rounded-md m-2" src={about} />
                    </div>
                </div>
            </div>
        </div>
    )
}