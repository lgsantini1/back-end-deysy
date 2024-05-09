const { getTodosUsuarios, getUsuarioPorTelefone, getUsuarioPorId, insereUsuario, modificaUsuario, excluirUsuario } = require("../servicos/usuarios");

async function getUsuarios(req, res) {
    try {
        const usuarios = await getTodosUsuarios();
        console.log('Usuários obtidos:', usuarios);  // Log para verificar os dados obtidos
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);  // Log detalhado do erro
        res.status(500).json({ error: error.message });
    }
}
async function getUsuario(req, res) {
    try {
        const id = req.params.id;
        if (id && !isNaN(Number(id))) {
            const usuario = await getUsuarioPorId(id);
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } else {
            res.status(422).json({ error: "ID inválido" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getUsuarioTelefone(req, res) {
    const { telefone } = req.params;
    console.log('Request for telefone:', telefone);  // Debug log to check incoming phone number
    try {
        await getUsuarioPorTelefone(telefone)
            .then(usuario => {
                if (usuario) {
                    res.json(usuario);
                } else {
                    res.status(404).json({ error: "Usuário não encontrado" });
                }
            })
            .catch(error => {
                console.error('Database error:', error);
                res.status(500).json({ error: error.message });
            });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
}


function postUsuario(req, res) {
    try {
        const usuarioNovo = req.body;
        if (usuarioNovo.nomeusuario) {
            insereUsuario(usuarioNovo);
            res.status(201).json({ message: "Usuário inserido com sucesso" });
        } else {
            res.status(422).json({ error: "O campo nome é obrigatório!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

function patchUsuario(req, res) {
    try {
        const id = req.params.id;
        if (id && !isNaN(Number(id))) {
            const body = req.body;
            const updated = modificaUsuario(body, id);
            if (updated) {
                res.json({ message: "Usuário modificado com sucesso" });
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } else {
            res.status(422).json({ error: "ID inválido" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

function deleteUsuario(req, res) {
    try {
        const id = req.params.id;
        if (id && !isNaN(Number(id))) {
            const deleted = excluirUsuario(id);
            if (deleted) {
                res.json({ message: "Usuário removido com sucesso" });
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } else {
            res.status(422).json({ error: "ID inválido" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsuarios,
    getUsuarioTelefone,
    getUsuario,
    postUsuario,
    patchUsuario,
    deleteUsuario
};
