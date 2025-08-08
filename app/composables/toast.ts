import { notification } from 'ant-design-vue'

export const antToast = async (mesaage: string, desc: string, type: string) => {
    notification.open({
        message: mesaage,
        description: desc,
        type: type,
    })
}