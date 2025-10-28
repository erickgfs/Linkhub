import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LinkForm } from '../../components/LinkForm.jsx'

export function Dashboard() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  const handleOpenEditModal = (linkToEdit) => {
    setEditingLink(linkToEdit); // Guarda o link a ser editado
    setIsModalOpen(true);    // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLink(null); // Limpa o estado de edição ao fechar
  };

  const handleDelete = async (idToDelete) => {
    if (!window.confirm(`Tem certeza que deseja apagar o link com ID ${idToDelete}?`)) return;

    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Erro de autenticação. Faça login novamente.');
        navigate('/login');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/links/${idToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.status === 204) {
        setLinks(currentLinks => currentLinks.filter(link => link.id !== idToDelete));
      } else if (response.status === 401 || response.status === 403) {
        setError('Erro de autorização. Faça login novamente.');
        navigate('/login');
      } else if (response.status === 404) {
        setError('Link não encontrado no servidor.');
        setLinks(currentLinks => currentLinks.filter(link => link.id !== idToDelete));
      } else {
        const data = await response.json();
        setError(data.error || 'Erro ao apagar o link.');
      }
      
    } catch (err) {
      console.error("Erro ao deletar link:", err);
      setError('Erro de rede ao tentar apagar o link.');
    }
  }

  const handleCreate = async (linkData) => {
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado');

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(linkData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      const newLink = await response.json();
      // SUCESSO! Adicione o novo link ao estado local
      setLinks(currentLinks => [newLink, ...currentLinks]); // Adiciona no início da lista
      setIsModalOpen(false); // Fecha o modal

    } catch (err) {
      console.error("Erro ao criar link:", err);
      setError(err.message || 'Erro ao criar o link.');
      // Não fechamos o modal em caso de erro, para o usuário ver a mensagem (se houver)
    }
  };

  const handleUpdate = async (linkData) => {
    if (!editingLink) return; // Segurança

    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado');

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/links/${editingLink.id}`, { // Usa o ID do link em edição
        method: 'PUT', // <-- MÉTODO PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(linkData), // Envia os novos dados
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      const updatedLink = await response.json();
      // SUCESSO! Atualize o link no estado local
      setLinks(currentLinks => 
        currentLinks.map(link => 
          link.id === updatedLink.id ? updatedLink : link // Substitui o link antigo pelo atualizado
        )
      );
      handleCloseModal(); // Fecha o modal

    } catch (err) {
      console.error("Erro ao atualizar link:", err);
      setError(err.message || 'Erro ao atualizar o link.');
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/links`);

        if(!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setLinks(data);
        
      } catch(err) {
        console.error('Erro ao buscar links:', err);
        setError('Falha ao carregar links. Tente novamente.');
      } finally {
        setLoading(false); // Finaliza o carregamento (sucesso ou erro)
      }
    };
    fetchLinks();
  }, [])

  if (loading) {
    return <p className='text-white'>Carregando links...</p>;
  }

  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  // 4. Renderização da Lista de Links (Simples por enquanto)
  return (
    <div className='text-white w-full max-w-4xl p-4'>
      <h1 className='text-3xl font-bold mb-6'>Painel de Controle</h1>

      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          + Adicionar Novo Link
        </button>
      </div>

      <div className='bg-slate-800 rounded-lg shadow p-4 mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Meus Links</h2>
        {links.length === 0 ? (
          <p className='text-brand-gray'>Nenhum link cadastrado ainda.</p>
        ) : (
          <ul>
            {links.map((link) => (
              <li key={link.id} className='border-b border-slate-700 py-3 flex justify-between items-center'>
                <div>
                  <span className='font-medium'>{link.title}</span>
                  <span className='text-sm text-brand-gray ml-2'>({link.type})</span>
                  <p className='text-xs text-blue-400 break-all'>{link.url}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(link)} // <-- Chama a nova função
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)} // Chama a função passando o ID
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                  >
                    Apagar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Futuro: Botão de Logout */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <LinkForm 
            initialData={editingLink} 
            onSubmit={editingLink ? handleUpdate : handleCreate} 
            onCancel={handleCloseModal} 
            isEditing={!!editingLink} 
          />
        </div>
      )}
    </div>
  );
}