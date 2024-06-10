import { BarLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <BarLoader
        color="#334155"
        height={2}
        speedMultiplier={1}
        width={300}
      />
      <p className="text-slate-700">Loading...</p>
    </div>
  );
};

export default Spinner;
