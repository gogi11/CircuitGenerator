import Konva from "konva";

const fontSize = 16;

function getCenter(shape: Konva.Shape | Konva.Group, including = false) {
    const box = shape.getClientRect();

    const mult = including ? 0.5 : 0;

    const x = box.x + box.width * mult;
    const y = box.y + box.height * mult;
    return { x, y };
}

export function createRectangleGroup(x: number, y: number, width: number, height: number, name:string, color: string): Konva.Group {
    const group = new Konva.Group({draggable: true});
    const text = new Konva.Text({
        x: 0,
        y: 0,
        width: width,
        height: height,
        text: name,
        fontSize: fontSize,
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
        fill: color,
        stroke: 'white',
        strokeWidth: 3,
        shadowColor: 'black',
        shadowBlur: 10,
        eventEnabled: false,
    });


    group.add(rect);
    group.add(text);
    
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


export function createCircleGroup(x: number, y: number, radius: number, name:string, color: string): Konva.Group {
    const group = new Konva.Group({draggable: false});
    const circle = new Konva.Circle({
        x: 0,
        y: 0,
        radius: radius,
        fill: color,
        stroke: 'white',
        strokeWidth: 3,
        shadowColor: 'black',
        shadowBlur: 10,
        draggable: false,
        eventEnabled: false
    });

    group.add(circle);

    group.position({x: x+radius, y: y+radius});

    return group;
}

export function createLineGroup(firstGroup: Konva.Group, secondGroup: Konva.Group, color: string): Konva.Group {
    const group = new Konva.Group();

    const pos1 = getCenter(firstGroup, true);
    const pos2 = getCenter(secondGroup, false);

    const line = new Konva.Arrow({
        points: [pos1.x, pos1.y, pos2.x, pos2.y],
        stroke: color,
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        pointerLength: 10,
        pointerWidth: 10,
        fill: color
    });
    group.add(line);

    const resetPos = () => {
        const pos1 = getCenter(firstGroup);
        const pos2 = getCenter(secondGroup);
        line.points([pos1.x, pos1.y, pos2.x, pos2.y]);
    }


    firstGroup.on('dragmove', () => resetPos());
    secondGroup.on('dragmove', () => resetPos());
    
    return group;
}