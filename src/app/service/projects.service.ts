import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Repo {
  name: string;
  img: string;
  technologies: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects = new BehaviorSubject<Repo[]>([
    {
      name: 'pippo',
      img: 'assets/icons/javascript.png',
      technologies: ['react', 'angular'],
    },
    {
      name: 'pippo',
      img: 'assets/icons/javascript.png',
      technologies: ['react', 'angular'],
    },
    {
      name: 'pippo',
      img: 'assets/icons/javascript.png',
      technologies: ['react', 'angular'],
    },
    {
      name: 'pippo',
      img: 'assets/icons/javascript.png',
      technologies: ['react', 'angular'],
    },
    {
      name: 'pippo',
      img: 'assets/icons/javascript.png',
      technologies: ['react', 'angular'],
    },
  ]);
  repoProject = this.projects.asObservable();

  getAllProjects(): Repo[] {
    return this.projects.getValue();
  }
}
