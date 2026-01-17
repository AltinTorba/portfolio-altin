import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atf } from './atf';

describe('Atf', () => {
  let component: Atf;
  let fixture: ComponentFixture<Atf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Atf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
