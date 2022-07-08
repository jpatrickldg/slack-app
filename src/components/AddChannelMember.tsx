import { FC, useState, ChangeEvent } from 'react'
import { User } from '../Types'

interface Props {
    activeUser: User
    channelID: number | null
    setShowAddMember: (val: boolean) => void
}

const AddChannelMember: FC<Props> = ({ activeUser, channelID, setShowAddMember }) => {
    const [memberID, setMemberID] = useState<number | null>(null)
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
                console.log(data)
                setNotif('User Added to Channel')
            } else {
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
        <div className='module-container'>
            <div className='module'>
                <div>
                    {notif && <span>{notif}</span>}
                </div>
                <div>
                    <input type="number" name="memberID" id="memberID" placeholder='User ID' onChange={handleChange} />
                </div>
                <div>
                    <button onClick={addMembertoChannel}>Add</button>
                </div>
                <div>
                    <button onClick={closeAddMemberModule}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AddChannelMember