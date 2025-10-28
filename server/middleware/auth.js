import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // (token) do cabeçalho da requisição
    const authHeader = req.headers['authorization'];

    // O cabeçalho vem no formato "Bearer <token>"
    // Se ele existir, pegamos apenas a parte do token
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' })
    }

    try {
        // jwt.verify() decodifica o token usando nosso segredo
        // Se o token for inválido ou expirado, ele vai disparar um ERRO (que o 'catch' vai pegar)
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = payload;

        // caso tudo de certo passa para o proximo destino.
        next();
    } catch (error) {
        console.error('Erro com token', error)
        res.status(403).json({ error: 'Acesso negado. Token invalido.' })
    }
}

export default authMiddleware;