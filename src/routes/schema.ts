import { v4 as uuidv4 } from 'uuid';

export class Schema{
    private id: string;
    private name: string;
    private description: string;
    private components: Schema[];

    
    constructor(
        name: string,
        description: string,
        components: Schema[]
    ){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.components = components;
    }

    public toJSON(): string{
        const obj = {
            id: this.id,
            name: this.name,
            description: this.description,
            components: this.components.map(c => c.name)
        };
        
        return JSON.stringify(obj);
    }

    public getId(): string{
        return this.id;
    }
}