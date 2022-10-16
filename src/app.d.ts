// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Project } from "$lib/projects.js"

// and what to do when importing types
declare namespace App {
	// interface Locals {}
	interface PageData {
		project: Project
	}
	// interface Error {}
	// interface Platform {}
}
