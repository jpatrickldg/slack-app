import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { User } from '../Types'

interface Props {
    activeUser: User
    channelID: number | null
    message: string
    setMessage: (val: string) => void
}

const SendMessage: FC<Props> = ({ activeUser, channelID, message, setMessage }) => {

    async function sendMessage(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            console.log('enter')
            const body = {
                "receiver_id": channelID,
                "receiver_class": "Channel",
                "body": message

            }
            const url = "http://206.189.91.54/api/v1/messages"
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
            Enter Message' onChange={handleChange} onKeyDown={sendMessage} value={message} />
    )
}

export default SendMessage