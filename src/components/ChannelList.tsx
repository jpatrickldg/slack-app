import { FC, useState, useEffect } from 'react'
import { Channel, User } from '../Types'
import AddChannel from './AddChannel'
import { VscAdd } from 'react-icons/vsc'
import { HiOutlineHashtag, HiPlus } from "react-icons/hi";

interface Props {
    activeUser: User
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
    setChannelID: (val: number | null) => void
}

const ChannelList: FC<Props> = ({ activeUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName }) => {
    const [showAddChannel, setShowAddChannel] = useState<boolean>(false)

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


    const listChannels = activeUserChannels === undefined
        ?
        <div>
            <span>User has no channel</span>
        </div>
        :
        activeUserChannels.map(e => {
            return (
                <button key={e.id} onClick={() => setChannelDetails(e.name, e.id)} className={e.name === channelName ? 'flex items-center gap-1 hover:bg-gray-700 w-full hover:rounded-md h-9 text-left px-1 cursor-pointer bg-gray-700 rounded-md mb-1' : 'flex items-center gap-1 hover:bg-gray-700 w-full hover:rounded-md h-9 text-left px-1 cursor-pointer mb-1'}>
                    <HiOutlineHashtag className='text-lg' />
                    <span>{e.name}</span>
                </button>
            )
        })

    const showAddChannelModule = () => {
        setShowAddChannel(true)
    }
    const setChannelDetails = (name: string, id: number) => {
        setChannelName(name)
        setChannelID(id)
        console.log(channelName, channelID)
    }

    return (
        <>
            <div className='flex justify-between items-center mb-2 p-3'>
                <div>
                    <span className='font-bold text-sm uppercase'>Channels</span>
                </div>
                <div>
                    <HiPlus title="Add Channel" onClick={showAddChannelModule} className='text-2xl cursor-pointer text-green-400 hover:text-green-500' />
                </div>
            </div>
            <div className='px-2'>
                {listChannels}
            </div>
            <div>
                {showAddChannel && <AddChannel activeUser={activeUser} setActiveUserChannels={setActiveUserChannels} activeUserChannels={activeUserChannels} setShowAddChannel={setShowAddChannel} />}
            </div>
        </>
    )
}

export default ChannelList
