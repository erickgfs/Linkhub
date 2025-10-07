import { Profile } from "./components/Profile";
import { LinkButton } from "./components/LinkButton";
import { SocialIcons } from "./components/SocialIcons";
import "./globals.css"

export function App() {

  const myLinks = {
    links: [
      {id: 1, title: "Github", url: "https://github.com/erickgfs"},
      {id: 2, title: "Linkedin", url: "https://www.linkedin.com/in/erickgfs"}
    ],
    social: [
      {id: 1, title: "Instagram", url: "https://www.instagram.com/erick.kroghar"},
      {id: 2, title: "Facebook", url: "https://www.facebook.com/erickgfs"}
    ]
  }

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col items-center justify-center p-4">
      <Profile imgUrl="https://github.com/erickgfs.png" name="Erick Giovanni Fonseca Silva" profession="Desenvolvedor"/>
      {myLinks.links.map( link => (
        <LinkButton key={link.id} title={link.title} url={link.url}/>
      ))}
      <div className="flex flex-row gap-3 p-5">
        {myLinks.social.map( link => (
          <SocialIcons key={link.id} title={link.title} url={link.url}/>
        ))}
      </div>
    </div>
  )
}