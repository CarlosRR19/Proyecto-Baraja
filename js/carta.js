export class Carta {
    constructor(palo, nombre) {
        this._palo = palo;
        this._nombre = nombre;
    }

    getPalo(){
        return this._palo;
    }

    setPalo(palo) {
        this._palo = palo;
    }

    getNombre(){
        return this._nombre;
    }

    setNombre(nombre){
        this._nombre=nombre;
    }

    toString(){
        return "[Palo: " + this._palo + "] [Nombre: " + this._nombre + "]";
    }
}