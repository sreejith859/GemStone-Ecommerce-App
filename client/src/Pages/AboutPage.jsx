import React from 'react'
import Layout from '../Components/Layout/Layout'

const AboutPage = () => {
    return (
        <Layout title={'About - GemStone'}>
            <div>
                <header className="bg-dark text-white p-4">
                    <div className="container">
                        <h1>About GemStone</h1>
                    </div>
                </header>
                <main className="py-5">
                    <section className="container">
                        <div className="about">
                            <h2>Our Story</h2>
                            <p>At Gem Jewelry, we have been crafting exquisite gemstone jewelry for over 20 years. Our passion for
                                quality and attention to detail has made us a trusted name in the industry.</p>
                            <img src="https://i.pinimg.com/originals/fc/80/a6/fc80a6242463e01bd5675043ac64363c.jpg" alt="Craftsmen at work" className="img-fluid mb-4" />
                            <h2>Our Mission</h2>
                            <p>Our mission is to provide our customers with unique and beautifully designed gemstone jewelry that
                                reflects their individuality and style.</p>
                            <img src="https://cache.net-a-porter.com/content/images/story-head-content-v1-1610035001223.jpeg/w1900_q65.jpeg" alt="Mission Statement" className="img-fluid mb-4" />
                            <h2>Our Team</h2>
                            <p>We have a team of skilled artisans who handcraft each piece with precision and care. Their expertise
                                ensures that every gemstone shines brilliantly in our creations.</p>
                            <img src="https://i.ytimg.com/vi/w2jdlLh682A/maxresdefault.jpg" alt="Dedicated Team" className="img-fluid mb-4" />
                        </div>
                    </section>
                </main>
            </div>
        </Layout>

    )
}

export default AboutPage
