export const NAV_MENU = [
  {
    label: 'À propos de Nous',
    children: [
      { label: 'Mission et vision', to: '/a-propos/mission-vision' },
      { label: 'Nos valeurs', to: '/a-propos/valeurs' },
      { label: 'Mot du Directeur', to: '/a-propos/mot-du-directeur' },
      { label: 'Notre histoire', to: '/a-propos/histoire' },
      { label: 'Équipe pédagogique et administrative', to: '/a-propos/equipe' },
      { label: 'Partenaires et affiliations', to: '/a-propos/partenaires' },
      { label: 'Gouvernance et leadership', to: '/a-propos/gouvernance' },
      { label: 'Témoignages des parents et anciens élèves', to: '/a-propos/temoignages' },
    ],
  },
  {
    label: 'Nos Cycles',
    children: [
      {
        label: 'Maternelle',
        children: [
          { label: 'Présentation', to: '/sections/maternelle/presentation' },
          { label: 'Programme pédagogique', to: '/sections/maternelle/programme' },
          { label: 'Activités et éveil', to: '/sections/maternelle/activites' },
        ],
      },
      {
        label: 'Primaire',
        children: [
          { label: 'Présentation', to: '/sections/primaire/presentation' },
          { label: "Méthodes d’enseignement", to: '/sections/primaire/methodes' },
          { label: 'Activités parascolaires', to: '/sections/primaire/parascolaires' },
        ],
      },
      {
        label: 'Secondaire',
        children: [
          { label: 'Présentation', to: '/sections/secondaire/presentation' },
          { label: 'Parcours académique', to: '/sections/secondaire/parcours' },
          { label: 'Orientation et examens officiels', to: '/sections/secondaire/orientation-examens' },
        ],
      },
    ],
  },
  {
    label: 'Vie Scolaire',
    children: [
      { label: 'Événements et célébrations', to: '/vie-scolaire/evenements' },
      { label: 'Activités culturelles et sportives', to: '/vie-scolaire/activites' },
      { label: "Clubs et associations d’élèves", to: '/vie-scolaire/clubs' },
      { label: 'Règlement intérieur', to: '/vie-scolaire/reglement' },
      { label: 'Cantine et transport scolaire', to: '/vie-scolaire/cantine-transport' },
      { label: 'Santé et bien-être des élèves', to: '/vie-scolaire/sante' },
      { label: 'Galerie photos et vidéos', to: '/vie-scolaire/galerie' },
    ],
  },
  {
    label: 'Administration et Admissions',
    children: [
      { label: "Conditions d’admission", to: '/admissions/conditions' },
      { label: "Procédure d’inscription", to: '/admissions/procedure' },
      { label: 'Documents requis', to: '/admissions/documents' },
      { label: 'Frais de scolarité', to: '/admissions/frais' },
      { label: 'Exigences administratives', to: '/admissions/exigences' },
      { label: 'Formulaire médical', to: '/admissions/formulaire-medical' },
      { label: 'Bourses et aides financières', to: '/admissions/bourses' },
      { label: 'Centre de soutien scolaire', to: '/admissions/soutien' },
      { label: 'Orientation académique et psychologique', to: '/admissions/orientation' },
    ],
  },
  {
    label: 'Gouvernance et Transparence',
    children: [
      { label: "Aperçu de l’administration", to: '/gouvernance/apercu' },
      { label: 'Organigramme', to: '/gouvernance/organigramme' },
      { label: 'Politiques internes et chartes', to: '/gouvernance/politiques' },
      { label: 'Responsabilité sociale et environnementale', to: '/gouvernance/rse' },
      { label: 'Gestion financière et transparence', to: '/gouvernance/finances' },
      { label: 'Emplois et opportunités professionnelles', to: '/gouvernance/emplois' },
    ],
  },
  {
    label: 'Blog & Actualités',
    children: [
      { label: 'Articles pédagogiques', to: '/blog/articles-pedagogiques' },
      { label: 'Nouvelles de l’école', to: '/blog/nouvelles' },
      { label: 'Conseils aux parents', to: '/blog/conseils-parents' },
      { label: 'Innovation éducative', to: '/blog/innovation' },
      { label: 'Vie des élèves', to: '/blog/vie-eleves' },
    ],
  },
  {
    label: 'Contactez-nous',
    children: [
      { label: 'Coordonnées et horaires', to: '/contact/coordonnees' },
      { label: 'Plan d’accès', to: '/contact/plan-acces' },
      { label: 'Formulaire de contact', to: '/contact/formulaire' },
      { label: 'Planifier une visite guidée', to: '/contact/visite' },
      { label: 'FAQ', to: '/contact/faq' },
    ],
  },
]
