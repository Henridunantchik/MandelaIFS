    const forceDownloadUrl = (url) => {
        try {
            // Only adjust Cloudinary URLs
            const isCloudinary = /https?:\/\/res\.cloudinary\.com\//.test(url);
            if (!isCloudinary) return url;
            // Insert fl_attachment transformation after 'upload/' if not present
            if (url.includes('/upload/')) {
                if (!/\/upload\/.*fl_attachment/.test(url)) {
                    return url.replace('/upload/', '/upload/fl_attachment/');
                }
            }
            return url;
        } catch { return url; }
    }
    const proxyDownloadUrl = (url) => `${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/proxy-download?url=${encodeURIComponent(url)}`
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '@/lib/api'
import { toast } from 'sonner'
import { setBlog } from '@/redux/blogSlice'
import { MAIN_CATEGORIES, SUBCATEGORIES_MAP, TRANSVERSAL_TAGS } from '@/constants/categories'

const UpdateBlog = () => {
    const editor = useRef(null);
   
    const [loading, setLoading] = useState(false)
    const [publish, setPublish] = useState(false)
    const params = useParams()
    const id = params.blogId
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const selectBlog = blog.find(blog => blog._id === id)
    const [content, setContent] = useState(selectBlog?.description || "");

    const [blogData, setBlogData] = useState({
        title: selectBlog?.title,
        subtitle: selectBlog?.subtitle,
        description: content,
        mainCategory: selectBlog?.mainCategory || '',
        subcategories: selectBlog?.subcategories || [],
        transversalTags: selectBlog?.transversalTags || [],
    });
    const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // When the selected blog becomes available or changes, sync form fields
    useEffect(()=>{
        if (selectBlog) {
            setBlogData(prev=> ({
                ...prev,
                title: selectBlog.title || prev.title || '',
                subtitle: selectBlog.subtitle || prev.subtitle || '',
                mainCategory: selectBlog.mainCategory || prev.mainCategory || '',
                subcategories: selectBlog.subcategories || prev.subcategories || [],
                transversalTags: selectBlog.transversalTags || prev.transversalTags || [],
            }))
            setContent(selectBlog.description || '')
        }
    }, [selectBlog?._id])

    const selectMainCategory = (value) => {
        setBlogData({ ...blogData, mainCategory: value, subcategories: [] });
    };
    const toggleSubcategory = (tag) => {
        setBlogData(prev=> ({ ...prev, subcategories: prev.subcategories.includes(tag) ? prev.subcategories.filter(t=>t!==tag) : [...prev.subcategories, tag] }))
    }
    const toggleTransversal = (tag) => {
        setBlogData(prev=> ({ ...prev, transversalTags: prev.transversalTags.includes(tag) ? prev.transversalTags.filter(t=>t!==tag) : [...prev.transversalTags, tag] }))
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBlogData({ ...blogData, thumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const editorConfig = {
        uploader: {
            url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/upload-editor-asset`,
            format: 'json',
            method: 'POST',
            withCredentials: true,
            prepareData: (formData) => formData,
            filesVariableName: function () { return 'file'; },
            imagesExtensions: ['jpg','jpeg','png','gif','webp'],
            videoExtensions: ['mp4','webm','ogg','mov'],
            // Ensure image insertion uses <img>
            defaultHandlerSuccess: function (data) {
                try {
                    if (data && data.files && data.files.length) {
                        const url = typeof data.files[0] === 'string' ? data.files[0] : data.files[0].url;
                        const type = data.type || '';
                        if (type === 'video') {
                            this.selection.insertHTML(`<video src="${url}" controls style="max-width:100%"></video>`);
                        } else if (type === 'image') {
                            this.selection.insertImage(url);
                        } else {
                            // If it's a PDF, embed it; otherwise insert a prominent download link
                            if (/\.pdf(\?.*)?$/i.test(url)) {
                                const dl = proxyDownloadUrl(url);
                                this.selection.insertHTML(`<embed src="${url}" type="application/pdf" width="100%" height="600px"/>`);
                                this.selection.insertHTML(`<p><a href="${dl}" target="_blank" rel="noopener" class="text-blue-600 underline font-medium">Télécharger le PDF</a></p>`);
                            } else {
                                const dl = proxyDownloadUrl(url);
                                this.selection.insertHTML(`<p><a href="${dl}" target="_blank" rel="noopener" class="text-blue-600 underline font-medium">Télécharger le document</a></p>`);
                            }
                        }
                    }
                } catch (e) {}
            },
            process: (resp) => {
                if (resp && resp.success && resp.url) {
                    // Pass through type from backend when available
                    return { baseurl: '', files: [resp.url], isImages: resp.type === 'image', type: resp.type };
                }
                return { files: [] };
            }
        },
        askBeforePasteHTML: false,
        insertImageAsBase64URI: false,
        events: {
            paste: (e, editor) => {
                try {
                    const text = (e && e.clipboardData && e.clipboardData.getData && e.clipboardData.getData('text')) || '';
                    if (!text) return;

                    // YouTube URL to embed
                    const yt = text.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
                    if (yt && yt[1]) {
                        const id = yt[1];
                        editor.selection.insertHTML(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen style="max-width:100%"></iframe>`);
                        e.preventDefault?.();
                        return;
                    }

                    // Vimeo URL to embed
                    const vimeo = text.match(/https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/i);
                    if (vimeo && vimeo[1]) {
                        const id = vimeo[1];
                        editor.selection.insertHTML(`<iframe src="https://player.vimeo.com/video/${id}" width="640" height="360" frameborder="0" allowfullscreen style="max-width:100%"></iframe>`);
                        e.preventDefault?.();
                        return;
                    }

                    // Direct video file
                    const vid = text.match(/https?:\/\/[^\s]+\.(mp4|webm|ogg|mov)(\?[^\s]*)?$/i);
                    if (vid) {
                        editor.selection.insertHTML(`<video src="${text}" controls style="max-width:100%"></video>`);
                        e.preventDefault?.();
                        return;
                    }

                    // Direct image file
                    const img = text.match(/https?:\/\/[^\s]+\.(png|jpe?g|webp|gif)(\?[^\s]*)?$/i);
                    if (img) {
                        editor.selection.insertHTML(`<img src="${text}" alt="image"/>`);
                        e.preventDefault?.();
                        return;
                    }

                    // PDF document
                    const pdf = text.match(/https?:\/\/[^\s]+\.pdf(\?[^\s]*)?$/i);
                    if (pdf) {
                        const dl = proxyDownloadUrl(text);
                        editor.selection.insertHTML(`<embed src="${text}" type="application/pdf" width="100%" height="600px"/>`);
                        editor.selection.insertHTML(`<p><a href="${dl}" target="_blank" rel="noopener" class="text-blue-600 underline font-medium">Télécharger le PDF</a></p>`);
                        e.preventDefault?.();
                        return;
                    }
                } catch {}
            }
        }
    };

    const saveBlog = async () => {
        if (!blogData.title || !blogData.mainCategory) {
            toast.error("Veuillez renseigner le titre et la catégorie principale")
            return false;
        }
        const formData = new FormData();
        formData.append("title", blogData.title || '');
        formData.append("subtitle", blogData.subtitle || '');
        formData.append("description", content || '');
        formData.append("mainCategory", blogData.mainCategory || '');
        blogData.subcategories.forEach((t)=> formData.append('subcategories', t));
        blogData.transversalTags.forEach((t)=> formData.append('transversalTags', t));
        if (blogData.thumbnail) formData.append("file", blogData.thumbnail);
        try {
            setLoading(true)
            const res = await api.put(`/api/v1/blog/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            if (res.data.success) {
                const updated = res.data.blog;
                const updatedList = blog.map(b => b._id === updated._id ? updated : b);
                dispatch(setBlog(updatedList))
                return true;
            }
            toast.error("Échec de l'enregistrement")
            return false;
        } catch (error) {
            console.log(error);
            toast.error("Erreur lors de l'enregistrement")
            return false;
        } finally {
            setLoading(false)
        }
    }

    const updateBlogHandler = async () => {
        const ok = await saveBlog();
        if (ok) toast.success("Enregistré")
    }

    const togglePublishUnpublish = async () => {
        // Auto-save before toggling publish to avoid empty posts
        const saved = await saveBlog();
        if (!saved) return;
        try {
            const res = await api.patch(`/api/v1/blog/${id}`)
            if (res.data.success) {
                setPublish(!publish)
                toast.success(res.data.message)
                navigate(`/dashboard/your-blog`)
            } else {
                toast.error("Failed to update")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBlog = async () => {
        try {
            const res = await api.delete(`/api/v1/blog/delete/${id}`)
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                navigate('/dashboard/your-blog')
            }
            console.log(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error("something went error")
        }

    }

    return (
        <div className='pb-10 px-3 pt-20 md:ml-[320px]'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
                    <h1 className=' text-4xl font-bold '>Basic Blog Information</h1>
                    <p className=''>Make changes to your blogs here. Click publish when you're done.</p>
                    <div className="space-x-2">
                        <Button onClick={() => togglePublishUnpublish(selectBlog.isPublished ? "false" : "true")}
                        >
                            {selectBlog?.isPublished ? "UnPublish" : "Publish"}
                        </Button>
                        <Button variant="destructive" onClick={deleteBlog}>Remove Course</Button>
                    </div>
                    <div className='pt-10'>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter a title" name="title" value={blogData.title} onChange={handleChange} className="dark:border-gray-300" />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input type="text" placeholder="Enter a subtitle" name="subtitle" value={blogData.subtitle} onChange={handleChange} className="dark:border-gray-300" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                            config={editorConfig}
                            className="jodit_toolbar"

                        />
                    </div>
                    <div className='mt-4 mb-5'>
                        <Label>Catégorie principale</Label>
                        <Select value={blogData.mainCategory} onValueChange={selectMainCategory} className="dark:border-gray-300">
                            <SelectTrigger className="w-[240px]">
                                <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Catégorie</SelectLabel>
                                    {MAIN_CATEGORIES.filter(c=>c!== 'Uncategorized').map((c)=>(
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {blogData.mainCategory ? (
                        <div className='mt-4 mb-5'>
                            <Label>Sous-catégories</Label>
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {(SUBCATEGORIES_MAP[blogData.mainCategory]||[]).map(tag => (
                                    <button key={tag} type="button" onClick={()=>toggleSubcategory(tag)} className={`px-3 py-1 rounded-md text-sm border ${blogData.subcategories.includes(tag) ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    <div className='mt-4 mb-5'>
                        <Label>Tags transversaux</Label>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            { TRANSVERSAL_TAGS.map(tag => (
                                <button key={tag} type="button" onClick={()=>toggleTransversal(tag)} className={`px-3 py-1 rounded-md text-sm border ${blogData.transversalTags.includes(tag) ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>Thumbnail</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit dark:border-gray-300"
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className="w-64 my-2"
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>
                    <div className='flex gap-3'>
                        <Button variant="outline" onClick={()=>navigate(-1)}>Back</Button>
                        <Button onClick={updateBlogHandler}>
                            {
                                loading ? "Please Wait" : "Save"
                            }
                        </Button>
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default UpdateBlog
