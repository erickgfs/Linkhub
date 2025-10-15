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
        console.error("Erro ao criar link:", error);
        res.json(500).json(({ error: "Não foi possivel criar o link."}));
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})