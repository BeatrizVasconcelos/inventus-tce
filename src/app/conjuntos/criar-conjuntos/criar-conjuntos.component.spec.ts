import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarConjuntosComponent } from './criar-conjuntos.component';

describe('CriarConjuntosComponent', () => {
  let component: CriarConjuntosComponent;
  let fixture: ComponentFixture<CriarConjuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarConjuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarConjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
