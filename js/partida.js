import { Carta } from "./carta.js";
import { Baraja } from "./baraja.js";

function barajar(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function imprimirTablaBidimensional(arrayBidimensional) {
  arrayBidimensional.forEach((row) => {
    console.table(row);
  });
}

export class Partida {
  constructor(filas, columnas) {
    this._filas = filas;
    this._columnas = columnas;

    if (!(filas * columnas) % 2 || filas * columnas > 96) {
      this._filas = 2;
      this.columnas = 3;
    }

    this._baraja = new Baraja();
    this._cartasSeleccionadas = [];
    this._mazo = [];
    this._cartaVolteada = null;
    this._filaSeleccionada = 0;
    this._columnaSeleccionada = 0;
    this._numeroIntentos = 0;
    this._aciertos = 0;
  }

  selecciona() {
    var i = 0;
    var contador = 0;

    do {
      var carta = this._baraja.generarCarta();

      if (this._cartasSeleccionadas.includes(carta) || carta == null) {
        do {
          carta = this._baraja.generarCarta();
        } while (this._cartasSeleccionadas.includes(carta) || carta == null);
      }

      for (var j = 0; j < 2; j++) {
        this._cartasSeleccionadas.push(carta);
      }

      for (var h = 0; h < this._baraja.getCartas().length; h++) {
        var longitud = this._baraja.getCartas()[h].length;

        for (var k = 0; k < longitud; k++) {
          if (
            carta.getPalo() == this._baraja.getCartas()[h][k].getPalo() &&
            carta.getNombre() == this._baraja.getCartas()[h][k].getNombre()
          ) {
            this._baraja.getCartas()[h].splice(k, 1);
            this._baraja.setCartas(
              this._baraja
                .getCartas()
                .filter((fila) =>
                  fila.some(
                    (elemento) =>
                      elemento !== undefined &&
                      elemento !== null &&
                      elemento !== ""
                  )
                )
            );
            break;
          }
        }
      }
      contador++;
      i++;
    } while (i < (this._filas * this._columnas) / 2);
  }

  baraja() {
    this._cartasSeleccionadas = barajar(this._cartasSeleccionadas);
  }

  reparte() {
    var contador = 0;
    for (var i = 0; i < this._filas; i++) {
      this._mazo[i] = [];
      for (var j = 0; j < this._columnas; j++) {
        this._mazo[i][j] = this._cartasSeleccionadas[contador];
        contador++;
      }
    }
  }

  voltea(fila, columna) {
    if (fila > this._filas - 1 || fila == "") {
      do {
        fila = prompt("Introduce un número de fila menor o diferente");
      } while (fila > this._filas - 1 || fila == "");
    }

    if (columna > this._columnas - 1 || columna == "") {
      do {
        columna = prompt("Introduce un número de columna menor o diferente");
      } while (columna > this._columnas - 1 || columna == "");
    }

    this._cartaVolteada = this._mazo[fila][columna];
    this._filaSeleccionada = fila;
    this._columnaSeleccionada = columna;
    this._numeroIntentos++;
  }

  compruebaAcierto(fila, columna) {
    var acierto = false;

    if (fila > this._filas - 1 || fila == "") {
      do {
        fila = prompt("Introduce un número de fila menor o diferente");
      } while (fila > this._filas - 1 || fila == "");
    }

    if (columna > this._columnas - 1 || columna == "") {
      do {
        columna = prompt("Introduce un número de columna menor o diferente");
      } while (columna > this._columnas - 1 || columna == "");
    }

    if (
      fila == this._filaSeleccionada &&
      columna == this._columnaSeleccionada
    ) {
      do {
        fila = prompt("Esta posición ya está levantada, introduce otra fila");
        columna = prompt(
          "Esta posición ya está levantada, introduce otra columna"
        );
      } while (
        fila == this._filaSeleccionada &&
        columna == this._columnaSeleccionada
      );
    }

    if (this._mazo[fila][columna] == this._cartaVolteada) {
      this._mazo[fila][columna] = null;
      for (var i = 0; i < this._filas; i++) {
        for (var j = 0; j < this._columnas; j++) {
          if (this._mazo[i][j] != null) {
            if (
              this._cartaVolteada.getPalo() == this._mazo[i][j].getPalo() &&
              this._cartaVolteada.getNombre() == this._mazo[i][j].getNombre()
            ) {
              this._mazo[i][j] = null;
            }
          }
        }
      }
      acierto = true;
      this._aciertos++;
    }

    return acierto;
  }

  haFinalizado() {
    var finalizada = false;
    console.log(this._aciertos);
    if (this._aciertos == (this._filas * this._columnas) / 2) {
      finalizada = true;
    }

    return finalizada;
  }

  getMazo() {
    imprimirTablaBidimensional(this._mazo);
  }
}
