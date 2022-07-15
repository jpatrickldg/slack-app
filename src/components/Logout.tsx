import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'

interface Props {
    setActiveUser: (val: User) => void
    setShowLogoutModal: (val: boolean) => void
}

const Logout: FC<Props> = ({ setActiveUser, setShowLogoutModal }) => {
    const navigate = useNavigate()

    const hideLogoutModal = () => {
        setShowLogoutModal(false)
    }

    const logout = () => {
        setActiveUser({})
        navigate('/')
    }
    return (
        <div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-90 z-10'>
            <div className='w-[350px] bg-gray-700 p-5 rounded-md'>
                <div className='text-xl mb-6 text-center'>
                    <span>Are you sure you want to logout?</span>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <button onClick={hideLogoutModal} className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-green-600 hover:border-0'>No</button>
                    <button onClick={logout} className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-red-600 hover:border-0'>Yes</button>
                </div>

            </div>
        </div>
    )
}

export default Logout