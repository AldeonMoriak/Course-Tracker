export type Course = {
  name: string;
  tags: Array<string>;
  id?: string;
  videos: Array<Video>;
  description: string;
  user_id: string;
};

export type Video = {
  id?: string;
  course_id: string;
  video_id: string;
  source: 'youtube' | 'vimeo';
  thumbnail: string;
  title: string;
  user_id: string;
};
