import {RequestHandler} from 'express'
import VideoModel from '../models/VideoModel'

export const getVideos : RequestHandler = async (req, res) => {
    try {
        const allvideos = await VideoModel.find()
        res.json(allvideos)
    } catch (error) {
        console.log(`${error} error in getVideos*********`)
    }
}

export const createVideo : RequestHandler = async (req, res) => {
    try {

        const {title, description, url} = req.body

        if(!title || !url) return res.json("missing data")

        const titleExist = await VideoModel.findOne({title})
        const urlExist = await VideoModel.findOne({url})

        if(titleExist || urlExist) return res.json("repeated data")

        const newVideo = new VideoModel({title, description, url})

        await newVideo.save()

        res.json(newVideo)
        
    } catch (error) {
        console.log(`${error} error in createVideo*******`)
    }
}

export const deleteVideo : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id

        if(!id || !(id.length === 24)) return res.json("missing params")

        const videoExist = await VideoModel.findById(id)

        if(!videoExist) return res.json("video does not exist")

        await VideoModel.findByIdAndDelete(id)

        res.json("deleting video")

    } catch (error) {
        console.log(`${error} error in deleteVideo******`)
    }
}

export const updateVideo : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id

        if(!id || !(id.length === 24)) return console.log("missing params") //res.json("missing params")

        const videoExist = await VideoModel.findById(id)

        if(!videoExist) return console.log("video does not exist") //res.json("video does not exist")

        if(req.body.title){
            const titleExist = await VideoModel.findOne({title: req.body.title})
            if(titleExist) res.json("title does not exist")
        }

        const updatedVideo = await VideoModel.findByIdAndUpdate(id, req.body, {new: true})

        res.json(updatedVideo)
    } catch (error) {
        
        console.log(`${error} error in updateVideo******`)
    }
}

export const getVideo : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) return res.json("missing params")

        const aVideo = await VideoModel.findById({_id: id})

        if(!aVideo) return res.json("Video does not exist") 

        res.json(aVideo)

    } catch (error) {
        console.log(`${error} error in getVideo********`)
    }
}

export const getVideoTitle : RequestHandler = async (req, res) => {
    try {
        const title = req.params.title

        const aVideoTitle = await VideoModel.findOne({title: title})

        if(aVideoTitle) return res.json("Video already exists")

        res.json("continue")
    } catch (error) {
        console.log(`${error} error in getVideoTitle********`)
    }
}

export const getVideoUrl : RequestHandler = async (req, res) => {
    try {
        const url = req.params.url

        const aVideoUrl = await VideoModel.findOne({ url : url})

        if(aVideoUrl) return res.json("Url already exists")

        res.json("continue")
    } catch (error) {
        console.log(`${error} error in getVideoUrl********`)
    }
}