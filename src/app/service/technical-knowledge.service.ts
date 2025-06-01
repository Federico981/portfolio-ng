import { Injectable } from '@angular/core';

export interface Knowledge {
  id: number;
  name: string;
  properties: string[];
}

const data: Knowledge[] = [
  {
    id: 1,
    name: 'React',
    properties: [
      'Routing (React Router)',
      'Hooks (useState, useEffect)',
      'Componenti funzionali',
      'State Management (Redux)',
      'Gestione Forms',
      'Axios/API REST',
    ],
  },
  {
    id: 2,
    name: 'Angular',
    properties: [
      'Routing avanzato',
      'Template-driven & Reactive Forms',
      'RxJS',
      'Componenti standalone',
      'Servizi e DI',
      'NgRx',
      'Http Interceptor',
    ],
  },
  {
    id: 3,
    name: 'Javascript',
    properties: [
      'ES6+ (let, const, arrow functions, spread)',
      'Array methods (map, filter, reduce)',
      'Async/Await e Promises',
      'DOM Manipulation',
      'Event handling',
      'Fetch API',
    ],
  },
  {
    id: 4,
    name: 'React Native',
    properties: [
      'Navigazione (React Navigation)',
      'Componenti mobile',
      'Hooks',
      'API REST',
      'Styling con StyleSheet',
    ],
  },
  {
    id: 5,
    name: 'Kotlin',
    properties: [
      'Sintassi base',
      'Classi e funzioni',
      'Controllo di flusso',
      'Null Safety',
      'Android Studio',
    ],
  },
  {
    id: 6,
    name: 'Css/Scss/HTML',
    properties: [
      'Flexbox & Grid',
      'Responsive Design',
      'SCSS (variabili, mixin, nesting)',
      'Animations',
      'Media Queries',
      'Accessibilità (HTML Semantico)',
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class TechnicalKnowledgeService {
  constructor() {}

  getKnowledge(): Knowledge[] {
    return data.map((e) => ({ ...e }));
  }
}
