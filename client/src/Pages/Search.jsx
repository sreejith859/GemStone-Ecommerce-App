import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Components/Context/Search";
import { REACT_APP_API } from "../Components/Constant/Constant";
import toast from "react-hot-toast";
import { useCart } from "../Components/Context/Cart";
import { Link } from "react-router-dom";

const Search = () => {
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
  return (
    <Layout title={`${values.keyword}- GemStone`}>
      <div className="container m-0 p-0">
        <div className="text-center">
          <h1>search results</h1>
          <h6>
            {values?.results.length < 1
              ? "No product found "
              : `found ${values?.results.length}`}
          </h6>
          <div className="d-flex text-center m-0 p-0 flex-wrap justify-content-around mt-4">
            {values?.results.map((p) => (
              <div
                className="card mt-1 col-10 col-sm-4 col-md-4  rounded-0 shadow"
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
                <div className="card-body d-flex">
                  <Link
                    to={`/product/${p.slug}`}
                    className="btn btn-secondary ms-1"
                  >
                    More Details
                  </Link>
                  <button
                    className="btn btn-info ms-1"
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

export default Search;
