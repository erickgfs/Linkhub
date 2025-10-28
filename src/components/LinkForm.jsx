// src/components/LinkForm.jsx
import { useState, useEffect } from 'react';

// Props:
// - initialData (opcional): Para pré-preencher o form (usaremos no Editar)
// - onSubmit: Função chamada ao submeter com os dados do link
// - onCancel: Função chamada ao cancelar
// - isEditing (opcional): Flag para mudar texto do botão
export function LinkForm({ initialData = null, onSubmit, onCancel, isEditing = false }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('LINK'); // Valor padrão

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setUrl(initialData.url || '');
      setType(initialData.type || 'LINK');
    } else {
      setTitle('');
      setUrl('');
      setType('LINK');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, url, type });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white p-4 bg-slate-700 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Link' : 'Adicionar Novo Link'}</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-brand-gray">Título</label>
        <input
          type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
          className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white shadow-sm focus:ring-brand-purple focus:border-brand-purple"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-brand-gray">URL</label>
        <input
          type="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} required
          className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white shadow-sm focus:ring-brand-purple focus:border-brand-purple"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-brand-gray">Tipo</label>
        <select
          id="type" value={type} onChange={(e) => setType(e.target.value)} required
          className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white shadow-sm focus:ring-brand-purple focus:border-brand-purple"
        >
          <option value="LINK">Link Padrão</option>
          <option value="SOCIAL">Rede Social</option>
          <option value="PORTFOLIO">Portfólio</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button" onClick={onCancel}
          className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-brand-purple hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {isEditing ? 'Salvar Alterações' : 'Criar Link'}
        </button>
      </div>
    </form>
  );
}