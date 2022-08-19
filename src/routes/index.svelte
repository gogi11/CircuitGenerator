<script type="ts">
import Header from "./headers/header.svelte";
import Konva from "konva";
import { onMount } from "svelte";
import { InputSimpleGate } from "./gates/InputSimpleGate";
import { OrSimpleGate } from "./gates/OrSimpleGate";
import { AndSimpleGate } from "./gates/AndSimpleGate";
import { NotSimpleGate } from "./gates/NotSimpleGate";
import { OutputSimpleGate } from "./gates/OutputSimpleGate";


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


    
    const source1 = new InputSimpleGate();
    const source2 = new InputSimpleGate();

    const or = new OrSimpleGate();
    const and = new AndSimpleGate();
    const not = new NotSimpleGate();
    const and2 = new AndSimpleGate();
    
    const output = new OutputSimpleGate();


    or.setInput(source1, 0);
    or.setInput(source2, 1);

    and.setInput(source1, 0);
    and.setInput(source2, 1);

    not.setInput(and);

    and2.setInput(not, 0);
    and2.setInput(or, 1);

    output.setInput(and2);



    layer.add(source1.getKonvaGroup());
    layer.add(source2.getKonvaGroup());
    layer.add(and.getKonvaGroup());
    layer.add(or.getKonvaGroup());
    layer.add(not.getKonvaGroup());
    layer.add(and2.getKonvaGroup());
    layer.add(output.getKonvaGroup());


    console.log(output.getOutput());

    // const source1 = gateManager.addSourceGate();
    // const source2 = gateManager.addSourceGate();
    // const or = gateManager.addOrGate({gate: source1, outputNr: 0}, {gate: source2, outputNr: 0});
    // const and = gateManager.addAndGate({gate: source1, outputNr: 0}, {gate: source2, outputNr: 0});
    // const not = gateManager.addNotGate({gate: and, outputNr: 0});
    // const and2 = gateManager.addAndGate({gate: or, outputNr: 0}, {gate: not, outputNr: 0});
    // const output = gateManager.addOutputGate({gate: and2, outputNr: 0});

    

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

