import type Konva from "konva";

export function getCenter(shape: Konva.Shape | Konva.Group) {
    const box = shape.getClientRect();
    const x = box.x + box.width /2;
    const y = box.y + box.height /2;
    return { x, y };
}