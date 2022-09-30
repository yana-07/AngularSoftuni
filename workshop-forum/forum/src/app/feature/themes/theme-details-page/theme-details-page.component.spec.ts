import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailsPageComponent } from './theme-details-page.component';

describe('ThemeDetailsPageComponent', () => {
  let component: ThemeDetailsPageComponent;
  let fixture: ComponentFixture<ThemeDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
