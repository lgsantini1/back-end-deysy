const { getTodosFavoritos, deleteFavoritoPorId,insereFavorito } = require("../servicos/favorito")


function getFavoritos(req,res){
    try {
        const livros=getTodosFavoritos()
        res.send(livros)
    } catch (error) {
     res.send(error.message)
    }
}

function postFavorito(req, res) {
    try {
        const id = req.params.id
        insereFavorito(id)
        res.status(201)
        res.send("Livro inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function deleteFavorito(req,res){
    try {
        const id=req.params.id

        if (id && Number(id)) {
            deleteFavoritoPorId(id)
            res.status(200)
            res.send("Livro Removido com sucesso!")
        } else {
            res.status(422)
            res.send("Id Invalido")
        }
    } catch (error) {
     res.send(error.message)
    }
}

module.exports={
    getFavoritos,
    postFavorito,
    deleteFavorito
}