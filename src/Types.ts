
export type NumberID = {
    id: number
}

type Sender = {
    uid: string
    id: number
}


export type Channel = {
    id: number
    name: string
}

export type User = {
    data?: NumberID
    headers?: Headers
}


export type MessageData = {
    body: string
    id: number
    receiver: NumberID
    sender: Sender
}

export type UserRegistration = {
    email: string
    password: string
    confirmPassword: string
}