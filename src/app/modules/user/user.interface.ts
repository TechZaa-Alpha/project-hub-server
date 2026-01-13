import { Types } from "mongoose"

export type TUser = {
    name: string,
    photo?: string,
    orgAccountId?: Types.ObjectId,
    accountId?:Types.ObjectId
}