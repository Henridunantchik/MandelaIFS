import React, { useRef } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SAMPLE_EVENTS = [
  {
    id: 'ev1',
    title: "Journée Portes Ouvertes",
    date: '2025-11-12',
    time: '09:00 - 13:00',
    location: "Campus Principal",
    cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
    excerpt: "Rencontrez l’équipe pédagogique, découvrez les salles et les projets des élèves.",
    cta: 'S’inscrire',
    href: '#',
  },
  {
    id: 'ev2',
    title: "Semaine Culturelle",
    date: '2025-12-04',
    time: 'Toute la semaine',
    location: "Salle Polyvalente",
    cover: 'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?q=80&w=1200&auto=format&fit=crop',
    excerpt: "Expositions, débats et spectacles autour de la diversité culturelle.",
    cta: 'En savoir plus',
    href: '#',
  },
  {
    id: 'ev3',
    title: "Tournoi Sportif Inter-écoles",
    date: '2026-01-18',
    time: '08:30 - 17:30',
    location: "Stade Mandela",
    cover: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop',
    excerpt: "Nos équipes affrontent les écoles voisines dans plusieurs disciplines.",
    cta: 'Programme',
    href: '#',
  },
]

function formatDate(d) {
  try {
    const date = new Date(d)
    return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return d }
}

const SchoolEvents = ({
  title = "Événements de l’école",
  subtitle = "Restez informé des prochains rendez‑vous", 
  events = SAMPLE_EVENTS,
}) => {
  const trackRef = useRef(null)

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-event-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Précédent"
              onClick={() => scrollByCards(-1)}
              className="h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-100 border border-slate-200/70 dark:border-gray-700"
            >
              &lt;
            </button>
            <button
              aria-label="Suivant"
              onClick={() => scrollByCards(1)}
              className="h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-100 border border-slate-200/70 dark:border-gray-700"
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: 'smooth' }}
        >
          {(events || []).map((ev) => (
            <Card
              data-event-card
              key={ev.id}
              className="snap-start flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_50%] max-w-[85%] md:max-w-[50%] bg-white dark:bg-gray-900 border-slate-200/70 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5 md:p-6 flex gap-4">
                <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200 border border-red-100/60 dark:border-red-800/50">
                  <div className="text-base md:text-lg font-bold leading-none">{new Date(ev.date).getDate().toString().padStart(2,'0')}</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wide">{new Date(ev.date).toLocaleString(undefined, { month: 'short' })}</div>
                  <div className="text-[9px] md:text-[10px] opacity-70">{new Date(ev.date).getFullYear()}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">{ev.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-gray-400">
                    {ev.time && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4" aria-hidden="true" /> {ev.time}
                      </span>
                    )}
                    {ev.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" /> {ev.location}
                      </span>
                    )}
                  </div>
                  {ev.excerpt && (
                    <p className="mt-2 text-sm text-slate-700 dark:text-gray-300 line-clamp-3">{ev.excerpt}</p>
                  )}
                  <div className="mt-3">
                    <Button asChild variant="default" size="sm">
                      <a href={ev.href}>
                        {ev.cta || 'Détails'}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SchoolEvents
