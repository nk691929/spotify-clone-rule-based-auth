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

async function getAllMusics(req, res) {
    const musics = await musicModel
        .find()
        .limit(2)
        .populate('artist', "username email")

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics
    })
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email")
    res.status(200).json({
        message: "Album fetched successfully",
        albums: albums
    })
}

async function getAlbumById(req, res) {
    const albumId = req.params.albumId
    const album = await albumModel.findById(albumId).populate('artist', 'username email').populate('musics')

    res.status(200).json({
        message: "Album fetched Successfully",
        album: album
    })

}

export default { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }