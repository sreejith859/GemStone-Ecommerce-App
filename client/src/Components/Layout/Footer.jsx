import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>

            <div className=" ">
                <footer className="text-center text-white" style={{ backgroundColor: 'black' }}>
                    <div className="container">
                        <section className="mt-5">
                            <div className="row text-center d-flex justify-content-center pt-5">
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <NavLink to="/about" className="text-white">About us</NavLink>
                                    </h6>
                                </div>
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <NavLink to="/all-products" className="text-white">Products</NavLink>
                                    </h6>
                                </div>
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <NavLink to="/help" className="text-white">Help</NavLink>
                                    </h6>
                                </div>
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <NavLink to="/contact" className="text-white">Contact</NavLink>
                                    </h6>
                                </div>
                            </div>
                        </section>
                        <hr className="my-5" />
                        <section className="mb-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                                        distinctio earum repellat quaerat voluptatibus placeat nam,
                                        commodi optio pariatur est quia magnam eum harum corrupti
                                        dicta, aliquam sequi voluptate quas.
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="text-center mb-5">
                            <NavLink to='/' className="text-white me-4">
                                <i className="fab fa-facebook-f" />
                            </NavLink>
                            <NavLink to='/' className="text-white me-4">
                                <i className="fab fa-twitter" />
                            </NavLink>
                            <NavLink to='/' className="text-white me-4">
                                <i className="fab fa-google" />
                            </NavLink>
                            <NavLink to='/' className="text-white me-4">
                                <i className="fab fa-instagram" />
                            </NavLink>
                            <NavLink to='/' className="text-white me-4">
                                <i className="fab fa-linkedin" />
                            </NavLink>
                            <NavLink to='/' className="text-white me-4">
                                <i className="fab fa-github" />
                            </NavLink>
                        </section>
                    </div>
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2020 Copyright:
                        <NavLink className="text-white" to="#">GemStone.com</NavLink>
                    </div>
                </footer>
            </div>


        </>
    )
}

export default Footer
