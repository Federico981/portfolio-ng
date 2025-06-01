import { Component } from '@angular/core';
import { Skill, SkillsService } from '../../service/skills.service';
import { CommonModule } from '@angular/common';
import { ProjectsService, Repo } from '../../service/projects.service';
import { SenderQuizComponent } from '../sender-quiz/sender-quiz.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, SenderQuizComponent, TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  skills: Skill[] = [];
  projects: Repo[] = [];
  constructor(
    public skillService: SkillsService,
    public repo: ProjectsService
  ) {}

  ngOnInit() {
    this.skillService.skillManagement.subscribe((skill: Skill[]) => {
      this.skills = skill;
    });

    this.repo.repoProject.subscribe((repo) => {
      this.projects = repo;
    });
  }
}
