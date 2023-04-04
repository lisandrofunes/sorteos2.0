import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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

  constructor(
    private sorteoService: SorteoService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
  }

  addParticipante() {
    this.inputCount++;
    this.inputArray.push('');
    this.valorInput.push('');
  }

  sortear() {
    const parametro = this.route.snapshot.paramMap.get('id');
    switch (parametro) {
      case '1':
        console.log("sorteo tipo 1")

        break;

      default:
        this.isSorteado = true;

        const pCount = this.inputCount;

        for (let i = 0; i < pCount; i++) {
          const numeroAleatorio = Math.floor(Math.random() * this.valorInput.length);
          console.log("aleatorio: " + numeroAleatorio);
          this.resultadoSorteo.push(this.valorInput[numeroAleatorio]);
          this.valorInput.splice(numeroAleatorio, 1);
          console.log(this.valorInput.length + "rest")
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
    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();

    // Obtener la fecha actual en formato ISO (por ejemplo: "2023-03-30")
    const fechaActual = fechaHoraActual.toISOString().slice(0, 10);

    // Obtener la hora actual en formato de 24 horas (por ejemplo: "14:30:00")
    const horaActual24 = fechaHoraActual.toTimeString().slice(0, 8);

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
  }
}
