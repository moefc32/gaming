<script>
    import { onMount } from 'svelte';
    import { Toaster, toast } from 'svelte-sonner';
    import ky from 'ky';
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

            console.log(data);
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

<!-- <ul class="list-disc text-lg">
    {#each behance as item, i}
        <li>
            <p
                class="w-36 aspect-video bg-cover!"
                style="background: url({item.image}) center center no-repeat;"
            ></p>
            <p>{item.title}</p>
            <p>{item.date}</p>
            <p>
                <a href={item.url} target="_blank" class="text-blue-500">
                    link
                </a>
            </p>
        </li>
    {/each}
</ul> -->

<ul class="list-disc text-lg">
    {#each platform as item, i}
        <li>
            {item.name}:
            <a href={item.url} target="_blank" class="text-blue-500">link</a>
        </li>
    {/each}
</ul>

<!-- <ul class="list-disc text-lg">
    {#each youtube as item, i}
        <li>
            <p
                class="w-36 aspect-video bg-cover!"
                style="background: url({item.image}) center center no-repeat;"
            ></p>
            <p>{item.title}</p>
            <p>{item.date}</p>
            <p>
                <a href={item.url} target="_blank" class="text-blue-500">
                    link
                </a>
            </p>
        </li>
    {/each}
</ul> -->

<Toaster
    richColors
    theme="light"
    position="bottom-center"
    toastOptions={{
        style: 'font-size: 1rem;',
    }}
/>
