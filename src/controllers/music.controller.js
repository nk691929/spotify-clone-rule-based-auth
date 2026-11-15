import jwt from 'jsonwebtoken';
import musicModel from '../models/music.model.js'
import uploadFile from '../services/storage.service.js'
import albumModel from '../models/album.model.js';


async function createMusic(req, res) {
    const { title } = req.body;
    const file = req.file;

    const response = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
        url: response.url,
        fileId: response.fileId,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message: "Music created Successfully",
        music: {
            id: music.id,
            url: music.url,
            fileId: music.fileId,
            title: music.title,
            artist: music.artist
        }
    })

}

async function createAlbum(req, res) {
    const { title, musics } = req.body

    const album = await albumModel.create({
        title,
        musics,
        artist: req.user.id
    })

    res.status(201).json({
        message: "Album created Successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })
}

export default { createMusic, createAlbum }