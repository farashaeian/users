import { CardProps } from "@/types"
import userAvatar from '@/public/assets/user.png'

const Card = ({ avatar, first_name, last_name, email, onClick }: CardProps) => {
    return (
        <div className="card-container"
            onClick={onClick}
        >
            <img src={avatar ? avatar : userAvatar.src} alt={`${first_name} ${last_name}`} className="rounded aspect-square h-32 w-32" />
            <div className="flex flex-col justify-end">
                <p>{first_name} {last_name}</p>
                {email && <p className="text-xs">{email}</p>}
            </div>
        </div>
    )
}

export default Card