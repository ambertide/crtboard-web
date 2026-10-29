<script lang="ts">
  import Button from '#lib/components/Button.svelte';
  import { ServiceLocator } from '#lib/classes/ServiceLocator.svelte.ts';
  import Dashboard from '#lib/features/dashboard/Dashboard.svelte';

  let canvas: HTMLCanvasElement | null = $state(null);
  let locator = $derived(canvas ? new ServiceLocator(canvas) : null);
</script>

<Dashboard bind:canvas={canvas}></Dashboard>


{#if locator?.transmissionState.isConnected}
  <Button variant="delete">Disconnect</Button>
{:else}
  <Button onclick={() => {
    locator?.startStreaming()
  }}>Connect</Button>
{/if}
