<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<ModeWatcher />
<NavBar isLoggedIn={data.user != null} />
<div class="px-4 py-3 md:px-6">
	{@render children()}
</div>
