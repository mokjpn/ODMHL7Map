import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdmviewComponent } from './odmview.component';

describe('OdmviewComponent', () => {
  let component: OdmviewComponent;
  let fixture: ComponentFixture<OdmviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdmviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdmviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
