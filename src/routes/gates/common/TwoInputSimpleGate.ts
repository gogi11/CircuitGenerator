import type Konva from "konva";
import { createRectangleGroup } from "../../drawing/rectangle";
import type { IDrawable } from "./IDrawable";
import type { IOutputable } from "./IOutputable";

export abstract class TwoInputSimpleGate implements IOutputable, IDrawable{
    protected input1: IOutputable | null = null;
    protected input2: IOutputable | null = null;
    protected konva: Konva.Group | null = null;
    
    public abstract getOutput(): boolean;
    public abstract getName(): string;
    public abstract getColor(): string;

    public setInput(input: IOutputable, index: number){
        if(index === 0){
            this.input1 = input;
        }else if(index === 1){
            this.input2 = input;
        }else{
            throw new Error("Setting an Input with index out of range fpr this gate.");
        }
    }
    public getNrOfInputs = () => 1;
    public getNrOfOutputs = () => 1;
    
    public getKonvaGroup = () => {
        this.konva = this.konva || createRectangleGroup(23, 23, 100, 30, this);
        const group: Konva.Group = this.konva!;
        return group;
    }
}