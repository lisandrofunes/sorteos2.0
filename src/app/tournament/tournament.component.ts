import { Component } from '@angular/core';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {

  userInput: string[];
  teams: string[];
  rounds: string[][][];
  btnRemoveIsHidden: boolean;
  isSorteado: boolean;

// animacion
  form: any;
  input: any;
  widthFormFrom: number;
  initialWidthForm: number;
  heightFormFrom: number
  heightInput: number;
  widthInput: number;
// 

// buttons
  btnSortear:any;
  btnReset:any;
  btnAdd:any;
//

  ngOnInit() {
    this.userInput = [''];
    this.teams = [];
    this.rounds = [];
    this.btnRemoveIsHidden = true;
    this.isSorteado = false 
  }

  ngAfterViewInit(){
    this.form = document.querySelector('.form-sorteo') as HTMLElement;
    this.input = document.querySelector('.container-participantes') as HTMLElement;
    this.btnSortear = document.querySelector('.button-sortear') as HTMLElement;
    this.btnReset = document.querySelector('.button-reset') as HTMLElement;
    this.btnAdd = document.querySelector('.button-add') as HTMLElement;

    this.heightInput = this.input.clientHeight;
    this.widthInput = this.input.clientWidth;
    this.widthFormFrom = this.form.clientWidth;
    this.initialWidthForm = this.form.clientWidth;
    this.heightFormFrom = this.form.clientHeight;
  }

  addParticipante() {
    this.userInput.push('');
    this.teams.push('');
    this.animation('add');
    this.btnRemoveIsHidden = false; 
  }

  sortear(){
    var teamsCount = this.teams.length; //cantidad de participantes
    var roundsCount = Math.ceil(Math.log(teamsCount)/Math.log(2)); //rondas
    var teamsFR = Math.pow(2,roundsCount); //equipos en primera ronda
    var teamsPO = 0

    //calculo de equipos en playOff
    if(teamsFR>teamsCount){
      teamsPO = teamsCount - (teamsFR - teamsCount)//equipos en playoff

      if(teamsPO%2 != 0){
        teamsPO++
      }
    }

    this.rounds = []; // Inicializa el array de rondas
    for (let i = 0; i < roundsCount; i++) {
      this.rounds[i] = []; // Crea un array vacío para cada ronda
      var matchsCount;

      if(teamsPO != 0){
        matchsCount = teamsPO/2
        teamsPO = 0
      } else {
        matchsCount = Math.pow(2,roundsCount-i)/2
      }
      
      for (let j = 0; j < matchsCount; j++) {
        this.rounds[i][j] = []; // Crea un array vacío para cada enfrentamiento
        for (let k = 0; k < 2; k++) {
          const random = Math.floor(Math.random() * this.teams.length);
          
          this.rounds[i][j][k] = this.teams[random];
          this.teams.splice(random, 1);
        }
      }

      for (let l = 0; l < matchsCount; l++) {
        this.teams.push("-");
      }
    }
    this.isSorteado = true

    // this.animation()
    this.form.style.height = '';
    this.form.style.width = ''; 

    this.changeButtons(true);
  }

  borrar(index: number) {
      this.teams.splice(index, 1);
      this.userInput.splice(index, 1)
      this.animation('delete')

    if(this.userInput.length == 1){
      this.btnRemoveIsHidden = true;
    }
  }

  animation(condition:string) {

    widthFormTo = this.form.clientWidth

    if(this.btnRemoveIsHidden){
      widthFormTo = this.form.clientWidth + this.form.clientWidth - this.widthInput;
    } 

    if (this.userInput.length == 1){
      widthFormTo = this.initialWidthForm;
    }

    var heightFormTo: number
    var widthFormTo: number
    
    condition == 'add' ? heightFormTo = this.form.clientHeight + this.heightInput : heightFormTo = this.form.clientHeight - this.heightInput;

    this.form.animate([
      { width: this.widthFormFrom + 'px', height: this.heightFormFrom + 'px' },
      { width: widthFormTo + 'px', height: heightFormTo + 'px' }
    ], {
      duration: 250,
      easing: 'ease-in-out'
    });

    this.widthFormFrom = widthFormTo;
    this.heightFormFrom = heightFormTo;

    this.form.style.height = heightFormTo + 'px';
    this.form.style.width = widthFormTo + 'px';

    const buttons = document.querySelector('.container-buttons') as HTMLElement;
    buttons.animate(
      [
        { opacity: '0' },
        { opacity: '1' }
      ],
      {
        duration: 500,
        easing: 'ease-in-out'
      }
    );
    
  }

  resetForm(form: HTMLFormElement) {
    form.reset();
    this.changeButtons(false);
    this.ngOnInit();

  }

  changeButtons(condition: boolean){
    this.btnAdd.hidden = condition;
    this.btnSortear.hidden = condition;
    this.btnReset.hidden = !condition;
  }
}
