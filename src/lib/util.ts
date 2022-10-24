export const overflowing = () => document.body.clientHeight > window.innerHeight
export const wait = (time: number) => new Promise((res) => setTimeout(res, time))
