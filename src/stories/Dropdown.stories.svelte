<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Dropdown from "#lib/components/Dropdown.svelte";
  import GitIcon from "#lib/assets/icons/IconGitFork.svelte";
  import GitSlashIcon from "#lib/assets/icons/IconGitForkWithSlash.svelte";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Dropdown",
    component: Dropdown,
    globals: {
        backgrounds: { value: 'dark', grid: false },
    },
    tags: ["autodocs"],
  });
</script>

<!-- Standard textual dropdown with no icons -->
<Story name="Basic" args={{ value: 'Asmoday', options: ['Asmoday', 'Mamosmadey', 'Matimosmadey'] }} />

<!-- Dropdown using the same Icon for selected and non selected case -->
<Story
  name="Icons"
  args={{
    value: '',
    options: ['GitHub', 'GitLab', 'BitBucket'],
    emptyLabel: 'Pick a Forge',
    selectedIcon: GitIcon
  }}
/>

<!-- Dropdown using two Icons for selected and non selected case -->
<Story
  name="Multiple Icons"
  args={{
    value: '',
    options: ['GitHub', 'GitLab', 'BitBucket'],
    emptyLabel: 'Pick a Forge',
    selectedIcon: GitIcon,
    emptyIcon: GitSlashIcon 
  }}
/>

