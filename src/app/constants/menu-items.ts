// src/app/constants/menu-items.ts
export interface MenuItem {
  label: string;
  route: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', route: '/home' },
  { label: 'Progetti', route: '/projects' },
  { label: 'Competenze', route: '/skills' },
  { label: 'Contatti', route: '/contact' },
  { label: 'Chi sono', route: '/about' },
];
