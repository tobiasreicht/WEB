import { Engine } from "./engine";

export class Car {
    private color: string = "black";

    constructor(
        private model: string,
        private make: string,
        private engine:Engine
    ) 
    {}

    getHorsePower():number{
        return this.engine.getHorsePower();
    }

    getColor(): string {
        return this.color;
    }

    getModel(): string {
        return this.model;
    }

    getMake(): string {
        return this.make;
    }
}
