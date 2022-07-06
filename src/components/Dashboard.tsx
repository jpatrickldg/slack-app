import React from 'react'

interface User {
    data?: object
    headers?: Headers
}

interface Props {
    activeUser: User
}

function Dashboard({ activeUser }: Props) {
    const userHeaders = activeUser ? activeUser.headers : {}

    const url = "http://206.189.91.54/api/v1/users"

    async function listUsers() {
        const response = await fetch(url,
            {
                method: "GET",
                headers: userHeaders,
            })

        const data = await response.json()
        console.log(data.data[0])
    }

    const displayConsole = () => {
        console.log(userHeaders)
    }

    return (
        <>
            <div>THIS IS THE DASHBOARD PAGE</div>
            <button onClick={listUsers}>console</button>
        </>
    )
}

export default Dashboard