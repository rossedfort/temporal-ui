<script lang="ts">
  import {
    codecEndpoint,
    passAccessToken,
  } from '$lib/stores/data-encoder-config';
  import { dataEncoder } from '$lib/stores/data-encoder';

  import Checkbox from '$holocene/checkbox.svelte';

  export let endpoint = '';
  export let passToken = false;
  export let error = '';
</script>

<div class="mb-8">
  <h3 class="text-lg" data-cy="data-encoder-endpoint-title">
    Remote Codec Endpoint
  </h3>
  <div class="flex flex-col gap-2">
    <Checkbox
      bind:checked={passToken}
      data-cy="data-encoder-pass-access-token"
      label="Pass access token"
      class="mt-2 mb-2 block h-5 w-full"
    />
    <textarea
      class="block w-full rounded-md border border-gray-200 p-2"
      rows={3}
      placeholder="Endpoint"
      data-cy="data-encoder-endpoint-input"
      bind:value={endpoint}
    />
    {#if error}
      <small data-cy="data-encoder-endpoint-error" class="text-red-700"
        >{error}</small
      >
    {/if}
    {#if $dataEncoder.settingsEndpoint}
      <div class="flex items-center justify-between">
        <p data-cy="data-encoder-site-endpoint">
          {$dataEncoder.settingsEndpoint}
        </p>
        <p data-cy="data-encoder-site-settings">Site setting</p>
      </div>
      {#if $codecEndpoint}
        <small class="text-yellow-700" data-cy="data-encoder-endpoint-info"
          >Set endpoint overrides site setting endpoint.</small
        >
      {/if}
    {/if}
  </div>
</div>
