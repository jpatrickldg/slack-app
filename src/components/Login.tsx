import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
    data?: object
    headers?: object
}

interface Props {
    activeUser: User
    setActiveUser: (val: object) => void
}

function Login({ activeUser, setActiveUser }: Props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


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
                mode: "cors",
                body: JSON.stringify(body)
            })


        if (response.status >= 200 && response.status <= 299) {
            let data = await response.json()
            let headers = response.headers
            let userHeaders = {
                'access-token': headers.get('access-token'),
                client: headers.get('client'),
                expiry: headers.get('expiry'),
                uid: headers.get('uid')
            }

            setActiveUser({
                ...data,
                "headers": userHeaders
            })

            console.log(activeUser)

            navigate('/dashboard')
        } else {
            console.log("Can't connect")
        }
    }

    return (
        <main className="main-container">
            <div className="form">
                <h2 className="content-header">Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="input-field">
                        <input type="email" name="email" id="email" placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" id="password" placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                    </div>
                    <div className="input-field">
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