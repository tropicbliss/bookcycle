<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="relative">
	<div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
		<div class="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
			<div class="mx-auto max-w-lg lg:mx-0">
				<h1 class="mt-24 text-pretty text-5xl font-semibold tracking-tight sm:mt-10 sm:text-7xl">
					Where Stories Find Their Next Chapter
				</h1>
				<p class="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
					BookCycle is a community-driven platform that transforms idle books into discovered
					treasures. Our peer-to-peer exchange system connects passionate readers, giving pre-loved
					books new homes while building lasting connections between bibliophiles. Through smart
					matching and seamless exchanges, we're creating a sustainable cycle of literary sharing
					that makes every book count.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<Button href="/auth/login">Get started</Button>
				</div>
			</div>
		</div>
		<div class="relative z-0 lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
			<img
				class="aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
				src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
				alt=""
			/>
		</div>
	</div>
</div>
