<script lang="ts">
    import { validateDay, validateMonth, validateYear } from '$lib/validation';
    import { createEventDispatcher } from 'svelte';
    import Input from '$lib/Input.svelte';
  
    let day: number;
    let month: number;
    let year: number;
    let currentAge: {years: number; months: number; days: number} | undefined;
    let dayError = '';
    let monthError = '';
    let yearError = '';
	let dayP = "DD";
	let monthP = "MM";
	let yearP = "YYY";

    const dispatch = createEventDispatcher();

     function validateDate(): boolean {
        const isValidDay = validateDay(day);
        const isValidMonth = validateMonth(month);
        const isValidYear = validateYear(year);

        dayError = isValidDay ? '' : 'Invalid day';
        monthError = isValidMonth ? '' : 'Invalid month';
        yearError = isValidYear ? '' : 'Invalid year';

        return isValidDay && isValidMonth && isValidYear;
    }

    function handleInput(name:string, value:number): void {
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
            day = NaN;
            monthError = '';
            month = NaN;
            yearError = '';
            year = NaN;
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
	<div>
		<label for="dayInput">DAY</label>
		<Input value={day} placeholder={dayP} error={dayError} handleInput={(e: any) => handleInput('day', e.target.value) } />
	</div>
	<div>
		<label for="monthInput">MONTH</label>
		<Input value={month} placeholder={monthP} error={dayError} handleInput={(e: any) => handleInput('month', e.target.value)} />
	</div>
	<div>
		<label for="yearInput">YEAR</label>
		<Input value={year} placeholder={yearP} error={dayError} handleInput={(e: any) => handleInput('year', e.target.value)} />
	</div>
	
</div>

<div class="line-container">
	<div class="line"></div>
		<div class="img-style">
			<button on:click={calculation_Age}><img src="/icon-arrow.svg" alt="logo arrow" /></button>
		</div>
	<div class="line" id="display-line"></div>
</div>



