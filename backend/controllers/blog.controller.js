import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { isValidMainCategory, areValidSubcategories, areValidTransversal } from "../constants/categories.js";
import { Readable } from "stream";

// Create a new blog post
export const createBlog = async (req,res) => {
    try {
        let { title, category, mainCategory, subcategories, transversalTags } = req.body;
        if(!title) {
            return res.status(400).json({
                message:"Blog title is required."
            })
        }
        // Normalize inputs
        mainCategory = mainCategory || "Uncategorized";
        if (typeof subcategories === 'string') subcategories = [subcategories];
        if (typeof transversalTags === 'string') transversalTags = [transversalTags];
        subcategories = Array.isArray(subcategories) ? subcategories : [];
        transversalTags = Array.isArray(transversalTags) ? transversalTags : [];

        // Validate taxonomy
        if (!isValidMainCategory(mainCategory)) {
            return res.status(400).json({ message: "Invalid mainCategory" });
        }
        if (!areValidSubcategories(mainCategory, subcategories)) {
            return res.status(400).json({ message: "Invalid subcategories for selected mainCategory" });
        }
        if (!areValidTransversal(transversalTags)) {
            return res.status(400).json({ message: "Invalid transversalTags" });
        }

        const blog = await Blog.create({
            title,
            category, // legacy preservation if provided
            mainCategory,
            subcategories,
            transversalTags,
            author:req.id
        })

        return res.status(201).json({
            success:true,
            blog,
            message:"Blog Created Successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create blog"
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        let { title, subtitle, description, category, mainCategory, subcategories, transversalTags } = req.body;
        const file = req.file;

        let blog = await Blog.findById(blogId).populate("author");
        if(!blog){
            return res.status(404).json({
                message:"Blog not found!"
            })
        }
        let thumbnail;
        if (file) {
            const fileUri = getDataUri(file)
            thumbnail = await cloudinary.uploader.upload(fileUri)
        }

        // Normalize and validate taxonomy if provided
        if (typeof subcategories === 'string') subcategories = [subcategories];
        if (typeof transversalTags === 'string') transversalTags = [transversalTags];
        const updateData = { title, subtitle, description, category, author: req.id, thumbnail: thumbnail?.secure_url };
        if (mainCategory !== undefined) {
            if (!isValidMainCategory(mainCategory)) {
                return res.status(400).json({ success:false, message: "Invalid mainCategory" });
            }
            updateData.mainCategory = mainCategory;
        }
        if (subcategories !== undefined) {
            subcategories = Array.isArray(subcategories) ? subcategories : [];
            const toValidateMain = updateData.mainCategory || (await Blog.findById(blogId))?.mainCategory || "Uncategorized";
            if (!areValidSubcategories(toValidateMain, subcategories)) {
                return res.status(400).json({ success:false, message: "Invalid subcategories for selected mainCategory" });
            }
            updateData.subcategories = subcategories;
        }
        if (transversalTags !== undefined) {
            transversalTags = Array.isArray(transversalTags) ? transversalTags : [];
            if (!areValidTransversal(transversalTags)) {
                return res.status(400).json({ success:false, message: "Invalid transversalTags" });
            }
            updateData.transversalTags = transversalTags;
        }

        blog = await Blog.findByIdAndUpdate(blogId, updateData, {new:true});

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const { mainCategory, tag } = req.query;
        const query = {};
        if (mainCategory) query.mainCategory = mainCategory;
        if (tag) query.$or = [{ subcategories: tag }, { transversalTags: tag }];

        const blogs = await Blog.find(query).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'firstName lastName photoUrl'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'userId',
                select: 'firstName lastName photoUrl'
            }
        });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
};

export const getPublishedBlog = async (req,res) => {
    try {
        const { mainCategory, tag } = req.query;
        const query = { isPublished: true };
        if (mainCategory) query.mainCategory = mainCategory;
        if (tag) query.$or = [{ subcategories: tag }, { transversalTags: tag }];

        const blogs = await Blog.find(query).sort({ createdAt: -1 }).populate({path:"author", select:"firstName lastName photoUrl"}).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'userId',
                select: 'firstName lastName photoUrl'
            }
        });
        if(!blogs){
            return res.status(404).json({
                message:"Blog not found"
            })
        }
        return res.status(200).json({
            success:true,
            blogs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get published blogs"
        })
    }
}

export const togglePublishBlog = async (req,res) => {
    try {
        const {blogId} = req.params;
        const {publish} = req.query; // true, false
        console.log(req.query);
        
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({
                message:"Blog not found!"
            });
        }
        // publish status based on the query paramter
        blog.isPublished = !blog.isPublished
        await blog.save();

        const statusMessage = blog.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            success:true,
            message:`Blog is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to update status"
        })
    }
}

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id; // Assuming `req.id` contains the authenticated user’s ID

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const blogs = await Blog.find({ author: userId }).populate({
            path: 'author',
            select: 'firstName lastName photoUrl'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'userId',
                select: 'firstName lastName photoUrl'
            }
        });;

        if (!blogs) {
            return res.status(404).json({ message: "No blogs found.", blogs: [], success: false });
        }

        return res.status(200).json({ blogs, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const authorId = req.id
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        if (blog.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: 'Unauthorized to delete this blog' });
        }

        // Delete blog
        await Blog.findByIdAndDelete(blogId);

        // Delete related comments
        await Comment.deleteMany({ postId: blogId });


        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
};

export const likeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const likeKrneWalaUserKiId = req.id;
        const blog = await Blog.findById(blogId).populate({path:'likes'});
        if (!blog) return res.status(404).json({ message: 'Blog not found', success: false })

        // Check if user already liked the blog
        // const alreadyLiked = blog.likes.includes(userId);

        //like logic started
        await blog.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        await blog.save();


        return res.status(200).json({ message: 'Blog liked', blog, success: true });
    } catch (error) {
        console.log(error);

    }
}


export const dislikeBlog = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: 'post not found', success: false })

        //dislike logic started
        await blog.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await blog.save();

        return res.status(200).json({ message: 'Blog disliked', blog, success: true });
    } catch (error) {
        console.log(error);

    }
}

export const getMyTotalBlogLikes = async (req, res) => {
    try {
      const userId = req.id; // assuming you use authentication middleware
  
      // Step 1: Find all blogs authored by the logged-in user
      const myBlogs = await Blog.find({ author: userId }).select("likes");
  
      // Step 2: Sum up the total likes
      const totalLikes = myBlogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0);
  
      res.status(200).json({
        success: true,
        totalBlogs: myBlogs.length,
        totalLikes,
      });
    } catch (error) {
      console.error("Error getting total blog likes:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch total blog likes",
      });
    }
  };

// Upload asset for rich text editor (images)
export const uploadEditorAsset = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success:false, message: 'No file uploaded' });
        }
        const fileUri = getDataUri(file)
        // Decide type based on mimetype
        const mime = file.mimetype || '';
        const isVideo = mime.startsWith('video/');
        const isImage = mime.startsWith('image/');
        let type = 'file';
        if (isVideo) type = 'video';
        else if (isImage) type = 'image';

        // Use resource_type:auto to allow images, videos, pdf, etc.
        const uploaded = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' })
        // Jodit expects { files: [url] } by default
        return res.status(200).json({ success:true, url: uploaded.secure_url, files: [uploaded.secure_url], type });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success:false, message: 'Failed to upload asset', error: error?.message });
    }
}

// Stream a remote file and force browser download (Cloudinary only for safety)
export const proxyDownload = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url || !/^https?:\/\//i.test(url)) {
            return res.status(400).json({ success:false, message: 'Invalid url' });
        }
        const allow = /^(https?:\/\/res\.cloudinary\.com\/)/i.test(url);
        if (!allow) {
            return res.status(403).json({ success:false, message: 'Domain not allowed' });
        }
        const upstream = await fetch(url);
        if (!upstream.ok || !upstream.body) {
            return res.status(502).json({ success:false, message: 'Upstream fetch failed' });
        }
        const nameFromUrl = url.split('?')[0].split('/').pop() || 'document';
        res.setHeader('Content-Disposition', `attachment; filename="${nameFromUrl}"`);
        const ctype = upstream.headers.get('content-type');
        if (ctype) res.setHeader('Content-Type', ctype);
        Readable.fromWeb(upstream.body).pipe(res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success:false, message: 'Failed to proxy download', error: error?.message });
    }
}