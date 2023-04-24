export default function Card({ riverData }) {
   
    return (
        <div className="">
            <p className="">{riverData.name}</p>
            <iframe
                className=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${riverData.latitude},${riverData.longitude}&maptype=satellite&zoom=7`}
             />
        </div>
    )
}