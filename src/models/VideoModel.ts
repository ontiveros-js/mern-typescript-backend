import {Schema, model} from 'mongoose'

const VideoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
    },
    url:{
        type: String,
        trim: true,
        unique: true,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false,
})

export default model("videos", VideoSchema)