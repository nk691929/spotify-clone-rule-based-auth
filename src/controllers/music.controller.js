import jwt from 'jsonwebtoken';
import musicModel from '../models/music.model.js'
import uploadFile from '../services/storage.service.js'


async function createMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            reason: error.message
        });
    }

    if (decoded.role !== 'artist') {
        return res.status(401).json({
            message: "You dont have access to create music",
        });
    }



    const { title } = req.body;
    const file = req.file;

    const response = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
        url: response.url,
        fileId: response.fileId,
        title,
        artist: decoded.id
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

export default { createMusic }