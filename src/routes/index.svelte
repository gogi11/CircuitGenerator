<script type="ts">
import Header from "./headers/header.svelte";
import Konva from "konva";
import { onMount } from "svelte";
import { GateManager } from "./GateManager";


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

    const source1 = gateManager.addSourceGate();
    const source2 = gateManager.addSourceGate();
    
    const or = gateManager.addOrGate({gate: source1, outputNr: 0}, {gate: source2, outputNr: 0});
    const and = gateManager.addAndGate({gate: source1, outputNr: 0}, {gate: source2, outputNr: 0});
    const not = gateManager.addNotGate({gate: and, outputNr: 0});
    const and2 = gateManager.addAndGate({gate: or, outputNr: 0}, {gate: not, outputNr: 0});
    const output = gateManager.addOutputGate({gate: and2, outputNr: 0});
    const xorGate = gateManager.exportToCustomGate("xor");

    
    gateManager.clear();
    const source3 = gateManager.addSourceGate();
    const source4 = gateManager.addSourceGate();
    
    const not2 = gateManager.addNotGate({gate: source4, outputNr: 0});

    gateManager.connectCustomGate(xorGate, source3, not2);
    const output2 = gateManager.addOutputGate({gate: xorGate, outputNr: 0});
    const output3 = gateManager.addOutputGate({gate: source4, outputNr: 0});

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

