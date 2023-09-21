import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { REACT_APP_API } from '../Components/Constant/Constant'
import { useCart } from '../Components/Context/Cart'
import toast from 'react-hot-toast'

const DisplayProducts = () => {
    const [cart,setCart] = useCart()

    const [products, setProducts] = useState([])
    const navigate = useNavigate()


    //get all products
    const getAllProducts = async () => {
        try {
         
            const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/get-product`)
           
            setProducts(data.products)
        } catch (error) {
       
            console.log(error)
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <div className="d-products d-flex  ">
            {products?.map((p) => (
                <div className="card m-1 col-10 col-sm-4 col-md-4" style={{ width: '15rem' }} key={p._id}>
                    <img className="card-img-top " src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">${p.price}</p>
                    </div>
                    <div className="card-body d-flex">
                        <button className="btn btn-secondary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Deatails</button>
                        <button className="btn btn-dark w-100   text-warning ms-1" onClick={() => {
                                        setCart([...cart,p])
                                        localStorage.setItem('cart',JSON.stringify([...cart,p]))
                                        toast.success('item added to cart')
                                    }}>ADD CART</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplayProducts