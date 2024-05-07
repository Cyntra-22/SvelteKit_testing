export function validateDay(day:string): boolean {
        const dayInt = parseInt(day, 10);
        return dayInt >= 1 && dayInt <= 31;
    }

export function validateMonth(month:string): boolean {
        const monthInt = parseInt(month, 10);
        return monthInt >= 1 && monthInt <= 12;
    }

export function validateYear(year:string): boolean {
        const yearInt = parseInt(year, 10);
        return yearInt >= 1900 && yearInt <= 2100;
    }