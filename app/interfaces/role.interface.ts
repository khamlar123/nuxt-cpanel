export interface roleInterface {
    id: number
    name: string
    is_active: boolean
    permissions: Permission[]
}

export interface Permission {
    id: number
    name: string
    is_active: boolean
}
