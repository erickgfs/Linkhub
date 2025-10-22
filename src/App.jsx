import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import "./styles/globals.css"

export function App() {
  return (
    <div className='bg-brand-dark min-h-screen flex flex-col items-center justify-center p-4'>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}