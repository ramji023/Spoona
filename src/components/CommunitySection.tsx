import com_1 from "../../public/communities/com_01.jpg";
import com_2 from "../../public/communities/com_02.jpg";
import com_3 from "../../public/communities/com_03.jpg";
import com_4 from "../../public/communities/com_04.jpg";
import com_5 from "../../public/communities/com_05.jpg";
import com_6 from "../../public/communities/com_06.jpg";

const users = [
  { name: "SavoryWithSara", avatar: "https://i.pravatar.cc/150?u=A" },
  { name: "The Wholesome Spoon", avatar: "https://i.pravatar.cc/150?u=B" },
  { name: "Chef Aryan", avatar: "https://i.pravatar.cc/150?u=C" },
  { name: "Bakeology by Nia", avatar: "https://i.pravatar.cc/150?u=D" },
  { name: "VeganVibes", avatar: "https://i.pravatar.cc/150?u=E" },
  { name: "Zassicca", avatar: "https://i.pravatar.cc/150?u=F" },
];

const communitiesArray = [
  {
    imagePath: com_1,
    communityName: "Vegetarian Recipe",
    followers: users,
  },
  {
    imagePath: com_2,
    communityName: "Take Care Of Your Microbiome / Microbiota",
    followers: users,
  },
  {
    imagePath: com_3,
    communityName: "Keto & Low-Carb Club",
    followers: users,
  },
  {
    imagePath: com_4,
    communityName: "Holistic Healing Hub",
    followers: users,
  },
  {
    imagePath: com_5,
    communityName: "There is no Break",
    followers: users,
  },
  {
    imagePath: com_6,
    communityName: "Fitness Tribe",
    followers: users,
  },
];

function CommunityCard(props) {
  return (
    <>
      <div className="flex-col items-center w-[150px] cursor-pointer hover:text-orange-400">
        <div className="relative w-full h-[150px] overflow-hidden rounded-2xl group">
          <img
            src={props.community.imagePath}
            alt={props.community.communityName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out"
          />
          <div className="absolute bottom-1 left-1 flex -space-x-2">
            {props.community.followers.slice(0, 3).map((follower, index) => (
              <img
                key={index}
                src={follower.avatar}
                alt={follower.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
            {props.community.followers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-300 text-sm flex items-center justify-center border-2 border-white text-gray-700 ">
                +{props.community.followers.length - 3}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 text-center break-words">
          {props.community.communityName}
        </div>
      </div>
    </>
  );
}
export function CommunitySection() {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {communitiesArray.map((community, index) => (
          <CommunityCard community={community} key={index} />
        ))}
      </div>
    </>
  );
}
