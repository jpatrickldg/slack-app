import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { User } from '../types/user'
import { MessageData } from '../types/messageData'
import { Avatar } from '@mui/material'
import dayjs from 'dayjs'
interface Props {
    activeUser: User
    channelID: number | null
    message: string
    userID: number
}

const Message: FC<Props> = ({ activeUser, channelID, message, userID }) => {
    const [messageDetails, setMessageDetails] = useState<MessageData[]>([])
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getMessages() {
        const url = `${process.env.REACT_APP_SLACK_API}/api/v1/messages?receiver_id=${channelID ? channelID : userID}&receiver_class=${channelID ? 'Channel' : 'User'}`
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
            setIsLoading(false)
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
    }, [channelID, message, userID])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [message])

    const checkMessages = () => {
        if (messageDetails.length !== 0) {
            const listMessages = messageDetails.map((message, i) => {
                return (
                    <div key={i} className='hover:bg-gray-800 p-2'>
                        <div className='flex gap-2'>
                            <div className='pt-1'>
                                <Avatar className='bg-red-500' sx={{ width: 30, height: 30, bgcolor: message.sender.id === activeUser.data?.id ? 'cornflowerblue' : '' }}>
                                    {message.sender.uid.charAt(0).toUpperCase()}
                                </Avatar>
                            </div>
                            <div>
                                <div className='flex gap-2 items-center mb-1'>
                                    <span className={message.sender.id === activeUser.data?.id ? 'text-blue-400' : ''}>{message.sender.uid} | {message.sender.id}</span>
                                    <span className='text-xs text-gray-500'>{(dayjs(message.created_at).format('M-D h:mm A')).toString()}</span>
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
        <Fragment>
            {isLoading ?
                <div className='h-full w-full flex items-center justify-center'>
                    <div className='border-8 border-gray-500 border-t-8 border-t-gray-700 rounded-[50%] h-10 w-10 overflow-hidden animate-spin'></div>
                </div>
                :
                <Fragment>
                    {messagesComponent}
                    < div ref={messagesEndRef}></div>
                </Fragment>
            }
        </Fragment >
    )
}

export default Message