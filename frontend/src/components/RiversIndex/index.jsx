
export default function RiversIndex({ allRivers }) {

    return (
        <div className='flex justify-items-center grid grid-cols-1 lg:grid-cols-2 m-16 gap-4'>
            {allRivers}
        </div>
    )
}