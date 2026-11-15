import express from 'express'
import musicController from '../controllers/music.controller.js'
import multer from 'multer'

const upload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router()

router.post('/create-music', upload.single('music'), musicController.createMusic)
router.post("/create-album",musicController.createAlbum)

export default router