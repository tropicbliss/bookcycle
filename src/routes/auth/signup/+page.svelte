<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="grid gap-4" method="post" action="?/signup" use:enhance>
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input id="username" name="username" type="username" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" name="password" type="password" required />
			</div>
			<div class="grid gap-2">
				<Label for="confirmpassword">Confirm Password</Label>
				<Input id="confirmpassword" name="confirmpassword" type="password" required />
				<p class="text-sm text-red-500">{form?.message ?? ''}</p>
			</div>
			<Button type="submit" class="w-full">Create an account</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/auth/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
