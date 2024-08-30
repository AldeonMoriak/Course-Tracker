import type { Database } from './database.types';

export type Course = {
  video: Video[];
  tags?: Tag[];
  created_at?: string;
  id?: string;
} & Omit<Database['public']['Tables']['course']['Row'], 'created_at' | 'id'>;

export type Video = { id?: string; created_at?: string } & Omit<
  Database['public']['Tables']['video']['Row'],
  'created_at' | 'id'
>;
export type Tag = Database['public']['Tables']['tag']['Row'];
