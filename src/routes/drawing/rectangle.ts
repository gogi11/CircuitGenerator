import Konva from "konva";
import type { Gate } from "../newLogic";


    
function createAnchorPoints(totalHeight: number, nr: number, radius: number=10) {
    const oneCircleHeight = totalHeight / nr;
    const group = new Konva.Group({name: 'anchorPoints'});
    for (let i = 0; i < totalHeight; i+=oneCircleHeight) {
        const circle = new Konva.Circle({
            x: 0,
            y: i+oneCircleHeight/2,
            radius: radius,
            fill: '#000',
            stroke: 'white',
            strokeWidth: 2,
        });
        group.add(circle);
    }
    return group;
}




export function createRectangleGroup(
    x: number, y: number, width: number, inputHeight: number, gate: Gate): Konva.Group {
    const group = new Konva.Group({draggable: true});

    const nrInputs = gate.getNrOfInputs();
    const nrOutputs = gate.getNrOfOutputs();

    const height = Math.max(inputHeight * nrInputs, inputHeight * nrOutputs);


    const text = new Konva.Text({
        x: 0,
        y: 0,
        width: width,
        height: height,
        text: gate.getName(),
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: 'white',
        align: 'center',
        verticalAlign: 'middle',
        shadowColor: 'black',
        fillAfterStrokeEnabled: true,
        stroke: 'black',
        shadowBlur: 10,
        shadowOffset: { x: 2, y: 2 },
        eventEnabled: false,
    });
    const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: width,
        height: height,
        fill: gate.getColor(),
        stroke: 'white',
        strokeWidth: 3,
        shadowColor: 'black',
        shadowBlur: 10,
        eventEnabled: false,
    });
    
    const inputAnchors = createAnchorPoints(height, nrInputs).position({x:0, y:0});
    const outputAnchors = createAnchorPoints(height, nrOutputs).position({x: width, y: 0});


    group.add(rect);
    group.add(text);
    group.add(inputAnchors);
    group.add(outputAnchors);    
    
    // add cursor styling
    group.on('mouseover', () => {
        document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', () => {
        document.body.style.cursor = 'default';
    });

    group.position({x: x, y: y});

    return group;
}