import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCollection from './BookCollection'
import Loading from './Loading'

const LatestBook = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get("http://localhost:8000/api/users/get-latest-books")
            setData(res.data.book || []);
        }
        fetch()
    }, [])
    if(!data){
        return <Loading/>
    }
    return (
        <section className="mb-12 mt-12">
            <div className="text-center mb-6">
                <h2 className="text-3xl text-gray-500">LATEST <span className="font-semibold text-gray-900">COLLECTIONS</span></h2>

                <div className="grid sm:grid-cols-3 md:grid-cols-4 p-20 px-32 gap-10 ">
                    {data.map((item, id) => (
                        <div key={id}>
                            <BookCollection item={item} />
                        </div>
                    ))}
                </div>
            </div>


        </section>
    )
}

export default LatestBook