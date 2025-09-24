import { DislikeSolidIcon, LikeSolidIcon } from "@repo/ui/icons/LikeIcon";
import React, { useState, SetStateAction, useRef } from "react";
import { CrossIcon } from "@repo/ui/icons/CrossIcon";
import Button from "@repo/ui/components/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
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
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <>
      <div>
        {/* first div  */}
        <div className="relative flex justify-between">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <button
            onClick={() => setNoteOpen(true)}
            className="text-lg font-semibold bg-orange-400 cursor-pointer text-white  rounded-3xl px-6 py-2 mx-3 "
          >
            Leave Note
          </button>
        </div>
        {/* second DIv  */}
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="text-green-500 ">
              {" "}
              <LikeSolidIcon className="size-6" />
            </span>
            1722 liked
          </span>
          <span className="flex items-center gap-2">
            <span className="text-red-500">
              <DislikeSolidIcon className="size-6" />
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
                    <div className="text-green-500 absolute -bottom-2 -right-1">
                      <LikeSolidIcon className="size-6" />
                    </div>
                  ) : (
                    <div className="text-red-500 absolute -bottom-2 -right-1">
                      <DislikeSolidIcon className="size-6" />
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
        {noteOpen && <NoteBox open={noteOpen} close={setNoteOpen} />}
      </div>
    </>
  );
}

function NoteBox({
  open,
  close,
}: {
  open: boolean;
  close: React.Dispatch<SetStateAction<boolean>>;
}) {
  if (!open) {
    return null;
  }

  type NoteDataType = {
    status: "like" | "dislike";
    note: string | undefined;
  };
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLike, setIsDisliked] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState("");
  const recipeId = "74b75485-bc16-4d12-a40b-6d7c92585de7";

  // create react query for note
  const sendNoteMutation = useMutation({
    mutationFn: async (data: NoteDataType) => {
      const response = await api.post(`/api/v1/recipe/${recipeId}/note`, data);
      return response.data;
    },
    onSuccess: (data) => {
      setError("");
      console.log("note response data  :", data);
      close(false);
      setSuccessMsg(
        "Thanks for sharing! Your note is now saved and visible to others exploring this recipe."
      );
    },
    onError: (err: any) => {
      console.log("error : ", err);
      setError(`${err}`);
      if (err.response) {
        setError(
          err.response.data?.message || JSON.stringify(err.response.data)
        );
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(err.message || "An unexpected error occurred");
      }
    },
  });

  function sendNote() {
    console.log("calling sendNote function");
    if (!isLiked && !isDisLike) {
      setError("you must either like or dislike to proceed");
      return;
    }
    sendNoteMutation.mutate({
      status: isLiked ? "like" : "dislike",
      note: noteRef.current?.value,
    });
  }

  if (open) {
    return (
      <>
        {/* main div  */}
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] z-50">
          <div className="bg-gray-200 rounded-xl p-6 w-[470px] h-[470px] flex flex-col gap-5">
            {/* first div  */}
            <div className="text-2xl font-semibold flex justify-between items-center">
              <h1>Add Note</h1>
              <div
                onClick={() => close(false)}
                className="text-gray-700 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300"
              >
                <CrossIcon />
              </div>
            </div>
            {/* error div  */}
            <div className="min-h-[13px]">
              <span className="text-xs text-red-500 flex items-center justify-center">
                {error ?? ""}
              </span>
            </div>
            {/* second div  */}
            <div className="flex justify-center gap-4">
              <div
                onClick={() => {
                  setIsDisliked(false);
                  setIsLiked((curr) => !curr);
                }}
                className={`w-25 h-25 outline-1 outline-gray-700 rounded-full flex justify-center items-center  hover:text-green-500 cursor-pointer ${isLiked && `text-green-500`}`}
              >
                <LikeSolidIcon className="size-18" />
              </div>
              <div
                onClick={() => {
                  setIsLiked(false);
                  setIsDisliked((curr) => !curr);
                }}
                className={`w-25 h-25 outline-1 outline-gray-700 rounded-full flex justify-center items-center hover:text-red-500 cursor-pointer ${isDisLike && `text-red-500`}`}
              >
                <DislikeSolidIcon className="size-18" />
              </div>
            </div>
            <div className="flex flex-col gap-2 py-1">
              <label>Note</label>
              <textarea
                name="note"
                rows={3}
                ref={noteRef}
                placeholder="Share your experience with everyone..."
                className="px-2 py-2 col-5 outline-2 outline-gray-500 rounded focus:outline-orange-400"
              ></textarea>
            </div>

            <Button onClick={() => sendNote()}>Publish your note</Button>
          </div>
        </div>
      </>
    );
  }
}

// export function NoteInput() {
//   return (
//     <>
//       <div className="p-3 flex justify-center items-center gap-3">
//         <img
//           src={comments[0].avatar}
//           alt=""
//           className="w-13 h-13 rounded-full mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Enter Your Note"
//           className="bg-gray-200 rounded-4xl w-[800px] h-[50px] px-2"
//         />
//         <button className="text-lg font-semibold  cursor-pointer bg-orange-400 text-white outline-gray-400 outline  rounded-3xl px-6 py-2 mx-3 ">
//           Save
//         </button>
//       </div>
//     </>
//   );
// }
