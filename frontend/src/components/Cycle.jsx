import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Sections dataset (replace placeholders with real images/links as needed)

const SAMPLE = [
  {
    title: "Cycle Maternelle",
    level: 'Maternelle',
    description: "Un espace d’éveil et d’apprentissage pour les plus petits, où chaque enfant découvre le plaisir d’apprendre à travers le jeu et la créativité.",
    image: "/placeholder-maternelle.jpg",
    tags: ["Éveil", "Jeu", "Créativité"],
  },
  {
    title: "Cycle Primaire",
    level: 'Primaire',
    description: "Une formation de base solide axée sur la lecture, l’écriture, les mathématiques, les sciences et les valeurs humaines.",
    image: "/placeholder-primaire.jpg",
    tags: ["Lecture", "Écriture", "Maths"],
  },
  {
    title: "Cycle Secondaire",
    level: 'Secondaire',
    description: "Un environnement d’excellence pour préparer les jeunes à leur avenir académique, professionnel et citoyen.",
    image: "/placeholder-secondaire.jpg",
    tags: ["Excellence", "Avenir", "Citoyenneté"],
  },
]

const Cycle = () => {

  return (
    <div id="sections">
      <div>
        <div className='max-w-6xl mx-auto flex flex-col items-center gap-3 mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white'>Les Cycles de Mandela IFS</h1>
          <hr className='w-20 md:w-24 border-2 border-blue-500 rounded-full' />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SAMPLE.slice(0, 3).map((item, idx) => (
            <Card key={`${item.title}-${idx}`} className="shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="relative h-64 w-full bg-gray-100">
                {/* Replace with real <img> or Next/Image when available */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-full text-xs bg-amber-500 text-white">{tag}</span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-500 text-white">+{item.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-700 dark:text-gray-300 line-clamp-3">{item.description}</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="text-sm">En savoir plus</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cycle

