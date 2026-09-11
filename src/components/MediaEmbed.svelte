<script>
    import { onMount } from 'svelte';
    import { Toaster, toast } from 'svelte-sonner';
    import ky from 'ky';

    let dataLoading = true;
    let platform = [];
    let youtube = [];

    let videoContainer;
    let isPointerDown = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let suppressClick = false;

    function handlePointerDown(evt) {
        if (evt.pointerType === 'mouse' && evt.button !== 0) return;

        isPointerDown = true;
        dragStartX = evt.clientX;
        dragStartScrollLeft = videoContainer.scrollLeft;
        isDragging = false;
        suppressClick = false;
    }

    function handlePointerMove(evt) {
        if (!isPointerDown) return;

        const distance = evt.clientX - dragStartX;

        if (!isDragging) {
            if (Math.abs(distance) < 8) return;

            isDragging = true;
            suppressClick = true;
            videoContainer.setPointerCapture(evt.pointerId);
        }

        videoContainer.scrollLeft = dragStartScrollLeft - distance;
    }

    function handlePointerUp(evt) {
        isPointerDown = false;

        if (videoContainer.hasPointerCapture(evt.pointerId)) {
            videoContainer.releasePointerCapture(evt.pointerId);
        }

        isDragging = false;
    }

    function playVideo(url) {
        window.dispatchEvent(
            new CustomEvent('play-video', {
                detail: url,
            }),
        );
    }

    onMount(async () => {
        try {
            const { data } = await ky
                .get(import.meta.env.PUBLIC_BACKEND)
                .json();

            platform = data.platform;
            youtube = data.youtube;
            dataLoading = false;
        } catch (e) {
            console.error(e);
            toast.error('Cannot fetch data, please try again later!');
        }
    });
</script>

<aside>
    <div
        class={[
            'flex flex-wrap justify-center md:justify-end gap-1.5 md:absolute z-100',
            'md:max-w-[calc(100vw-520px)] xl:max-w-[calc(100vw-680px)] right-4 top-4',
        ]}
        data-social
    >
        {#if !dataLoading}
            {#each platform as item, i}
                <a
                    href={item.url}
                    target="_blank"
                    class={[
                        'tooltip md:tooltip-bottom md:tooltip-end rounded-2xl',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        'inline-block p-2 bg-slate-400/85 border-2 border-slate-400/85',
                        'hover:bg-sky-700 hover:border-black/20 transition shadow-lg',
                    ]}
                    aria-label={item.name}
                    data-tip={item.name}
                >
                    <span
                        class="block bg-cover bg-center bg-no-repeat w-8 invert aspect-square"
                        style={`background-image: url(/res/icon/${item.class}.svg);`}
                    ></span>
                </a>
            {/each}
        {:else}
            {#each Array(6)}
                <div
                    class="p-2 bg-slate-400/85 border-2 border-slate-400/85 rounded-2xl shadow-lg skeleton"
                >
                    <div class="block w-8 aspect-square"></div>
                </div>
            {/each}
        {/if}
    </div>

    <div class="hidden lg:block z-50 absolute left-98 xl:left-138 bottom-36">
        <div class="badge badge-warning px-4 py-3 font-bold shadow-lg">
            Latest Uploads
        </div>
    </div>
    <div
        bind:this={videoContainer}
        class={[
            'hidden lg:flex gap-3 me-44 mb-4 py-2 overflow-x-auto rounded-lg select-none',
            'w-[calc(100vw-660px)] xl:w-[calc(100vw-820px)] h-32 absolute left-98 xl:left-138 bottom-0 rounded-lg select-none',
        ]}
        style="touch-action: pan-y;"
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerUp}
        onpointercancel={handlePointerUp}
        data-video
    >
        {#if !dataLoading}
            {#each youtube as item, i}
                <a
                    href={item.url}
                    target="_blank"
                    class={[
                        'shrink-0 bg-slate-400/85 bg-cover bg-center bg-no-repeat h-full',
                        'border-1 border-gray-600 aspect-video rounded-lg shadow-lg relative',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    ]}
                    style={`background-image: url(${item.image});`}
                    title={item.title}
                    aria-label={item.title}
                    draggable="false"
                    ondragstart={evt => evt.preventDefault()}
                    onclick={evt => {
                        if (suppressClick) {
                            handleClick(evt);
                            return;
                        }

                        evt.preventDefault();
                        playVideo(item.url);
                    }}
                >
                    <span
                        class={[
                            'bg-[url(/res/icon/youtube.svg)] bg-cover bg-center bg-no-repeat',
                            'w-[12.5%] aspect-square invert opacity-75 absolute left-2.5 bottom-2',
                        ]}
                    ></span>
                </a>
            {/each}
        {:else}
            {#each Array(8)}
                <div
                    class="bg-slate-400/85 h-full border-1 border-gray-600 aspect-video rounded-lg shadow-lg skeleton"
                ></div>
            {/each}
        {/if}
    </div>

    <Toaster
        richColors
        theme="light"
        position="bottom-center"
        toastOptions={{
            style: 'font-size: 1rem;',
        }}
    />
</aside>
