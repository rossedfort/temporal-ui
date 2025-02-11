<script lang="ts" context="module">
  export type SelectableTableContext<T> = {
    handleSelectRow: (
      event: CustomEvent<{ checked: boolean }>,
      item: T,
    ) => void;
  };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import TableHeaderRow from './table-header-row.svelte';
  import Table from './table.svelte';
  import type { ComponentProps } from 'svelte/internal';

  type T = $$Generic;
  type Item = T & { id: string };

  interface $$Props extends ComponentProps<Table> {
    items: Item[];
    selectedItems: Item[];
    allSelected?: boolean;
    checkboxLabel?: string;
    class?: string;
    id?: string;
  }

  export let items: Item[];
  export let checkboxLabel: string = null;
  export let allSelected: boolean = false;
  export let selectedItems: Item[] = [];
  export let id: string = null;

  const handleSelectAll = (event: CustomEvent<{ checked: boolean }>) => {
    allSelected = !allSelected;

    selectedItems = event.detail.checked ? items : [];
  };

  const handleSelectRow = (
    event: CustomEvent<{ checked: boolean }>,
    item: Item,
  ) => {
    const { checked } = event.detail;
    if (checked) {
      selectedItems.push(item);
      selectedItems = selectedItems;
    } else {
      selectedItems = selectedItems.filter((i) => i.id !== item.id);
    }

    allSelected = selectedItems.length === items.length;
  };

  $: indeterminate =
    selectedItems.length !== 0 && selectedItems.length !== items.length;

  setContext('selectable-table-context', {
    handleSelectRow,
  });
</script>

<Table variant="fancy" {id} class={$$props.class} {...$$props}>
  <TableHeaderRow
    slot="headers"
    selectable
    checkboxLabel={selectedItems.length > 0 ? null : checkboxLabel}
    {indeterminate}
    on:change={handleSelectAll}
    bind:selected={allSelected}
  >
    {#if selectedItems.length > 0}
      <slot name="bulk-action-headers" />
    {:else}
      <slot name="default-headers" />
    {/if}
  </TableHeaderRow>
  <slot />
</Table>
