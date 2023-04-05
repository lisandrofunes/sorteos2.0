import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { ParticipanteHandle } from '../models/participante';
import { Sorteo } from '../models/sorteo';
import { SorteoService } from '../Service/sorteo.service';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.component.html',
  styleUrls: ['./sorteo.component.css']
})

export class SorteoComponent {
  inputCount = 1;
  inputArray = [''];
  valorInput = [''];
  resultadoSorteo: string[] = [];
  participantes: ParticipanteHandle[] = [];
  isSorteado = false;
  isHidden = true;

  constructor(
    private sorteoService: SorteoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.changeNameSorteo(params['id'])
      }
    )
  }

  changeNameSorteo(parametro:string){
    // const parametro = this.route.snapshot.paramMap.get('id');

    const titleSorteo = document.querySelector('.title-form');
    switch (parametro) {
      case '0':
        titleSorteo!.innerHTML = "Sorteo Simple";
      break;

      case '1':
        titleSorteo!.innerHTML = "Formar Parejas";
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
    this.isHidden = false;
  }

  sortear() {
    var pCount = this.inputCount; //cantidad de participantes
    var rCount = 0; //iterador de posiciones para resultadoSorteo
    const parametro = this.route.snapshot.paramMap.get('id');

    switch (parametro) {
      case '1':
        this.isSorteado = true;

        if(pCount%2==0){
          console.log("sorteo posible")
        } else{
          console.log("advertencia")
        }

        for (let i = 0; i < pCount; i++) {
          const numeroAleatorio = Math.floor(Math.random() * this.valorInput.length);
          if(i%2==0){
            this.resultadoSorteo.push(this.valorInput[numeroAleatorio]);
          } else {
            this.resultadoSorteo[rCount] += (' - ' + this.valorInput[numeroAleatorio].toString());
            rCount++
          }
          this.valorInput.splice(numeroAleatorio, 1);
        }

        this.guardarSorteo()

        break;

      default:
        this.isSorteado = true;

        // const pCount = this.inputCount;

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
    this.sorteoService.sortear(sorteoFormData).subscribe(
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
      this.isHidden = true;
    }
  }

}
