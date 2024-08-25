import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsDialogComponent } from './professors-dialog.component';

describe('ProfessorsDialogComponent', () => {
  let component: ProfessorsDialogComponent;
  let fixture: ComponentFixture<ProfessorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessorsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
