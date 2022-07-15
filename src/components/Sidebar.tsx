import { FC } from 'react'
import { User } from '../types/user'
import { Channel } from '../types/channel'
import ChannelList from './ChannelList'
import AllUsersList from './AllUsersList'
import { HiOutlineLogout } from "react-icons/hi";
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
    userID: number
    setUserID: (val: number) => void
    userName: string
    setUserName: (val: string) => void
}

const Sidebar: FC<Props> = ({ activeUser, setActiveUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName, setUserID, setUserName, userID }) => {
    const navigate = useNavigate()

    const logout = () => {
        setActiveUser({})
        navigate('/')
    }

    return (
        <div className='h-full basis-[220px] shrink-0 bg-gray-800 text-gray-100 flex flex-col pr-2'>
            <div className='h-[46%] flex flex-col justify-center'>
                <ChannelList activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} setUserID={setUserID} />
            </div>
            <div className='h-[46%] flex flex-col justify-center shrink-0'>
                <AllUsersList activeUser={activeUser} setUserID={setUserID} setChannelName={setChannelName} setChannelID={setChannelID} setUserName={setUserName} userID={userID} />
            </div>
            <div className='h-[8%] p-3 flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='uppercase font-bold'>{activeUser.data!.uid.substring(0, activeUser.data?.uid.indexOf('@'))}</span>
                    <span className='text-sm'>#{activeUser.data!.id}</span>
                </div>
                <div>
                    <HiOutlineLogout title='Logout' onClick={logout} className='text-2xl cursor-pointer text-red-500 hover:text-red-400' />
                </div>
            </div>
        </div>
    )
}

export default Sidebar