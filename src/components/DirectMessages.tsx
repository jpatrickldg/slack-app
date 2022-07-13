import { FC, useState } from 'react'
import { User } from '../Types'

interface Props {
    activeUser: User
}

const DirectMessages: FC<Props> = ({ activeUser }) => {

    const [userIdArrays, setUserIdArrays] = useState<Array<any>>([])

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
        let database: Array<any> = []
        // const aaaaray:Array<number> = [2216,2222,2215]
        datas.data.forEach((element: any) => {
            async function sendDirectMessage() {
                const responses = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${element.id}&receiver_class=User`,
                    {
                        method: "GET",
                        headers: activeUser.headers,
                    })
                const userData = await responses.json()
                const findData = userData.data.some((x: { sender: { id: number }; receiver: { id: number } }) => x.sender.id === activeUserID || x.receiver.id === activeUserID)
                if (findData) {
                    const mapUserData = userData.data.map((element: { body: any }) => {
                        return {
                            message: element.body,
                            time: 10
                        }
                    })

                    database.push({ [element.id]: mapUserData })
                }

            }
            sendDirectMessage()
        })
        setUserIdArrays(database)


        // const url = `http://206.189.91.54/api/v1/messages?receiver_id=${activeUserID}&receiver_class=User`
        // const response = await fetch(url,
        //     {
        //         method: "GET",
        //         headers: activeUser.headers
        //     })
        // const data = await response.json()
        // if (response.ok) {
        //     console.log(data)
        //     console.log(activeUserID)
        // } else console.log(response)
    }
    // userIdArrays.forEach((element: any) => {

    //     async function getUserDMs() {
    //         const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${element}&receiver_class=User`,
    //             {
    //                 method: "GET",
    //                 headers: activeUser.headers
    //             })
    //         const data = await response.json()
    //        console.log(data.data.body)
    //     }
    // })
    const listDMs = userIdArrays.length === 0
        ?
        <div>
            <span>User has no DM</span>
        </div>
        :
        userIdArrays.map(element => {
            let userID = Object.keys(element)[0]
            return (
                <><button>
                    {userID}
                </button><br /></>
            )
        })
    console.log(userIdArrays)

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