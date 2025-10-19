import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { isAdmin } from "../middleware/isAdmin.js"
import { singleUpload } from "../middleware/multer.js"
import {createBlog, deleteBlog, dislikeBlog, getAllBlogs, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog, uploadEditorAsset, proxyDownload } from "../controllers/blog.controller.js"

const router = express.Router()

router.route("/").post(isAuthenticated, isAdmin, createBlog)
router.route("/:blogId").put(isAuthenticated, isAdmin, singleUpload, updateBlog)
router.route("/:blogId").patch(isAuthenticated, isAdmin, togglePublishBlog);
router.route("/get-all-blogs").get(getAllBlogs)
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs)
router.route("/delete/:id").delete(isAuthenticated, isAdmin, deleteBlog);
router.get("/:id/like", isAuthenticated, likeBlog);
router.get("/:id/dislike", isAuthenticated, dislikeBlog);
router.get('/my-blogs/likes', isAuthenticated, getMyTotalBlogLikes)
router.post('/upload-editor-asset', isAuthenticated, isAdmin, singleUpload, uploadEditorAsset)
router.get('/proxy-download', proxyDownload)

export default router;