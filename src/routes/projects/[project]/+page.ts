import { projects, projectsMap } from "$lib/projects.js"
import type { PageLoad } from ".svelte-kit/types/src/routes/projects/[project]/$types.js"
import { error } from "@sveltejs/kit"

export const load: PageLoad = ({ params }) => {
	if (projects.map((p) => p.id).includes(params.project)) {
		return {
			project: projectsMap[params.project]
		}
	}

	throw error(404, "Not found")
}
