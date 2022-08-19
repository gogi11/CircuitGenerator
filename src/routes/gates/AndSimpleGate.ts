import { TwoInputSimpleGate } from "./common/TwoInputSimpleGate";

export class AndSimpleGate extends TwoInputSimpleGate{
    public getOutput = () => Boolean(this.input1?.getOutput() && this.input2?.getOutput());
    public getName = () => "AND";
    public getColor = () => "#060";
}