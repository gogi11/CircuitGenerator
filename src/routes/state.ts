import type { Schema } from "./schema";

export class State{
    schemas: Schema[];
    currentSchema: Schema|null;

    constructor(){
        this.schemas = [];
        this.currentSchema = null;
    }

    public toJSON(): string{
        const obj = {
            schemas: this.schemas.map(s => s.toJSON()),
            currentSchema: this.currentSchema ? this.currentSchema.getId() : null
        };

        return JSON.stringify(obj);
    }
}