import React, { useState } from 'react';
import { cn } from '../../lib/utils';

const AcademicResults = ({ className = "" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Real data from Mandela International French School (2023-2025)
  const slides = [
    {
      id: 'maternelle-2023',
      year: '2023-2025',
      title: 'Maternelle',
      stats: {
        worldToppers: { value: 100, label: '1ère Maternelle', sublabel: 'Tous réussis' },
        nearPerfect: { value: 100, label: '2ème Maternelle', sublabel: 'Tous réussis' },
        schoolAverage: { value: 100, label: '3ème Maternelle', sublabel: 'Tous réussis' }
      },
      progressBars: [
        { label: 'Taux global Maternelle', percentage: 100, value: '100%', color: 'bg-green-500' },
        { label: 'Réussite totale', percentage: 100, value: '100%', color: 'bg-green-500' },
        { label: 'Aucun redoublement', percentage: 100, value: '100%', color: 'bg-green-500' }
      ]
    },
    {
      id: 'primaire-2023',
      year: '2023-2025',
      title: 'Primaire',
      stats: {
        worldToppers: { value: 85, label: '1ère à 5ème', sublabel: 'Quelques redoublants' },
        nearPerfect: { value: 100, label: 'ENAFEP 6ème', sublabel: '3 années parfaites' },
        schoolAverage: { value: 100, label: 'Taux ENAFEP', sublabel: 'Examen national' }
      },
      progressBars: [
        { label: 'ENAFEP (6ème Primaire)', percentage: 100, value: '100%', color: 'bg-green-500' },
        { label: 'Réussite sur 3 ans', percentage: 100, value: '100%', color: 'bg-blue-500' },
        { label: 'Examen national', percentage: 100, value: '100%', color: 'bg-green-500' }
      ]
    },
    {
      id: 'secondaire-2024',
      year: '2023-2025',
      title: 'Secondaire',
      chartData: {
        aStarOutOfTotal: { percentage: 100, label: "Examen d'État", sublabel: "4ème - Toutes sections" },
        distinction: { percentage: 100, label: "Orientation", sublabel: "8ème - Réussite complète" }
      }
    },
    {
      id: 'examens-2025',
      year: '2023-2025',
      title: 'Examens Nationaux',
      progressBars: [
        { label: 'Examen d\'État (4ème)', percentage: 100, value: '100%', color: 'bg-green-500' },
        { label: 'Examen Orientation (8ème)', percentage: 100, value: '100%', color: 'bg-blue-500' },
        { label: 'ENAFEP (6ème)', percentage: 100, value: '100%', color: 'bg-green-500' }
      ]
    }
  ];

  const currentData = slides[currentSlide];

  return (
    <div className={cn("", className)}>
      <div>

        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Résultats Académiques Exceptionnels
          </h2>
          <p className="text-slate-700 dark:text-gray-300 text-lg max-w-4xl leading-relaxed">
            Mandela International French School affiche un taux de réussite national de 100% sur les 3 dernières années pour tous les examens officiels (2023, 2024, 2025).
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 - Maternelle */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Maternelle</h3>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-slate-600 dark:text-gray-300">
                2023-2025
              </span>
            </div>

            {/* Circular Stats - Side by Side Layout */}
            <div className="space-y-4 mb-8">
              {/* Row 1 - 1ère Maternelle */}
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">1ère Maternelle</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">Tous réussis</div>
                  </div>
                </div>
              </div>

              {/* Row 2 - 2ème Maternelle */}
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">2ème Maternelle</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">Tous réussis</div>
                  </div>
                </div>
              </div>

              {/* Row 3 - 3ème Maternelle */}
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">3ème Maternelle</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">Tous réussis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Primaire */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Primaire</h3>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-slate-600 dark:text-gray-300">
                2023-2025
              </span>
            </div>

            {/* Stats - Side by Side Layout */}
            <div className="space-y-4 mb-8">
              {/* Row 1 - ENAFEP */}
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">ENAFEP (6ème)</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">3 années parfaites</div>
                  </div>
                </div>
              </div>

              {/* Row 2 - 1ère à 5ème */}
              <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    85%
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">1ère à 5ème</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">Quelques redoublants</div>
                  </div>
                </div>
              </div>

              {/* Row 3 - Taux Global */}
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    100%
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">Taux ENAFEP</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">Examen national</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Secondaire */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Secondaire</h3>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-slate-600 dark:text-gray-300">
                2023-2025
              </span>
            </div>

            {/* Chart Bars */}
            <div className="flex justify-center space-x-8">
              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-600 dark:text-gray-400 mb-2">Examen d'État</div>
                <div className="relative w-12 h-32 bg-gray-200 dark:bg-gray-700 rounded">
                  <div className="absolute bottom-0 w-full bg-green-500 rounded" style={{ height: '100%' }} />
                </div>
                <div className="text-center mt-2">
                  <div className="font-bold text-lg text-slate-900 dark:text-white">100%</div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">4ème - Toutes sections</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-600 dark:text-gray-400 mb-2">Orientation</div>
                <div className="relative w-12 h-32 bg-gray-200 dark:bg-gray-700 rounded">
                  <div className="absolute bottom-0 w-full bg-blue-500 rounded" style={{ height: '100%' }} />
                </div>
                <div className="text-center mt-2">
                  <div className="font-bold text-lg text-slate-900 dark:text-white">100%</div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">8ème - Réussite complète</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Examens Nationaux */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Examens Nationaux</h3>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-slate-600 dark:text-gray-300">
                2023-2025
              </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-gray-300 font-medium text-sm">Examen d'État (4ème)</span>
                  <span className="font-bold text-slate-900 dark:text-white">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-gray-300 font-medium text-sm">Examen Orientation (8ème)</span>
                  <span className="font-bold text-slate-900 dark:text-white">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-gray-300 font-medium text-sm">ENAFEP (6ème)</span>
                  <span className="font-bold text-gray-900 dark:text-white">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AcademicResults;