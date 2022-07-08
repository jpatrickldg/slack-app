import { FC, useState, ChangeEvent } from 'react'
import { Channel, User } from '../Types'

interface Props {
    activeUser: User
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    setShowAddChannel: (val: boolean) => void
}

const AddChannel: FC<Props> = ({ activeUser, activeUserChannels, setActiveUserChannels, setShowAddChannel }) => {
    const [notif, setNotif] = useState<string>('')
    const [channelNameInput, setChannelNameInput] = useState<string>('')

    async function addChannel() {
        const body = {
            "name": channelNameInput,
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChannelNameInput(e.target.value)
    }
    const closeAddChannelModule = () => {
        setShowAddChannel(false)
    }

    return (
        <div className='module-container'>
            <div className='module'>
                <div>
                    {notif ? <span>{notif}</span> : ''}
                </div>
                <div>
                    <input type="text" name="channel-name" id="channel-name" placeholder='Channel Name' onChange={handleChange}
                    />
                </div>
                <div>
                    <button onClick={addChannel}>Add</button>
                </div>
                <div>
                    <button onClick={closeAddChannelModule}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AddChannel