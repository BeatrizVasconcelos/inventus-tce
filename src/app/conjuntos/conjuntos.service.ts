import { Conjunto } from './conjunto.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class ConjuntosService {
  private conjuntos: Conjunto[] = [];
  private conjuntosAtualizados = new Subject<{conjuntos: Conjunto[], conjuntoCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getConjuntos(conjuntosPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${conjuntosPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string, conjuntos: any, maxConjuntos: number }>(
      'http://localhost:27017/api/conjuntos' + queryParams
      )
      .pipe(map((conjuntoData) => {
        return { conjuntos: conjuntoData.conjuntos.map(conjunto => {
          return {
            id: conjunto._id,
            titulo: conjunto.titulo,
            descricao: conjunto.descricao,
            origem: conjunto.origem,
            setorEntidadeResponsavel: conjunto.setorEntidadeResponsavel,
            formato: conjunto.formato,
            conexao: conjunto.conexao,
            abrangenciaTemporal: conjunto.abrangenciaTemporal,
            freqAtt: conjunto.freqAtt,
            volume: conjunto.volume,
            volumeAtt: conjunto.volumeAtt,
            sigilo: conjunto.sigilo,
            status: conjunto.status,
            software: conjunto.software,
            armazenamento: conjunto.armazenamento,
            publicoAlvo: conjunto.publicoAlvo,
            dicionarioDeDados: conjunto.dicionarioDeDados,
            acordoDeCooperacao: conjunto.acordoDeCooperacao,
            comentarios: conjunto.comentarios
          };
        }), maxConjuntos: conjuntoData.maxConjuntos };
      }))
    .subscribe((conjuntosTransformadosData) => {
      this.conjuntos = conjuntosTransformadosData.conjuntos;
      this.conjuntosAtualizados.next
      ({conjuntos: [...this.conjuntos],
        conjuntoCount: conjuntosTransformadosData.maxConjuntos});
    });
  }

  getConjuntosAtualizadosListener() {
    return this.conjuntosAtualizados.asObservable();
  }

  getConjunto(id: string){
    return this.http.get<{
      _id: string,
      titulo: String,
      descricao: String,
      origem: String,
      setorEntidadeResponsavel: String,
      formato: String,
      conexao: String,
      abrangenciaTemporal: Date,
      freqAtt: String,
      volume: number,
      volumeAtt: number,
      sigilo: String,
      status: String,
      software: String,
      armazenamento: String,
      publicoAlvo: String,
      dicionarioDeDados: String,
      acordoDeCooperacao: String,
      comentarios: String}>
      ('http://localhost:27017/api/conjuntos/' + id);
  }

  addConjunto(
    id: null,
    titulo: String,
    descricao: String,
    origem: String,
    setorEntidadeResponsavel: String,
    formato: String,
    conexao: String,
    abrangenciaTemporal: Date,
    freqAtt: String,
    volume: number,
    volumeAtt: number,
    sigilo: String,
    status: String,
    software: String,
    armazenamento: String,
    publicoAlvo: String,
    dicionarioDeDados: String,
    acordoDeCooperacao: String,
    comentarios: String) {

    const conjunto: Conjunto = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      origem: origem,
      setorEntidadeResponsavel: setorEntidadeResponsavel,
      formato: formato,
      conexao: conexao,
      abrangenciaTemporal: abrangenciaTemporal,
      freqAtt: freqAtt,
      volume: volume,
      volumeAtt: volumeAtt,
      sigilo: sigilo,
      status: status,
      software: software,
      armazenamento: armazenamento,
      publicoAlvo: publicoAlvo,
      dicionarioDeDados: dicionarioDeDados,
      acordoDeCooperacao: acordoDeCooperacao,
      comentarios: comentarios
    };

    this.http.post<{message: string, conjuntoId: string}>('http://localhost:27017/api/conjuntos/', conjunto)
      .subscribe((responseData) => {

        this.router.navigate(["/"]);
      });

  }

  updateConjunto(id: string,
    titulo: string,
    descricao: string,
    origem: String,
    setorEntidadeResponsavel: String,
    formato: String,
    conexao: String,
    abrangenciaTemporal: Date,
    freqAtt: String,
    volume: number,
    volumeAtt: number,
    sigilo: String,
    status: String,
    software: String,
    armazenamento: String,
    publicoAlvo: String,
    dicionarioDeDados: String,
    acordoDeCooperacao: String,
    comentarios: String) {

    const conjunto: Conjunto = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      origem: origem,
      setorEntidadeResponsavel: setorEntidadeResponsavel,
      formato: formato,
      conexao: conexao,
      abrangenciaTemporal: abrangenciaTemporal,
      freqAtt: freqAtt,
      volume: volume,
      volumeAtt: volumeAtt,
      sigilo: sigilo,
      status: status,
      software: software,
      armazenamento: armazenamento,
      publicoAlvo: publicoAlvo,
      dicionarioDeDados: dicionarioDeDados,
      acordoDeCooperacao: acordoDeCooperacao,
      comentarios: comentarios
    }
    this.http.put('http://localhost:27017/api/conjuntos/' + id, conjunto)
      .subscribe(response => {

        this.router.navigate(["/"]);
      });

  }

  deleteConjunto(conjuntoId: string){
    return this.http.delete('http://localhost:27017/api/conjuntos/' + conjuntoId);

  }
}
