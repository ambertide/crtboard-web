<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        /** Inside content of the dialog */
        children: Snippet<[]>
        /** Opening button to render to open the dialog on press */
        opener: Snippet<[() => void]>
        /** Primary action button of the dialog */
        primary?: Snippet<[() => void]>
        /** Secondary option button of the dialog */
        secondary?: Snippet<[() => void]>
        /** Additional command to execute on primary action press */
        onPrimary?: () => void
        /** Additional command to execute on secondary action press */
        onSecondary?: () => void
        /** If set to false, do not close on primary click */
        closeOnPrimary?: boolean
        /** If set to false, do not close on secondary click */
        closeOnSecondary?: boolean
    }

    let dialog: HTMLDialogElement;

    const {
        opener, children,
        primary, onPrimary, closeOnPrimary = true,
        secondary, onSecondary,  closeOnSecondary = true
    }: Props = $props();

    const onOpenerPress = $derived(() => {
        dialog.showModal();
    })

    const onPrimaryButtonPress = $derived(() => {
        onPrimary?.();
        if (closeOnPrimary) {
            dialog.close();
        }
    })

    const onSecondaryButtonPress = $derived(() => {
        onSecondary?.();
        if (closeOnSecondary) {
            dialog.close()
        }
    })
</script>

{@render opener(onOpenerPress)}

<dialog
    id="dialog"
    bind:this={dialog}
    class="open:flex flex-col gap-4 px-8 pt-8 pb-15 bg-gray-800 retro-card-shadow-xl-50 text-gray-50 text-body-sm"
    onclose={() => console.log('!')}
>
    <div>
    {@render children?.()}
    <div class="dialog-actions flex flex-row gap-1 absolute right-2 bottom-2">
        {@render secondary?.(onSecondaryButtonPress)}
        {@render primary?.(onPrimaryButtonPress)}
    </div>
    </div>
</dialog>
