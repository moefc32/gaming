<script>
    import { onMount } from 'svelte';
    import { Toaster, toast } from 'svelte-sonner';
    import ky from 'ky';
    import { owner } from '../lib/config';
    import datePrettier from '../lib/datePrettier';

    let dataLoading = true;
    let platform = [];
    let behance = [];
    let youtube = [];

    onMount(async () => {
        try {
            const { data } = await ky
                .get(import.meta.env.PUBLIC_BACKEND)
                .json();

            platform = data.platform;
            behance = data.behance;
            youtube = data.youtube;
            dataLoading = false;
        } catch (e) {
            console.error(e);
            toast.error('Cannot fetch data, please try again later!');
        }
    });
</script>

<div class="flex gap-2 absolute left-0 bottom-0">
    {#each platform as item, i}
        <a
            href={item.url}
            target="_blank"
            class="tooltip inline-block p-2.5 bg-slate-400/85 hover:bg-slate-500 transition rounded-lg"
            data-tip={item.name}
        >
            <span
                class="block bg-cover bg-center bg-no-repeat w-10 invert aspect-square"
                style={`background-image: url(icon/${item.class}.svg);`}
            ></span>
        </a>
    {/each}
</div>

<Toaster
    richColors
    theme="light"
    position="bottom-center"
    toastOptions={{
        style: 'font-size: 1rem;',
    }}
/>
