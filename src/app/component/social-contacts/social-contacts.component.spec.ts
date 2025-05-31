import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialContactsComponent } from './social-contacts.component';

describe('SocialContactsComponent', () => {
  let component: SocialContactsComponent;
  let fixture: ComponentFixture<SocialContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
