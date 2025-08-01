export default function EmptyPage(props) {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div>
          <img
            src="https://cdn.whisk.com/web/web-app/production/assets/0442811cb405221fe4c7.svg"
            alt=""
          />
        </div>
        <div className="text-2xl font-semibold break-words">
          {props.message}
        </div>
        <button className=" bg-orange-400 text-white font-semibold rounded-3xl px-6 py-2 cursor-pointer">
          {props.button}
        </button>
      </div>
    </>
  );
}
