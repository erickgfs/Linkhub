import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from './middleware/auth.js'
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

app.post('/api/links', authMiddleware, async (req, res) => {
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

app.put('/api/links/:id', authMiddleware, async (req, res) => {
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

app.delete('/api/links/:id', authMiddleware, async (req, res) => {
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

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' })
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            id: admin.id,
            email: admin.email,
        });

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Este email ja está em uso.' });
        }
        console.error('Erro ao registrar admin:', error);
        res.status(500).json({ error: 'Não foi possível registrar o administrador.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' })
    }

    try {
        const admin = await prisma.admin.findUnique({
            where: {
                email
            },
        })

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!admin || !isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' })
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ token: token });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});