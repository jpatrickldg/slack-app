import { ChangeEvent, FC, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../Types'

interface Props {
    activeUser: User
    setActiveUser: (val: object) => void
}

const Login: FC<Props> = ({ activeUser, setActiveUser }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [notif, setNotif] = useState<string>('')

    async function submitHandler(e: FormEvent) {
        e.preventDefault()

        const body = {
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
        const data = await response.json()

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    return (
        <main className='flex justify-center items-center h-screen w-screen bg-gray-400'>
            <div className='w-[500px] p-7 bg-gray-700 rounded-md'>
                <div className='text-3xl font-bold text-center text-gray-100 mb-2'>
                    <span>Welcome back!</span>
                </div>
                <div className='text-center text-gray-400 mb-4'>
                    <span>We're so excited to see you again!</span>
                </div>
                <div className='text-center mb-2'>
                    {notif && <span className='text-red-500 text-sm w-full'>{notif}</span>}
                </div>
                <form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <span className='text-gray-400 uppercase font-bold text-xs'>Email</span>
                        <input type="email" name="email" id="email" onChange={handleChange} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                    </div>
                    <div className='mb-6'>
                        <span className='text-gray-400 uppercase font-bold text-xs'>Password</span>
                        <input type="password" name="password" id="password" onChange={handleChange} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                    </div>
                    <div>
                        <input type="submit" value="Login" className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-indigo-600 hover:border-0' />
                    </div>
                </form>
                <div>
                    <span className='text-gray-500 text-sm'>Not a member? <a href='/register' className='text-blue-400 hover:underline'>Register</a> </span>
                </div>
            </div>
        </main>
    )
}

export default Login