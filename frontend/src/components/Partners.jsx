import React from 'react'

const SAMPLE_PARTNERS = [
  { id: 'p1', name: 'Fondation Roi Baudouin', logo: 'https://dummyimage.com/220x80/cccccc/666&text=FRB', href: '#' },
  { id: 'p2', name: 'En Avant Les Enfants', logo: 'https://dummyimage.com/200x80/cccccc/666&text=EALE', href: '#' },
  { id: 'p3', name: 'Sternenstaub', logo: 'https://dummyimage.com/200x80/cccccc/666&text=Sternenstaub', href: '#' },
  { id: 'p4', name: 'Fondation J-F Peterbroeck', logo: 'https://dummyimage.com/220x80/cccccc/666&text=FJFP', href: '#' },
  { id: 'p5', name: 'GOAL', logo: 'https://dummyimage.com/160x80/cccccc/666&text=GOAL', href: '#' },
  { id: 'p6', name: 'Chaite', logo: 'https://dummyimage.com/160x80/cccccc/666&text=Chaite', href: '#' },
  { id: 'p7', name: 'AGAPE', logo: 'https://dummyimage.com/160x80/cccccc/666&text=AGAPE', href: '#' },
  { id: 'p8', name: 'PJB', logo: 'https://dummyimage.com/160x80/cccccc/666&text=PJB', href: '#' },
  { id: 'p9', name: "Roots & Shoots", logo: 'https://dummyimage.com/200x80/cccccc/666&text=Roots+%26+Shoots', href: '#' },
]

const Partners = ({ title = 'Partenaires', partners = SAMPLE_PARTNERS }) => {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-950 border-t border-b border-slate-200/70 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-3 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-gray-800" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center">
          {partners.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="group flex items-center justify-center">
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-14 object-contain grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
