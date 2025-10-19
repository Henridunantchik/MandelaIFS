import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from './BlogCard';
import BlogCardList from './BlogCardList';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { setBlog } from '@/redux/blogSlice';
import api from '@/lib/api';
import { MAIN_CATEGORIES, SUBCATEGORIES_MAP, TRANSVERSAL_TAGS } from '@/constants/categories'

const RecentBlog = () => {
    const { blog } = useSelector(store => store.blog)
    const [mainCategory, setMainCategory] = useState("")
    const [tag, setTag] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(blog);

    useEffect(() => {
        const getAllPublsihedBlogs = async () => {
            try {
                const params = {}
                if (mainCategory) params.mainCategory = mainCategory
                if (tag) params.tag = tag
                const res = await api.get(`/api/v1/blog/get-published-blogs`, { params })
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        getAllPublsihedBlogs()
    }, [mainCategory, tag])

    return (
        <div className='bg-gray-100 dark:bg-gray-800 pb-10'>
            <div className='max-w-6xl mx-auto  flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold pt-10 '>Recent Blogs</h1>
                <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
            </div>
            <div className='max-w-7xl mx-auto flex gap-6'>
                <div>
                    <div className='mt-10 px-4 md:px-0'>
                        <div className='mb-4 flex flex-wrap gap-2'>
                            {MAIN_CATEGORIES.filter(c=>c!=='Uncategorized').map((c)=>(
                                <button key={c} onClick={()=>{ setMainCategory(prev=>prev===c?"":c); setTag("") }} className={`px-3 py-1 rounded-md text-sm border ${mainCategory===c ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>{c}</button>
                            ))}
                        </div>
                        {mainCategory && (
                            <div className='mb-6 flex flex-wrap gap-2'>
                                {(SUBCATEGORIES_MAP[mainCategory]||[]).map((t)=>(
                                    <button key={t} onClick={()=> setTag(prev=>prev===t?"":t)} className={`px-3 py-1 rounded-md text-sm border ${tag===t ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>{t}</button>
                                ))}
                                {TRANSVERSAL_TAGS.map((t)=>(
                                    <button key={t} onClick={()=> setTag(prev=>prev===t?"":t)} className={`px-3 py-1 rounded-md text-sm border ${tag===t ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>{t}</button>
                                ))}
                            </div>
                        )}
                        {
                            blog?.slice(0, 4)?.map((blog, index) => {
                                return <BlogCardList key={index} blog={blog} />
                            })
                        }
                    </div>

                </div>
                <div className='bg-white hidden md:block dark:bg-gray-700 w-[350px] p-5 rounded-md mt-10'>
                    <h1 className='text-2xl font-semibold'>Popular categories</h1>
                    <div className='my-5 flex flex-wrap gap-3'>
                        {MAIN_CATEGORIES.filter(c=>c!=='Uncategorized').map((c)=> (
                          <Badge key={c} onClick={() => { setMainCategory(c); setTag("") }} className="cursor-pointer">{c}</Badge>
                        ))}
                        {TRANSVERSAL_TAGS.map((t)=> (
                          <Badge key={t} onClick={() => setTag(t)} className="cursor-pointer">{t}</Badge>
                        ))}
                    </div>
                    <h1 className='text-xl font-semibold '>Subscribe to Newsletter</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Get the latest posts and updates delivered straight to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm  text-gray-300"
                        />
                        <Button>Subscribe</Button>
                    </div>
                    <div className='mt-7'>
                        <h2 className="text-xl font-semibold mb-3">Suggested Blogs</h2>
                        <ul className="space-y-3">
                            {[
                                '10 Tips to Master React',
                                'Understanding Tailwind CSS',
                                'Improve SEO in 2024',
                            ].map((title, idx) => (
                                <li
                                    key={idx}
                                    className="text-sm dark:text-gray-100  hover:underline cursor-pointer"
                                >
                                    {title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlog
