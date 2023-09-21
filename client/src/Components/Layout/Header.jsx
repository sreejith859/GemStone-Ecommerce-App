import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../Context/Cart'
import { Badge } from 'antd'

const Header = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const categories = useCategory()
    const navigate = useNavigate()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        })
        localStorage.removeItem('auth')
        navigate('/')
        toast.success('Successfully Logout')

    }
    return (
        <div className='mb-5 p-2'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-75" to="/">GemStone</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/all-products">Products</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown" >
                                    Category
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categories.map((c, index) => (
                                        <li key={index}><Link className="dropdown-item" to={`/category/${c.slug}`} >{c.name}</Link></li>
                                    ))}
                                </ul>
                            </li>

                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link" >Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link" >Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {auth?.user?.name}
                                            </a>
                                            <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'
                                                        }`}
                                                    className="dropdown-item" >Dashboard</NavLink>
                                                <div className="dropdown-divider" />
                                                <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                                            </div>
                                        </li>
                                    </>
                                )
                            }

                            <li className="nav-item">
                                <Badge count={cart?.length}>
                                    
                                <NavLink className="nav-link " to='/cart-page' aria-disabled="true">
                                    Cart
                                </NavLink>
                                </Badge>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>


        </div>
    )
}

export default Header
