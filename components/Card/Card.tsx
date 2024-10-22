import { UserInfo } from "@/types"

const Card = ({ avatar, first_name, last_name, email, onClick }: UserInfo) => {
    return (
        <div className="card-container"
            onClick={onClick}
        >
            <img src={avatar} alt={`${first_name} ${last_name}`} className="rounded aspect-square" />
            <div className="flex flex-col justify-end">
                <p>{first_name} {last_name}</p>
                <p className="text-xs">{email}</p>
            </div>
        </div>
    )
}

export default Card