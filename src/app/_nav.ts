export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Espace Docteur',
    url: '/doctor',
    icon: '',
  },

  {
    name: 'Espace Secrétaire',
    url: '/secretary',
    icon: '',
    children: [
      {
        name: 'Ajouter Patient',
        url: '/secretary/add-new-medical-file',
        icon: 'icon-plus',
      }]
  }
];
