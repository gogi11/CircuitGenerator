import { createCircleGroup } from "../drawing/circle";
import { OneInputSimpleGate } from "./common/OneInputSimpleGate";

export class OutputSimpleGate extends OneInputSimpleGate{
    public getOutput = () => {
        const state = Boolean(this.input?.getOutput());
        this.konva?.children![0].setAttrs({fill: state? '#f00':'#000'});
        return state;
    }
    public getName = () => "Output";
    public getColor = () => "#f00";

    public getKonvaGroup = () => {
        this.konva = this.konva || createCircleGroup(1234, 23, 20, "", this.getColor());
        return this.konva!;
    }
}