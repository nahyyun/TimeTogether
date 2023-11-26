export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      GuestUser: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          times: number[];
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          times: number[];
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          times?: number[];
        };
        Relationships: [];
      };
      Meeting: {
        Row: {
          candidates: Json[];
          created_at: string;
          date: string;
          id: string;
          isMemberCountDecided: boolean;
          memberCount: number | null;
          members: Json[];
          timeRange: string[];
          title: string;
        };
        Insert: {
          candidates: Json[];
          created_at?: string;
          date: string;
          id?: string;
          isMemberCountDecided: boolean;
          memberCount?: number | null;
          members: Json[];
          timeRange: string[];
          title: string;
        };
        Update: {
          candidates?: Json[];
          created_at?: string;
          date?: string;
          id?: string;
          isMemberCountDecided?: boolean;
          memberCount?: number | null;
          members?: Json[];
          timeRange?: string[];
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_member: {
        Args: {
          meeting_id: string;
          member_data: Json;
        };
        Returns: {
          candidates: Json[];
          created_at: string;
          date: string;
          id: string;
          isMemberCountDecided: boolean;
          memberCount: number | null;
          members: Json[];
          timeRange: string[];
          title: string;
        }[];
      };
      update_member_schedule_data: {
        Args: {
          meeting_id: string;
          member_name: string;
          schedule: string[];
        };
        Returns: {
          candidates: Json[];
          created_at: string;
          date: string;
          id: string;
          isMemberCountDecided: boolean;
          memberCount: number | null;
          members: Json[];
          timeRange: string[];
          title: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Row<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type RowInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
