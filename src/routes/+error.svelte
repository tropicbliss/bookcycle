<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold">404</p>
		<h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
			Page not found
		</h1>
		<p class="mt-6 text-pretty text-lg font-medium sm:text-xl/8">
			Sorry, we couldn't find the page you're looking for.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button href="/">Go back home</Button>
		</div>
	</div>
</main>
