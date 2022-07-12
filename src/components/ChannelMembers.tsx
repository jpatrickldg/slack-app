import { FC } from 'react'
import { User } from '../Types'

interface Props {
    selectedChannelMembers: Array<number>
    channelName: string
    activeUser: User
}

const ChannelMembers: FC<Props> = ({ selectedChannelMembers, channelName, activeUser }) => {
    const listMembers = selectedChannelMembers.map(e => {
        if (selectedChannelMembers.length < 2) {
            return (
                <div className='px-3'>
                    <span>No Members</span>
                </div>
            )
        } else if (e !== activeUser.data!.id) {
            return (
                <div key={e} className='px-3'>
                    <span>User #{e}</span>
                </div>
            )
        } else return null
    })

    return (
        <>
            <div className='px-3 text-sm font-bold uppercase mt-3'>
                <span>Admin</span>
            </div>
            <div className='px-3 mb-4'>
                <span>User #{activeUser.data?.id}</span>
            </div>
            <div className='px-3 text-sm font-bold uppercase'>
                <span>Members</span>
            </div>
            {listMembers}
        </>
    )
}

export default ChannelMembers