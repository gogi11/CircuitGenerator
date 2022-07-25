import type Konva from "konva";
import { createLineGroup } from "./drawing/line";
import { createCircleGroup } from "./drawing/circle";
import { createRectangleGroup } from "./drawing/rectangle";

export type tmp = number;

export type Func<T> = ()=>T;

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
        return createLineGroup(this.from.getKonva(), this.to.getKonva(), this);
    }

    public getKonva(){
        return this.konva;
    }

    public getInputNr(){
        return this.inputNr;
    }

    public getOutputNr(){
        return this.outputNr;
    }

    public getColor(){
        return this.color;
    }

    public colorActivePath(){
        if(this.from.outputs[this.outputNr]()){
            (this.konva.find('.line')[0] as Konva.Line).stroke('#ff0000');
        }else{
            (this.konva.find('.line')[0] as Konva.Line).stroke('#000000');
        }
    }
}

export abstract class Gate{
    protected name: string;
    protected color: string;
    protected konva: Konva.Group|null;
    private nrInputs: number;

    public outputs: Func<boolean>[] = [];

    protected createKonva(): Konva.Group{
        return createRectangleGroup(23, 23, 100, 30, this);
    }
    public getKonva(): Konva.Group{
        this.konva = this.konva || this.createKonva();
        return this.konva;
    }

    public getNrOfInputs(): number{
        return this.nrInputs;
    }
    
    public getNrOfOutputs(): number{
        return this.outputs.length;
    }

    public getName(): string{
        return this.name;
    }

    public getColor(): string{
        return this.color;
    }

    public constructor(name: string, color: string, nrInputs: number){
        this.name = name;
        this.color = color;
        this.nrInputs = nrInputs;
        this.konva = null;
    }
    

    public toString(): string{
        return this.name + ": " + this.outputs.map(x=>x()).join(", ");
    }
}


export class CustomGate extends Gate{
    public outputs: Func<boolean>[] = [];
    public inputs: SourceGate[] = [];

    constructor(name: string, color: string, inputs: SourceGate[], ...outputs:Func<boolean>[]){
        super(name, color, inputs.length);
        this.outputs.push(...outputs);
        this.inputs = inputs.map(x=>x);
    }
}

export class AndGate extends Gate{
    constructor(output1:Func<boolean>, output2:Func<boolean>){
        super("and", '#600', 2);
        const output = ()=>output1() && output2();
        this.outputs.push(output);
    }
}

export class OrGate extends Gate{
    constructor(output1:Func<boolean>, output2:Func<boolean>){
        super("or", '#060', 2);
        const output = ()=>output1() || output2();
        this.outputs.push(output);
    }
}


export class NotGate extends Gate{
    constructor(output1:Func<boolean>){
        super("not", '#006', 1);
        const output = ()=>!output1();
        this.outputs.push(output);
    }
}

export class OutputGate extends Gate{
    constructor(output1:Func<boolean>){
        super("output", '#000', 1);
        const output = ()=>output1();
        this.outputs.push(output);
    }

    public fixColor(){
        this.konva?.children![0].setAttrs({fill: this.outputs[0]() ? '#f00':'#000'});
    }

    protected createKonva(){
        return createCircleGroup(1237, 23, 20, "", this.color);
    }
}


export class SourceGate extends Gate{
    private on:boolean;

    public toggle(){
        this.on = !this.on;
        this.konva?.children![0].setAttrs({fill: this.on? '#f00':'#000'});
    }
    
    public set(value: boolean){
        this.on = value;
    }

    constructor(){
        super("input", '#f00', 1);
        this.on = true;
        const output = ()=>this.on;
        this.outputs.push(output);
    }

    protected createKonva(){
        return createCircleGroup(23, 23, 20, "", this.color);
    }
}