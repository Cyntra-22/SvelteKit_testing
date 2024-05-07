<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Day from '$lib/Day.svelte';
    import Month from '$lib/Month.svelte';
    import Year from '$lib/Year.svelte';

    let day: string;
    let month: string;
    let year: string;
    let currentAge: {years: number; months: number; days: number} | undefined;
    let dayError = '';
    let monthError = '';
    let yearError = '';

    const dispatch = createEventDispatcher();

    function handleInput(name:string, value:string): void {
        if (name === 'day') {
            day = value;
            dayError = validateDay(value) ? '' : 'Invalid Day';
        } else if (name === 'month') {
            month = value;
            monthError = validateMonth(value) ? '' : 'Invalid Month';
        } else if (name === 'year') {
            year = value;
            yearError = validateYear(value) ? '' : 'Invalid Year';
        }
    }

    function validateDay(day:string): boolean {
        const dayInt = parseInt(day, 10);
        return dayInt >= 1 && dayInt <= 31;
    }

    function validateMonth(month:string): boolean {
        const monthInt = parseInt(month, 10);
        return monthInt >= 1 && monthInt <= 12;
    }

    function validateYear(year:string): boolean {
        const yearInt = parseInt(year, 10);
        return yearInt >= 1900 && yearInt <= 2100;
    }

    function validateDate(): boolean {
        const isValidDay = validateDay(day);
        const isValidMonth = validateMonth(month);
        const isValidYear = validateYear(year);

        dayError = isValidDay ? '' : 'Invalid day';
        monthError = isValidMonth ? '' : 'Invalid month';
        yearError = isValidYear ? '' : 'Invalid year';

        return isValidDay && isValidMonth && isValidYear;
    }

    function calculation_Age() {
		const correct = validateDate();

		if (correct) {
			const birthday = new Date(`${year}-${month}-${day}`);
			const today = new Date(); 

			let ageYears = today.getFullYear() - birthday.getFullYear();
			let ageMonths = today.getMonth() - birthday.getMonth();
			let ageDays = today.getDate() - birthday.getDate();

			if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
				ageYears--;
				ageMonths += 12;
			}

			if (ageDays < 0) {
				const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
				ageDays = tempDate.getDate() + ageDays;
				ageMonths--;
			}

			currentAge = {
				years: ageYears,
				months: ageMonths,
				days: ageDays
			};

			dispatch('ageCalculated', currentAge);

		}
		else{
			setTimeout(() => {
            dayError = '';
            day = '';
            monthError = '';
            month = '';
            yearError = '';
            year = '';
        }, 1500);
    }
}
</script>

<style>

	.date-container{
        display: flex;
        justify-content: space-between;
        width: 80%;
	}


    .line-container{
		display: flex;
		align-items: center;
	}

	.line{
        width: 100%;
		border-bottom: 1px solid hsl(0, 0%, 86%);
	}

	#display-line{
		display: none;
	}

	.img-style {
		background-color: var(--font-color);
		border-radius: 50%;
		cursor: pointer;
		width: 60px;
		height: 60px;
	}

	img{
		width: 50px;
		height: 25px;
		padding-top: 15px;
	}

	.img-style:hover{
		background-color: black;
	}

    button{
		border: none;
		background-color: transparent;
		border-radius: 50%;
	}

	button:active{
		border: none;
		background-color: transparent;
	}

	 @media (min-width: 300px) and (max-width: 768px ){
	
		.line{
			width: 30%;
			
		}
		#display-line{
		display: block;
		
	}
			
	}

</style>

<div class="date-container">
    <Day value={day} error={dayError} handleInput={(e: any) => handleInput('day', e.target.value)} />
    <Month value={month} error={monthError} handleInput={(e: any) => handleInput('month', e.target.value)} />
    <Year value={year} error={yearError} handleInput={(e: any) => handleInput('year', e.target.value)} />
</div>

<div class="line-container">
	<div class="line"></div>
		<div class="img-style">
			<button on:click={calculation_Age}><img src="/icon-arrow.svg" alt="logo arrow" /></button>
		</div>
	<div class="line" id="display-line"></div>
</div>	

