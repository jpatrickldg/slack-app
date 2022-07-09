import React, { ChangeEvent, FC, useState } from 'react'
import Message from './Message'
import { Channel, User } from '../Types'

interface Props {
    activeUser: User
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
    setChannelID: (val: number | null) => void
}

const DMcontent: FC<Props> = ({ activeUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName }) => {
    const [memberID, setMemberID] = useState<number | null>(null)
    const [notif, setNotif] = useState<string>('')

    async function logChannelDetails() {
        const url = `http://206.189.91.54/api/v1/channels/${channelID}`

        const response = await fetch(url,
            {
                method: 'GET',
                headers: activeUser.headers
            })

        const data = await response.json()

        if (response.ok) {
            console.log(data)
        }
    }

    async function addMembertoChannel() {

        const body = {
            "id": channelID,
            "member_id": memberID
        }

        const url = `http://206.189.91.54/api/v1/channel/add_member`

        const response = await fetch(url,
            {
                method: "POST",
                headers: activeUser.headers,
                body: JSON.stringify(body)
            })

        const data = await response.json()

        if (response.ok) {
            if (data.errors !== undefined) {
                setNotif(data.errors)
            }
        } else console.log(data)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMemberID(Number(e.target.value))
    }

    return (
        <div>
            {channelName ?
                <>
                    <h2>{channelID} : {channelName}</h2>
                    <div>
                        <input type="number" name="memberID" id="memberID" placeholder='User ID' onChange={handleChange} />
                        <button onClick={addMembertoChannel}></button>
                        <div>
                            {notif && <span>{notif}</span>}
                        </div>
                    </div>
                    <br />

                    <Message activeUser={activeUser} activeUserChannels={activeUserChannels} setActiveUserChannels={setActiveUserChannels} setChannelName={setChannelName} setChannelID={setChannelID} channelName={channelName} channelID={channelID} />
                    <button onClick={logChannelDetails}>View Channel Details</button>
                </>
                :
                <span>Select a channel to view</span>
            }
        </div>
    )
}

export default DMcontent