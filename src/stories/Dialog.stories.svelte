<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "#lib/components/Button.svelte";
  import Dialog from "#lib/components/Dialog.svelte";
  import IconGitFork from "#lib/assets/icons/IconGitFork.svelte"
  import IconGitForkWithSlash from "#lib/assets/icons/IconGitForkWithSlash.svelte"
  import { fn } from "storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Dialog",
    component: Dialog,
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


<!-- A small dialog -->
<Story
    name="Small Dialog"
>
    {#snippet template(args)}
    <Dialog {...args}>
        {#snippet opener(onclick)}
            <Button variant="default" compact={false} {onclick}>Open Dialog</Button>
        {/snippet}
        {#snippet primary(onclick)}
            <Button variant="default" compact={false} {onclick}>OK</Button>
        {/snippet}

        This is a simple dialog
    </Dialog>
    {/snippet}
</Story>

<!-- A more complicated dialog dialog -->
<Story
    name="Large Dialog"
    args={{
      closeOnPrimary: false,
      onPrimary: () => console.log('Yep!')
    }}
>
    {#snippet template(args)}
    <Dialog {...args}>
        {#snippet opener(onclick)}
            <Button variant="default" compact={false} {onclick}>Open Dialog</Button>
        {/snippet}
        {#snippet secondary(onclick)}
          <Button variant="delete" compact={false} {onclick}>Close</Button>
        {/snippet}
        {#snippet primary(onclick)}
            <Button variant="default" compact={false} {onclick}>Console.log</Button>
        {/snippet}

        <section>
          <h1 class="text-heading-sm">A much larger dialog!</h1>
          <p>
            Dialogs can take additional actions, called secondary actions, which can
            be used for a <em>variety</em> of actions, resetting dialog state, cancelling,
            binding close to it, etc. 
          </p>

          <p>
            In this dialog we also disabled closing on the primary click, as well adding a
            on primary click handler onto it.
          </p>
        </section>
    </Dialog>
    {/snippet}
</Story>
