import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENU",
    isTitle: true,
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "bx-home-circle",
    link: "/dashboard",
  },
  {
    id: 3,
    isLayout: true,
  },
  // {
  //     id: 4,
  //     label: 'MENUITEMS.APPS.TEXT',
  //     isTitle: true
  // },
  {
    id: 4,
    label: "Master",
    icon: "mdi mdi-account-cowboy-hat",
    subItems: [
      {
        id: 5,
        label: "Languages",
        link: "master/languages",
        icon: "mdi mdi-translate",
        image:"assets/images/diveroid_images/language.svg",
        parentId: 4,
      },
      {
        id: 6,
        label: "Units",
        link: "master/units",
        icon: "bx bx-ruler",
        image:"assets/images/diveroid_images/units.svg",
        parentId: 4,
      },
      {
        id: 7,
        label: "Diving Modes",
        link: "master/diving-modes",
        icon:'mdi mdi-compass-outline',
        parentId: 4,
      },
    ],
  },
  // {
  //     id: 48,
  //     label: 'MENUITEMS.CONTACTS.TEXT',
  //     icon: 'bxs-user-detail',
  //     subItems: [
  //         {
  //             id: 49,
  //             label: 'MENUITEMS.CONTACTS.LIST.USER',
  //             link: '/contacts/user',
  //             parentId: 48
  //         },
  //         {
  //             id: 51,
  //             label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
  //             link: '/contacts/profile',
  //             parentId: 48
  //         }
  //     ]
  // },
];
