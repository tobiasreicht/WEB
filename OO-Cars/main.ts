import { Car } from "./Cars";
import { Engine } from "./engine";

let car: Car = new Car("gt3", "porsche", new Engine(800) );

console.log(car.getColor());
console.log(car.getMake());
console.log(car.getHorsePower)
