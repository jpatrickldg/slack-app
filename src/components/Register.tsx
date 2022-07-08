import React, { ChangeEvent, FC, useState } from 'react'
import { UserRegistration } from '../Types'

const Register: FC = () => {


    const [userDetails, setUserDetails] = useState<UserRegistration>({ email: '', password: '', confirmPassword: '' })

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setUserDetails({ ...userDetails, email: e.target.value })
        } else if (e.target.name === 'password') {
            setUserDetails({ ...userDetails, password: e.target.value })
        } else if (e.target.name === 'confirm-password') {
            setUserDetails({ ...userDetails, confirmPassword: e.target.value })
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
                        <input required type="email" name="email" id="email" placeholder='Email' onChange={handleChange} />
                    </div>
                    <div>
                        <input required type="password" name="password" id="password" placeholder='Password' onChange={handleChange} />
                    </div>
                    <div>
                        <input required type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' onChange={handleChange} />
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