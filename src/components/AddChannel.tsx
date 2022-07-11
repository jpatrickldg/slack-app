import { FC, useState, ChangeEvent } from 'react'
import { Channel, User } from '../Types'
import { VscClose } from 'react-icons/vsc'
import { HiX } from "react-icons/hi";

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
        <div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-90'>
            <div className='w-[350px] bg-gray-700 p-4 rounded-md'>
                <div className='text-gray-100 flex items-center justify-between mb-4'>
                    <span>Create channel</span>
                    <HiX onClick={closeAddChannelModule} className='font-extrabold text-3xl text-gray-500 hover:text-gray-200' />
                </div>
                <div>
                    {notif ? <span className='text-red-500 text-sm w-full'>{notif}</span> : ''}
                </div>
                <div className='mb-4'>
                    <span className='text-gray-400 uppercase font-bold text-xs'>Channel Name</span>
                    <input type="text" name="channel-name" id="channel-name" onChange={handleChange} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                </div>
                <div>
                    <button onClick={addChannel} className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-indigo-600 hover:border-0'>Create channel</button>
                </div>
            </div>
        </div>
    )
}

export default AddChannel