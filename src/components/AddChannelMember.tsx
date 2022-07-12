import { FC, useState, ChangeEvent } from 'react'
import { User } from '../Types'
import { HiX } from "react-icons/hi";

interface Props {
    activeUser: User
    channelID: number | null
    setShowAddMember: (val: boolean) => void
    setActiveChannelMemberCount: (val: number) => void
}

const AddChannelMember: FC<Props> = ({ activeUser, channelID, setShowAddMember, setActiveChannelMemberCount }) => {
    const [memberID, setMemberID] = useState<number | null>(null)
    const [successNotif, setSuccessNotif] = useState<string>('')
    const [notif, setNotif] = useState<string>('')

    async function addMembertoChannel() {
        const body = {
            "id": channelID,
            "member_id": memberID
        }
        const url = `http://206.189.91.54/api/v1/channel/add_member`
        const response = await fetch(url,
            {
                method: "POST",
                headers: activeUser.headers,
                body: JSON.stringify(body)
            })
        const data = await response.json()

        if (response.ok) {
            if (data.errors === undefined) {
                console.log(data.data.channel_members.length)
                setNotif('')
                setSuccessNotif(`User ${memberID} is added to the Channel`)
                const membersCount = data.data.channel_members.length
                setActiveChannelMemberCount(membersCount)
            } else {
                setSuccessNotif('')
                setNotif(data.errors)
            }
        } else console.log(data)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMemberID(Number(e.target.value))
    }
    const closeAddMemberModule = () => {
        setShowAddMember(false)
    }

    return (
        <div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-90 z-10'>
            <div className='w-[350px] bg-gray-700 p-4 rounded-md'>
                <div className='text-gray-100 flex items-center justify-between mb-4'>
                    <span>Add member to this channel</span>
                    <HiX onClick={closeAddMemberModule} className='font-extrabold text-3xl text-gray-500 hover:text-gray-200' />
                </div>
                <div>
                    {successNotif && <span className='w-full text-sm text-green-500'>{successNotif}</span>}
                    {notif && <span className='text-red-500 text-sm w-full'>{notif}</span>}
                </div>
                <div className='mb-4'>
                    <span className='text-gray-400 uppercase font-bold text-xs'>User ID</span>
                    <input type="number" name="memberID" id="memberID" onChange={handleChange} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                </div>
                <div>
                    <button onClick={addMembertoChannel} className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-indigo-600 hover:border-0'>Add member</button>
                </div>
            </div>
        </div>
    )
}

export default AddChannelMember