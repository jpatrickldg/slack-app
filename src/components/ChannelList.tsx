import { FC, useState, useEffect } from 'react'
import { Channel, User } from '../Types'
import AddChannel from './AddChannel'

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
                <div key={e.id}>
                    <button onClick={() => setChannelDetails(e.name, e.id)} className='channel-btn'>{e.name}</button>
                </div>
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
            <div className='main-top'>
                <div>
                    <span>Channels</span>
                </div>
                <div>
                    <button onClick={showAddChannelModule} title="Add Channel" className='small-btn'>Add</button>
                </div>
            </div>
            <div>
                {listChannels}
            </div>
            <div>
                {showAddChannel && <AddChannel activeUser={activeUser} setActiveUserChannels={setActiveUserChannels} activeUserChannels={activeUserChannels} setShowAddChannel={setShowAddChannel} />}
            </div>
        </>
    )
}

export default ChannelList
