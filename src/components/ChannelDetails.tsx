import { FC } from 'react'
import { Channel } from '../types/channel'
interface Props {
    selectedChannelDetails: Channel
    selectedChannelMembers: Array<number>
}

const ChannelDetails: FC<Props> = ({ selectedChannelDetails, selectedChannelMembers }) => {
    selectedChannelMembers.map(e => {
        return (
            <div key={e}>
                <span>User #{e}</span>
            </div>
        )
    })

    return (
        <div className='w-[210px] bg-gray-900 p-4 rounded-md text-gray-100 absolute right-[115px] top-8 opacity-95 text-sm font-medium'>
            <div className='w-full flex items-center'>
                <span className='uppercase text-xs basis-1/2'>Channel ID:</span>
                <span>{selectedChannelDetails.id}</span>
            </div>
            <div className='w-full flex items-center'>
                <span className='uppercase text-xs basis-1/2'>Created on:</span>
                <span>{selectedChannelDetails.created_at.substring(0, 10)}</span>
            </div>
            <div className='w-full flex items-center'>
                <span className='uppercase text-xs basis-1/2'>Created by:</span>
                <span>USER #{selectedChannelDetails.owner_id}</span>
            </div>
        </div>
    )
}

export default ChannelDetails