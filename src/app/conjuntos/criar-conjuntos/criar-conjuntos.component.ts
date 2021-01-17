import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConjuntosService } from '../conjuntos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Conjunto } from '../conjunto.model';

@Component({
  selector: 'app-criar-conjuntos',
  templateUrl: './criar-conjuntos.component.html',
  styleUrls: ['./criar-conjuntos.component.css']
})
export class CriarConjuntosComponent implements OnInit {

isLoading = false;
startDate = new Date(2000, 0, 1);
step = 0;
enteredTitulo = '';
enteredDescricao = '';
enteredOrigem = '';
enteredSetorEntidadeResponsavel = '';
enteredFormato = '';
enteredConexao: '';
enteredAbrangenciaTemporal: Date;
enteredFreqAtt: '';
enteredVolume: 0;
enteredVolumeAtt: 0;
enteredSigilo: '';
enteredStatus: '';
enteredSoftware: '';
enteredArmazenamento: '';
enteredPublicoAlvo: '';
enteredDicionarioDeDados: '';
enteredAcordoDeCooperacao: '';
enteredComentarios: '';

private mode = 'criar';
private conjuntoId: string;
conjunto: Conjunto;




constructor(public conjuntosService: ConjuntosService, public route:ActivatedRoute) { }

  ngOnInit(): void {
    // Checa se a url está retornando o id de algum conjunto existente, caso esteja, a página vai para
    // o modo de edição. Caso o id seja null (conjunto não criado ainda), a página vai para o modo de
    // criação.
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('conjuntoId')) {
        this.mode='edit';
        this.conjuntoId = paramMap.get('conjuntoId');
        this.isLoading = true;
        this.conjuntosService.getConjunto(this.conjuntoId).subscribe(conjuntoData => {
          this.isLoading = false;
          this.conjunto = {
            id: conjuntoData._id,
            titulo: conjuntoData.titulo,
            descricao: conjuntoData.descricao,
            origem: conjuntoData.origem,
            setorEntidadeResponsavel: conjuntoData.setorEntidadeResponsavel,
            formato: conjuntoData.formato,
            conexao: conjuntoData.conexao,
            abrangenciaTemporal: conjuntoData.abrangenciaTemporal,
            freqAtt: conjuntoData.freqAtt,
            volume: conjuntoData.volume,
            volumeAtt: conjuntoData.volumeAtt,
            sigilo: conjuntoData.sigilo,
            status: conjuntoData.status,
            software: conjuntoData.software,
            armazenamento: conjuntoData.armazenamento,
            publicoAlvo: conjuntoData.publicoAlvo,
            dicionarioDeDados: conjuntoData.dicionarioDeDados,
            acordoDeCooperacao: conjuntoData.acordoDeCooperacao,
            comentarios: conjuntoData.comentarios
          }
        });
      } else {
        this.mode='create';
        this.conjuntoId = null;
      }
    });
  }

  onSaveConjunto(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.conjuntosService.addConjunto(
        form.value.id,
        form.value.titulo,
        form.value.descricao,
        form.value.origem,
        form.value.setorEntidadeResponsavel,
        form.value.formato,
        form.value.conexao,
        form.value.abrangenciaTemporal,
        form.value.freqAtt,
        form.value.volume,
        form.value.volumeAtt,
        form.value.sigilo,
        form.value.status,
        form.value.software,
        form.value.armazenamento,
        form.value.publicoAlvo,
        form.value.dicionarioDeDados,
        form.value.acordoDeCooperacao,
        form.value.comentarios);
    }else{
      this.conjuntosService.updateConjunto(
        this.conjuntoId, form.value.titulo,
        form.value.descricao,
        form.value.origem,
        form.value.setorEntidadeResponsavel,
        form.value.formato,
        form.value.conexao,
        form.value.abrangenciaTemporal,
        form.value.freqAtt,
        form.value.volume,
        form.value.volumeAtt,
        form.value.sigilo,
        form.value.status,
        form.value.software,
        form.value.armazenamento,
        form.value.publicoAlvo,
        form.value.dicionarioDeDados,
        form.value.acordoDeCooperacao,
        form.value.comentarios)
    }



      form.resetForm();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  events: string[] = [];
  opened: boolean;

}
