<script lang="ts">
    export let value: string;
    export let error: string;
    export let handleInput: (e: Event) => void;
</script>


<style>
    input {
        margin-top: 7px;
        width: 80px;
        font-weight: bold;
        font-size: 24px;
    }
    .error-style {
        color: red;
    }
    .error-input {
        border-color: red;
        color: red;
        background-color: pink;
    }

    @media (min-width: 300px) and (max-width: 768px) {
        input {
            width: 80%;
            font-size: 15px;
            margin-bottom: 30px;
           
        }
        .error-style {
            font-size: 10px;
            margin-left: 15px;
        }
    }
</style>

<div>
    <label for="dayInput">DAY</label>

    {#if error}
        <input type="number" placeholder="DD" bind:value={value} on:input={handleInput} class="error-input" />
        <p class="error-style">{error}</p>
    {:else}
        <input type="number" placeholder="DD" bind:value={value} on:input={handleInput} />
    {/if}
</div>