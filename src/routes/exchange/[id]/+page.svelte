<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Exchange books</Card.Title>
			<Card.Description>Choose the book you want to trade here.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="grid gap-4" method="post" action="?/exchange" use:enhance>
				<Select.Root portal={null} required>
					<Select.Trigger>
						<Select.Value placeholder="Select a book" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Book</Select.Label>
							{#each data.books as book}
								<Select.Item value={book.id} label={book.name}>{book.name}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="book" />
				</Select.Root>
				<Button type="submit" class="w-full">Trade</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
