import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
    data?: object
    headers?: object
}

interface Props {
    activeUser: User
    setActiveUser: (val: object) => void
}

const Login: FC<Props> = ({ activeUser, setActiveUser }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [notif, setNotif] = useState<string>('')



    async function submitHandler(e: React.FormEvent) {
        e.preventDefault()

        let body = {
            "email": email,
            "password": password
        }

        const url = "http://206.189.91.54/api/v1/auth/sign_in/"
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })


        let data = await response.json()
        if (response.ok) {
            let responseHeaders = response.headers
            let userHeaders = {
                'access-token': responseHeaders.get('access-token'),
                client: responseHeaders.get('client'),
                expiry: responseHeaders.get('expiry'),
                uid: responseHeaders.get('uid'),
                'Content-Type': 'application/json'
            }

            setActiveUser({
                ...data,
                "headers": userHeaders
            })

            console.log(activeUser)

            navigate('/dashboard')
        } else {
            setNotif(data.errors)
            console.log(data.errors)
            console.log(data)
        }
    }

    return (
        <main>
            <div>
                <h2>Login</h2>
                {notif && <span>{notif}</span>}
                <form onSubmit={submitHandler}>
                    <div>
                        <input type="email" name="email" id="email" placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                    </div>
                    <div>
                        <input className='input-btn' type="submit" value="Login" />
                    </div>
                </form>
                <div>
                    <span>Not a member? <a href='/register'>Register</a> </span>
                </div>
            </div>
        </main>
    )
}

export default Login