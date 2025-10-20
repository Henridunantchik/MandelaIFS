import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { MAIN_CATEGORIES, TRANSVERSAL_TAGS } from '@/constants/categories'

const NewsletterSidebar = ({ mainCategory, onSelectCategory, onSelectTag }) => {
  return (
    <aside className='bg-white hidden md:block dark:bg-gray-700 w-[350px] p-5 rounded-md mt-10'>
      <h1 className='text-2xl font-semibold'>Popular categories</h1>
      <div className='my-5 flex flex-wrap gap-3'>
        {MAIN_CATEGORIES.filter(c => c !== 'Uncategorized').map((c) => (
          <Badge key={c} onClick={() => onSelectCategory?.(c)} className='cursor-pointer'>
            {c}
          </Badge>
        ))}
        {TRANSVERSAL_TAGS.map((t) => (
          <Badge key={t} onClick={() => onSelectTag?.(t)} className='cursor-pointer'>
            {t}
          </Badge>
        ))}
      </div>

      {/* <h1 className='text-xl font-semibold'>Subscribe to Newsletter</h1>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        Get the latest posts and updates delivered straight to your inbox.
      </p>
      <div className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5'>
        <Input
          type='email'
          placeholder='Enter your email'
          className='flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100'
        />
        <Button>Subscribe</Button>
      </div>

      <div className='mt-7'>
        <h2 className='text-xl font-semibold mb-3'>Suggested Blogs</h2>
        <ul className='space-y-3'>
          {['10 Tips to Master React', 'Understanding Tailwind CSS', 'Improve SEO in 2024'].map((title, idx) => (
            <li key={idx} className='text-sm dark:text-gray-100 hover:underline cursor-pointer'>
              {title}
            </li>
          ))}
        </ul>
      </div> */}
    </aside>
  )
}

export default NewsletterSidebar
