type PopularCreator = {
  id: string;
  username: string;
  profileImage: string;
};

function ProfileCard({ user }: { user: PopularCreator }) {
  return (
    <>
      <div className="cursor-pointer w-[150px] h-[150px] rounded-2xl group border border-gray-300 hover:border-orange-400 flex flex-col items-center justify-around hover:shadow-xl">
        <div className="overflow-hidden w-[90px]] h-[90px] rounded-full">
          <img
            src={
              user.profileImage ??
              `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
            }
            alt={user.username}
            className="w-[90px] h-full transition-transform duration-300 group-hover:scale-120 ease-in-out object-cover"
          />
        </div>
        <div className="w-full text-center text-sm text-black group-hover:text-orange-400">
          {user.username}
        </div>
      </div>
    </>
  );
}
export default function Profiles({
  data,
  onMove,
}: {
  data: PopularCreator[];
  onMove: (path: string) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {data.map((user, index) => (
          <ProfileCard user={user} key={index} />
        ))}
      </div>
    </>
  );
}
