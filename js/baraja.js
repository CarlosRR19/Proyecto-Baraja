import { Carta } from "./carta.js";
const PALOS = ["Picas", "Corazones", "Tréboles", "Diamantes"];
const NOMBRES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];

export class Baraja {
  constructor() {
    this._cartas = [];

    for (var i = 0; i < PALOS.length; i++) {
      this._cartas[i] = [];
      for (var j = 0; j < NOMBRES.length; j++) {
        var carta = new Carta(PALOS[i],NOMBRES[j]);
        this._cartas[i][j] = carta;
      }
    }
  }

  getCartas() {
    return this._cartas;
  }

  setCartas(cartas){
    this._cartas = cartas;
  }

  generarCarta() {
    var i = Math.floor(Math.random() * (this._cartas.length - 0));
    var j = Math.floor(Math.random() * (this._cartas[i].length - 0));

    var carta = new Carta(
      this._cartas[i][j].getPalo(),
      this._cartas[i][j].getNombre()
    );

    return carta;
  }
}
