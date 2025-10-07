export function Profile({imgUrl, name, profession}) {
    return (
        <div className="flex flex-col items-center justify-center p-4 gap-2">
            <img className="w-24 h-24 rounded-full mb4" src={imgUrl} alt="" />
            <h1 className="text-brand-light text-xl font-bold">{name}</h1>
            <p className="text-brand-gray font-medium">{profession}</p>
        </div>
    )
}