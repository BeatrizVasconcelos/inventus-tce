import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConjuntosComponent } from './listar-conjuntos.component';

describe('ListarConjuntosComponent', () => {
  let component: ListarConjuntosComponent;
  let fixture: ComponentFixture<ListarConjuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarConjuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarConjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
