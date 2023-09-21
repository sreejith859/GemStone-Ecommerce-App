import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { REACT_APP_API } from "../Components/Constant/Constant";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Filter/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/Context/Cart";
import toast from "react-hot-toast";

const ProductPage = () => {
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load  more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategory();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if ((checked, length || radio.length)) filterProduct();
  }, [checked, radio]);

  //get filters
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'All Products - GemStone'}>
      <div className="row mt-3">
        <div className={`col-md-2 ${showFilters ? "" : "d-none"}`}>
          <h4 className="text-center">Categories</h4>
          <div className="d-flex flex-column ms-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-3">Prices</h4>
          <div className="d-flex flex-column ms-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className={`col-md-${showFilters ? "10" : "12"} m-0 p-0`}>
          <h1 className="text-center">All Products</h1>
          <button
            className="btn btn-warning mb-3"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </button>
          <div className="d-flex text-center flex-wrap justify-content-around">
            {products?.map((p) => (
              <div
                className="card m-1 col-10 col-sm-4 col-md-4  rounded-0 shadow"
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
                  <p className="card-text">₹{p.price}</p>
                </div>
                <div className="card-body d-flex justify-content-between">
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
