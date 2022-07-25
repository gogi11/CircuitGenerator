import Konva from "konva";

export function createCircleGroup(x: number, y: number, radius: number, name:string, color: string): Konva.Group {
    const group = new Konva.Group({draggable: false});
    const text = new Konva.Text({
        x: -radius,
        y: -radius,
        width: 2 * radius,
        height: 2 * radius,
        text: name,
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
        eventEnabled: false
    });
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
    group.add(text);

    group.position({x: x+radius, y: y+radius});

    return group;
}