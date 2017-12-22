import { Override } from './override';

export abstract class SeasonalOverride extends Override {
    constructor(beginMonth: number, beginDay: number, endDay?: number);
    constructor(beginMonth: number, beginDay: number, endMonth?: number, endDay?: number);
    constructor(private beginMonth: number, private beginDay: number, endDay?: number, endMonth?: number) {
        super();
        if (typeof endMonth !== 'undefined') {
            [endDay, endMonth] = [endMonth, endDay];
        }
        if (typeof endMonth === 'undefined') endMonth = beginMonth;
        if (typeof endDay === 'undefined') endDay = beginDay;
        [this.endMonth, this.endDay] = [endMonth, endDay];
    }
    
    private endDay: number;
    private endMonth: number;
    
    public shouldActivate(): boolean {
        let today = new Date();
        let currentMonth = today.getMonth();
        let currentDay = today.getDate();
        if (currentMonth < this.beginMonth || currentMonth > this.endMonth) return false;
        if (currentMonth > this.beginMonth && currentMonth < this.endMonth) return true;
        if (currentMonth === this.beginMonth) return currentDay >= this.beginDay && (currentDay <= this.endDay || this.endMonth > this.beginMonth);
        if (currentMonth === this.endMonth) return (currentDay >= this.beginDay || this.beginMonth < this.endMonth) && currentDay <= this.endDay;
        return false;
    }
}
