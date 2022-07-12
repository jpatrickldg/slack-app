import { FC, useState } from 'react'
import Content from './Content'
import Sidebar from './Sidebar'
import { Channel, User } from '../Types'
<<<<<<< HEAD
<<<<<<< HEAD
import ChannelList from './ChannelList'
=======
import DirectMessage from './DirectMessage'
import DMcontent from './DMcontent'
>>>>>>> direct-message
=======

>>>>>>> 95dbb127341a82f9d4558e153daf69735c122b04

interface Props {
    activeUser: User
    setActiveUser: (val: User) => void
}

const Dashboard: FC<Props> = ({ activeUser, setActiveUser }) => {
    const [activeUserChannels, setActiveUserChannels] = useState<Channel[]>([])
    const [channelName, setChannelName] = useState<string>('')
    const [channelID, setChannelID] = useState<number | null>(null)
    
    // const [userID, setUserID] = useState<number | null>(null)
    // const [activeUserName, setActiveUserNames] = useState<Channel[]>([])



    return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        <div className='flex'>
            <div>
                <div>Welcome to Avion Chat</div>
                <div>Your user id is: #{activeUser.data!.id}</div>
                <AddChannel activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
                <button onClick={logUsers}>console</button>
                <button onClick={viewChannels}>View</button>
                <DirectMessage activeUser={activeUser} />
                <div>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
            <div>
                <Content activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
                <DMcontent activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
            </div>
>>>>>>> direct-message
=======
        <main className='flex justify-center items-center h-screen w-screen'>
            <Sidebar activeUser={activeUser} setActiveUser={setActiveUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} setChannelID={setChannelID} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} />
>>>>>>> 95dbb127341a82f9d4558e153daf69735c122b04

            <Content activeUser={activeUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} />
        </main>
    )
}

export default Dashboard