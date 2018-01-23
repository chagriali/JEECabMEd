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
    children: [
      {
        name: 'List Patient',
        url: '/doctor/patient-list',
        icon: 'fa fa-bars',
      },
      {
        name: 'Consultation à distance',
        url: '/doctor/consult',
        icon: 'fa fa-pencil-square-o',
      }
      ]
  },

  {
    name: 'Espace Secrétaire',
    url: '/secretary',
    icon: '',
    children: [
      {
        name: 'Ajouter Patient',
        url: '/secretary/add-new-medical-file',
        icon: 'fa fa-plus',
      },
      {
        name: 'List Patient',
        url: '/secretary/patient-list',
        icon: 'fa fa-bars',
      },
      {
        name: 'Gestion Rendez-vous',
        url: '/secretary/GestionRdv',
        icon: 'fa fa-pencil-square-o',
      },
      {
        name: 'Gestion Cabinet',
        url: '/secretary/GestionCabinet',
        icon: 'fa fa-eye'
      },

    ]
  },
  {
    name: 'Espace patient',
    url: '/patient',
    icon: '',
    children: [
      {
        name: 'Mon dossier',
        url: '/patient/addRdv',
        icon: 'fa fa-pencil-square-o',
      },
      {
        name: 'Voir Cabinet',
        url: '/patient/VoirCabinet',
        icon: 'fa fa-eye'
      },
      {
        name: 'Consultation',
        url: '/patient/consultation',
        icon: 'fa fa-plus'
      },


    ]
  }


];
