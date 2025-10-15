// Baue eine Engine mit Hersteller, Horsepower und Kraftstoff 
// Füge einen Besitzer mit Vorname, Nachname und Alter dazu 


export class engine {
    constructor(
        private horsePower:number,
        private Fuel:string,
        private manufacturer:string,
    ) {}

    getHorsePower():number{
        return this.horsePower;
    }

    getFuel():string{
        return this.Fuel;
    }

    getmanufactor():string{
        return this.manufacturer;
    }
}

