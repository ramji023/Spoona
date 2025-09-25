export interface NoteType {
  notes: {
    status: string;
    note: string;
    user: {
      username: string;
      profileImage: string;
    };
  }[];
}
