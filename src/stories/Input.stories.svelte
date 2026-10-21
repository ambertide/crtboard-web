<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Input from "#lib/components/Input.svelte";
  import { fn } from "storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
  });
</script>

<!-- Standard textual button -->
<Story name="Default" args={{ id: 'example', label: 'CRON Expression', placeholder: '* * * * */24' }} />

