import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 3001;

app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})