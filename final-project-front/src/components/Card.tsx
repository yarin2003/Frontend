import { FC } from "../@types/types";

const Card: FC = (props) => {
  return (
    <div
      className="flex flex-col w-fit max-w-60 border p-2 shadow-2xl rounded-lg m-2
      border-slate-200 text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800"
    >
      {props.children}
    </div>
  );
};

export default Card;
