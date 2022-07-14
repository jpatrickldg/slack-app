import { FC, useState } from 'react'
import Content from './Content'
import Sidebar from './Sidebar'
import { User } from '../types/user'
import { Channel } from '../types/channel'
interface Props {
    activeUser: User
    setActiveUser: (val: User) => void
}

const Dashboard: FC<Props> = ({ activeUser, setActiveUser }) => {
    const [activeUserChannels, setActiveUserChannels] = useState<Channel[]>([])
    const [channelName, setChannelName] = useState<string>('')
    const [channelID, setChannelID] = useState<number | null>(null)
    const [userID, setUserID] = useState<number>(0)
    const [userName, setUserName] = useState<string>('')

    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            <Sidebar activeUser={activeUser} setActiveUser={setActiveUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} setChannelID={setChannelID} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} userID={userID} setUserID={setUserID} userName={userName} setUserName={setUserName} />

            <Content activeUser={activeUser} setChannelName={setChannelName} channelName={channelName} setChannelID={setChannelID} channelID={channelID} userID={userID} setUserID={setUserID} userName={userName} setUserName={setUserName} />
        </main>
    )
}

export default Dashboard