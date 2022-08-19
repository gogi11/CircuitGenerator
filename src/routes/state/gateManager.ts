import type Konva from "konva";
import type { IOutputable } from "../gates/common/IOutputable";
import { InputSimpleGate } from "../gates/InputSimpleGate";
import { OutputSimpleGate } from "../gates/OutputSimpleGate";

export class GateManager{
    // private sources: InputSimpleGate[];
    // private gates: IOutputable[];
    // private outputs: OutputSimpleGate[];
    // private layer: Konva.Layer;

    // constructor(layer: Konva.Layer){
    //     this.sources = [];
    //     this.gates = [];
    //     this.edges = [];
    //     this.outputs = [];
    //     this.layer = layer;
    // }


    // public addInputGate(){
    //     const gate = new InputSimpleGate();
    //     this.sources.push(gate);
    //     gate.getKonvaGroup().on("click", ()=>{
    //         gate.toggle();
    //         this.colorPaths();
    //     });

    //     gate.getKonvaGroup().offsetY(-60 * (this.sources.length-1));
    //     return gate;
    // }

    // private fixPosition(gate: Gate, ...inputs: Gate[]){
    //     gate.getKonva().offsetX(-160 * (this.gates.length-1) - 100);
    //     if(inputs.length == 0){
    //         return;
    //     }
    //     const minY = inputs.reduce((acc, curr) => Math.min(acc, curr.getKonva().offsetY()), gate.getKonva().offsetY());
    //     const maxY = inputs.reduce((acc, curr) => Math.max(acc, curr.getKonva().offsetY()), gate.getKonva().offsetY());
    //     const avgYOffset = (maxY - minY) / (inputs.length+5);
    //     gate.getKonva().offsetY(minY+avgYOffset);
    // }


    // public addAndGate(firstInput: GateArg, secondInput:GateArg){
    //     let gate = new AndGate(firstInput.gate.outputs[firstInput.outputNr], secondInput.gate.outputs[secondInput.outputNr]);
    //     this.gates.push(gate);
    //     this.fixPosition(gate, firstInput.gate, secondInput.gate);
    //     this.edges.push(new Edge(firstInput.gate, firstInput.outputNr, gate, 0));
    //     this.edges.push(new Edge(secondInput.gate, secondInput.outputNr, gate, 1));
    //     return gate;
    // }

    // public addOrGate(firstInput: GateArg, secondInput:GateArg){
    //     let gate = new OrGate(firstInput.gate.outputs[firstInput.outputNr], secondInput.gate.outputs[secondInput.outputNr]);
    //     this.gates.push(gate);
    //     this.fixPosition(gate, firstInput.gate, secondInput.gate);
    //     this.edges.push(new Edge(firstInput.gate, firstInput.outputNr, gate, 0));
    //     this.edges.push(new Edge(secondInput.gate, secondInput.outputNr, gate, 1));
    //     return gate;
    // }

    // public addNotGate(input: GateArg){
    //     let gate = new NotGate(input.gate.outputs[input.outputNr]);
    //     this.gates.push(gate);
    //     this.fixPosition(gate, input.gate);
    //     this.edges.push(new Edge(input.gate, input.outputNr, gate, 0));
    //     return gate;
    // }

    // public addOutputGate(input: GateArg){
    //     let gate = new OutputGate(input.gate.outputs[input.outputNr]);
    //     this.outputs.push(gate);
    //     gate.getKonva().offsetY(-60 * (this.outputs.length-1));
    //     this.edges.push(new Edge(input.gate, input.outputNr, gate, 0));
    //     return gate;
    // }
    
    // public connectCustomGate(customGate: CustomGate, ...newInputs: Gate[]): Gate{ 
    //     for(let i=0; i<customGate.outputs.length; i++){
    //         const curr = customGate.outputs[i];
    //         customGate.outputs[i] = () => {
    //             for(let j=0; j<customGate.inputs.length; j++){
    //                 customGate.inputs[j].set(newInputs[j].outputs[0]());
    //             }
    //             return curr();
    //         } 
    //     }
    //     this.gates.push(customGate);
    //     this.fixPosition(customGate, ...newInputs);
        

    //     for(let i=0; i<newInputs.length; i++){
    //         this.edges.push(new Edge(newInputs[i], 0, customGate, i));
    //     }


    //     return customGate;
    // }

    // public addToLayer(){
    //     this.layer.clear();
    //     this.edges.forEach(e => this.layer.add(e.getKonva()));
    //     this.sources.forEach(s => this.layer.add(s.getKonva()));
    //     this.outputs.forEach(o => this.layer.add(o.getKonva()));
    //     this.gates.forEach(g => this.layer.add(g.getKonva()));
    // }
    
    // public colorPaths(){
    //     this.edges.forEach(e => e.colorActivePath());
    //     this.outputs.forEach(o => o.fixColor());
    // }

    // public exportToCustomGate(name: string, color = "#591bc3"){
    //     const customGate = new CustomGate(name, color, this.sources, ...this.outputs.map(o => o.outputs[0]));
    //     return customGate;
    // }

    // public clear(){
    //     this.layer.clear();
        
    //     this.sources.forEach(s => s.getKonvaGroup().destroy());
    //     this.sources = [];
        
    //     this.gates.forEach(g => g.getKonvaGroup().destroy());
    //     this.gates = [];
        
    //     this.edges.forEach(e => e.getKonvaGroup().destroy());
    //     this.edges = [];

    //     this.outputs.forEach(o => o.getKonvaGroup().destroy());
    //     this.outputs = [];
    // }
}