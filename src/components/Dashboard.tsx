import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Content from './Content'
import { Channel, User } from '../Types'
import ChannelList from './ChannelList'

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
        <div className="main-container">
            <div className='dashboard'>
                <div className='sidebar'>
                    <div className="main-content">
                        <div className='main-top'>
                            <h3>User: #{activeUser.data!.id}</h3>
                        </div>
                        <div className='main-mid'>
                            <ChannelList activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
                        </div>
                        <div className='main-bot'>
                            <button onClick={logout} className='small-btn'>Logout</button>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <Content activeUser={activeUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} />
                </div>

            </div>
        </div>
    )
}

export default Dashboard