import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate()
  const date = new Date(blog.createdAt)
  const formattedDate = date.toLocaleDateString("en-GB");
  const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const buildExcerpt = (subtitle, content, wordCount = 20) => {
    const base = `${subtitle || ''} ${stripHtml(content)}`.trim()
    if (!base) return ''
    const words = base.split(' ')
    if (words.length <= wordCount) return base
    return words.slice(0, wordCount).join(' ') + '…'
  }
  // Build excerpt from subtitle + content; fallback to subtitle only
  const excerpt = buildExcerpt(blog?.subtitle, blog?.content) || stripHtml(blog?.subtitle)
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row md:gap-8 p-5 rounded-2xl mt-6 shadow border transition-all">
      <div className="md:w-[320px] shrink-0">
        <img src={blog.thumbnail} alt={blog.title} className='rounded-lg w-full h-[190px] md:h-[200px] object-cover hover:scale-[1.01] transition-transform' />
      </div>
      <div className="flex-1">
        <div className="text-xs text-slate-500 dark:text-gray-400">{formattedDate}</div>
        <h2 className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">{blog.title}</h2>
        {excerpt ? (
          <p className='text-slate-700 dark:text-gray-300 mt-2 line-clamp-3'>{excerpt}</p>
        ) : null}
        <Button onClick={() => navigate(`/blogs/${blog._id}`)} className="mt-4 px-4 py-2 rounded-full text-sm">
          Read More
        </Button>
      </div>
    </div>
  )
}

export default BlogCardList
