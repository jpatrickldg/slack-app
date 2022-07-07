import React, { FC, useState } from 'react'

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

const AddChannel: FC<Props> = ({ activeUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName }) => {

    const [notif, setNotif] = useState<string>('')

    async function addChannel() {
        const body = {
            "name": channelName,
            "user_ids": [activeUser.data!.id]
        }
        const url = "http://206.189.91.54/api/v1/channels"
        const response = await fetch(url,
            {
                method: "POST",
                headers: activeUser.headers,
                body: JSON.stringify(body)
            }
        )

        const data = await response.json()

        if (response.ok) {
            if (data.errors === undefined) {
                console.log(data.data)
                const channelsCopy = activeUserChannels ? [...activeUserChannels] : []
                channelsCopy.push(data.data)
                setActiveUserChannels(channelsCopy)
                setNotif('Succesfully added channel')
            } else {
                setNotif(data.errors[0])
            }

            console.log(data.errors)
        } else {
            console.log(data)
        }
    }

    const setChannelDetails = (name: string, id: number) => {
        setChannelName(name)
        setChannelID(id)
        console.log(channelName, channelID)
    }

    console.log(activeUserChannels)

    const listChannels = activeUserChannels === undefined
        ?
        <div>
            <span>User has no channel</span>
        </div>
        :
        activeUserChannels.map(e => {
            return (
                <div key={e.id}>
                    <button onClick={() => setChannelDetails(e.name, e.id)}>{e.name}:{e.id}</button>
                </div>
            )
        })

    return (
        <div>
            {notif ? <span>{notif}</span> : ''}
            <div>
                <input type="text" name="channel-name" id="channel-name" placeholder='Channel Name' onChange={e => { setChannelName(e.target.value) }}
                />
            </div>
            <button onClick={addChannel}>Add Channel</button>
            <div>{listChannels}</div>
        </div>
    )
}

export default AddChannel
