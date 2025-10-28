import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Token recebido', data.token);
                localStorage.setItem('authToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.Error || 'Falha no login. Verifique suas credenciais.');
            }
        } catch (err) {
            console.error('Erro na requisição de login:', err);
            setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
        }
    };


    return (
        <div className='text-white w-full max-w-md p-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>Login do Admin</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        id='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white shadow-sm focus:ring-brand-purple focus:border-brand-purple'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Senha</label>
                    <input 
                        type='password' 
                        id='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white shadow-sm focus:ring-brand-purple focus:border-brand-purple'
                        required
                    />
                </div>
                <button type='submit' className='w-full bg-brand-purple text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all'>Entrar</button>

                <p className='text-red-500 text-sm text-center'>{error}</p>
            </form>
        </div>
    );
}