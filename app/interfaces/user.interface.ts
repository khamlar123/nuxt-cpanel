export interface UserInterface {
    id: number
    employee_id: string
    password: string
    role: Role
    role_id: number
    name: string
    is_active: boolean
    is_admin: boolean
    phone: string
    email: string
    branch_id: number
}

export interface Role {
    id: number
    name: string
    permissions: Permission[]
}

export interface Permission {
    id: number
    name: string
}
