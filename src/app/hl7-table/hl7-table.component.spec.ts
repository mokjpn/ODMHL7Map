import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hl7TableComponent } from './hl7-table.component';

describe('Hl7TableComponent', () => {
  let component: Hl7TableComponent;
  let fixture: ComponentFixture<Hl7TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hl7TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hl7TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
