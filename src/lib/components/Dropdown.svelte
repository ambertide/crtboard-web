<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        value: string;
        options: string[];
        emptyLabel?: string;
        emptyIcon?: Snippet;
        selectedIcon?: Snippet;
        class?: string;
    }

    let { value = $bindable(""), options, emptyLabel, emptyIcon, selectedIcon, ...rest }: Props = $props();
    const id = $props.id();

    let isEmpty = $derived(value === "");

    /** Show the EmptyIcon if empty option is selected */
    let activeIcon = $derived(isEmpty ? (emptyIcon ?? selectedIcon) : selectedIcon);

</script>


<style>
    select,
    ::picker(select) {
        appearance: base-select;
        border: none;
    }

    ::picker(select) {
        margin-top: 4px;
        box-shadow: 3px 3px 0 0 var(--gray-50, #F9FAFB);
    }

    option::checkmark {
        display: none;
    }
</style>

<select
    id={id}
    class={{
        "flex gap-1 items-center px-2 pl-4 py-1  text-body-sm text-gray-50": true,
        "bg-gray-900 retro-card-shadow-md-950 hover:retro-card-shadow-md-pressed-900 focus:retro-card-shadow-md-pressed-900": true,
        "opacity-70": isEmpty
    }}
    bind:value={value}
>
    <button>
        {@render activeIcon?.()}
        <selectedcontent></selectedcontent>
    </button>
    {#if emptyLabel}
        <option
            selected={value === ""}
            class={{
                "pl-10 pr-2 py-2": true, 
                "bg-gray-900 hover:bg-gray-600 text-gray-50": "" !== value,
            }}
        value="">{emptyLabel}</option>
    {/if}
    {#each options as option (option)}
    <option
        selected={value === option}
        class={{
            "pl-10 pr-2 py-2": true, 
            "bg-gray-900 hover:bg-gray-600 text-gray-50": option !== value,
            "bg-gray-50 text-gray-950": option === value
        }}
        value={option}
    >
        {option}
    </option>
   {/each} 
</select>
