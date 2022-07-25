import type Konva from "konva";
import { AndGate, CustomGate, Edge, Gate, NotGate, OrGate, OutputGate, SourceGate, type Func } from "./newLogic";

export type GateArg = {gate: Gate, outputNr: number};

export type GateTypes = "and" | "or" | "not" | "output" | "source";

export class GateManager{
    private sources: SourceGate[];
    private gates: Gate[];
    private edges: Edge[];
    private outputs: OutputGate[];
    private layer: Konva.Layer;

    constructor(layer: Konva.Layer){
        this.sources = [];
        this.gates = [];
        this.edges = [];
        this.outputs = [];
        this.layer = layer;
    }


    // TODO: remove this type stuff
    public addGate(type:GateTypes="source", ...args: GateArg[]): Gate{
        if(type === "source"){
            const gate = new SourceGate();
            this.sources.push(gate);
            gate.getKonva().on("click", ()=>{
                gate.toggle();
                this.colorPaths();
            });
            return gate;
        }
        let gate: Gate;
        if(type === "and"){
            gate = new AndGate(args[0].gate.outputs[args[0].outputNr], args[1].gate.outputs[args[1].outputNr]);
            this.gates.push(gate);
        }else if(type === "or"){
            gate = new OrGate(args[0].gate.outputs[args[0].outputNr], args[1].gate.outputs[args[1].outputNr]);
            this.gates.push(gate);
        }else if(type === "not"){
            gate = new NotGate(args[0].gate.outputs[args[0].outputNr]);
            this.gates.push(gate);
        }else if(type === "output"){
            gate = new OutputGate(args[0].gate.outputs[args[0].outputNr]);
            this.outputs.push(gate as OutputGate);
        }
        
        this.edges.push(new Edge(args[0].gate, args[0].outputNr, gate!, 0));
        if(type === "and" || type === "or"){   
            this.edges.push(new Edge(args[1].gate, args[1].outputNr, gate!, 1));
        }
        return gate!;
    }
    
    public connectCustomGate(customGate: CustomGate, newInputs: SourceGate[]): Gate{ 
        for(let i=0; i<customGate.outputs.length; i++){
            const curr = customGate.outputs[i];
            customGate.outputs[i] = () => {
                for(let j=0; j<customGate.inputs.length; j++){
                    customGate.inputs[j].set(newInputs[j].outputs[0]());
                }
                return curr();
            } 
        }
        this.gates.push(customGate);
        

        for(let i=0; i<newInputs.length; i++){
            this.edges.push(new Edge(newInputs[i], 0, customGate, i));
        }

        return customGate;
    }

    public addToLayer(){
        this.layer.clear();
        this.edges.forEach(e => this.layer.add(e.getKonva()));
        this.sources.forEach(s => this.layer.add(s.getKonva()));
        this.outputs.forEach(o => this.layer.add(o.getKonva()));
        this.gates.forEach(g => this.layer.add(g.getKonva()));
    }
    
    public colorPaths(){
        this.edges.forEach(e => e.colorActivePath());
    }

    public exportToCustomGate(name: string, color = "#591bc3"){
        const customGate = new CustomGate(name, color, this.sources, ...this.outputs.map(o => o.outputs[0]));
        return customGate;
    }

    public clear(){
        this.layer.clear();
        
        this.sources.forEach(s => s.getKonva().destroy());
        this.sources = [];
        
        this.gates.forEach(g => g.getKonva().destroy());
        this.gates = [];
        
        this.edges.forEach(e => e.getKonva().destroy());
        this.edges = [];

        this.outputs.forEach(o => o.getKonva().destroy());
        this.outputs = [];
    }
}