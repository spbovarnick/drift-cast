

export default function HomePage({ allRivers }) {

    return (
        <div className='flex justify-items-center grid grid-cols-1 lg:grid-cols-2 m-20 gap-4'>
            {allRivers}
        </div>
    )
}