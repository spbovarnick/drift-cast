

export default function DetailsPage({ riverData }) {

    return (
        <>
            
        { riverData ? <p>{riverData.name}</p> : <p>Loading...</p>}
        </>
    )
}