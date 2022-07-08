import React, { FC, useEffect, useState } from 'react'

type NumberID = {
    id: number
}

type Channel = {
    id: number
    name: string
}

type MessageData = {
    body: string
    id: number
    receiver: NumberID
}

type User = {
    data?: NumberID
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
    const [messageDetails, setMessageDetails] = useState<MessageData[]>([])

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
                // console.log(data.data[0].sender.id)
                console.log(url)
                let tempMessageDetails: Array<MessageData> = []
                data.data.forEach((e: MessageData) => {
                    tempMessageDetails.push(e)
                })
                setMessageDetails(tempMessageDetails)
            }
        }
        getMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, channelID])

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
                setMessage('')
            }
        }
    }

    const logMessages = () => {
        console.log(messageDetails)
    }

    const checkMessages = () => {
        const filteredArray = messageDetails.filter(message => message.receiver.id === channelID)

        if (filteredArray.length !== 0) {
            const listMessages = filteredArray.map(message => {
                return (
                    <div key={message.id}>
                        {message.body}
                    </div>
                )
            })

            return listMessages
        } else {
            return (
                <span>No messages</span>
            )
        }
    }

    const messagesComponent = checkMessages()

    return (
        <div>
            <div>
                {messagesComponent}
            </div>
            <input type="text" name="message" id="message" placeholder='
            Enter Message' onChange={e => setMessage(e.target.value)} onKeyDown={sendMessage} value={message} />
            <button onClick={logMessages}>View Messages</button>
        </div>
    )
}

export default Message