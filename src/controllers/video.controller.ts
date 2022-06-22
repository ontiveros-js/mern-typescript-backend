import {RequestHandler} from 'express'
import VideoModel from '../models/VideoModel'

export const getVideos : RequestHandler = async (req, res) => {
    try {
        const allvideos = await VideoModel.find().sort({updatedAt: -1})
        res.json(allvideos)
    } catch (error) {

        console.log(`${error} error in getVideos*********`)
    }
}

export const createVideo : RequestHandler = async (req, res) => {
    try {

        const {title, description, url} = req.body

        const titleExist = await VideoModel.findOne({title})

        if(titleExist) return res.status(202).json("El titulo ya existe")

        const urlExist = await VideoModel.findOne({url})

        if(urlExist) return res.status(202).json("La URL ya existe")

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

        await VideoModel.findByIdAndDelete(id)

        res.json("deleting video")

    } catch (error) {
        console.log(`${error} error in deleteVideo******`)
    }
}

export const updateVideo : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id

        
        const updatedVideo = await VideoModel.findByIdAndUpdate(id, req.body, {new: true})

        res.json(updatedVideo)
    } catch (error) {
        res.json(error)
        console.log(`${error} error in updateVideo******`)
    }
}

export const getVideo : RequestHandler = async (req, res) => {
    try {
        const id = req.params.id

        const aVideo = await VideoModel.findById({_id: id})

        res.json(aVideo)

    } catch (error) {
        console.log(`${error} error in getVideo********`)
    }
}
