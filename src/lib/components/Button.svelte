<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    export interface Props extends HTMLButtonAttributes {
        variant: "default" | "delete";
        compact: boolean;
    }

    const { variant = "default", compact, children, ...rest }: Props = $props();
</script>

<button
    type="button"
    class={{
        "flex justify-center items-center retro-card-shadow-md-950 active:retro-card-shadow-md-pressed-950 text-gray-50 text-body-sm": true,
        "bg-gray-900": variant === "default",
        "bg-gray-500": variant === "delete",
        "px-4 py-1": !compact,
        "p-0.5": compact,
        ...(rest.class && typeof rest.class === 'string' ? { [rest.class]: true} : {})
    }}
    {...rest}
>
    {@render children?.()}
</button>
