import React, { useState } from 'react'
import { Button } from './ui/button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import Logo from "../assets/logo.png"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import api from '@/lib/api'
import { setUser } from '@/redux/authSlice'
import userLogo from "../assets/user.jpg"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import {
    ChartColumnBig,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Search,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaEdit, FaMoon, FaRegEdit, FaSun } from 'react-icons/fa'
import { toggleTheme } from '@/redux/themeSlice'
import { LiaCommentSolid } from 'react-icons/lia'
import ResponsiveMenu from './ResponsiveMenu'
import { NAV_MENU } from '@/constants/navMenu'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const { theme } = useSelector(store => store.theme)
    const [searchTerm, setSearchTerm] = useState('');
    const [openNav, setOpenNav] = useState(false)
    const [showTop, setShowTop] = useState(true)
    const [compact, setCompact] = useState(false)
    const [lastScroll, setLastScroll] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const user = false;

    const logoutHandler = async (e) => {

        try {
            const res = await api.get(`/api/v1/user/logout`);
            if (res.data.success) {
                navigate("/")
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Logout failed')

        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('')
        }
    };

    const toggleNav = ()=>{
        setOpenNav(!openNav)
    }
    React.useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY || 0
            const isDesktop = window.innerWidth >= 768 // md breakpoint
            if (!isDesktop) {
                // On mobile, always keep the top bar visible and no compact state
                setShowTop(true)
                setCompact(false)
                setLastScroll(y)
                return
            }
            const goingDown = y > lastScroll
            if (y <= 8) {
                setShowTop(true)
                setCompact(false)
            } else if (goingDown) {
                setShowTop(false)
                setCompact(true)
            } else {
                setShowTop(true)
                setCompact(true)
            }
            setLastScroll(y)
        }
        const onResize = () => {
            // When switching to mobile, ensure bar is shown and not compact
            if (window.innerWidth < 768) {
                setShowTop(true)
                setCompact(false)
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [lastScroll])
    return (
        <div className='fixed w-full z-50 border-b-2 border-b-gray-300 dark:border-b-gray-600 bg-white dark:bg-gray-800'>
            {/* Top bar: logo, search, controls */}
            <div className={`transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0 h-14 md:h-16' : 'opacity-0 -translate-y-5 pointer-events-none h-0 overflow-hidden'}`}>
              <div className='h-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
                {/* logo + search */}
                <div className='flex gap-7 items-center'>
                  <Link to={'/'}>
                    <div className='flex gap-2 items-center'>
                      <img src={Logo} alt="" className='w-8 h-8 md:w-10 md:h-10 dark:invert' />
                      <h1 className='font-bold text-2xl md:text-3xl'>Logo</h1>
                    </div>
                  </Link>
                  <div className='relative hidden md:block'>
                    <Input
                      type="text"
                      placeholder="Search"
                      className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button className='absolute right-0 top-0' onClick={handleSearch}><Search /></Button>
                  </div>
                </div>

                {/* controls + hamburger */}
                <nav className='flex md:gap-7 gap-4 items-center'>
                    <div className='flex'>
                        <Button onClick={() => dispatch(toggleTheme())} className="">
                            {
                                theme === 'light' ? <FaMoon /> : <FaSun />
                            }

                        </Button>
                        {
                            user ? <div className="ml-7 flex gap-3 items-center">
                                {/* <Link to={'/profile'}> */}
                                <DropdownMenu className="">
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user.photoUrl || userLogo} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 dark:bg-gray-800">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                                                <User />
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                                                <ChartColumnBig />
                                                <span>Your Blog</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                                                <LiaCommentSolid />
                                                <span>Comments</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                                                <FaRegEdit />
                                                <span>Write Blog</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logoutHandler}>
                                            <LogOut />
                                            <span>Log out</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/* </Link> */}
                                <Button className="hidden md:block" onClick={logoutHandler}>Logout</Button>
                            </div> : <div className='ml-7 md:flex gap-2 '>
                                <Link to={'/login'}><Button>Login</Button></Link>
                                <Link className='hidden md:block' to={'/signup'}><Button>Signup</Button></Link>
                            </div>
                        }
                    </div>
                    {
                        openNav ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden' /> : <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 md:hidden' />
                    }

                </nav>
                <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler}/>
              </div>
            </div>

            {/* Bottom bar: main navigation (desktop only) */}
            <div className='hidden md:block border-t border-t-gray-200 dark:border-t-gray-700 bg-white/70 dark:bg-gray-800/60 backdrop-blur'>
              <div className='h-14 md:h-16 max-w-7xl mx-auto px-4 md:px-0 flex items-center justify-between'>
                {/* Left: logo when scrolled, 'Accueil' when expanded */}
                <div className='flex items-center min-w-[120px]'>
                  {compact ? (
                    <Link to={'/'} className='flex items-center gap-2 transition-opacity duration-300 opacity-100'>
                      <img src={Logo} alt="" className='w-7 h-7 dark:invert' />
                      <span className='font-bold text-lg'>Logo</span>
                    </Link>
                  ) : (
                    <NavLink to='/' className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold text-[14px] md:text-[15px]">Accueil</NavLink>
                  )}
                </div>
                {/* Right: main menu */}
                <ul className='h-full flex gap-7 items-center text-[14px] md:text-[15px] font-semibold'>
                  {NAV_MENU.map((item, idx) => (
                    <li key={idx} className='list-none'>
                      {!item.children ? (
                        <NavLink to={item.to || '#'} className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
                          {item.label}
                        </NavLink>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className='inline-flex items-center cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap'>
                              {item.label}
                            </button>
                          </DropdownMenuTrigger>
                          {(() => {
                            const grouped = item.children.some(c => c.children)
                            return (
                              <DropdownMenuContent className={`${grouped ? 'min-w-[520px]' : 'min-w-[260px]'} p-3 dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200/80 dark:border-gray-700` } sideOffset={8} align="start">
                                {grouped ? (
                                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {item.children.map((group, gIdx) => (
                                      <div key={gIdx} className=''>
                                        <DropdownMenuLabel className='text-[11px] uppercase tracking-wide opacity-70 px-1'>{group.label}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <div className='mt-1 flex flex-col'>
                                          {(group.children || []).map((sub, sIdx) => (
                                            <DropdownMenuItem key={sIdx} asChild className='rounded-md'>
                                              <Link to={sub.to || '#'} className='w-full px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
                                                {sub.label}
                                              </Link>
                                            </DropdownMenuItem>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  item.children.map((sub, sIdx) => (
                                    <DropdownMenuItem key={sIdx} asChild className='rounded-md'>
                                      <Link to={sub.to || '#'} className='w-full px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
                                        {sub.label}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))
                                )}
                              </DropdownMenuContent>
                            )
                          })()}
                        </DropdownMenu>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
    )
}

export default Navbar
