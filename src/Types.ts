
export type NumberID = {
    id: number
}

export type UserData = {
    id: number
    uid: string
}

type Sender = {
    uid: string
    id: number
}


export type Channel = {
    id: number
    name: string
    owner_id: number
    created_at: string
}

export type User = {
    data?: UserData
    headers?: Headers
}

export type MemberID = {
    user_id: number
}

export type MessageData = {
    body: string
    created_at: string
    id: number
    receiver: NumberID
    sender: Sender
}

export type UserRegistration = {
    email: string
    password: string
    confirmPassword: string
}

export type userDetails = {
    message: string
    time: string
    userID: number
}