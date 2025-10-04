import { Profile } from "./components/Profile";
import { LinkButton } from "./components/LinkButton";
import { SocialIcons } from "./components/SocialIcons";
import "./index.css"

export function App() {

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center text-white">
      <img className="w-24 h-24 rounded-full" src="https://github.com/erickgfs.png" alt="" />
      <h1 className="font-bold text-xl text-slate-300 mt-4 mb-2">Erick Giovanni Fonseca Silva</h1>
      <p className="font-bold text-xs text-slate-300 mb-8">Desenvolvedor</p>
      <LinkButton title="Github" url="https://github.com/erickgfs"/>
      <LinkButton title="Linkedin" url="https://www.linkedin.com/in/erickgfs"/>
      <Profile/>
      <div className="flex flex-row gap-3 p-5">
        <SocialIcons title="Instagram" url="https://www.instagram.com/erick.kroghar"/>
        <SocialIcons title="Facebook" url="https://www.facebook.com/erickgfs"/>
      </div>
    </div>
  )
}