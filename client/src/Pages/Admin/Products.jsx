import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import { REACT_APP_API } from '../../Components/Constant/Constant'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])

    //get all product
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //lifecycle methode
    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        < Layout title={'Product List - GemStone'}>
            <div className="container-fluid ">

                <div className="row p-0 m-0">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>ALL Product List</h1>
                        <div className="d-flex text-center flex-wrap justify-content-around">
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                    <div className="card m-1 p-0 col-10 col-sm-4 col-md-4  rounded-0 shadow" style={{ width: '10rem' ,height:'18rem' }} >
                                        <img className="card-img-top" src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title ">{p.name.substring(0, 15)}</h5>
                                            <p className="card-text">${p.price}</p>
                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products