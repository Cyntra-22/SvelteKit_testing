export function validateDay(day:number): boolean {
      return day >= 1 && day <= 31;
    }

export function validateMonth(month:number): boolean {
        return month >= 1 && month <= 12;
    }

export function validateYear(year:number): boolean {
        return year >= 1900 && year <= 2100;
    }

