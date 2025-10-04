export function SocialIcons({title, url}) {
    return (
        <a className="hover:text-purple-500" href={url}>{title}</a>
    )
}