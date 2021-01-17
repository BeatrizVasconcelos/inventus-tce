import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Conjunto } from '../conjunto.model';
import { ConjuntosService } from '../conjuntos.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-conjuntos',
  templateUrl: './listar-conjuntos.component.html',
  styleUrls: ['./listar-conjuntos.component.css']
})
export class ListarConjuntosComponent implements OnInit, OnDestroy {

  isLoading = false;
  totalConjuntos = 0;
  conjuntosPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  conjuntos: Conjunto[] = [];
  conjuntosSub: Subscription;

  panelOpenState = false;

  constructor(public conjuntosService: ConjuntosService) { }

  ngOnInit() {

    this.isLoading = true;
    this.conjuntosService.getConjuntos(this.conjuntosPerPage, this.currentPage);
    this.conjuntosSub = this.conjuntosService.getConjuntosAtualizadosListener()
    .subscribe((conjuntoData: {conjuntos: Conjunto[], conjuntoCount: number}) => {
      this.isLoading = false;
      this.totalConjuntos = conjuntoData.conjuntoCount;
      this.conjuntos = conjuntoData.conjuntos;

    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.conjuntosPerPage = pageData.pageSize;
    this.conjuntosService.getConjuntos(this.conjuntosPerPage, this.currentPage);
  }

  onDelete(conjuntoId: string) {
    this.isLoading = true;
    this.conjuntosService.deleteConjunto(conjuntoId)
    .subscribe(() => {
      this.conjuntosService.getConjuntos(this.conjuntosPerPage, this.currentPage)
    });
  }

  ngOnDestroy() {
    this.conjuntosSub.unsubscribe();
  }

  events: string[] = [];
  opened: boolean;

}
