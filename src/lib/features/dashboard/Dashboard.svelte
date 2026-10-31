<script lang="ts">
  interface Props {
    canvas: HTMLCanvasElement;
  }

  let { canvas = $bindable(null) } = $props();

</script>

<style>
  canvas {
    /* all four are needed to support the most browsers */
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

</style>

<canvas
  bind:this={canvas}
  width="720"
  height="576"
>

</canvas>