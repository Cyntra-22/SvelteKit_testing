<script lang="ts">
    
</script>

<style>
 :root{
		--font-color: hsl(259, 100%, 65%);
		--font: 'Poppins', sans-serif;
		--bgColor:  hsl(0, 0%, 86%);
		--lineColor: hsl(0, 1%, 44%);
	}

	:global(body){
		padding: 0;
		margin: 0;
		font-family: var(--font); 
		background-color: var(--bgColor);  	 
	}


	.main-container{
		
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: hsl(0, 0%, 100%);
		padding: 20px;
		width: 30%;
		box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
		border-radius: 10px 10px 100px 10px;
	
	}
	.date-conponent{
		width: 85%;
		padding-left: 25px;
	}
	
	.year-calculation{
		padding-left: 19px;
		font-size: 60px;
		font-weight: 1000;
	}

	.date-style{
		color: var(--font-color);
		background-color: none;
	}

	 @media (min-width: 300px) and (max-width: 768px ){
		.year-calculation{
			font-size: 40px;
			font-weight: 1000;
		}
		.main-container{
			width: 70%;
			height: 350px;
		}
		.year-calculation{
			padding-top: 20px;
			margin-left: 18px;
		}

		.date-conponent{
			width: 100%;
		}
	}
</style>

<main>
  <div class="main-container">
    <div class="date-conponent">
      <Date on:ageCalculated={handleAge}/>
    </div>
    
    <div class="year-calculation">
      <span class="date-style">{age.years}</span><i>years</i><br>
      <span class="date-style">{age.months}</span><i>months</i><br>
      <span class="date-style">{age.days}</span><i>days</i><br>
    </div>
  </div>
</main>
