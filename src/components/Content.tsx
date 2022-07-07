import React, { FC } from 'react'
import Message from './Message'

type UserData = {
    id: number
}

type Channel = {
    id: number
    name: string
}

type User = {
    data?: UserData
    headers?: Headers
}

interface Props {
    activeUser: User
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
    setChannelID: (val: number | null) => void
}

const Content: FC<Props> = ({ activeUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName }) => {

    async function logChannelDetails() {
        const url = `http://206.189.91.54/api/v1/channels/${channelID} `

        const response = await fetch(url,
            {
                method: 'GET',
                headers: activeUser.headers
                // body: JSON.stringify(body)
            })

        const data = await response.json()

        if (response.ok) {
            console.log(data)
        }
    }

    return (
        <div>
            {channelName ?
                <>
                    <h1>{channelID} : {channelName}</h1>
                    {/* <button onClick={logChannelDetails}>View Channel Details</button> */}
                    <Message activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
                </>
                :
                <span>Select a channel to view</span>
            }
        </div>
    )
}

export default Content