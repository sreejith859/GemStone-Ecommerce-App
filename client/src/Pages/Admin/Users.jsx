import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { REACT_APP_API } from "../../Components/Constant/Constant";
import { useAuth } from "../../Components/Context/Auth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/auth/all-users`
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);
  return (
    <Layout title={'Users Data - GemStone'}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>ALL Users</h1>
            <div className="overflow-auto">
              <table className="table  table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((d, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{d?.name}</td>
                        <td>{d?.email}</td>
                        <td>{d?.phone}</td>
                        <td>{d?.role === 1 ? 'Admin' : ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
