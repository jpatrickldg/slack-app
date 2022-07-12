import React, { FC, useState } from 'react'
import { Channel, User } from '../Types'
import ChannelList from './ChannelList'
import SendDirectMessage from './SendDirectMessage'
import DirectMessages from './DirectMessages'
import { HiOutlineLogout, HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

interface Props {
    activeUser: User
    setActiveUser: (val: User) => void
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
    setChannelID: (val: number | null) => void
}

const Sidebar: FC<Props> = ({ activeUser, setActiveUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName }) => {
    const navigate = useNavigate()
    const [showDMModal, setShowDMModal] = useState<boolean>(false)

    const logout = () => {
        setActiveUser({})
        navigate('/')
    }

    const displayDMModal = () => {
        setShowDMModal(true)
    }

    return (
        <div className='h-full basis-[180px] shrink-0 bg-gray-800 text-gray-100 flex flex-col'>
            <div className='basis-[46%] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900'>
                <ChannelList activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
            </div>
            <div className='basis-[46%] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900'>
                <div className='flex justify-between items-center mb-2 p-3'>
                    <span className='font-bold text-sm uppercase'>Messages</span>
                    <HiOutlinePencilAlt title='New Message' onClick={displayDMModal} className='text-2xl text-green-500 cursor-pointer hover:text-green-400' />
                </div>
                <DirectMessages activeUser={activeUser} />
            </div>
            <div className='basis-[8%] p-3 flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='uppercase font-bold'>{activeUser.data!.uid.substring(0, activeUser.data?.uid.indexOf('@'))}</span>
                    <span className='text-sm'>#{activeUser.data!.id}</span>
                </div>
                <div>
                    <HiOutlineLogout title='Logout' onClick={logout} className='text-2xl cursor-pointer text-red-500 hover:text-red-400' />
                </div>
            </div>
            {/* DM Modal */}
            {showDMModal && <SendDirectMessage activeUser={activeUser} setShowDMModal={setShowDMModal} />}
        </div>
    )
}

export default Sidebar