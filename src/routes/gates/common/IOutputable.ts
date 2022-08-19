import type Konva from "konva";

export interface IOutputable{
    getOutput(): boolean;

    getName(): string;
    getColor(): string;
    getKonvaGroup(): Konva.Group;
    getNrOfInputs(): number;
    getNrOfOutputs(): number;
}
