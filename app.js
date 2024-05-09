const express=require("express")
const rotaUsuario=require("./rotas/usuario")
const rotaFavorito=require("./rotas/favorito")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors({origin:"*"}))

app.use('/usuarios',rotaUsuario)
app.use('/favoritos',rotaFavorito)

const port=8000


app.listen(port,()=>{
    console.log(`Escutando a porta ${port}`)
})

