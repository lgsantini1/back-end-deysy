const fs=require("fs")

const dadosAtuais=JSON.parse(fs.readFileSync("livros.json"))
const novoDado={ id: '4', nome: 'livro4' }

fs.writeFileSync("livros.json",JSON.stringify([...dadosAtuais,novoDado]))

console.log(JSON.parse(fs.readFileSync("livros.json")))