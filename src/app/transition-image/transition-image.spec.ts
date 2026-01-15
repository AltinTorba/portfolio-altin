import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionImage } from './transition-image';

describe('TransitionImage', () => {
  let component: TransitionImage;
  let fixture: ComponentFixture<TransitionImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitionImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
