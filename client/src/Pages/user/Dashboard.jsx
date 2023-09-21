import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Components/Context/Auth";
import UserMenu from "../../Components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={'Dashboard - GemStone'}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card col-md-5">
              <img
                src="https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg?w=768"
                className="card-img-top"
                width={'10px'}
                alt="Dummy Profile"
              />
              <div className="card-body">
                <h5 className="card-title">{auth?.user?.name}</h5>
                <p className="card-text">
                  <strong>Address:</strong> {auth?.user?.address}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong>{auth?.user?.phone}
                </p>
                <p className="card-text">
                  <strong>Email:</strong>{auth?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
