import React from 'react'
import Layout from '../Components/Layout/Layout'
import '../Components/style/contact.css'

const Contactpage = () => {
    return (
        <Layout title={'Contact - GemStone'} >
            <section className="contact-sec sec-pad">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="contact-detail">
                                <h1 className="section-title">Contact us</h1>
                                <ul className="contact-ul">
                                    <li><i className="fa fa-location-dot" /> 91, Ram Nagar, Ram Mandir, Delhi</li>
                                    <li>
                                        <i className="fa fa-phone" />
                                        <a href="tel:08510004495"><b>0255000XXXX</b></a>,
                                        <a href="tel:08510005495"><b>0251600XXXX</b></a>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-envelope" />
                                        <a href="mailto:pardeepkumar4bjp@gmail.com"><b> demounknown@gmail.com</b></a>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <form action="#" className="contFrm" method="POST">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <input type="text" name="name" placeholder="Your Name" className="inptFld" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="email" name="email" placeholder="Email Address" className="inptFld" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="tel" name="phone" placeholder="Phone Number" className="inptFld" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" name="sub" placeholder="Subject" className="inptFld" required />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="inptFld" placeholder="Your Message..." required defaultValue={""} />
                                    </div>
                                    <div className="col-12">
                                        <input type="submit" name="submit" defaultValue="SUBMIT" className="inptBtn" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Contactpage