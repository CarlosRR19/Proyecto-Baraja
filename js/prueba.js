import { Carta } from "./carta.js";
import { Baraja } from "./baraja.js";
import { Partida } from "./partida.js";

var partida = new Partida(3,2);
partida.selecciona();
console.log(partida);
partida.baraja();
partida.reparte();
partida.voltea(1,1);
partida.compruebaAcierto(1,0);
console.log(partida);

partida.getMazo();

function pedirCartas(){ 
    var fila = prompt("Introduce una fila");
    var columna = prompt("Introduce una columna"); 
    partida.voltea(fila, columna);

    var nFila = prompt("Introduce otra fila");
    var nColumna = prompt("Introduce otra columna");
    partida.compruebaAcierto(nFila, nColumna);

    if(partida.haFinalizado()){ 
        console.log("PARTIDA FINALIZADA!!"); 
    } 
    else 
        setTimeout(pedirCartas(), 5000) 
}

pedirCartas();

console.log(partida);