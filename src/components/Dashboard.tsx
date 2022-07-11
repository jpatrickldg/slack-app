import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Content from './Content'
import { Channel, User } from '../Types'
import ChannelList from './ChannelList'
import { HiOutlineLogout, HiOutlinePencilAlt } from "react-icons/hi";

interface Props {
    activeUser: User
    setActiveUser: (val: User) => void
}

const Dashboard: FC<Props> = ({ activeUser, setActiveUser }) => {
    const navigate = useNavigate()
    const [activeUserChannels, setActiveUserChannels] = useState<Channel[]>([])
    const [channelName, setChannelName] = useState<string>('')
    const [channelID, setChannelID] = useState<number | null>(null)

    const logout = () => {
        setActiveUser({})
        navigate('/')
    }

    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            <div className='h-full basis-[180px] shrink-0 bg-gray-800 text-gray-100 flex flex-col'>
                <div className='basis-[46%] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900'>
                    <ChannelList activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
                </div>
                <div className='basis-[46%] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900'>
                    <div className='flex justify-between items-center mb-2 p-3'>
                        <span className='font-bold text-sm uppercase'>Messages</span>
                        <HiOutlinePencilAlt title='New Message' className='text-2xl text-green-400 cursor-pointer hover:text-green-500' />
                    </div>
                </div>
                <div className='basis-[8%] p-3 flex justify-between items-center'>
                    <span className='uppercase font-bold'>User: #{activeUser.data!.id}</span>
                    <HiOutlineLogout title='Logout' onClick={logout} className='text-2xl cursor-pointer text-red-400 hover:text-red-500' />
                </div>
            </div>

            <Content activeUser={activeUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} />
        </main>
    )
}

export default Dashboard