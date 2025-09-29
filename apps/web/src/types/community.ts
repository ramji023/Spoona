export interface CommunitiesType {
  id: string;
  name: string;
  coverImage: string;
  CommunityMembers: {
    user: {
      profileImage: string | null;
    };
  }[];
}
