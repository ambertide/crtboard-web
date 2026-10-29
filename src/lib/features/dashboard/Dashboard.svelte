<script lang="ts">
  import PM5540 from '#lib/assets/PM5540.png';
  import { onMount } from 'svelte';
    
  interface Props {
    canvas: HTMLCanvasElement;
  }

  let { canvas = $bindable(null) } = $props();
  let img: HTMLImageElement;

  onMount(() => {
    canvas.getContext('2d')?.drawImage(img, 0, 0, 720, 560)
  });
</script>
<img class="hidden" bind:this={img} src={PM5540} alt="Test"/>

<canvas
  bind:this={canvas}
  width="720"
  height="560"
>

</canvas>