import { Component } from '@angular/core';
import { Skill, SkillsService } from '../../service/skills.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  skills: Skill[] = [];
  constructor(public skillService: SkillsService) {}

  ngOnInit() {
    this.skillService.skillManagement.subscribe((skill: Skill[]) => {
      this.skills = skill;
    });
  }
}
