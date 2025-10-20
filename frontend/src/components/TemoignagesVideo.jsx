import React, { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'

const SAMPLE_ITEMS = [
  {
    quote:
      "Notre enfant se sent totalement à l’aise à l’école. Les activités variées et l’accompagnement de l’équipe favorisent un développement équilibré et la confiance en soi. Notre enfant se sent totalement à l’aise à l’école. Les activités variées et l’accompagnement de l’équipe favorisent un développement équilibré et la confiance en soi.",
    titleLeft: 'Le grand mot du principale',
    authorName: 'Mme. Jeanne K.',
    authorRole: 'Maman de Léa, 6e primaire',
    authorAvatar: 'https://i.pravatar.cc/96?img=47',
    videoTitle: 'Présentation de Mandela IFS',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    quote:
      "Grâce à l’implication des enseignants, notre fils a gagné en autonomie et motivation. L’environnement est stimulant et bienveillant.",
    titleLeft: 'Témoignage de parent',
    authorName: 'M. Alain M.',
    authorRole: 'Papa de Samuel, 2e secondaire',
    authorAvatar: 'https://i.pravatar.cc/96?img=12',
    videoTitle: 'Vie scolaire et projets',
    videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
  },
  {
    quote:
      "Une école qui valorise la diversité et le respect, tout en visant l’excellence académique. Nous recommandons vivement.",
    titleLeft: 'Avis des parents',
    authorName: 'Mme. Nadia B.',
    authorRole: 'Maman de Rayan, 5e primaire',
    authorAvatar: 'https://i.pravatar.cc/96?img=32',
    videoTitle: 'Témoignages des élèves',
    videoUrl: 'https://www.youtube.com/embed/J---aiyznGQ',
  },
]

const TemoignagesVideo = ({
  titleLeft = "Parents’ Perspectives: Voici ce que disent nos parents",
  titleRight = "Voix des élèves: témoignages de notre communauté",
  items = SAMPLE_ITEMS,
}) => {
  const safeItems = useMemo(() => (Array.isArray(items) && items.length ? items : SAMPLE_ITEMS), [items])
  const [index, setIndex] = useState(0)
  const active = safeItems[index]

  const prev = () => setIndex((i) => (i - 1 + safeItems.length) % safeItems.length)
  const next = () => setIndex((i) => (i + 1) % safeItems.length)

  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className='flex flex-col items-center gap-3 mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-center'>Témoignages et vie à Mandela IFS</h2>
          <hr className='w-20 md:w-24 text-center border-2 border-red-500 rounded-full' />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="space-y-4">
            <Card className="bg-white dark:bg-gray-900 border-slate-200/70 dark:border-gray-800 rounded-2xl shadow-sm p-6 md:p-8 overflow-hidden h-[300px] md:h-[320px] flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center lg:text-left">{active.titleLeft || titleLeft}</h3>
              <p className="text-slate-700 dark:text-gray-300 leading-7 line-clamp-6 md:line-clamp-7 flex-1">{active.quote}</p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={active.authorAvatar} alt={active.authorName} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{active.authorName}</div>
                    <div className="text-sm text-slate-600 dark:text-gray-400">{active.authorRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Précédent"
                    onClick={prev}
                    className="h-9 w-9 grid place-items-center rounded-full bg-slate-100/90 hover:bg-slate-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-100 shadow"
                  >
                    &lt;
                  </button>
                  <button
                    aria-label="Suivant"
                    onClick={next}
                    className="h-9 w-9 grid place-items-center rounded-full bg-slate-100/90 hover:bg-slate-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-100 shadow"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </Card>
            {/* Dots */}
            <div className="flex justify-center gap-2 pt-1">
              {safeItems.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Aller à l’élément ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-slate-600 dark:bg-gray-200' : 'bg-slate-300 dark:bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-indigo-900/90 dark:bg-indigo-900 rounded-2xl p-3 md:p-4 shadow-sm">
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  className="w-full h-full"
                  src={active.videoUrl}
                  title={active.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TemoignagesVideo
