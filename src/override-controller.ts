import { Override } from './override';

const ONE_HOUR = 1000 * 60 * 60;

export class OverrideController {
    constructor(pollIntervalMillies = ONE_HOUR) {
        this.pollInterval = setInterval(() => this.pollOverrides(), pollIntervalMillies);
    }
    
    private pollInterval: number;
    
    private overrides: Override[] = [];
    private activeOverrides: Override[] = [];
    
    public async registerOverride(override: Override) {
        this.overrides.push(override);
        if (await override.shouldActivate()) {
            await override.activate();
            this.activeOverrides.push(override);
        }
    }
    public async unregisterOverride(override: Override) {
        let idx = this.activeOverrides.indexOf(override);
        if (idx !== -1) {
            await override.deactivate();
            this.activeOverrides.splice(idx, 1);
        }
        idx = this.overrides.indexOf(override);
        if (idx !== -1) this.overrides.splice(idx, 1);
    }
    
    private async pollOverrides() {
        for (let override of this.overrides) {
            let activeIdx = this.activeOverrides.indexOf(override);
            let isActive = activeIdx !== -1;
            let shouldActivate = await override.shouldActivate();
            if (shouldActivate !== isActive) {
                if (!shouldActivate) {
                    await override.deactivate();
                    this.activeOverrides.splice(activeIdx, 1);
                }
                else {
                    await override.activate();
                    this.activeOverrides.push(override);
                }
            }
        }
    }
}
