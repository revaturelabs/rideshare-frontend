import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModalComponent } from './sign-up-modal.component';
import { getRoutableComponents } from 'src/app/app-routing.module';
import { BsModalService } from 'ngx-bootstrap';

describe('SignupModalComponent', () => {
  let component: SignupModalComponent;
  let fixture: ComponentFixture<SignupModalComponent>;
  let mockBsModalService;

  beforeEach(async(() => {
    // Create a mock object for BsModalService
    mockBsModalService = jasmine.createSpyObj('BsModalService', ['show']);

    TestBed.configureTestingModule({
      declarations: [SignupModalComponent, ...getRoutableComponents()],

      // Inject mock service rather than real BsModalService
      providers: [{ provide: BsModalService, useValue: mockBsModalService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
