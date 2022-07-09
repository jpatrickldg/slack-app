import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddChannel from './AddChannel'
import Content from './Content'
import { Channel, User } from '../Types'
import DirectMessage from './DirectMessage'
import DMcontent from './DMcontent'

interface Props {
    activeUser: User
    setActiveUser: (val: User) => void
}

const Dashboard: FC<Props> = ({ activeUser, setActiveUser }) => {
    const navigate = useNavigate()
    const [activeUserChannels, setActiveUserChannels] = useState<Channel[]>([])
    const [channelName, setChannelName] = useState<string>('')
    const [channelID, setChannelID] = useState<number | null>(null)
    
    // const [userID, setUserID] = useState<number | null>(null)
    // const [activeUserName, setActiveUserNames] = useState<Channel[]>([])

    useEffect(() => {
        async function getUserChannelsOnLoad() {
            const url = "http://206.189.91.54/api/v1/channels"
            const response = await fetch(url,
                {
                    headers: activeUser.headers
                })
            const data = await response.json()
            if (response.ok) {
                setActiveUserChannels(data.data)
                console.log('Got userchannels!')
                console.log(activeUserChannels)
            }
        }
        getUserChannelsOnLoad()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function logUsers() {
        const url = "http://206.189.91.54/api/v1/users"
        const response = await fetch(url,
            {
                method: "GET",
                headers: activeUser.headers
            })

        const data = await response.json()
        console.log(data.data)
    }


    // const displayConsole = () => {
    //     console.log(activeUser.data!.id)
    // }

    const logout = () => {
        setActiveUser({})
        navigate('/')
    }

    const viewChannels = () => {
        console.log(activeUserChannels)
    }

    return (
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

        </div>
    )
}

export default Dashboard