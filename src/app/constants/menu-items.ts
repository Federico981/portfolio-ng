// src/app/constants/menu-items.ts
export interface MenuItem {
  labelKey: string;
  route: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { labelKey: 'NAV.HOME', route: '/home' },
  { labelKey: 'NAV.PROJECTS', route: '/projects' },
  { labelKey: 'NAV.CONTACT', route: '/contact' },
  { labelKey: 'NAV.PERSONAL_PAGE', route: '/personal-page' },
  { labelKey: 'NAV.LOGOUT', route: '/' },
];
