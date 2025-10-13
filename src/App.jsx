import { useState, useEffect } from 'react';

import { Profile } from "./components/Profile";
import { LinkButton } from "./components/LinkButton";
import { SocialIcons } from "./components/SocialIcons";
import "./globals.css"

export function App() {
  const [myLinks, setMyLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {

        const response = await fetch("http://localhost:3001/api/links");
        const data = await response.json();
        console.log(data)

        setMyLinks(data);
      } catch (error) {
        console.log(`Erro ao buscar dados da API: ${error}`);
      }

    }

    fetchLinks();
  },[])

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col items-center justify-center p-4">
      <Profile imgUrl="https://github.com/erickgfs.png" name="Erick Giovanni Fonseca Silva" profession="Desenvolvedor"/>
      {myLinks && myLinks.map( link => (
        link.type == "LINK" && (
          <LinkButton key={link.id} title={link.title} url={link.url}/>
        )
      ))}
      <div className="flex flex-row gap-3 p-5">
        {myLinks && myLinks.map( link => (
          link.type == "SOCIAL" && (
            <SocialIcons key={link.id} title={link.title} url={link.url}/>
          )
        ))}
      </div>
    </div>
  )
}