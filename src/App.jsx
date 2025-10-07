import { Profile } from "./components/Profile";
import { LinkButton } from "./components/LinkButton";
import { SocialIcons } from "./components/SocialIcons";
import "./globals.css"

export function App() {

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col items-center justify-center p-4">
      <Profile imgUrl="https://github.com/erickgfs.png" name="Erick Giovanni Fonseca Silva" profession="Desenvolvedor"/>
      <LinkButton title="Github" url="https://github.com/erickgfs"/>
      <LinkButton title="Linkedin" url="https://www.linkedin.com/in/erickgfs"/>
      <div className="flex flex-row gap-3 p-5">
        <SocialIcons title="Instagram" url="https://www.instagram.com/erick.kroghar"/>
        <SocialIcons title="Facebook" url="https://www.facebook.com/erickgfs"/>
      </div>
    </div>
  )
}