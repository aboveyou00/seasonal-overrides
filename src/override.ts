

export abstract class Override {
    constructor() {
        
    }
    
    abstract shouldActivate(): boolean | Promise<boolean>;
    
    abstract activate(): void | Promise<void>;
    abstract deactivate(): void | Promise<void>;
}
