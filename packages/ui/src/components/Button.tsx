export default function Button({ children }) {
  return (
    <>
      <button className="text-lg cursor-pointer text-white font-semibold rounded-3xl px-5 py-2 mx-5 bg-orange-400 ">
        {children}
      </button>
    </>
  );
}
