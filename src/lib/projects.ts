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
			"The website you are currently looking at. Written in SvelteKit and Tailwind and used to showcase my projects.",
		image: "/images/thumbnails/portfolio.png",
		github: "new-portfolio",
		wip: false
	},
	{
		id: "chess-ai",
		title: "Chess AI",
		description:
			"A chess AI written in Rust. Uses a minimax algorithm with alpha-beta pruning and more to determine the best move.",
		image: "/images/thumbnails/chess-ai.png",
		github: "chess-ai",
		wip: false
	},
	{
		id: "ak",
		title: "Automated Kingdom",
		description:
			"Multiplayer top-down game written in Rust with Macroquad graphics and online matchmaking. Supports native and WASM.",
		image: "/images/thumbnails/wip.png",
		github: "automated-kingdom",
		wip: true
	},
	{
		id: "wordle-clone",
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
		id: "buzzfeed",
		title: "Buzzfeed Quiz",
		description:
			"A Buzzfeed cli quiz, written in Java, made for a school project. Has colored output, a scoring system and multiple quizzes!",
		image: "/images/thumbnails/buzzfeed.png",
		github: "buzzfeed",
		wip: false
	},
	{
		id: "wordle",
		title: "Wordle Clone",
		description:
			"A wordle clone written in Go in the command line. One of my first projects, and my first time using Go.",
		image: "/images/thumbnails/wordle.png",
		github: "wordleclone",
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
