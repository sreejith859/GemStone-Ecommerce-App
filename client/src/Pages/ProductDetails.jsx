import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { REACT_APP_API } from "../Components/Constant/Constant";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../Components/Context/Cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [cart, setCart] = useCart();

  const params = useParams();
  const [products, setProducts] = useState();
  const [relatedProducts, setRelatedproducts] = useState([]);
  const navigate = useNavigate();

  //----
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.products);
      getsimilarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //similar product
  const getsimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedproducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`${products.name}Contact - GemStone`}>
      <div>
          <div className="product-box p-5 w-75 mx-auto">
            <div className="row" id="p-box">
              <div className="col-md-6">
                {products && (
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/api/v1/product/product-photo/${products._id}`}
                    alt={products.name}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="products-details">
                  <div id="p-title" className="d-flex">
                    <button
                      id="exit"
                      className="float-right ms-auto "
                      onClick={() => {
                        navigate("/all-products");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <div>
                    <h2>{products && products.name}</h2>
                  </div>
                  <p className="price">₹ {products && products.price}</p>
                  <p className="description">
                    {products && products.description}
                  </p>
                  <button
                    className="btn btn-dark me-2"
                    onClick={() => {
                      setCart([...cart, products]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, products])
                      );
                      navigate("/cart-page");
                      toast.success("item added to cart");
                    }}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-dark    text-warning"
                    onClick={() => {
                      setCart([...cart, products]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, products])
                      );
                      toast.success("item added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className=" similar-products m-0 p-0">
            <h3>Similar Products</h3>
            {relatedProducts.length < 1 && (
              <p className="text-center">No Similar Products Found</p>
            )}
            <div className="d-flex text-center flex-wrap  p-0">
              {relatedProducts?.map((p) => (
                <div
                  className="card  col-10 col-sm-4 col-md-4 rounded-0"
                  style={{ width: "12rem" }}
                  key={p._id}
                >
                  <img
                    className="card-img-top"
                    src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name.substring(0, 15)}</h5>
                    <p className="card-text">${p.price}</p>
                  </div>
                  <div className="card-body d-flex justify-content-between">
                    <button
                      className="btn btn-secondary "
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

export default ProductDetails;
