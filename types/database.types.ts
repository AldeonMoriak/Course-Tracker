export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string | null;
          id: number;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      course: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'course_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };

      tag: {
        Row: {
          created_at: string;
          id: string;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string | null;
        };
        Relationships: [];
      };

      video: {
        Row: {
          course_id: string | null;
          created_at: string;
          id: string;
          is_watched: boolean | null;
          source: string | null;
          thumbnail: string | null;
          title: string | null;
          user_id: string;
          video_id: string | null;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          id?: string;
          is_watched?: boolean | null;
          source?: string | null;
          thumbnail?: string | null;
          title?: string | null;
          user_id: string;
          video_id?: string | null;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          id?: string;
          is_watched?: boolean | null;
          source?: string | null;
          thumbnail?: string | null;
          title?: string | null;
          user_id?: string;
          video_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'video_course_id_fkey';
            columns: ['course_id'];
            isOneToOne: false;
            referencedRelation: 'course';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'video_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      video_tag: {
        Row: {
          created_at: string;
          id: string;
          tag_id: string | null;
          video_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          tag_id?: string | null;
          video_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          tag_id?: string | null;
          video_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'video_tag_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tag';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'video_tag_video_id_fkey';
            columns: ['video_id'];
            isOneToOne: false;
            referencedRelation: 'video';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
