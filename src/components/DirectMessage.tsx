import React, { ChangeEvent, FC, useState } from 'react'
import { Channel, User } from '../Types'
import DMcontent from './DMcontent'


interface Props {
    activeUser: User
}

const DirectMessage:FC<Props> = ({ activeUser}) => {

    const [userEmail, setUserEmail] = useState<string>('')
    const [displayDM, setDisplayDM] = useState<boolean>(false)
    
 
    async function logUsers() {
        const userEmailLists:string[] = []
        const url = "http://206.189.91.54/api/v1/users"
        const response = await fetch(url,
            {
                method: "GET",
                headers: activeUser.headers
            })

        const data = await response.json()
        const userDetails = data.data.find((element: { email: string }) => element.email === userEmail)
        userEmailLists.push(userDetails.email)
        setDisplayDM(true)
        console.log(userEmailLists)
        
    }

 
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
    }

    return (
        <>
             {displayDM ?
            <div>
                {/* <DMcontent/> */}
            </div>
            :
            <div>
                <input type="text" name="user-name" id="user-name" placeholder='Search email' onChange={handleChange}
                />
            <button onClick={logUsers}>Select Username</button>
            </div>
            }   
        </>
    )
}

export default DirectMessage
