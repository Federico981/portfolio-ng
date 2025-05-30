import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Skill {
  name: string;
  level: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skills = new BehaviorSubject<Skill[]>([
    { name: 'Angular', level: 'Avanzato', icon: 'assets/icons/angular.png' },
    {
      name: 'JavaScript',
      level: 'Avanzato',
      icon: 'assets/icons/javascript.png',
    },
    {
      name: 'TypeScript',
      level: 'Intermedio',
      icon: 'assets/icons/typescript.png',
    },
    { name: 'HTML/CSS', level: 'Avanzato', icon: 'assets/icons/html-css.png' },
  ]);
  skillManagement = this.skills.asObservable(); // creo uno stream osservabile

  constructor() {}

  getAllSkills(): Skill[] {
    return this.skills.getValue();
  }
}
