import {connect} from 'mongoose'

const URI = process.env.URI_MONGO!;

 (async () => {
    try {
       await connect(URI)
        console.log("database connected")
    } catch (error) {
        console.log(`${error} here is the error*********in the connection mongodb`)
    }
})()