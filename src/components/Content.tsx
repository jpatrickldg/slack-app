import { FC, useState } from 'react'
import Message from './Message'
import AddChannelMember from './AddChannelMember'
import SendMessage from './SendMessage'
import { User } from '../Types'

interface Props {
    activeUser: User
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
}

const Content: FC<Props> = ({ activeUser, setChannelName, channelID, channelName }) => {
    const [message, setMessage] = useState<string>('')
    const [showAddMember, setShowAddMember] = useState<boolean>(false)
    const displayAddMember = () => {
        setShowAddMember(true)
    }
    const closeChannel = () => {
        setChannelName('')
    }

    return (
        <>
            {channelName ?
                <div className='main-content'>
                    <div className='main-top'>
                        <div>
                            <span>{channelName}</span>
                        </div>
                        <div className='flex'>
                            <button className='small-btn' onClick={displayAddMember}>Add</button>
                            <button className='small-btn' onClick={closeChannel}>Close</button>
                        </div>
                    </div>
                    <div className='main-mid'>
                        <Message activeUser={activeUser} channelID={channelID} message={message} />
                    </div>
                    <div className='main-bot'>
                        <SendMessage activeUser={activeUser} channelID={channelID} message={message} setMessage={setMessage} />
                    </div>
                    <div>
                        {showAddMember && <AddChannelMember activeUser={activeUser} channelID={channelID} setShowAddMember={setShowAddMember} />}
                    </div>
                </div>
                :
                <div className='center'>
                    <h2>Welcome to Avion Chat</h2>
                </div>
            }
        </>
    )
}

export default Content