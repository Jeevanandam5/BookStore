import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCollection from '../components/BookCollection'
import Loading from '../components/Loading'

const AllBooks = () => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";


    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${BACKEND_URL}/api/users/get-all-books`)
            setData(res.data.books || []);
        }
        fetch()
    }, [])
    if(!data){
        return <Loading/>
    }
    return (
        <section className="mb-12 mt-12">
            <div className="text-center mb-6">
                <h2 className="text-3xl text-gray-500">All <span className="font-semibold text-gray-900">COLLECTIONS</span></h2>

                <div className="grid sm:grid-cols-3 md:grid-cols-4 p-20 px-32 gap-10">
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

export default AllBooks