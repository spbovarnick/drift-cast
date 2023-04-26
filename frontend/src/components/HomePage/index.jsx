import hero from "../../assets/static/hero.jpg"
import "./styles.css"

export default function HomePage({ allRivers }) {

    const backdrop = "drop-shadow-lg backdrop-blur-sm backdrop-brightness-125 bg-white/30 w-fit p-2 rounded-r-lg"

    return (
        <div className="">
            <div id="hero" className="grid-cols-1 h-80 m-16 border-2 border-white rounded-md">
                <div className="drop-shadow-lg text-blue-800 flex flex-col justify-center h-full">
                    <p className={`font-serif text-xl ${backdrop}`}>DriftCast</p>
                    <p className={`${backdrop} text-sm md:text-base`}>River and stream condition tracker</p>
                    <button className={`${backdrop} self-center mt-20 rounded-full rounded-r-full hover:opacity-70 active:shadow-inner active:outline active:outline-2 outline-blue-400`}>Learn More</button>
                </div>
            </div>
            <div className='flex justify-items-center grid grid-cols-1 lg:grid-cols-2 m-16 gap-4'>

                {allRivers}
            </div>
        </div>
    )
}