import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useNotification = () => {

    const openNotification = (
        type: NotificationType,
        message: string,
        description: string,
        duration: number = 4.5
    ) => {
        console.log('Opening notification:', { type, message, description, duration });
        notification[type]({
            message,
            description,
            duration,
        });
    };

    return { openNotification };
};

export default useNotification;