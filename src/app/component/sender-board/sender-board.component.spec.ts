import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderBoardComponent } from './sender-board.component';

describe('SenderBoardComponent', () => {
  let component: SenderBoardComponent;
  let fixture: ComponentFixture<SenderBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SenderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
