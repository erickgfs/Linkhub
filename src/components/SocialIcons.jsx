export function SocialIcons({title, url}) {
    return (
        <a className="text-brand-light hover:text-purple-500" href={url}>{title}</a>
    )
}