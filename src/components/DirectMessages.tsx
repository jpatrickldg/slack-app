import { FC } from 'react'
import { User } from '../Types'

interface Props {
    activeUser: User
}

const DirectMessages: FC<Props> = ({ activeUser }) => {

    async function getUserDMs() {
        let activeUserID
        if (activeUser.data !== undefined) {
            activeUserID = activeUser.data.id
        }
        const url = `http://206.189.91.54/api/v1/messages?receiver_id=${activeUserID}&receiver_class=User`
        const response = await fetch(url,
            {
                method: "GET",
                headers: activeUser.headers
            })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            console.log(activeUserID)
        } else console.log(response)
    }
    return (
        <div>
            <button onClick={getUserDMs}>Log DMS</button>
        </div>
    )
}

export default DirectMessages