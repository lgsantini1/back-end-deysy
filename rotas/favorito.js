const {Router}=require("express")
const { getFavoritos, deleteFavorito, postFavorito } = require("../controladores/favorito")

const router=Router()

router.get('/',getFavoritos)

router.delete('/:id',deleteFavorito)

router.post('/:id', postFavorito)

module.exports=router