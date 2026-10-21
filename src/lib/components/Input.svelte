<script lang="ts">
    interface Props {
        value: string;
        placeholder: string;
        label: string;
        id: string;
        class?: string;
    }

    let { id, label, value = $bindable(""), placeholder, ...rest}: Props = $props();
</script>

<input
    bind:value={value}
    placeholder={placeholder}
    aria-label={label}
    id={id}
    class={{
        "border-none focus:outline-none focus:retro-card-shadow-md-pressed-500 focus:border-none retro-card-shadow-md-500  active:border-0 block shadow-lg focus:border-0 px-1.25 items-center text-body-sm text-gray-950 placeholder-gray-400 bg-gray-50": true,
        ...(rest.class ? { [rest.class]: true } : {})
    }}
>
