import { FC, useState } from 'react'
import { User,userDetails } from '../Types'
interface Props {
    activeUser: User
}
const DirectMessages: FC<Props> = ({ activeUser }) => {

    const [userDMDetails, setUserDMDetails] = useState<Array<object>>([])

    async function getUserDMs() {
        let activeUserID: number
        if (activeUser.data !== undefined) {
            activeUserID = activeUser.data.id
        }
        const urls = "http://206.189.91.54/api/v1/users"
        const responses = await fetch(urls,
            {
                method: "GET",
                headers: activeUser.headers,
            })
        const datas = await responses.json()
        let usersDetailsData: Array<object> = []

        datas.data.forEach((element:{id:number}) => {
            async function sendDirectMessage() {
                const responses = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${element.id}&receiver_class=User`,
                    {
                        method: "GET",
                        headers: activeUser.headers,
                    })
                const userData = await responses.json()
                const findData = userData.data.some((xdata:{sender:{id:number}; receiver:{id:number}}) => xdata.sender.id === activeUserID || xdata.receiver.id === activeUserID)
                if (findData) {
                    const mapUserData:userDetails = userData.data.map((element:{body:string;created_at:string;sender:{ id:number}}) => {
                        return {
                            message: element.body,
                            time: element.created_at,
                            userID: element.sender.id
                        }
                    })
                    usersDetailsData.push({[element.id]: mapUserData})
                }
            }
            sendDirectMessage()
        })
        setUserDMDetails(usersDetailsData)
    }
  
    const listDMs = userDMDetails.length === 0
        ?
        <div>
            <span>User has no DM</span>
        </div>
        :
        userDMDetails.map(element => {
            let userID = Object.keys(element)[0]
            return (
                <><button>
                    {userID}
                </button><br /></>
            )
        })
    console.log(userDMDetails)

    return (
        <div>
            <button onClick={getUserDMs}>Log DMS</button>
            <div className='px-2'>
                {listDMs}
            </div>
        </div>
    )
}

export default DirectMessages