import { OneInputSimpleGate } from "./common/OneInputSimpleGate";

export class NotSimpleGate extends OneInputSimpleGate{
    public getOutput = () => !(this.input?.getOutput());
    public getName = () => "NOT";
    public getColor = () => "#600";
}