import { CandidateTimeInfo } from "./candidateTime";

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
          candidates: CandidateTimeInfo[];
          created_at: string;
          date: string;
          id: string;
          isMemberCountDecided: boolean;
          memberCount: number | null;
          members: { name: string; schedule: string[] }[];
          timeRange: string[];
          title: string;
        };
        Insert: {
          candidates?: CandidateTimeInfo[];
          created_at?: string;
          date: string;
          id?: string;
          isMemberCountDecided: boolean;
          memberCount?: number | null;
          members: { name: string; schedule: string[] }[];
          timeRange: string[];
          title: string;
        };
        Update: {
          candidates?: CandidateTimeInfo[];
          created_at?: string;
          date?: string;
          id?: string;
          isMemberCountDecided?: boolean;
          memberCount?: number | null;
          members?: { name: string; schedule: string[] }[];
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
      [_ in never]: never;
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
