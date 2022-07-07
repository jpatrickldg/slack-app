import React, { FC, useState } from 'react'

const Register: FC = () => {

    interface User {
        email: string
        password: string
        confirmPassword: string
    }

    const [userDetails, setUserDetails] = useState<User>({ email: '', password: '', confirmPassword: '' })

    const [notif, setNotif] = useState<string>('')

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault()

        const body = {
            "email": userDetails.email,
            "password": userDetails.password,
            "password_confirmation": userDetails.confirmPassword
        }

        const url = "http://206.189.91.54/api/v1/auth/"
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        const data = await response.json()

        if (response.ok) {
            setNotif('Succesfully Registered')
        } else {
            setNotif(data.errors.full_messages[0]);
            console.log(data, data.errors.full_messages[0])
        }

    }

    return (
        <main>
            <div>
                <h2>Register</h2>
                <div>
                    {notif && <span>{notif}</span>}
                </div>
                <form onSubmit={submitHandler}>
                    <div>
                        <input required type="email" name="email" id="email" placeholder='Email' onChange={e => {
                            setUserDetails({ ...userDetails, email: e.target.value })
                        }} />
                    </div>
                    <div>
                        <input required type="password" name="password" id="password" placeholder='Password' onChange={e => {
                            setUserDetails({ ...userDetails, password: e.target.value })
                        }} />
                    </div>
                    <div>
                        <input required type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' onChange={e => {
                            setUserDetails({ ...userDetails, confirmPassword: e.target.value })
                        }} />
                    </div>
                    <div>
                        <input className='input-btn' type="submit" value="Register" />
                    </div>
                </form>

                <div>
                    <span>Already a member? <a href='/'>Login</a></span>
                </div>
            </div>
        </main>
    )
}

export default Register