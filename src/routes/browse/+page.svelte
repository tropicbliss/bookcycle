<script lang="ts">
	import type { PageProps } from './$types';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	let { data }: PageProps = $props();
</script>

{#if data.books.length === 0}
	<div class="text-center">
		<svg
			class="mx-auto size-12 text-gray-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				vector-effect="non-scaling-stroke"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
			/>
		</svg>
		<h3 class="mt-2 text-sm font-semibold">No books available 😔</h3>
	</div>
{:else}
	<ul role="list" class="divide-y divide-gray-100">
		{#each data.books as book}
			<li class="flex items-center justify-between gap-x-6 py-5">
				<div class="min-w-0">
					<div class="flex items-start gap-x-3">
						<p class="text-sm/6 font-semibold">{book.name}</p>
					</div>
					<div class="mt-1 flex items-center gap-x-2 text-xs/5">
						<p class="truncate">{book.authors}</p>
					</div>
				</div>
				{#if data.user !== null}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="outline" size="icon">
								<Ellipsis />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Item href="/exchange/${book.id}">Exchange book</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
