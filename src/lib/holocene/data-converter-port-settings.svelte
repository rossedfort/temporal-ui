<script lang="ts">
  export let port: string = '';
</script>

<div class="my-4">
  <h3 class="text-lg" data-cy="data-encoder-port-title">
    tctl plugin port <span
      class="rounded-lg bg-orange-100 px-1 text-sm text-orange-500"
      >DEPRECATED</span
    >
  </h3>
  <input
    class="block w-24 rounded-md border border-gray-200 p-2"
    placeholder="Port"
    data-cy="data-encoder-port-input"
    bind:value={port}
  />
</div>
