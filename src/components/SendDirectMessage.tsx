import React, { ChangeEvent, FC, useState } from 'react'
import { User } from '../types/user'
import { HiX } from 'react-icons/hi'
interface Props {
    activeUser: User
    setShowDMModal: (val: boolean) => void
}

const SendDirectMessage: FC<Props> = ({ activeUser, setShowDMModal }) => {
    const [recipientID, setRecipientID] = useState<number | string>('')
    const [directMessage, setDirectMessage] = useState<string>('')
    const [notif, setNotif] = useState<string>('')
    const [successNotif, setSuccessNotif] = useState<string>('')

    async function sendDirectMessage() {
        const url = `${process.env.REACT_APP_SLACK_API}/api/v1/messages`

        const body = {
            "receiver_id": recipientID,
            "receiver_class": "User",
            "body": directMessage
        }
        const response = await fetch(url,
            {
                method: "POST",
                headers: activeUser.headers,
                body: JSON.stringify(body)
            })
        const data = await response.json()

        if (response.ok) {
            if (data.errors === undefined) {
                setDirectMessage('')
                setRecipientID('')
                setNotif('')
                setSuccessNotif(`Message Sent to User #${recipientID}`)
            } else {
                setSuccessNotif('')
                setNotif(data.errors[0])
            }
        } else console.log(response)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'recipient-id') {
            setRecipientID(Number(e.target.value))
        } else {
            setDirectMessage(e.target.value)
        }
    }

    const closeDMModal = () => {
        setShowDMModal(false)
    }

    return (
        <div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-90 z-10'>
            <div className='w-[500px] bg-gray-700 p-4 rounded-md'>
                <div className='text-gray-100 flex items-center justify-between mb-4'>
                    <span>Send Message</span>
                    <HiX onClick={closeDMModal} className='font-extrabold text-3xl text-gray-500 hover:text-gray-200' />
                </div>
                <div>
                    {successNotif && <span className='w-full text-sm text-green-500'>{successNotif}</span>}
                    {notif && <span className='w-full text-sm text-red-500'>{notif}</span>}
                </div>
                <div className='mb-4'>
                    <span className='text-gray-400 uppercase font-bold text-xs'>Recipient ID</span>
                    <input type="number" name="recipient-id" id="recipient-id" onChange={handleChange} value={recipientID} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                </div>
                <div className='mb-4'>
                    <span className='text-gray-400 uppercase font-bold text-xs'>Message</span>
                    <input type="text" name="message" id="message" onChange={handleChange} value={directMessage} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                </div>
                <div>
                    <button onClick={sendDirectMessage} className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-indigo-600 hover:border-0'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default SendDirectMessage