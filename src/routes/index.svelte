<script type="ts">
import Header from "./headers/header.svelte";
import Konva from "konva";
import { onMount } from "svelte";
import { GateManager } from "./state/GateManager";


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
    
    const source1 = gateManager.addInputGate();
    const source2 = gateManager.addInputGate();
    const or = gateManager.addOrGate(source1, source2);
    const and = gateManager.addAndGate(source1, source2);
    const not = gateManager.addNotGate(and);;
    const and2 = gateManager.addAndGate(not, or);
    const output = gateManager.addOutputGate(and2);

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

