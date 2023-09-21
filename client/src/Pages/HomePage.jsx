import React from 'react'
import Layout from '../Components/Layout/Layout'
import DisplayProducts from './DisplayProducts'

const HomePage = () => {
  return (
    <Layout title={'Shop Now- GemStone'}>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://t4.ftcdn.net/jpg/02/92/56/91/360_F_292569116_Phht4uRj1YIuLFgBhrLu8171npBOcJcr.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://zeevector.com/wp-content/uploads/Jewellery-Banner-Design-HD.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.vrindajewellers.com/wp-content/uploads/2019/09/WhatsApp-Image-2019-09-30-at-18.35.08.jpeg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="card bg-dark text-white">
        <img src="https://www.alioze.com/wp-content/uploads/2021/07/top-publicites-joaillerie-2021.jpg"></img>
        <div className="card-img-overlay">
          <h5 className="card-title">Explore Now</h5>

        </div>
      </div>
      <div className="sp-title text-center fs-2 fw-bold">Special Category</div>
      <DisplayProducts />
      <iframe className='container-fluid' height="315" src="https://www.youtube.com/embed/zz-00bBt3v4?si=ergmREvgdex2whL3&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>
    </Layout>
  )
}

export default HomePage
