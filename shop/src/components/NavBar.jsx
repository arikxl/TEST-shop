import React from 'react'
import Logo from './Logo'

const NavBar = () => {
    return (
        <nav>

            <div className='layout'>

                <Logo />

                <div className='flex'>
                    <p>PRODUCTS</p>
                    <p>SALE</p>
                    <p>NEW</p>
                </div>



                <div className="flex">
                    <button>LOGIN</button>
                    <button>CART</button>
                    <button>FAV</button>
                </div>


            </div>

        </nav>
    )
}

export default NavBar