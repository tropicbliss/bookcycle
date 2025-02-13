<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { form }: { form: ActionData } = $props();
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="grid gap-4" method="post" action="?/login" use:enhance>
			<div class="grid gap-2">
				<Label for="email">Username</Label>
				<Input id="email" name="username" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" name="password" type="password" required />
				<p class="text-sm text-red-500">{form?.message ?? ''}</p>
			</div>
			<Button type="submit" class="w-full">Login</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/auth/register" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
