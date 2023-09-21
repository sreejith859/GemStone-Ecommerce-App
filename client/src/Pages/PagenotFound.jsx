import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'

const PagenotFound = () => {
    return (
        <Layout title={'Page Not Found - GemStone'}>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
                <Link to='/' className='pnf-btn'>
                    Go back
                </Link>
            </div>
        </Layout>
    )
}

export default PagenotFound
