export interface UserInfo {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}
const Card = ({ avatar, first_name, last_name, email }: UserInfo) => {
    return (
        <div className="w-full p-4 rounded flex flex-col md:flex-row justify-start gap-2 border-2 border-solid border-fuchsia-300	hover:border-fuchsia-600 hover:shadow-2xl ">
            <img src={avatar} alt={`${first_name} ${last_name}`} className="rounded aspect-square"/>
            <div className="flex flex-col justify-end">
                <p>{first_name} {last_name}</p>
                <p className="text-xs">{email}</p>
            </div>
        </div>
    )
}

export default Card