<script type="ts">
import Header from "./headers/header.svelte";
import { onMount } from 'svelte';
import Source from "./source";


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

onMount(() => {
    ctx = canvas.getContext('2d')!;

    let i=0;

    const offset = 25;
    
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#fff';
    ctx.fillRect(offset, offset, canvas.width-2*offset, canvas.height-2*offset);
    ctx.strokeRect(offset, offset, canvas.width-2*offset, canvas.height-2*offset);


    canvas.onclick = (e) => {
        const [x,y] = [e.offsetX, e.offsetY];
        const bounds = 10;
        
        if(x < offset + bounds && x > offset - bounds) {
            const newSource = new Source(offset, y, i%2==0);
            newSource.draw(ctx);
        } 
        i++;
    };
})

</script>


<div class="w-full h-full relative bg-sky-500">
    <Header/>
    <input class="px-5 py-2 mt-2 ml-5
                border-solid border-2 rounded-md 
                outline-none border-black bg-transparent focus:bg-white
                placeholder:text-white placeholder:italic placeholder:uppercase
                uppercase"
     type="text"
     placeholder="ENTER A SHORT DESCRIPTION OF THE CURRENT SCHEMA" />
     
    <canvas 
    bind:this={canvas}
    class="mt-2 ml-2 inline-block"
    width={1300}
    height={500}></canvas>
    
</div>

