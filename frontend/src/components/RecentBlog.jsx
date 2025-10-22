import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from './BlogCard';
import BlogCardList from './BlogCardList';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import NewsletterSidebar from './NewsletterSidebar';
import { useNavigate } from 'react-router-dom';
import { setBlog } from '@/redux/blogSlice';
import api from '@/lib/api';
import { MAIN_CATEGORIES, SUBCATEGORIES_MAP, TRANSVERSAL_TAGS } from '@/constants/categories'

const RecentBlog = ({ limit = 4 }) => {
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
        <div className='pb-10'>
            <div className='max-w-6xl mx-auto  flex flex-col space-y-4 items-center'>
                <h1 className='text-3xl md:text-4xl font-bold pt-10 text-slate-900 dark:text-white'>Blogs et Nouvelles</h1>
                <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
            </div>
            <div className='max-w-7xl mx-auto flex gap-6'>
                <div>
                    <div className='mt-10 px-4 md:px-0'>
                        <div className='mb-4 flex flex-wrap gap-2'>
                            {MAIN_CATEGORIES.filter(c => c !== 'Uncategorized').map((c) => (
                                <button key={c} onClick={() => { setMainCategory(prev => prev === c ? "" : c); setTag("") }} className={`px-3 py-1 rounded-md text-sm border ${mainCategory === c ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>{c}</button>
                            ))}
                        </div>
                        {mainCategory && (
                            <div className='mb-6 flex flex-wrap gap-2'>
                                {(SUBCATEGORIES_MAP[mainCategory] || []).map((t) => (
                                    <button key={t} onClick={() => setTag(prev => prev === t ? "" : t)} className={`px-3 py-1 rounded-md text-sm border ${tag === t ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>{t}</button>
                                ))}
                                {TRANSVERSAL_TAGS.map((t) => (
                                    <button key={t} onClick={() => setTag(prev => prev === t ? "" : t)} className={`px-3 py-1 rounded-md text-sm border ${tag === t ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-white dark:bg-gray-700'}`}>{t}</button>
                                ))}
                            </div>
                        )}
                        {
                            blog?.slice(0, limit)?.map((blog, index) => {
                                return <BlogCardList key={index} blog={blog} />
                            })
                        }
                    </div>

                </div>
                <NewsletterSidebar
                    mainCategory={mainCategory}
                    onSelectCategory={(c) => { setMainCategory(c); setTag("") }}
                    onSelectTag={(t) => setTag(t)}
                />
            </div>
        </div>
    )
}

export default RecentBlog
