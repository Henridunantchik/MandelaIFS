import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setBlog } from '@/redux/blogSlice'
import api from '@/lib/api'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { MAIN_CATEGORIES, SUBCATEGORIES_MAP, TRANSVERSAL_TAGS } from '@/constants/categories'

const CreateBlog = () => {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [mainCategory, setMainCategory] = useState("")
    const [subcategories, setSubcategories] = useState([])
    const [transversalTags, setTransversalTags] = useState([])
    const {blog} = useSelector(store=>store.blog)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getSelectedMainCategory = (value) => {
        setMainCategory(value)
        setSubcategories([])
    }
    const toggleSubcategory = (tag) => {
        setSubcategories((prev) => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
    }
    const toggleTransversal = (tag) => {
        setTransversalTags((prev) => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
    }
    const createBlogHandler = async () => {
        
        try {
            setLoading(true)
            if(!mainCategory){
                toast.error("Veuillez sélectionner une catégorie principale")
                return
            }
            const payload = { title, mainCategory, subcategories, transversalTags }
            const res = await api.post(`/api/v1/blog/`, payload, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (res.data.success) {
                dispatch(setBlog([...blog, res.data.blog]))
                navigate(`/dashboard/write-blog/${res.data.blog._id}`)
                toast.success(res.data.message)
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
            <Card className="md:p-10 p-4 dark:bg-gray-800">
            <h1 className='text-2xl font-bold'>Lets create blog</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius necessitatibus fugit vel distinctio architecto, ut ratione rem nobis eaque?</p>
            <div className='mt-10 '>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Your Blog Name" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white dark:bg-gray-700" />
                </div>
                <div className='mt-4 mb-5'>
                    <Label>Catégorie principale</Label>
                    <Select onValueChange={getSelectedMainCategory}>
                        <SelectTrigger className="w-[240px] bg-white dark:bg-gray-700">
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
                {mainCategory ? (
                  <div className='mt-4 mb-5'>
                    <Label>Sous-catégories</Label>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      { (SUBCATEGORIES_MAP[mainCategory]||[]).map(tag => (
                        <button key={tag} type="button" onClick={()=>toggleSubcategory(tag)} className={`px-3 py-1 rounded-md text-sm border ${subcategories.includes(tag) ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>
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
                        <button key={tag} type="button" onClick={()=>toggleTransversal(tag)} className={`px-3 py-1 rounded-md text-sm border ${transversalTags.includes(tag) ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>
                          {tag}
                        </button>
                      ))}
                    </div>
                </div>
                <div className='flex gap-2'>
                    {/* <Button  variant="outline">Cancel</Button> */}
                    <Button className="" disabled={loading} onClick={createBlogHandler}>
                        {
                            loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"
                        }
                    </Button>
                </div>
            </div>
            </Card>
           
        </div>
    )
}

export default CreateBlog
