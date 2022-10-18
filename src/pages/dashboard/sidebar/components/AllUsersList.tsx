import { FC, Fragment, useEffect, useState } from 'react'
import SendDirectMessage from '../../../../components/SendDirectMessage';
import { User } from '../../../../types/user'
import { IDandUID } from '../../../../types/idAndUid';
import { Avatar } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'

interface Props {
    activeUser: User
    userID: number
    setUserID: (val: number) => void
    setChannelName: (val: string) => void
    setChannelID: (val: number) => void
    setUserName: (val: string) => void
}
const AllUsersList: FC<Props> = ({ activeUser, setChannelID, setChannelName, setUserID, setUserName, userID }) => {

    const [userDetails, setUserDetails] = useState<Array<IDandUID>>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showDMModal, setShowDMModal] = useState<boolean>(false)

    const setContentID = (id: number, uid: string) => {
        setChannelID(0)
        setChannelName('')
        setUserID(id)
        setUserName(uid)
    }

    async function getAllUsers() {
        const url = `${process.env.REACT_APP_SLACK_API}/api/v1/users`
        const response = await fetch(url,
            {
                method: "GET",
                headers: activeUser.headers,
            })
        const data = await response.json()

        if (response.ok) {
            setIsLoading(false)
            const usersCopy: Array<IDandUID> = data.data.map((e: IDandUID) => {
                return {
                    uid: e.uid,
                    id: e.id
                }
            })
            setUserDetails(usersCopy)
            console.log(userDetails)
        } else console.log(response)
    }

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayDMModal = () => {
        setShowDMModal(true)
    }

    const listUsers = userDetails.filter(e => {
        if (searchTerm === '') {
            return e
        } else if (e.uid.toLowerCase().includes(searchTerm.toLowerCase())) {
            return e
        } else return null
    })

    const usersComponent = listUsers.length === 0 ?
        <div>
            <span>No user found</span>
        </div>
        :
        listUsers.map(e => {
            return (
                <div key={e.id} className={e.id === userID ? 'bg-gray-700 rounded-md w-full flex items-center gap-2 hover:bg-gray-700 hover:rounded-md min-h-8 text-left p-1 cursor-pointer mb-1' : 'w-full flex items-center gap-2 hover:bg-gray-700 hover:rounded-md min-h-8 text-left p-1 cursor-pointer mb-1'} onClick={() => setContentID(e.id, e.uid)}>
                    <Avatar sx={{ width: 20, height: 20, fontSize: 16, bgcolor: 'gray', fontFamily: 'monospace' }}>
                        {e.uid.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className='break-all'>{e.uid.substring(0, e.uid.indexOf('@'))}</span>
                    <span className='text-xs text-gray-500'>{e.id}</span>
                </div>
            )
        })

    return (
        <Fragment>
            <div className='flex justify-between items-center p-3 mb-2 h-[8%]'>
                <span className='font-bold text-sm uppercase underline tracking-widest'>Messages</span>
                <HiOutlinePencilAlt title='New Message' onClick={displayDMModal} className='text-2xl text-green-500 cursor-pointer hover:text-green-400' />
            </div>
            <div className='px-2 mb-2 h-[8%]'>
                <input type="text" name="searchTerm" id="searchTerm" placeholder='Search User' onChange={e => setSearchTerm(e.target.value)} className='text-gray-100 w-full bg-gray-900 h-8 rounded-md p-2  focus:outline-none placeholder:text-gray-500' />
            </div>
            <div className='px-2 h-[84%] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-900'>
                {isLoading ?
                    <div className='h-full w-full flex items-center justify-center'>
                        <div className='border-8 border-gray-500 border-t-8 border-t-gray-800 rounded-[50%] h-10 w-10 overflow-hidden animate-spin'></div>
                    </div>
                    :
                    <Fragment>
                        {usersComponent}
                    </Fragment>}
            </div>
            {showDMModal && <SendDirectMessage activeUser={activeUser} setShowDMModal={setShowDMModal} />}

        </Fragment>
    )
}

export default AllUsersList


