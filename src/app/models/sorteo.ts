import { Time } from "@angular/common";
import { ParticipanteHandle } from "./participante";

export interface Sorteo {
    id: number,
    participantes: ParticipanteHandle[],
    fecha: Date,
    hora: Time
}