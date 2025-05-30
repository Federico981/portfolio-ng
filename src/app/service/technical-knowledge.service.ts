import { Injectable } from '@angular/core';

export interface Knowledge {
  id: number;
  name: string;
  properties: string[];
}

const data: Knowledge[] = [
  {
    id: 1,
    name: 'JS Basics',
    properties: ['Routing', 'Forms'],
  },
  {
    id: 2,
    name: 'JS pBasics',
    properties: ['Routing', 'Forms'],
  },
  {
    id: 3,
    name: 'JS Blasics',
    properties: ['Routing', 'Forms'],
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
