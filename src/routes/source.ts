import {colors} from './colorsConsts';


export default class Source{
    private x: number;
    private y: number;
    private isOn: boolean;
    readonly radius: number = 20;

    constructor(x: number, y: number, isOn: boolean = false){
        this.x = x;
        this.y = y;
        this.isOn = isOn;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = this.isOn ? colors.SOURCE_ON : colors.SOURCE_OFF;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        
        ctx.strokeStyle = colors.SOURCE_BOUNDARY;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    toggle(){
        this.isOn = !this.isOn;
    }
}