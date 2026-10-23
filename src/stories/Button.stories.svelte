<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "#lib/components/Button.svelte";
  import IconGitFork from "#lib/assets/icons/IconGitFork.svelte"
  import IconGitForkWithSlash from "#lib/assets/icons/IconGitForkWithSlash.svelte"
  import { fn } from "storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      compact: { type: "boolean" },
      variant: {
        control: { type: "select" },
        options: ["default", "delete"],
      },
    },
    args: {
      onclick: fn(),
    },
  });
</script>

<!-- Standard textual button -->
<Story name="Textual" args={{ variant: 'default', compact: false }}>Add Repeated Event</Story>

<Story name="Icon" args={{ variant: 'default', compact: true }}><IconGitFork/></Story>

<Story name="Textual Delete" args={{ variant: 'delete', compact: false }}>Delete Event</Story>

<Story name="Icon Delete" args={{ variant: 'delete', compact: true}}><IconGitForkWithSlash/></Story>

