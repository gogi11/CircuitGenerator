import type Konva from "konva";
import { createCircleGroup, createLineGroup, createRectangleGroup } from "./konva_objects";

export type tmp = number;

type Func<T> = ()=>T;

//TODO: move classes to seperate files
//TODO: create a better connection between konva events and logic

export class Edge {
    private color: string;
    private from: Gate;
    private outputNr: number;
    private to: Gate;
    private inputNr: number;
    private konva: Konva.Group;

    constructor(
        from: Gate,
        outputNr: number,
        to: Gate,
        inputNr: number,
    ) {
        this.from = from;
        this.outputNr = outputNr;
        this.to = to;
        this.inputNr = inputNr;
        this.color = '#000';
        this.konva = this.createKonva();
    }

    private createKonva(){
        return createLineGroup(this.from.getKonva(), this.to.getKonva(), this.color);
    }

    public getKonva(){
        return this.konva;
    }
}

export abstract class Gate{
    protected name: string;
    protected color: string;
    protected konva: Konva.Group;

    public outputs: Func<boolean>[] = [];
    public getName(): string{
        return this.name;
    }

    protected createKonva(): Konva.Group{
        return createRectangleGroup(23, 23, 100, 50, this.name, this.color);
    }
    public getKonva(): Konva.Group{
        return this.konva;
    }


    public constructor(name: string, color: string){
        this.name = name;
        this.color = color;
        this.konva = this.createKonva();
    }
    

    public toString(): string{
        return this.name + ": " + this.outputs.map(x=>x()).join(", ");
    }
}


export class CustomGate extends Gate{
    public outputs: Func<boolean>[] = [];

    constructor(name: string, color: string, ...outputs:Func<boolean>[]){
        super(name, color);
        this.outputs.push(...outputs);
    }
}

export class AndGate extends Gate{
    constructor(output1:Func<boolean>, output2:Func<boolean>){
        super("and", '#600');
        const output = ()=>output1() && output2();
        this.outputs.push(output);
    }
}


export class OrGate extends Gate{
    constructor(output1:Func<boolean>, output2:Func<boolean>){
        super("or", '#060');
        const output = ()=>output1() || output2();
        this.outputs.push(output);
    }
}



export class NotGate extends Gate{
    constructor(output1:Func<boolean>){
        super("not", '#006');
        const output = ()=>!output1();
        this.outputs.push(output);
    }
}

export class OutputGate extends Gate{
    constructor(output1:Func<boolean>){
        super("output", '#00f');
        const output = ()=>output1();
        this.outputs.push(output);
    }

    public createKonva(){
        return createCircleGroup(1023, 23, 20, "", this.color);
    }
}


export class SourceGate extends Gate{
    private on:boolean;

    public toggle(){
        this.on = !this.on;
    }
    
    public set(value: boolean){
        this.on = value;
    }

    constructor(){
        super("input", '#f00');
        this.on = true;
        const output = ()=>this.on;
        this.outputs.push(output);
    }

    public createKonva(){
        return createCircleGroup(23, 23, 20, "", this.color);
    }
}