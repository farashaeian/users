import Image from "next/image"
import loading from '@/public/assets/loading.gif'

const Loading = () => {
    return (
            <Image
                src={loading}
                alt="loading"
                className="mb-20 rounded-3xl"
                height={500}
                width={500}
                priority
            />
    )
}
export default Loading