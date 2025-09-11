import { DislikeSolidIcon, LikeSolidIcon } from "../icons/LikeIcon";

interface CommentType {
  avatar: string;
  creatorName: string;
  content: string;
  like: boolean;
}

const comments: CommentType[] = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    creatorName: "Aman Sharma",
    content: "This article was super helpful, thanks a lot!",
    like: true,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    creatorName: "Priya Singh",
    content: "I have a doubt about the third paragraph, can someone explain?",
    like: false,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    creatorName: "Ravi Patel",
    content: "Amazing breakdown. This should be more widely shared!",
    like: true,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    creatorName: "Sneha Desai",
    content: "It would be great if you could cover more real-world examples.",
    like: false,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    creatorName: "Karan Verma",
    content: "I tried this out and it worked perfectly. Kudos!",
    like: true,
  },
];

export function NotesSection() {
  return (
    <>
      <div>
        {/* first div  */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <button className="text-lg font-semibold bg-orange-400 cursor-pointer text-white  rounded-3xl px-6 py-2 mx-3 ">
            Leave Note
          </button>
        </div>
        {/* second DIv  */}
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="text-green-400 ">
              {" "}
              <LikeSolidIcon />
            </span>
            1722 liked
          </span>
          <span className="flex items-center gap-2">
            <span className="text-red-400">
              <DislikeSolidIcon />
            </span>
            435 disliked
          </span>
        </div>
        {/* third div  */}
        <div className="p-4">
          {comments.map((sampleComment, index) => (
            <div key={index} className="p-2">
              <div className="flex gap-2 items-center py-2">
                <div className="relative w-13 h-13">
                  <img
                    src={sampleComment.avatar}
                    className="w-full h-full rounded-full"
                  />
                  {sampleComment.like ? (
                    <div className="text-green-400 absolute -bottom-2 -right-1">
                      <LikeSolidIcon />
                    </div>
                  ) : (
                    <div className="text-red-400 absolute -bottom-2 -right-1">
                      <DislikeSolidIcon />
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold hover:text-orange-400 cursor-pointer">
                  {sampleComment.creatorName}
                </div>
              </div>
              <div className="p-1">{sampleComment.content}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-gray-400 font-semibold  py-3 px-3">
          <span className="hover:text-orange-400 cursor-pointer">
            {" "}
            See All 200 Notes
          </span>
        </div>
      </div>
    </>
  );
}

export function NoteInput() {
  return (
    <>
      <div className="p-3 flex justify-center items-center gap-3">
        <img
          src={comments[0].avatar}
          alt=""
          className="w-13 h-13 rounded-full mr-2"
        />
        <input
          type="text"
          placeholder="Enter Your Note"
          className="bg-gray-200 rounded-4xl w-[800px] h-[50px] px-2"
        />
        <button className="text-lg font-semibold  cursor-pointer bg-orange-400 text-white outline-gray-400 outline  rounded-3xl px-6 py-2 mx-3 ">
          Save
        </button>
      </div>
    </>
  );
}
