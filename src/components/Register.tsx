import { ChangeEvent, FC, useState, FormEvent } from 'react'
import { UserRegistration } from '../Types'

const Register: FC = () => {

    const [userDetails, setUserDetails] = useState<UserRegistration>({ email: '', password: '', confirmPassword: '' })
    const [successNotif, setSuccessNotif] = useState<string>('')
    const [notif, setNotif] = useState<string>('')

    async function submitHandler(e: FormEvent) {
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
            setNotif('')
            setSuccessNotif('Registration Successful')
            setUserDetails({ email: '', password: '', confirmPassword: '' })
        } else {
            setSuccessNotif('')
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
        <main className='flex justify-center items-center h-screen w-screen bg-gray-600'>
            <div className='w-[500px] p-7 bg-gray-700 rounded-md'>
                <div className='text-3xl text-center mb-4 text-gray-100 font-bold'>
                    <span>Create an account</span>
                </div>
                <div className='text-center mb-2'>
                    {successNotif && <span className='w-full text-green-500 text-sm'>{successNotif}</span>}
                    {notif && <span className='text-red-500 text-sm w-full'>{notif}</span>}
                </div>
                <form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <span className='text-gray-400 uppercase font-bold text-xs'>Email</span>
                        <input required type="email" name="email" id="email" onChange={handleChange} value={userDetails.email} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                    </div>
                    <div className='mb-3'>
                        <span className='text-gray-400 uppercase font-bold text-xs'>Password</span>
                        <input required type="password" name="password" id="password" onChange={handleChange} value={userDetails.password} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                    </div>
                    <div className='mb-6'>
                        <span className='text-gray-400 uppercase font-bold text-xs'>Confirm Password</span>
                        <input required type="password" name="confirm-password" id="confirm-password" onChange={handleChange} value={userDetails.confirmPassword} className='text-gray-100 w-full bg-gray-900 h-10 rounded-md p-2  focus:outline-none' />
                    </div>
                    <div>
                        <input type="submit" value="Register" className='text-gray-100 bg-indigo-500 w-full  h-10 rounded-md mb-2 cursor-pointer hover:bg-indigo-600 hover:border-0' />
                    </div>
                </form>
                <div>
                    <span className='text-gray-500 text-sm'>Already a member? <a href='/' className='text-blue-400 hover:underline'>Login</a></span>
                </div>
            </div>
        </main>
    )
}

export default Register