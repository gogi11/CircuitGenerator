<script type="ts">
import Header from "./headers/header.svelte";
import Konva from "konva";
import { onMount } from "svelte";

import { SourceGate, OrGate, CustomGate, NotGate, AndGate, Gate, Edge, OutputGate } from "./newLogic";


onMount(()=> {
    let stage = new Konva.Stage({
        container: 'container',
        width: 1300,
        height: 500
    });

    let layer = new Konva.Layer();
    const x = 20, y = 20, w = stage.width() - 40, h = stage.height() - 40; 
    const boundary = new Konva.Rect({
        x: x,
        y: y,
        width: w,
        height: h,
        stroke: '#111827',
        strokeWidth: 4
    });
    
    layer.add(boundary);


    // TODO: Make a manager for these variables
    // It will definetely need to generate edges and a ComplexGate from all the variables together
    const sources: SourceGate[] = [];
    const gates: Gate[] = [];
    const edges: Edge[] = [];
    const outputs: OutputGate[] = [];

    // TODO: Delete this function
    function bla(){
        const source1 = new SourceGate();
        sources.push(source1);
        
        const not = new NotGate(source1.outputs[0]);
        edges.push(new Edge(source1, 0, not, 0));
        gates.push(not);

        const or = new OrGate(source1.outputs[0], not.outputs[0]);
        edges.push(new Edge(source1, 0, or, 0));
        edges.push(new Edge(not, 0, or, 1));
        gates.push(or);

        const resultingGate = new CustomGate("resulting", "#232", 2, source1.outputs[0], or.outputs[0]);
        edges.push(new Edge(source1, 0, resultingGate, 0));
        edges.push(new Edge(or, 0, resultingGate, 1));
        gates.push(resultingGate);

        const and = new AndGate(source1.outputs[0], resultingGate.outputs[1]);
        edges.push(new Edge(source1, 0, and, 0));
        edges.push(new Edge(resultingGate, 1, and, 1));
        gates.push(and);


        const output1 = new OutputGate(resultingGate.outputs[0]);
        edges.push(new Edge(resultingGate, 0, output1, 0));
        outputs.push(output1);


        const output2 = new OutputGate(and.outputs[0]);
        output2.getKonva().position({x: 1023, y: 123});
        edges.push(new Edge(and, 0, output2, 0));
        outputs.push(output2);

        const moreComplexGate = new CustomGate("complex", "#232", 2, resultingGate.outputs[0], and.outputs[0]);
    }
    bla();

    edges.forEach(e => layer.add(e.getKonva()));
    sources.forEach(s => layer.add(s.getKonva()));
    outputs.forEach(o => layer.add(o.getKonva()));
    gates.forEach(g => layer.add(g.getKonva()));

    stage.add(layer);
    layer.draw();
});


</script>


<div class="w-full h-full relative bg-gray-700">
    <Header/>
    <input class="px-5 py-2 mt-2 ml-5
                border-solid border-2 rounded-md 
                outline-none border-black bg-transparent focus:bg-white
                placeholder:text-white placeholder:italic placeholder:uppercase
                uppercase"
     type="text"
     placeholder="ENTER A SHORT DESCRIPTION OF THE CURRENT SCHEMA" />
     
    <div class="mt-2 ml-2 inline-block" id="container"></div>
    
</div>

