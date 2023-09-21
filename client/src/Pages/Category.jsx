import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { REACT_APP_API } from "../Components/Constant/Constant";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../Components/Context/Cart";

const Categories = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={`${category?.name}-Category - GemStone`}>
      <div className="container ">
        <h4 className="text-center">Category-{category?.name}</h4>
        <div className="row ">
          <div className="d-flex text-center flex-wrap justify-content-around p-0">
            {products?.map((p) => (
              <div
                className="card  col-10 col-sm-4 col-md-4   rounded-0 "
                style={{ width: "12rem" }}
                key={p._id}
              >
                <img
                  className="card-img-top"
                  src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">${p.price}</p>
                </div>
                <div className="card-body d-flex">
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Deatails
                  </button>
                  <button
                    className="btn btn-dark w-100   text-warning ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("item added to cart");
                    }}
                  >
                    ADD CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
