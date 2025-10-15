export class Owner {
    constructor(
        private firstname: string,
        private lastname: string,
        private age: number
    ){}

        getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    getAge(): number {
        return this.age;
    }
}