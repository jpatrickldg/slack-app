import { FC, useEffect, useRef, useState } from 'react'
import { User, MessageData } from '../Types'
import { Avatar } from '@mui/material'

interface Props {
    activeUser: User
    channelID: number | null
    message: string
}

const Message: FC<Props> = ({ activeUser, channelID, message }) => {
    const [messageDetails, setMessageDetails] = useState<MessageData[]>([])
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    async function getMessages() {
        const url = `http://206.189.91.54/api/v1/messages?receiver_id=${channelID}&receiver_class=Channel`
        const response = await fetch(url,
            {
                method: "GET",
                headers: activeUser.headers
            })
        const data = await response.json()

        if (response.ok) {
            // console.log(url)
            // console.log(activeUser)
            // console.log(data.data)
            // console.log(activeUser.data)
            let tempMessageDetails: Array<MessageData> = []
            data.data.forEach((e: MessageData) => {
                tempMessageDetails.push(e)
            })
            setMessageDetails(tempMessageDetails)
        }
    }

    useEffect(() => {
        getMessages()
        const interval = setInterval(getMessages, 1000)
        return () => clearInterval(interval)
        // getMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelID, message])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
        // scrollToBottom()
    }, [message])

    const checkMessages = () => {
        // const filteredArray = messageDetails.filter(message => message.receiver.id === channelID)

        if (messageDetails.length !== 0) {
            const listMessages = messageDetails.map(message => {
                return (
                    <div key={message.id} className='hover:bg-gray-800 p-2'>
                        <div className='flex gap-2'>
                            <div className='pt-1'>
                                <Avatar className='bg-red-500' sx={{ width: 30, height: 30, bgcolor: message.sender.id === activeUser.data?.id ? 'cornflowerblue' : '' }}>
                                    {message.sender.uid.charAt(0).toUpperCase()}
                                </Avatar>
                            </div>
                            <div>
                                <div className='flex gap-2 items-center mb-1'>
                                    <span className={message.sender.id === activeUser.data?.id ? 'text-blue-400' : ''}>{message.sender.uid} | {message.sender.id}</span>
                                    <span className='text-xs text-gray-500'>{message.created_at.substring(0, 10)}</span>
                                </div>
                                <div>
                                    <span className='font-light'>{message.body}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })

            return listMessages
        } else {
            return (
                <div className='w-full h-full flex justify-center items-center'>
                    <span className='text-2xl text-gray-500'>No Messages</span>
                </div>
            )
        }
    }
    const messagesComponent = checkMessages()

    return (
        <>
            {messagesComponent}
            <div ref={messagesEndRef}></div>
        </>
    )
}

export default Message