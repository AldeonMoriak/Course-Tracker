export type Course = {
	name: string;
	tags: Array<string>;
	id: string;
	videos: Array<Video>;
}

export type Video = {
	id: string;
	link: string;
	source: 'youtube' | 'vimeo';
	thumbnail: string,
	title: string;
}
