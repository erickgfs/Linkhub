export function LinkButton({title, url}) {
    return (
        <a className="bg-brand-purple text-brand-light font-bold w-full max-w-xs rounded-lg text-center hover:scale-105 transition-transform p-4 mb-4" href={url}>{title}</a>
    )
}