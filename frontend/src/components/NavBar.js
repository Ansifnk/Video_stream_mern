import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div className='p-3 bg-bg ' >
            <h1
                onClick={() => navigate('/')}
                className='text-white font-bold cursor-pointer'
            >
                Video App
            </h1>
        </div>
    )
}

export default NavBar