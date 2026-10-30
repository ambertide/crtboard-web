<script lang="ts">
  interface Props {
    canvas: HTMLCanvasElement;
  }

  let { canvas = $bindable(null) } = $props();

</script>

<canvas
  bind:this={canvas}
  width="720"
  height="560"
>

</canvas>