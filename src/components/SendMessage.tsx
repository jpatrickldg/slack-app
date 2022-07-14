import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { User } from '../types/user'
interface Props {
    activeUser: User
    channelID: number | null
    message: string
    setMessage: (val: string) => void
    userID: number
}

const SendMessage: FC<Props> = ({ activeUser, channelID, message, setMessage, userID }) => {

    async function sendMessage(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            console.log('enter')
            const body = {
                "receiver_id": channelID ? channelID : userID,
                "receiver_class": channelID ? "Channel" : "User",
                "body": message
            }
            const url = `${process.env.REACT_APP_SLACK_API}/api/v1/messages`
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: activeUser.headers,
                    body: JSON.stringify(body)
                })
            const data = await response.json()

            if (response.ok) {
                console.log(data.data.body)
                setMessage('')
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return (
        <input type="text" name="message" id="message" placeholder='
            Enter Message' onChange={handleChange} onKeyDown={sendMessage} value={message} className='text-gray-100 w-full bg-gray-800 h-10 rounded-md p-2  focus:outline-none placeholder:text-gray-500' />
    )
}

export default SendMessage