// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):

import http from 'node:http';

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    // 1
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Olá, Mundo!");
        return;
    }

    // 2
    if (req.method === "GET" && req.url === "/sobre") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Sobre</h1>");
        return;
    }

    // 3
    if (req.method === "GET" && req.url.startsWith("/saudacao/")) {
        const url_completa = req.url.split('/')
        const nome = url_completa.at(-1)
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`Olá, ${nome}!`);
        return;
    }

    //4
    if (req.method === "POST" && req.url === "/echo") {
        let corpo = "";
        for await (const chunk of req) {
            corpo += chunk;
        }
        const contentType = req.headers["content-type"] || "text/html";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(corpo);
        return;
    }

    // 5
    if (req.method === "PUT" && req.url.startsWith("/itens/")) {
        const url_completa = req.url.split("/")
        const id = url_completa.at(-1)

        res.writeHead(200, {"Cntent-Type": "text/html"})
        res.end(`Item ${id} atualizado`)
        return;
    }

    // 6
    if (req.method === "DELETE" && req.url.startsWith("/itens/")) {
        const id = req.url.split("/").at(-1)

        if(!id || id === "itens") {
            res.writeHead(400, {"Content-Type": "text/html"})
            res.end("ID do item não informado");
            return;
        }

        res.writeHead(204, {"Content-Type": "text/html"})
        res.end()
        return;
    }

    // 7
    if (req.method === "PATCH" && req.url === "/config") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Configuração atualizada");
        return;
    }

    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("Não Encontrado");
});

server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
