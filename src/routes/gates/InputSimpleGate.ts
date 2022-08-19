import { createCircleGroup } from "../drawing/circle";
import { OneInputSimpleGate } from "./common/OneInputSimpleGate";

export class InputSimpleGate extends OneInputSimpleGate{
    private state: boolean = true;

    public toggleState = () => {
        this.state = !this.state;  
    }

    public getOutput = () => {
        this.konva?.children![0].setAttrs({fill: this.state? '#f00':'#000'});
        return this.state;
    }
    public getName = () => "INPUT";
    public getColor = () => "#f00";

    public getKonvaGroup = () => {
        this.konva = this.konva || createCircleGroup(23, 23, 20, "", this.getColor());
        return this.konva!;
    }
}