<script lang="ts">
  const daysInMonth = Array.from({ length: 31 }).map((_, i) => i + 1);

  export let daysOfMonth: number[];

  const onClick = (e: MouseEvent, day: number) => {
    if (e.metaKey) {
      if (daysOfMonth.includes(day)) {
        daysOfMonth.filter((d) => d !== day);
      } else {
        daysOfMonth = [...daysOfMonth, day];
      }
    } else {
      daysOfMonth = [day];
    }
  };
</script>

<div class="text-center">
  <div
    class="grid grid-cols-7 gap-y-4 gap-x-4 rounded border border border-gray-900 px-0 py-4 text-center md:gap-x-8 md:px-2 xl:gap-x-16 xl:px-4"
  >
    {#each daysInMonth as day}
      <button
        class="cell"
        class:active={daysOfMonth.includes(day)}
        on:click|preventDefault={(e) => onClick(e, day)}>{day}</button
      >
    {/each}
  </div>
</div>

<style lang="postcss">
  .cell {
    @apply h-10 w-full cursor-pointer rounded p-1 hover:bg-blue-700 hover:text-white;
  }

  .active {
    @apply bg-gray-900 text-white;
  }
</style>
