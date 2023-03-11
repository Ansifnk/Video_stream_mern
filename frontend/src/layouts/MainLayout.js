import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SignInModal from '../components/SignInModal'
import { AppContext } from '../providers/AppProvider'

const MainLayout = () => {

    const { showSignInModal, setShowSignInModal } = useContext(AppContext)
    return (
        <div>
            <NavBar />

            <Outlet />
            {showSignInModal && < SignInModal />}
        </div>
    )
}

export default MainLayout