export default function Button({ children }) {
  return (
    <>
      <button className="text-lg cursor-pointer text-black outline-2 outline-black rounded-3xl px-6 py-1 mx-3 hover:text-orange-400">
        {children}
      </button>
    </>
  );
}
