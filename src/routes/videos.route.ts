import {Router} from 'express'
const router = Router()
import * as control from '../controllers/video.controller'

router.route("/videos")
    .get(control.getVideos)
    .post(control.createVideo)

router.route("/videos/:id")
    .get(control.getVideo)
    .delete(control.deleteVideo)
    .put(control.updateVideo)


export default router