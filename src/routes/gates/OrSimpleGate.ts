import { TwoInputSimpleGate } from "./common/TwoInputSimpleGate";

export class OrSimpleGate extends TwoInputSimpleGate{
    public getOutput = () => Boolean(this.input1?.getOutput() || this.input2?.getOutput());
    public getName = () => "OR";
    public getColor = () => "#006";
}
