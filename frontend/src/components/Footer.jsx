import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'
import { NAV_MENU } from '@/constants/navMenu'

const Footer = ({
  schoolName = 'Mandela IFS',
  description = "Établissement francophone d’excellence offrant un cadre éducatif exigeant et bienveillant, axé sur la réussite et l’épanouissement de chaque élève.",
  address = 'Busabala Road, 2 Masajja, Avenue, Lupalanga, Kampala, Ouganda',
  email = 'email@mandelaifs.com',
  phone = '+243 000 000 000',
  social = { facebook: '#', instagram: '#', twitter: '#', pinterest: '#' },
}) => {
  // Split NAV_MENU into columns for the footer
  const columns = NAV_MENU.map((item) => ({
    title: item.label,
    links: (item.children || []).flatMap((child) => {
      // If child has its own children, expand them; otherwise keep child
      if (child.children) {
        return child.children.map((sub) => ({ label: sub.label, to: sub.to }))
      }
      return [{ label: child.label, to: child.to }]
    }),
  }))

  return (
    <footer className='bg-gray-900 text-gray-200 pt-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Top: Brand + Address */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-800'>
          <div className='lg:col-span-1'>
            <Link to='/' className='flex items-center gap-3'>
              <img src={Logo} alt='' className='invert w-12 h-12'/>
              <h1 className='text-2xl md:text-3xl font-bold'>{schoolName}</h1>
            </Link>
            <p className='mt-3 text-sm text-gray-300 leading-6'>{description}</p>
            <div className='mt-4 space-y-1 text-sm'>
              <p className='text-gray-400'>{address}</p>
              <p className='text-gray-400'>Email: <a className='underline hover:text-white' href={`mailto:${email}`}>{email}</a></p>
              <p className='text-gray-400'>Téléphone: <a className='hover:text-white' href={`tel:${phone}`}>{phone}</a></p>
            </div>
            <div className='flex items-center gap-4 mt-4 text-xl'>
              <a href={social.facebook} aria-label='Facebook' className='opacity-80 hover:opacity-100'><FaFacebook/></a>
              <a href={social.instagram} aria-label='Instagram' className='opacity-80 hover:opacity-100'><FaInstagram/></a>
              <a href={social.twitter} aria-label='Twitter' className='opacity-80 hover:opacity-100'><FaTwitterSquare/></a>
              <a href={social.pinterest} aria-label='Pinterest' className='opacity-80 hover:opacity-100'><FaPinterest/></a>
            </div>
          </div>

          {/* Links: reflect NAV_MENU */}
          <div className='lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
            {columns.map((col, idx) => (
              <div key={idx}>
                <h3 className='text-base font-semibold text-white mb-3'>{col.title}</h3>
                <ul className='space-y-2 text-sm'>
                  {(col.links || []).slice(0, 8).map((link, i) => (
                    <li key={i}>
                      <Link to={link.to || '#'} className='text-gray-300 hover:text-white'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Newsletter + Copyright */}
        <div className='py-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <form className='w-full md:w-auto flex items-stretch max-w-lg'>
            <input
              type='email'
              placeholder='Votre e-mail'
              className='w-full md:w-80 px-3 py-2 rounded-l-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
            <button type='submit' className='bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700'>S’abonner</button>
          </form>
          <p className='text-xs text-gray-400'>
            &copy; {new Date().getFullYear()} <span className='text-gray-200 font-semibold'>{schoolName}</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer