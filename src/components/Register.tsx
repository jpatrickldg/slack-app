import React, { useState } from 'react'

function Register() {

    interface User {
        email: string
        password: string
        confirmPassword: string
    }

    const [userDetails, setUserDetails] = useState<User>({ email: '', password: '', confirmPassword: '' })

    const [notif, setNotif] = useState<string>('')


    async function submitHandler(e: React.FormEvent) {
        e.preventDefault()

        if (userDetails.password !== userDetails.confirmPassword) {
            console.log('Password do not match')
        } else {
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
                })


            if (response.status >= 200 && response.status <= 299) {
                // let data = await response.json()
                setNotif('Succesfully Registered')
            } else {
                setNotif('Error');
            }
        }
    }


    return (
        <main className="main-container">
            <div className="form">
                <h2 className="content-header">Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="input-field">
                        <input required type="email" name="email" id="email" placeholder='Email' onChange={e => {
                            setUserDetails({ ...userDetails, email: e.target.value })
                        }} />
                    </div>
                    <div className="input-field">
                        <input required type="password" name="password" id="password" placeholder='Password' onChange={e => {
                            setUserDetails({ ...userDetails, password: e.target.value })
                        }} />
                    </div>
                    <div className="input-field">
                        <input required type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' onChange={e => {
                            setUserDetails({ ...userDetails, confirmPassword: e.target.value })
                        }} />
                    </div>
                    <div className="input-field">
                        <input className='input-btn' type="submit" value="Register" />
                    </div>
                </form>
                <div>
                    {notif && <span>{notif}</span>}
                </div>
                <div>
                    <span>Already a member? <a href='/'>Login</a></span>
                </div>
            </div>
        </main>
    )
}

export default Register