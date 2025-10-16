import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get('/api/links', async (req, res) => {

    try {
        const links = await prisma.link.findMany();

        res.json(links);

    } catch(error) {
        console.error(`Erro ao buscar links:${error}`);
        res.status(500).json({ error: "Não foi possivel buscar os links." })
    }
});

app.post('/api/links', async (req, res) => {
    const { title, url, type } = req.body;

    if (!title || !url || !type) {
        return res.status(400).json({ error: 'Titulo, URL e tipo são obrigatórios.'});
    }

    try {
        const newLink = await prisma.link.create({
            data: {
                title: title,
                url: url,
                type: type
            }
        });

        res.status(201).json(newLink);
    } catch (error) {
        console.error('Erro ao criar link:', error);
        res.json(500).json(({ error: 'Não foi possivel criar o link.'}));
    }
});

app.put('/api/links/:id', async (req, res) => {
    const { id } = req.params; // passados em rota
    const { title, url, type } = req.body;

    if (!title || !url || !type) {
        return res.status(400).json({ error: 'Titulo, URL e tipo são obrigatórios.'});
    }

    try {
        const updateLink = await prisma.link.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                url: url,
                type: type
            }
        });

        res.json(updateLink);
    } catch (error) {
        console.error('Erro ao atualizar link:', error);
        if (error.code === 'P2025') {
            res.json(404).json(({ error: 'Link não encontrado.'}));
        }
        res.json(500).json(({ error: 'Não foi possível atualizar o link.'}));
    }
});

app.delete('/api/links/:id', async (req, res) => {
    const { id } = req.params; // passados em rota

    try {
        await prisma.link.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar link:', error);
        if (error.code === 'P2025') {
            res.json(404).json(({ error: 'Link não encontrado.'}));
        }
        res.json(500).json(({ error: 'Não foi possível deletar o link.'}));
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});