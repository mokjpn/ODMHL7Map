import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsmixtreeComponent } from './ssmixtree.component';

describe('SsmixtreeComponent', () => {
  let component: SsmixtreeComponent;
  let fixture: ComponentFixture<SsmixtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsmixtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsmixtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
