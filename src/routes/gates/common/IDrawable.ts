import type Konva from "konva";

export interface IDrawable{
    getName(): string;
    getColor(): string;
    getKonvaGroup(): Konva.Group;
    getNrOfInputs(): number;
    getNrOfOutputs(): number;
}