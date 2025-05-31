import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderQuizComponent } from './sender-quiz.component';

describe('SenderQuizComponent', () => {
  let component: SenderQuizComponent;
  let fixture: ComponentFixture<SenderQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SenderQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
