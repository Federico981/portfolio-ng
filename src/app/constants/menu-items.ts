// src/app/constants/menu-items.ts
export interface MenuItem {
  label: string;
  route: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', route: '/home' },
  { label: 'Progetti e Competenze', route: '/projects' },
  { label: 'Contatti', route: '/contact' },
  { label: 'Chi sono', route: '/personal-page' },
  { label: 'Logout', route: '/' },
];
