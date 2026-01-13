import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contactform } from './contactform';

describe('Contactform', () => {
  let component: Contactform;
  let fixture: ComponentFixture<Contactform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contactform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contactform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
