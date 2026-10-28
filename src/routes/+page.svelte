<script lang="ts">
  import Button from '#lib/components/Button.svelte';
    import { ServiceLocator } from '#lib/classes/ServiceLocator.svelte.ts';

  let canvas: HTMLCanvasElement|null = $state(null);
  const locator = $derived(canvas ? new ServiceLocator(canvas) : null);
</script>

<canvas bind:this={canvas}>

</canvas>

{#if locator?.transmissionState.isConnected}
  <Button variant="delete">Disconnect</Button>
{:else}
  <Button onclick={() => locator?.startStreaming()}>Connect</Button>
{/if}
