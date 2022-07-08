import { FC, useEffect, useState } from 'react'
import { User, MessageData } from '../Types'

interface Props {
    activeUser: User
    channelID: number | null
    message: string
}

const Message: FC<Props> = ({ activeUser, channelID, message }) => {
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

    const checkMessages = () => {
        const filteredArray = messageDetails.filter(message => message.receiver.id === channelID)

        if (filteredArray.length !== 0) {
            const listMessages = filteredArray.map(message => {
                return (
                    <div key={message.id} className='msg-box'>
                        <div>
                            <span className='sender-name'>{message.sender.uid}({message.sender.id})</span>
                        </div>
                        <div>
                            <span>{message.body}</span>
                        </div>
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
        </div>
    )
}

export default Message