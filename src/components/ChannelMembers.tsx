import { FC, Fragment } from 'react'
import { Channel } from '../types/channel'
interface Props {
    selectedChannelMembers: Array<number>
    selectedChannelDetails: Channel
    userID: number
    setUserID: (val: number) => void
    setChannelName: (val: string) => void
    setChannelID: (val: number) => void
    setUserName: (val: string) => void
}

const ChannelMembers: FC<Props> = ({ selectedChannelMembers, selectedChannelDetails, setUserID, setChannelID, setChannelName, setUserName }) => {
    const setContentID = (e: number) => {
        setChannelID(0)
        setChannelName('')
        setUserName('')
        setUserID(e)
        console.log(e)
    }

    const listMembers = selectedChannelMembers.map(e => {
        if (selectedChannelMembers.length < 2) {
            return (
                <div key={e} className='px-3'>
                    <span>No Members</span>
                </div>
            )
        } else if (e !== selectedChannelDetails.owner_id) {
            return (
                <div key={e} onClick={() => setContentID(e)} className='px-3 cursor-pointer hover:underline'>
                    <span>User #{e}</span>
                </div>
            )
        } else return null
    })

    return (
        <Fragment>
            <div className='px-3 text-sm font-bold uppercase mt-3'>
                <span>Admin</span>
            </div>
            <div className='px-3 mb-4 cursor-pointer hover:underline' onClick={() => setContentID(selectedChannelDetails.owner_id)}>
                <span>User #{selectedChannelDetails.owner_id}</span>
            </div>
            <div className='px-3 text-sm font-bold uppercase'>
                <span>Members</span>
            </div>
            {listMembers}
        </Fragment>
    )
}

export default ChannelMembers