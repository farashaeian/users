import { Message as MessageType } from "@/types"

const Message = ({ text, type }: MessageType) => {
    const color = {
        error: 'text-red-500',
        info: 'text-dark-500'
    }
    return (
        <div className={`${color[type]} text-xl`}>
            {text}
        </div>
    )
}
export default Message