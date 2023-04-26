export default function HomePage({ allRivers }) {

    return (
        <div className='flex justify-items-center grid grid-cols-1 xl:grid-cols-2 m-16 gap-4'>
            {allRivers}
        </div>
    )
}