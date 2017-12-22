

export abstract class Override {
    constructor() {
        
    }
    
    public abstract shouldActivate(): boolean | Promise<boolean>;
    
    public abstract activate(): void | Promise<void>;
    public abstract deactivate(): void | Promise<void>;
}
