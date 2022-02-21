<nav class="p-4 bg-slate-600 shadow-lg flex content-center">
    <div class="mr-auto">
        {#each [["Home", "https://cornhub.website/"], ["About", "./about"]] as nav}
            <a
                class="p-2 bg-slate-700 shadow-md rounded-lg mr-2 text-lg text-slate-200
                hover:rounded-sm hover:scale-105 hover:bg-slate-800 transition-all"
                href={nav[1]}>{nav[0]}</a
            >
        {/each}
    </div>
    <div class="ml-auto">
        {#each [["My Projects", "./projects"]] as nav}
            <a
                class="p-2 bg-slate-700 shadow-md rounded-lg ml-2 text-lg text-slate-200
                hover:rounded-sm hover:scale-105 hover:bg-slate-800 transition-all"
                href={nav[1]}>{nav[0]}</a
            >
        {/each}
    </div>
</nav>
