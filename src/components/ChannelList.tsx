import { FC, useState, useEffect, Fragment } from 'react'
import { User } from '../types/user'
import { Channel } from '../types/channel'
import AddChannel from './AddChannel'
import { HiOutlineHashtag, HiPlus } from 'react-icons/hi'
interface Props {
    activeUser: User
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
    setChannelID: (val: number | null) => void
    setUserID: (val: number) => void
}

const ChannelList: FC<Props> = ({ activeUser, activeUserChannels, setActiveUserChannels, setChannelID, setChannelName, channelID, channelName, setUserID }) => {
    const [showAddChannel, setShowAddChannel] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getUserChannelsOnLoad() {
        const url = `${process.env.REACT_APP_SLACK_API}/api/v1/channels`
        const response = await fetch(url,
            {
                headers: activeUser.headers
            })
        const data = await response.json()
        if (response.ok) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            setActiveUserChannels(data.data)
            console.log('Got userchannels!')
            console.log(activeUserChannels)
        }
    }
    useEffect(() => {
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
                <button key={e.id} onClick={() => setContentDetails(e.name, e.id)} className={e.name === channelName ? 'flex items-center gap-1 hover:bg-gray-700 w-full hover:rounded-md min-h-8 text-left p-1 cursor-pointer bg-gray-700 rounded-md mb-1' : 'flex items-center gap-1 hover:bg-gray-700 w-full hover:rounded-md min-h-8 text-left p-1 cursor-pointer mb-1'}>
                    <HiOutlineHashtag className='text-lg text-yellow-500' />
                    <span>{e.name}</span>
                </button>
            )
        })

    const showAddChannelModule = () => {
        setShowAddChannel(true)
    }
    const setContentDetails = (name: string, id: number) => {
        setUserID(0)
        setChannelName(name)
        setChannelID(id)
        console.log(channelName, channelID)
    }

    return (
        <Fragment>
            <div className='flex justify-between items-center p-3 mb-2 h-[8%]'>
                <div>
                    <span className='font-bold text-sm uppercase'>Channels</span>
                </div>
                <div>
                    <HiPlus title="Add Channel" onClick={showAddChannelModule} className='text-2xl cursor-pointer text-green-500 hover:text-green-400' />
                </div>
            </div>
            {isLoading ?
                <div className='h-full w-full flex items-center justify-center'>
                    <div className='border-8 border-gray-500 border-t-8 border-t-gray-800 rounded-[50%] h-10 w-10 overflow-hidden animate-spin'></div>
                </div>
                :
                <div className='h-[92%] px-2 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-900'>
                    {listChannels}
                </div>}
            <div>
                {showAddChannel && <AddChannel activeUser={activeUser} setActiveUserChannels={setActiveUserChannels} activeUserChannels={activeUserChannels} setShowAddChannel={setShowAddChannel} />}
            </div>
        </Fragment>
    )
}

export default ChannelList
