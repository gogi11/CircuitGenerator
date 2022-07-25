<script type="ts">
import Header from "./headers/header.svelte";
import Konva from "konva";
import { onMount } from "svelte";
import { GateManager } from "./GateManager";
import type { SourceGate } from "./newLogic";


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


    const gateManager = new GateManager(layer);

    const source1 = gateManager.addGate("source");
    const source2 = gateManager.addGate("source");
    source2.getKonva().offsetY(-60);
    
    const or = gateManager.addGate("or", {gate: source1, outputNr: 0}, {gate: source2, outputNr: 0});
    const and = gateManager.addGate("and", {gate: source1, outputNr: 0}, {gate: source2, outputNr: 0});
    const not = gateManager.addGate("not", {gate: and, outputNr: 0});
    const and2 = gateManager.addGate("and", {gate: or, outputNr: 0}, {gate: not, outputNr: 0});
    const output = gateManager.addGate("output", {gate: and2, outputNr: 0});
    const xorGate = gateManager.exportToCustomGate("xor");

    
    // gateManager.clear();
    // const source3 = gateManager.addGate("source");
    // const source4 = gateManager.addGate("source");
    // source4.getKonva().offsetY(-60);
    // gateManager.connectCustomGate(xorGate, [source3 as SourceGate, source4 as SourceGate]);
    // const output2 = gateManager.addGate("output", {gate: xorGate, outputNr: 0});

    gateManager.addToLayer();
    gateManager.colorPaths();

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

