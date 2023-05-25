import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { ParticipanteHandle } from '../models/participante';
import { Sorteo } from '../models/sorteo';
import { SorteoService } from '../Service/sorteo.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.component.html',
  styleUrls: ['./sorteo.component.css']
})

export class SorteoComponent {
  @ViewChild('formSorteo') formSorteo!: HTMLFormElement;
  inputCount = 1;
  inputArray = [''];
  valorInput = [''];
  resultadoSorteo: string[] = [];
  participantes: ParticipanteHandle[] = [];
  isSorteado = false;
  isTournament = false;
  btnRemoveIsHidden = true;
  equipos = [2, 3, 4, 5];
  pxe = [2, 3, 4, 5];
  // teamDefault = this.equipos[1];
  teamSelected = this.equipos[0];
  pxeSelected = this.pxe[0]
  isMakeTeam = false;

  po: string[][] = []
  norm: string[][] = []

  constructor(
    private sorteoService: SorteoService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.setSorteo(params['id'])
      }
    )
  }

  inputs(){
    let x = this.teamSelected;
    let y = this.pxeSelected;

    this.inputArray.splice(0, this.inputArray.length);
    this.valorInput.splice(0, this.valorInput.length);

    this.inputCount = x*y;
    for (let i = 0; i < x*y; i++) {
      this.inputArray.push('');
      this.valorInput.push('');
    }

  }

  setSorteo(parametro:string){
    // const parametro = this.route.snapshot.paramMap.get('id');
    this.isMakeTeam = false;
    this.inputCount = 1;
    this.inputArray = [''];
    this.valorInput = [''];
    this.btnRemoveIsHidden = true;
    this.resultadoSorteo = [];
    this.participantes = [];
    this.isSorteado = false;
  
    const titleSorteo = document.querySelector('.title-form');
    switch (parametro) {
      case '0':
        titleSorteo!.innerHTML = "Sorteo Simple";
      break;

      case '1':
        titleSorteo!.innerHTML = "Formar Equipos";
        this.isMakeTeam = true;
        this.inputs();
      break;

      case '2':
        titleSorteo!.innerHTML = "Torneos";
      break;
    
      default:
        titleSorteo!.innerHTML = "Sorteo Simple";
      break;
    }
  }

  addParticipante() {
    this.inputCount++;
    this.inputArray.push('');
    this.valorInput.push('');
    this.btnRemoveIsHidden = false;
  }

  sortear() {
    var pCount = this.inputCount; //cantidad de participantes
    var rCount = 0; //iterador de posiciones para resultadoSorteo
    const parametro = this.route.snapshot.paramMap.get('id');

    switch (parametro) {
      
      case '1':
        this.isSorteado = true;
        for (let i = 0; i < this.teamSelected; i++) {
          for (let j = 0; j < this.pxeSelected; j++) {
            const numeroAleatorio = Math.floor(Math.random() * this.valorInput.length);
            if(j==0){
              this.resultadoSorteo.push(this.valorInput[numeroAleatorio]);
            } else {
              this.resultadoSorteo[rCount] += (' - ' + this.valorInput[numeroAleatorio].toString());
              
            }
            this.valorInput.splice(numeroAleatorio, 1);

          }
          rCount++
        }
        this.guardarSorteo()

        break

      case '2':
        var rounds;
        var teamsFR; //teams in first round
        var brackets;
        var playOff;
        var iterador;


        
        this.isTournament = true;

        rounds = Math.ceil(Math.log(pCount)/Math.log(2));
        teamsFR = Math.pow(2,rounds);
        brackets = teamsFR / 2;
        playOff = brackets - (teamsFR - pCount);
        iterador = pCount+playOff;

        console.log(rounds, teamsFR, brackets, playOff, iterador);

        var y = 0;
        var POcount = 0;
        var normalized: boolean;
        var POi = 0; //iterador de playoff's
        var normCount = 0;
        for (let i = 0; i < iterador; i++) {
          const numeroAleatorio = Math.floor(Math.random() * this.valorInput.length);

          if(playOff!=0){
            normalized = false;
            
            if (this.po[POi] === undefined) {
              this.po[POi] = [];
            }
            
            this.po[POi].push(this.valorInput[numeroAleatorio]);
            this.valorInput.splice(numeroAleatorio, 1);

            console.log("playoff "+(POi+1)+": " + this.po[POi]);
            
            POcount++;
            
            if(POcount==2){
              POi++;
              playOff--;
              POcount=0;
            }
          } else{
            
            if(normalized==false){
              for (let j = 0; j < POi; j++) {
                this.valorInput.push("PlayOff " + (j+1));
              }
              normalized = true;
            }
            

            if (this.norm[y] === undefined) {
              this.norm[y] = [];
            }
            
            this.norm[y].push(this.valorInput[numeroAleatorio]);
            this.valorInput.splice(numeroAleatorio, 1);
            
            console.log("next " +y+": " + this.norm[y]);

            normCount++;
            if(normCount==2){
              y++;
              normCount=0;
            }
          }

        }
        

        // this.guardarSorteo()

        break;
            
      default:
        this.isSorteado = true;

        for (let i = 0; i < pCount; i++) {
          const numeroAleatorio = Math.floor(Math.random() * this.valorInput.length);
          this.resultadoSorteo.push(this.valorInput[numeroAleatorio]);
          this.valorInput.splice(numeroAleatorio, 1);
        }

        this.guardarSorteo()

        break;
    }

  }

  guardarSorteo() {
    for (let i = 0; i < this.resultadoSorteo.length; i++) {
      this.participantes.push({ nombre: this.resultadoSorteo[i] })
    }

    const sorteoFormData = this.prepareForData();
    const emailUser = this.tokenService.getEmail();
    this.sorteoService.sortear(emailUser, sorteoFormData).subscribe(
      data => { console.log("sorteo correcto") },
      err => { console.log("sorteo incorrecto") }
    );
  }

  prepareForData(): FormData {
    const fechaHoraActual = new Date();// Obtener la fecha y hora actual
    const fechaActual = fechaHoraActual.toISOString().slice(0, 10);// Obtener la fecha actual en formato ISO (por ejemplo: "2023-03-30")
    const horaActual24 = fechaHoraActual.toTimeString().slice(0, 8);// Obtener la hora actual en formato de 24 horas (por ejemplo: "14:30:00")

    const sorteo = {
      fecha: fechaActual,
      hora: horaActual24
    }

    const formData = new FormData();

    formData.append(
      'participantes', new Blob([JSON.stringify(this.participantes)], { type: 'application/json' }),
    );
    formData.append(
      'sorteo', new Blob([JSON.stringify(sorteo)], { type: 'application/json' }),
    );

    return formData;
  }

  borrar(index: number) {
    this.inputCount--;
    this.inputArray.splice(index, 1);
    this.valorInput.splice(index, 1);
    if(this.inputCount==1){
      this.btnRemoveIsHidden = true;
    }
  }

  resetForm(form: HTMLFormElement) {

    form.reset();
    this.ngOnInit();
  }

}
