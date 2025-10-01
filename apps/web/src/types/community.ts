export interface CommunitiesType {
  id: string;
  name: string;
  coverImage: string;
  CommunityMembers: {
    user: {
      id:string;
      profileImage: string | null;
    };
  }[];
}
