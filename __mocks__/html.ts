export const HTML = `
<div id="react-checkout-app" class="fixed top-40 h-[calc(100dvh-var(--spacing-5))] w-full rounded-4 bg-white md:w-[700px] md:px-32">
    <h1>Hello</h1>
    <h2 class="test">World</h2>
    <h1>Foo</h1>
    <h1>Bar</h1>
    <header class="sticky top-0 z-10 flex items-center justify-between bg-white pr-[10px] md:pt-16 px-3.5">
        <button class="nav before:back" tabindex="0"></button>
        <button class="nav after:exit" tabindex="1">Test</button>
    </header>
    <main class="mt-16 pb-40">
        <h1 class="mb-8 text-h1 text-primary">Test</h1>
        <div class="cols-1 mt-40 grid gap-8">grid
            <div class="bg-gray rounded-8 enter-anim p-24" style="animation-delay: Oms; position: relative;"></div>
            <div class="bg-gray rounded-8 enter-anim p-24" style="animation-delay: 100ms; position: relative;"></div>
            <div class="bg-gray rounded-8 enter-anim p-24" style="animation-delay: 200ms; position: relative;"></div>
            <div class="bg-gray rounded-8 enter-anim p-24" style="animation-delay: 300ms; position: relative;"></div>
        </div>
        <ol>
            <li class="test">test</li>
        </ol>
    </main>
</div>
`;
