import { notification } from 'ant-design-vue'

export const antToast = async (message: string, desc: string, type: string) => {
    notification.open({
        message: message,
        description: desc,
        type: type ,
    })
}