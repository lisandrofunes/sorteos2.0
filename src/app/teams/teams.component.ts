import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent {
  selectOptions: number[] = Array.from({ length: 9 }, (_, index) => index + 2);

  optionTeams: number;
  optionPlayers: number;

  userInput: string[] = [];
  players: string[] = [];

  resultadoSorteo: string[][] = [];
  isSorteado = false;

  ngOnInit(){
    this.isSorteado = false;
    this.userInput = [];
    this.players = [];
    this.optionTeams = null;
    this.optionPlayers = null;
  }

  handleKeyDown(event: any) {
    if (event.target.value.length >= 1 && event.key !== 'Backspace') {
      event.preventDefault();
    }
    this.addPlayer();
  }


  addPlayer() {
    //inputs reset
    this.userInput = [];
    this.players = [];

    var inputs = this.optionTeams * this.optionPlayers;
    for (let i = 0; i < inputs; i++) {
      this.userInput.push('');
      this.players.push('');
    }
  }

  sortear() {
    for (let i = 0; i < this.optionTeams; i++) {
      this.resultadoSorteo[i] = [];
      for (let j = 0; j < this.optionPlayers; j++) {
        const numeroAleatorio = Math.floor(Math.random() * this.players.length);

        this.resultadoSorteo[i][j] = (this.players[numeroAleatorio]);

        this.players.splice(numeroAleatorio, 1);
      }
    }

    this.isSorteado = true;
    // this.guardarSorteo()
  }

  resetForm(form: HTMLFormElement) {
    form.reset();
    this.ngOnInit();
  }

}
