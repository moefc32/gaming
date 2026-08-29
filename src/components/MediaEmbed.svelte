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

<section>
    <div
        class="flex justify-center lg:justify-end gap-1.5 lg:absolute right-4 top-4 z-100"
    >
        {#each platform as item, i}
            <a
                href={item.url}
                target="_blank"
                class="tooltip lg:tooltip-bottom lg:tooltip-end inline-block p-2 bg-slate-400/85 hover:bg-sky-800 border-2 border-slate-400/85 hover:border-black/20 transition rounded-2xl shadow-lg"
                data-tip={item.name}
            >
                <span
                    class="block bg-cover bg-center bg-no-repeat w-8 invert aspect-square"
                    style={`background-image: url(/res/icon/${item.class}.svg);`}
                ></span>
            </a>
        {/each}
    </div>

    <div
        class="hidden lg:flex gap-3 me-54 mb-4 px-2 py-2 w-[calc(100vw-856px)] h-40 absolute right-0 bottom-0 overflow-x-auto rounded-lg"
    >
        {#each youtube as item, i}
            <a
                href={item.url}
                target="_blank"
                class="bg-gray-500 bg-cover bg-center bg-no-repeat h-full border-1 border-gray-600 aspect-video rounded-lg shadow-lg relative"
                style={`background-image: url(${item.image});`}
                title={item.title}
            >
                <span
                    class="bg-[url(/res/icon/youtube.svg)] bg-cover bg-center bg-no-repeat w-[12.5%] aspect-square invert opacity-75 absolute left-2.5 bottom-2"
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
</section>
