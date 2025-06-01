import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerCustomizationComponent } from './spinner-customization.component';

describe('SpinnerCustomizationComponent', () => {
  let component: SpinnerCustomizationComponent;
  let fixture: ComponentFixture<SpinnerCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerCustomizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
