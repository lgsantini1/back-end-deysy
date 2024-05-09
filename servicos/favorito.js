const fs=require("fs")

function getTodosFavoritos(){
    const livros=JSON.parse(fs.readFileSync("favoritos.json"))
    return livros
}

function deleteFavoritoPorId(id){
    const livros=JSON.parse(fs.readFileSync("favoritos.json"))
    const livrosFiltrados=livros.filter(livro=>livro.id!==id)
    fs.writeFileSync("favoritos.json",JSON.stringify(livrosFiltrados))
}

function insereFavorito(id){
    const livros=JSON.parse(fs.readFileSync("livros.json"))
    const favoritos=JSON.parse(fs.readFileSync("favoritos.json"))
    const novoLivroFavorito= livros.filter(livro=>livro.id===id)[0]
    const novaListaDeFavoritos=[...favoritos,novoLivroFavorito]
    fs.writeFileSync("favoritos.json",JSON.stringify(novaListaDeFavoritos))
}

module.exports={
    getTodosFavoritos,
    deleteFavoritoPorId,
    insereFavorito
}