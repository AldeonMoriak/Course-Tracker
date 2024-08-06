export type Course = {
  name: string;
  tags: Array<string>;
  id: string;
  videos: Array<Video>;
  description: string;
  user_id: string;
};

export type Video = {
  id: string;
  link: string;
  source: 'youtube' | 'vimeo';
  thumbnail: string;
  title: string;
};
