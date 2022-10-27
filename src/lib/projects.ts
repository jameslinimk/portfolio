export interface Project {
	id: string
	title: string
	description: string
	image: string
	github: string
	wip: boolean
}

export const projects: Project[] = [
	{
		id: "portfolio",
		title: "Portfolio",
		description:
			"The website you are currently looking at. Written in SvelteKit and Tailwind, colors inspired by Bevy.",
		image: "/images/thumbnails/portfolio.png",
		github: "new-portfolio",
		wip: false
	},
	{
		id: "chess-ai",
		title: "Chess AI",
		description:
			"A chess AI written in Python. Agent is a minimax search and graphics are done using PyGame.",
		image: "/images/thumbnails/chess-ai.png",
		github: "chess-veritas-ai",
		wip: true
	},
	{
		id: "worlde-clone",
		title: "Wordle Clone",
		description:
			"Yet another world clone, built using Svelte. Has 3-7 letter length words, custom guess count, word sharing, and a daily word!",
		image: "/images/thumbnails/wordle-clone.png",
		github: "wordlecloneweb",
		wip: false
	},
	{
		id: "world-games",
		title: "World Games",
		description:
			"A web game where you have to try and find countries that are given. Pan through the world using your mouse and double click to select!",
		image: "/images/thumbnails/world-games.png",
		github: "world-games",
		wip: false
	},
	{
		id: "valorant-api",
		title: "Valorant API TS Fork",
		description:
			"Fork of Henrik's Unofficial Valorant API Client, remade with typescript and types, with type testing using JSON schema.",
		image: "/images/thumbnails/valorant-api.png",
		github: "unofficial-valorant-api",
		wip: false
	}
]

export const projectsMap = projects.reduce<{ [id: string]: Project }>((acc, cur) => {
	acc[cur.id] = cur
	return acc
}, {})
