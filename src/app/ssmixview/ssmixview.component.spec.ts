import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsmixviewComponent } from './ssmixview.component';

describe('SsmixviewComponent', () => {
  let component: SsmixviewComponent;
  let fixture: ComponentFixture<SsmixviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsmixviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsmixviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
