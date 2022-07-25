import Konva from "konva";
import type { Edge } from "../newLogic";
import { getCenter } from "./utils";

function getAnchorPointCoords(firstGroup: Konva.Group, secondGroup: Konva.Group, edge: Edge){
    firstGroup = firstGroup.find('.anchorPoints')[1] as Konva.Group || firstGroup;
    secondGroup = secondGroup.find('.anchorPoints')[0] as Konva.Group || secondGroup;
    
    const pos1 = getCenter(firstGroup.children![edge.getOutputNr()]);
    const pos2 = getCenter(secondGroup.children![edge.getInputNr()]);

    return {pos1, pos2}
}

export function createLineGroup(firstGroup: Konva.Group, secondGroup: Konva.Group, edge: Edge): Konva.Group {
    const group = new Konva.Group();

    const {pos1, pos2} = getAnchorPointCoords(firstGroup, secondGroup, edge);

    const line = new Konva.Line({
        points: [pos1.x, pos1.y, pos2.x, pos2.y],
        stroke: edge.getColor(),
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
    });
    group.add(line);

    const resetPos = () => {
        const {pos1, pos2} = getAnchorPointCoords(firstGroup, secondGroup, edge);
        line.points([pos1.x, pos1.y, pos2.x, pos2.y]);
    }


    firstGroup.on('dragmove', () => resetPos());
    secondGroup.on('dragmove', () => resetPos());
    
    return group;
}