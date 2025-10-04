export function LinkButton({title, url}) {
    return (
        <a className="bg-violet-500 w-md p-4 rounded-lg text-center hover:scale-105 transition-all mb-4" href={url}>{title}</a>
    )
}