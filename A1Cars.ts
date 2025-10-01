

interface Car {
    brand: string;
    model: string;
    price: number;
    year: number;
}


const cars: Car[] = [
  { brand: "BMW",      model: "3 Series", price: 35000, year: 2018 },
  { brand: "Audi",     model: "A4",       price: 30000, year: 2017 },
  { brand: "Tesla",    model: "Model 3",  price: 48000, year: 2020 },
  { brand: "Toyota",   model: "Corolla",  price: 18000, year: 2016 },
  { brand: "Mercedes", model: "C-Class",  price: 42000, year: 2019 },
  { brand: "VW",       model: "Golf",     price: 22000, year: 2015 },
];


function getTotalPrice (cars: Car[]): number {
    let total = 0;
    cars.forEach(car => {
        total += car.price;
    });
    return total;
}


// 2b) Print list of cars mit forEach (schön formatiert)
function printCars(cars: Car[]): void {
  cars.forEach(car => {
    const priceStr = car.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    console.log(`${car.brand} ${car.model} (${car.year}) — ${priceStr}`);
  });
}

// 2c) Filter expensive cars mit forEach
function getExpensiveCars(cars: Car[], minPrice: number): Car[] {
  const result: Car[] = [];
  cars.forEach(car => {
    if (car.price > minPrice) {              // "more expensive than" -> >
      result.push(car);
    }
  });
  return result;
}


console.log("=== forEach-Versionen ===");
console.log("Total price:", getTotalPrice(cars)); // Erwartet: 195000
printCars(cars); // Listet alle Autos
console.log("Expensive (minPrice = 30000):", getExpensiveCars(cars, 30000));


// 3a) Total Price mit reduce
function getTotalPriceReduce(cars: Car[]): number {
  return cars.reduce((acc, car) => acc + car.price, 0);
}

// 3b) Print list of cars mit reduce (ein String, dann einmal console.log)
function printCarsReduce(cars: Car[]): void {
  const all = cars.reduce((acc, car) => {
    const priceStr = car.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    return acc + `${car.brand} ${car.model} (${car.year}) — ${priceStr}\n`;
  }, "");
  console.log(all.trim());
}

// 3c) Filter expensive cars mit filter
function getExpensiveCarsFilter(cars: Car[], minPrice: number): Car[] {
  return cars.filter(car => car.price > minPrice); // returns new array
}

// Beispielaufrufe:
console.log("=== Array-Methoden (filter/reduce) ===");
console.log("Total price (reduce):", getTotalPriceReduce(cars)); // 195000
printCarsReduce(cars);
console.log("Expensive (filter, minPrice = 30000):", getExpensiveCarsFilter(cars, 30000));


