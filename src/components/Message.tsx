import React, { FC, useEffect, useState } from 'react'

type UserData = {
    id: number
}

type Channel = {
    id: number
    name: string
}

// type Message = {
//     id: number
//     message: string
// }

type User = {
    data?: UserData
    headers?: Headers
}

interface Props {
    activeUser: User
    activeUserChannels: Array<Channel>
    setActiveUserChannels: (val: Array<Channel>) => void
    channelName: string
    channelID: number | null
    setChannelName: (val: string) => void
    setChannelID: (val: number | null) => void
}

const Message: FC<Props> = ({ activeUser, channelID }) => {
    const [message, setMessage] = useState<string>('')
    const [messageDetails, setMessageDetails] = useState<object[]>([])

    useEffect(() => {
        async function getMessages() {
            const url = `http://206.189.91.54/api/v1/messages?receiver_id=${channelID}&receiver_class=Channel`
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: activeUser.headers
                })

            const data = await response.json()

            if (response.ok) {
                console.log(data.data[0].sender.id)
                const messageDetailsCopy = [...messageDetails]
                data.data.forEach((e: object) => {
                    messageDetailsCopy.push(e)
                })
                setMessageDetails(messageDetailsCopy)
            }

        }
        getMessages()
    }, [message])

    async function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
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
            }
        }
    }

    const logMessages = () => {
        console.log(messageDetails)
    }

    return (
        <div>
            <input type="text" name="message" id="message" placeholder='
            Enter Message' onChange={e => setMessage(e.target.value)} onKeyDown={sendMessage} />
            <button onClick={logMessages}>View Messages</button>
        </div>
    )
}

export default Message