const users = [
  { name: "SavoryWithSara", avatar: "https://i.pravatar.cc/150?u=M" },
  { name: "The Wholesome Spoon", avatar: "https://i.pravatar.cc/150?u=G" },
  { name: "Chef Aryan", avatar: "https://i.pravatar.cc/150?u=T" },
  { name: "Bakeology by Nia", avatar: "https://i.pravatar.cc/150?u=H" },
  { name: "VeganVibes", avatar: "https://i.pravatar.cc/150?u=S" },
  { name: "Zassicca", avatar: "https://i.pravatar.cc/150?u=N" },
];

interface ProfileCardProp {
    user : {
      avatar:string;
      name:string;
    }
}
function ProfileCard(props:ProfileCardProp) {
  return (
    <>
      <div className="cursor-pointer w-[150px] h-[150px] rounded-2xl group border border-gray-300 hover:border-orange-400 flex flex-col items-center justify-around hover:shadow-xl">
        <div className="overflow-hidden w-[90px]] h-[90px] rounded-full">
          <img
            src={props.user.avatar}
            alt={props.user.name}
            className="w-full h-full transition-transform duration-300 group-hover:scale-120 ease-in-out object-cover"
          />
        </div>
        <div className="w-full text-center text-sm text-black group-hover:text-orange-400">
          {props.user.name}
        </div>
      </div>
    </>
  );
}
export default function Profiles() {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {users.map((user, index) => (
          <ProfileCard user={user} key={index} />
        ))}
      </div>
    </>
  );
}
