import { FC, useState } from 'react'
import Content from './Content'
import Sidebar from './Sidebar'
import { Channel, User } from '../Types'

interface Props {
    activeUser: User
    setActiveUser: (val: User) => void
}

const Dashboard: FC<Props> = ({ activeUser, setActiveUser }) => {
    const [activeUserChannels, setActiveUserChannels] = useState<Channel[]>([])
    const [channelName, setChannelName] = useState<string>('')
    const [channelID, setChannelID] = useState<number | null>(null)
    

    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            <Sidebar activeUser={activeUser} setActiveUser={setActiveUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} setChannelID={setChannelID} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} />

            <Content activeUser={activeUser} setChannelName={setChannelName} channelName={channelName} channelID={channelID} />
        </main>
    )
}

export default Dashboard