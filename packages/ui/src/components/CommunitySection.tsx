interface PropType {
  community: {
    id: string;
    name: string;
    coverImage: string;
    CommunityMembers:
      | {
          user: {
            profileImage: string | null;
          };
        }[]
      | [];
  };
  key: number;
  width: string;
  height: string;
  move: (path: string) => void;
}

function CommunityCard(props: PropType) {
  return (
    <>
      <div
        onClick={() => props.move(props.community.id)}
        className={` ${props.width} flex-col items-center cursor-pointer hover:text-orange-400`}
      >
        <div
          className={`w-full ${props.height} relative overflow-hidden rounded-2xl group`}
        >
          <img
            src={props.community.coverImage}
            alt={props.community.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out"
          />
          <div className="absolute bottom-1 left-1 flex -space-x-2">
            {props.community.CommunityMembers.length >= 0 &&
              props.community.CommunityMembers.slice(0, 3).map(
                (follower: any, index: any) => (
                  <img
                    key={index}
                    src={
                      follower.user.profileImage
                        ? follower.user.profileImage
                        : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                    }
                    alt=""
                    className={`w-8 h-8 rounded-full border-2 border-white object-cover`}
                  />
                )
              )}
            {props.community.CommunityMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-300 text-sm flex items-center justify-center border-2 border-white text-gray-700 ">
                +{props.community.CommunityMembers.length - 3}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 text-center break-words">
          {props.community.name}
        </div>
      </div>
    </>
  );
}
export function CommunitySection({
  width,
  height,
  data,
  onMove,
}: {
  width: string;
  height: string;
  data: {
    id: string;
    name: string;
    coverImage: string;
    CommunityMembers: {
      user: {
        profileImage: string | null;
      };
    }[];
  }[];
  onMove: (path: string) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap justify-start gap-6">
        {data.map((community, index) => (
          <CommunityCard
            community={community}
            key={index}
            width={width}
            height={height}
            move={onMove}
          />
        ))}
      </div>
    </>
  );
}
