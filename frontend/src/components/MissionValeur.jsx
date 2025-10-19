import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const VALUES = {
  'Excellence académique': {
    title: 'Excellence académique',
    content:
      "Nous plaçons l’excellence au cœur de notre mission éducative. Chaque élève est encouragé à donner le meilleur de lui-même, à cultiver la curiosité intellectuelle et à viser la réussite par le travail, la persévérance et la passion d’apprendre. L’excellence académique ouvre la voie à l’épanouissement personnel et professionnel, en développant rigueur, méthode et amour durable du savoir.",
  },
  'Respect et diversité': {
    title: 'Respect et diversité',
    content:
      "Notre école valorise la richesse des cultures, des idées et des origines. Le respect mutuel et l’acceptation de la différence sont des fondements essentiels de notre communauté. Nous apprenons à nos élèves à vivre ensemble dans la tolérance, l’empathie et la compréhension, préparant ainsi des citoyens ouverts et solidaires, capables de dialoguer et de coopérer harmonieusement.",
  },
  Innovation: {
    title: 'Innovation',
    content:
      "Nous encourageons la créativité, la curiosité et l’esprit d’initiative à travers une pédagogie active et adaptée aux défis du monde moderne. L’innovation guide nos pratiques d’enseignement et d’apprentissage, permettant aux élèves de développer des compétences critiques, technologiques et collaboratives essentielles pour le XXIᵉ siècle, avec expérimentation, projets concrets et esprit entrepreneurial.",
  },
  Responsabilité: {
    title: 'Responsabilité',
    content:
      "Être responsable, c’est comprendre l’impact de ses actions sur soi, sur les autres et sur la planète. Nous formons des élèves conscients, autonomes et engagés, capables de faire des choix éclairés et de contribuer positivement à leur environnement scolaire, social et écologique, dans le respect des règles, du bien commun et du vivant.",
  },
  'Préparation globale': {
    title: 'Préparation globale',
    content:
      "Nous préparons nos élèves à évoluer avec confiance dans un monde interconnecté. Grâce à une éducation ouverte sur l’international, ils développent des compétences linguistiques, culturelles et sociales indispensables pour réussir partout. La préparation globale fait de chaque élève un citoyen du monde, prêt à relever les défis de demain, avec agilité, curiosité et sens interculturel.",
  },
}

const MissionValeur = () => {
  const [active, setActive] = useState('Excellence académique')

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Mission */}
          <div className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900 border border-slate-200/70 dark:border-gray-800">
            <div className="p-8 md:p-10">
              <div className="flex justify-center mb-4">
                <span className="inline-block h-1.5 w-24 rounded-full bg-sky-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-6 text-slate-900 dark:text-white">Mission de l’école</h3>
              <p className="leading-7 text-slate-700 dark:text-gray-300">
                Notre mission est d’offrir une éducation de qualité alliant le programme congolais aux standards internationaux, afin de former des citoyens du monde compétents, responsables et ouverts aux diversités culturelles.
                Nous nous engageons à développer chez chaque élève la curiosité intellectuelle, la rigueur, la créativité et le sens du leadership.  
              </p>
              <p className="leading-7 text-slate-700 dark:text-gray-300 mt-3">
               Au cœur de notre pédagogie se trouvent l’excellence académique, le respect, et le développement durable, valeurs essentielles pour bâtir un avenir équilibré et solidaire. Nous favorisons un environnement d’apprentissage inclusif et stimulant, où chaque enfant apprend à penser par lui-même, à collaborer et à contribuer positivement à la société.
              </p>
              <p className="leading-7 text-slate-700 dark:text-gray-300 mt-3">
               Ainsi, le Complexe Scolaire Mandela prépare ses élèves à réussir dans un monde en constante évolution.
              </p>
              
              <div className="mt-8 flex justify-center">
                <Button className="rounded-full bg-amber-500 hover:bg-amber-400 text-white px-6">En savoir plus</Button>
              </div>
            </div>
          </div>

          {/* Valeurs */}
          <div className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900 border border-slate-200/70 dark:border-gray-800">
            <div className="p-8 md:p-10">
              <div className="flex justify-center mb-4">
                <span className="inline-block h-1.5 w-24 rounded-full bg-teal-500" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-5 text-slate-900 dark:text-white">Nos valeurs</h3>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-5 justify-center">
                {Object.keys(VALUES).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`px-3 py-1.5 rounded-full text-sm transition border ${
                      active === key
                        ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
                        : 'bg-transparent text-slate-700 dark:text-gray-200 border-slate-300/60 dark:border-gray-700 hover:bg-slate-100/60 dark:hover:bg-gray-800'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Active value */}
              <div className="rounded-lg p-5 bg-slate-50 dark:bg-gray-800/60 border border-slate-200/70 dark:border-gray-800">
                <h4 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">{VALUES[active].title}</h4>
                <p className="leading-7 text-slate-700 dark:text-gray-300">{VALUES[active].content}</p>
              </div>

              <div className="mt-8 flex justify-center">
                <Button className="rounded-full bg-amber-500 hover:bg-amber-400 text-white px-6">En savoir plus</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionValeur

