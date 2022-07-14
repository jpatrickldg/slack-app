import { FC, useEffect, useState } from 'react'
import Message from './Message'
import AddChannelMember from './AddChannelMember'
import SendMessage from './SendMessage'
import ChannelDetails from './ChannelDetails'
import ChannelMembers from './ChannelMembers'
import { Channel, MemberID, User } from '../Types'
import { HiOutlineHashtag, HiOutlineUserAdd, HiX, HiOutlineInformationCircle, HiOutlineUsers } from "react-icons/hi";

interface Props {
    activeUser: User
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
}

const Content: FC<Props> = ({ activeUser, setChannelName, channelID, channelName }) => {
    const [message, setMessage] = useState<string>('')
    const [showAddMember, setShowAddMember] = useState<boolean>(false)
    const [selectedChannelMembers, setSelectedChannelMembers] = useState<Array<number>>([])
    const [selectedChannelDetails, setSelectedChannelDetails] = useState<Channel>()
    const [showChannelDetails, setShowChannelDetails] = useState<boolean>(false)
    const [displayMembers, setDisplayMembers] = useState<boolean>(false)
    const [activeChannelMembersCount, setActiveChannelMemberCount] = useState<number | null>(null)
    const displayAddMember = () => {
        setShowAddMember(true)
    }
    const closeChannel = () => {
        setChannelName('')
    }

    async function getChannelDetails() {
        const url = `${process.env.REACT_APP_SLACK_API}/api/v1/channels/${channelID}`
        const response = await fetch(url,
            {
                method: "GET",
                headers: activeUser.headers
            })
        const data = await response.json()

        if (response.ok) {
            console.log(data)
            const channelDetails = data.data
            setSelectedChannelDetails(channelDetails)
            const channelMembersDetails = data.data.channel_members
            const membersCount = data.data.channel_members.length
            setActiveChannelMemberCount(membersCount)
            const channelMembers: Array<number> = []
            channelMembersDetails.forEach((element: MemberID) => {
                channelMembers.push(element.user_id)
            });
            setSelectedChannelMembers(channelMembers)
            console.log(selectedChannelMembers)
            console.log(selectedChannelDetails)
        } else console.log(response)
    }

    useEffect(() => {
        channelName && getChannelDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelID, activeChannelMembersCount])

    const displayChannelDetails = () => {
        setShowChannelDetails(true)
    }

    const hideChannelDetails = () => {
        setShowChannelDetails(false)
    }

    const toggleMembersDisplay = () => {
        displayMembers ? setDisplayMembers(false) : setDisplayMembers(true)
    }

    return (
        <>
            {channelName ?
                <>
                    <div className='h-full grow bg-gray-700 text-gray-100 flex flex-col justify-between'>
                        <div className='w-full h-[5%] flex justify-between items-center bg-gray-700 p-3 border-b-2 border-gray-900' >
                            <div className='flex items-center gap-1'>
                                <HiOutlineHashtag className='text-2xl text-yellow-500' />
                                <span className='font-bold text-xl'>{channelName}</span>
                            </div>
                            <div className='flex font-extrabold text-2xl gap-3 text-gray-500 relative'>
                                <div onMouseOver={displayChannelDetails} onMouseLeave={hideChannelDetails}>
                                    <HiOutlineInformationCircle className='cursor-pointer hover:text-gray-100' />
                                </div>
                                <HiOutlineUsers title='View Members' onClick={toggleMembersDisplay} className='cursor-pointer hover:text-green-400 text-green-500' />
                                <HiOutlineUserAdd title='Add Member' onClick={displayAddMember} className='cursor-pointer hover:text-green-400 text-green-500' />
                                <HiX title='Close' onClick={closeChannel} className='cursor-pointer hover:text-red-400 text-red-500' />
                                {showChannelDetails && selectedChannelDetails ? <ChannelDetails selectedChannelDetails={selectedChannelDetails} selectedChannelMembers={selectedChannelMembers} /> : ''}
                            </div>
                        </div>
                        <div className='w-full h-[95%] flex'>
                            <div className='h-full grow flex flex-col p-2'>
                                <div className='w-full h-[93%] overflow-auto grow-0 scroll-smooth scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900' >
                                    <Message activeUser={activeUser} channelID={channelID} message={message} />
                                </div>
                                <div className='w-full mb-0 px-2 h-[7%]  flex items-center'>
                                    <SendMessage activeUser={activeUser} channelID={channelID} message={message} setMessage={setMessage} />
                                </div>
                            </div>
                            {displayMembers &&
                                <div className='h-full basis-[150px] bg-gray-800 text-gray-100 shrink-0'>
                                    <ChannelMembers selectedChannelMembers={selectedChannelMembers} channelName={channelName} activeUser={activeUser} />
                                </div>
                            }
                        </div>
                        <div>
                            {showAddMember && <AddChannelMember activeUser={activeUser} channelID={channelID} setShowAddMember={setShowAddMember} setActiveChannelMemberCount={setActiveChannelMemberCount} />}
                        </div>
                    </div>
                </>
                :
                <div className='w-full h-full flex items-center justify-center bg-gray-700'>
                    <div className='text-center'>
                        <h2 className='text-3xl font-bold text-gray-100'>Welcome to Avion Chat</h2>
                        <span className='text-gray-500'>Check on your channels on the left to browse messages!</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Content