import express from 'express';

const app = express();
const PORT = 3001;

app.get('/api/links', (req, res) => {

    const mockLinks = {
        links: [
            {id: 1, title: "Github", url: "https://github.com/erickgfs"},
            {id: 2, title: "Linkedin", url: "https://www.linkedin.com/in/erickgfs"}
        ],
        social: [
            {id: 1, title: "Instagram", url: "https://www.instagram.com/erick.kroghar"},
            {id: 2, title: "Facebook", url: "https://www.facebook.com/erickgfs"}
        ]
    };

    res.json(mockLinks);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})