import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import UserLogo from "../assets/user.jpg"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { NAV_MENU } from '@/constants/navMenu';

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {
    const {user} = useSelector(store=>store.auth)

    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden rounded-r-xl shadow-md transition-all`}>
            <div>
                <div className='flex items-center justify-start gap-3'>
                    {
                        user ? <Avatar className="w-14 h-14">
                        <AvatarImage src={user.photoUrl} size={50} />
                      </Avatar> : <FaUserCircle size={50} className='' />
                    }
                    
                    <div>
                        <h1 className=''>Hello, {user?.firstName || "User"}</h1>
                        <h1 className='text-sm text-slate-500'>Premium User</h1>
                    </div>
                </div>
                <nav className='mt-10'>
                    <MobileMenuTree nav={NAV_MENU} onNavigate={() => setOpenNav(false)} />
                    <div className='mt-8'>
                        {
                            user ? (
                              <Button className='w-full' onClick={() => { logoutHandler(); setOpenNav(false) }}>Logout</Button>
                            ) : (
                              <Link to={'/signup'} onClick={() => setOpenNav(false)}><Button className='w-full'>Signup</Button></Link>
                            )
                        }
                    </div>
                </nav>
            </div>
            <div className='pb-20'>
                <h1>
                    Made with ❤️ by Kuna Creatives Africa
                </h1>
            </div>
        </div>
    )
}

function MobileMenuTree({ nav, onNavigate }) {
  const [open, setOpen] = useState({})

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  return (
    <ul className='flex flex-col gap-3'>
      {nav.map((item, idx) => {
        const key = `lvl1-${idx}`
        const hasChildren = Array.isArray(item.children) && item.children.length
        return (
          <li key={key} className='border-b border-slate-200/70 dark:border-gray-700 pb-2'>
            <div className='flex items-center justify-between'>
              {hasChildren ? (
                <button onClick={() => toggle(key)} className='text-lg font-semibold text-left'>
                  {item.label}
                </button>
              ) : (
                <Link to={item.to || '#'} onClick={onNavigate} className='text-lg font-semibold'>
                  {item.label}
                </Link>
              )}
              {hasChildren && (
                <FaChevronRight className={`transition-transform ${open[key] ? 'rotate-90' : ''}`} />
              )}
            </div>
            {hasChildren && open[key] && (
              <div className='mt-2 pl-3 flex flex-col gap-2'>
                {/* If second level has groups */}
                {item.children.some(c => c.children) ? (
                  item.children.map((group, gIdx) => (
                    <div key={`grp-${idx}-${gIdx}`} className=''>
                      <div className='text-sm uppercase tracking-wide opacity-70 mb-1'>{group.label}</div>
                      <ul className='flex flex-col gap-1'>
                        {(group.children || []).map((sub, sIdx) => (
                          <li key={`sub-${idx}-${gIdx}-${sIdx}`}>
                            <Link to={sub.to || '#'} onClick={onNavigate} className='text-base'>
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <ul className='flex flex-col gap-1'>
                    {item.children.map((sub, sIdx) => (
                      <li key={`sub-${idx}-${sIdx}`}>
                        <Link to={sub.to || '#'} onClick={onNavigate} className='text-base'>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default ResponsiveMenu