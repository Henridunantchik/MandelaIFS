export const MAIN_CATEGORIES = [
  "Maternelle",
  "Primaire",
  "Secondaire",
  "École",
  "Uncategorized"
];

export const SUBCATEGORIES_MAP = {
  Maternelle: [
    "Activités ludiques et créatives",
    "Apprentissage précoce",
    "Développement psychomoteur",
    "Vie de la classe",
    "Événements et fêtes scolaires",
    "Conseils aux parents"
  ],
  Primaire: [
    "Vie scolaire et activités",
    "Projets pédagogiques",
    "Ressources éducatives",
    "Apprentissage et réussite",
    "Sorties et découvertes",
    "Concours et distinctions",
    "Parents et éducation"
  ],
  Secondaire: [
    "Actualités du collège/lycée",
    "Projets d’élèves et clubs",
    "Sciences et innovations",
    "Langues et culture",
    "Orientation et carrière",
    "Résultats et distinctions",
    "Vie estudiantine"
  ]
};

export const TRANSVERSAL_TAGS = [
  "Événements scolaires",
  "Galerie & moments forts",
  "Parole aux enseignants",
  "Partenariats & communauté",
  "Actualités de l’école",
  "Actualités de l’internat"
];

export function isValidMainCategory(mainCategory) {
  return MAIN_CATEGORIES.includes(mainCategory);
}

export function areValidSubcategories(mainCategory, subcategories = []) {
  const allowed = SUBCATEGORIES_MAP[mainCategory] || [];
  return subcategories.every((s) => allowed.includes(s));
}

export function areValidTransversal(tags = []) {
  return tags.every((t) => TRANSVERSAL_TAGS.includes(t));
}
