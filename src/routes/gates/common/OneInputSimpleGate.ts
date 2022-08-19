import type Konva from "konva";
import { createRectangleGroup } from "../../drawing/rectangle";
import type { IOutputable } from "./IOutputable";

export abstract class OneInputSimpleGate implements IOutputable{
    protected input: IOutputable | null =null;
    protected konva: Konva.Group | null = null;

    public abstract getOutput(): boolean;
    public abstract getName(): string;
    public abstract getColor(): string;
    
    public getNrOfInputs = () => 1;
    public getNrOfOutputs = () => 1;

    public setInput(input: IOutputable){
        this.input = input;
    }

    public getKonvaGroup = () => {
        this.konva = this.konva || createRectangleGroup(23, 23, 100, 30, this);
        const group: Konva.Group = this.konva!;
        return group;
    }
}