import { IDandUID } from "./idAndUid"
import { NumberID } from "./numberID"

export type MessageData = {
    body: string
    created_at: string
    id: number
    receiver: NumberID
    sender: IDandUID
}