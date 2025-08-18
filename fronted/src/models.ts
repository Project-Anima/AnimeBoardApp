// データモデル
export interface IUser {
    displayName: string | null | undefined
    photoURL: string | null | undefined
}

export interface IComment {
    user: IUser
    content: string
    createdAt: Date
    id: string
}

export interface ICommentAdd {
    user: IUser
    content: string
}