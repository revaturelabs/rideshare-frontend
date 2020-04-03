import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { getRoutableComponents } from 'src/app/app-routing.module';
import { BsModalService } from 'ngx-bootstrap';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let bsModalService;

  beforeEach(async(() => {

    bsModalService = jasmine.createSpyObj('BsModalService', ['a']);
    TestBed.configureTestingModule({
      declarations: [...getRoutableComponents()],
      providers: [
        { provide: BsModalService, useValue: bsModalService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
