import type Konva from "konva";
import { AndSimpleGate } from "../gates/AndSimpleGate";
import type { IDrawable } from "../gates/common/IDrawable";
import type { IOutputable } from "../gates/common/IOutputable";
import { InputSimpleGate } from "../gates/InputSimpleGate";
import { NotSimpleGate } from "../gates/NotSimpleGate";
import { OrSimpleGate } from "../gates/OrSimpleGate";
import { OutputSimpleGate } from "../gates/OutputSimpleGate";

export class GateManager{
    private sources: InputSimpleGate[];
    private gates: (IOutputable&IDrawable)[];
    private outputs: OutputSimpleGate[];
    private layer: Konva.Layer;

    constructor(layer: Konva.Layer){
        this.sources = [];
        this.gates = [];
        this.outputs = [];
        this.layer = layer;
    }


    public addInputGate(){
        const gate = new InputSimpleGate();
        this.sources.push(gate);
        gate.getKonvaGroup().on("click", ()=>{
            gate.toggleState();
            this.colorPaths();
        });

        gate.getKonvaGroup().offsetY(-60 * (this.sources.length-1));
        return gate;
    }

    private fixPosition(gate: IDrawable, ...inputs: IDrawable[]){
        gate.getKonvaGroup().offsetX(-160 * (this.gates.length-1) - 100);
        if(inputs.length == 0){
            return;
        }
        const minY = inputs.reduce((acc, curr) => Math.min(acc, curr.getKonvaGroup().offsetY()), gate.getKonvaGroup().offsetY());
        const maxY = inputs.reduce((acc, curr) => Math.max(acc, curr.getKonvaGroup().offsetY()), gate.getKonvaGroup().offsetY());
        const avgYOffset = (maxY - minY) / (inputs.length+5);
        gate.getKonvaGroup().offsetY(minY+avgYOffset);
    }


    public addAndGate(firstInput: IOutputable&IDrawable, secondInput:IOutputable&IDrawable){
        let gate = new AndSimpleGate();
        
        gate.setInput(firstInput, 0);
        gate.setInput(secondInput, 1);
        this.gates.push(gate);

        this.fixPosition(gate, firstInput, secondInput);
        return gate;
    }

    public addOrGate(firstInput: IOutputable&IDrawable, secondInput:IOutputable&IDrawable){
        let gate = new OrSimpleGate();
        
        gate.setInput(firstInput, 0);
        gate.setInput(secondInput, 1);
        this.gates.push(gate);

        this.fixPosition(gate, firstInput, secondInput);
        return gate;
    }

    public addNotGate(input: IOutputable&IDrawable){
        let gate = new NotSimpleGate();
        
        gate.setInput(input);
        this.gates.push(gate);

        this.fixPosition(gate, input);
        return gate;
    }

    public addOutputGate(input: IOutputable&IDrawable){
        let gate = new OutputSimpleGate();
        
        gate.setInput(input);
        this.outputs.push(gate);
        
        gate.getKonvaGroup().offsetY(-60 * (this.outputs.length-1));
        return gate;
    }
    
    
    public addToLayer(){
        this.layer.clear();
        this.sources.forEach(s => this.layer.add(s.getKonvaGroup()));
        this.outputs.forEach(o => this.layer.add(o.getKonvaGroup()));
        this.gates.forEach(g => this.layer.add(g.getKonvaGroup()));
    }
    
    public colorPaths(){
        this.outputs.forEach(o => o.getOutput());
    }

    public clear(){
        this.layer.clear();
        
        this.sources.forEach(s => s.getKonvaGroup().destroy());
        this.sources = [];
        
        this.gates.forEach(g => g.getKonvaGroup().destroy());
        this.gates = [];

        this.outputs.forEach(o => o.getKonvaGroup().destroy());
        this.outputs = [];
    }
}