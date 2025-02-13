<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from './ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Book from 'lucide-svelte/icons/book';
	import { enhance } from '$app/forms';

	export let isLoggedIn: Boolean;
</script>

<header class="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav
		class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
	>
		<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<Book class="h-6 w-6" />
			<span class="sr-only">BookCycle</span>
		</a>
		<a href="/browse" class="text-foreground transition-colors hover:text-foreground"> Browse </a>
		{#if isLoggedIn}
			<a href="/inventory" class="text-muted-foreground transition-colors hover:text-foreground">
				Inventory
			</a>
		{/if}
	</nav>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left">
			<nav class="grid gap-6 text-lg font-medium">
				<a href="##" class="flex items-center gap-2 text-lg font-semibold">
					<Book class="h-6 w-6" />
					<span class="sr-only">BookCycle</span>
				</a>
				<a href="/browse" class="hover:text-foreground"> Browse </a>
				{#if isLoggedIn}
					<a href="/inventory" class="hover:text-foreground"> Inventory </a>
				{/if}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	{#if isLoggedIn}
		<div class="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>
						<form method="post" action="/auth/?/logout" use:enhance>
							<button class="cursor-default">Logout</button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	{/if}
</header>
