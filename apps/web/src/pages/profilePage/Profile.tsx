import EmptyPage from "@repo/ui/components/EmptyPage";

export default function Profile() {
  return (
    <>
      <div className="mx-30 p-10 my-10">
        {/* first section  */}
        <div className="flex justify-between items-center py-2 mb-10">
          <div className="flex gap-2 justify-center items-center">
            <div>
              <img
                src="https://i.pravatar.cc/150?u=F"
                alt=""
                className="w-30 h-30 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold p-2">Zassicca</h1>
              <div className="flex gap-4 items-center justify-center p-2 text-lg">
                <div className="font-semibold text-orange-400 text-xl">
                  0 <span className=" text-gray-400 text-lg">Following</span>
                </div>
                <div className="font-semibold text-orange-400 text-xl">
                  0 <span className=" text-gray-400 text-lg ">Followers</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button className="outline-1 outline-gray-400 px-4 py-2 rounded-3xl text-md hover:bg-orange-400 hover:text-white font-semibold cursor-pointer ">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="border-gray-300 border-t-2 py-5"></div>
        {/* second div  */}
        <div>
          <EmptyPage
            message="Keep track of recipes you made and share your food experience"
            button="Add Recipe"
          />
        </div>
      </div>
    </>
  );
}
