import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRecommendationComponent } from './driver-recommendation.component';

describe('DriverRecommendationComponent', () => {
  let component: DriverRecommendationComponent;
  let fixture: ComponentFixture<DriverRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
