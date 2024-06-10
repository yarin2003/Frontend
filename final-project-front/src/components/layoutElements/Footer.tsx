import { IoLogoGithub, IoMusicalNotesOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white p-2 flex flex-row justify-between">
      <div className="flex justify-center items-center">
        <a
          className="flex gap-2 text-black hover:underline hover:text-blue-700 dark:text-white dark:hover:text-blue-700"
          href="https://github.com/yarin2003/Final_Android"
          target="blank"
        >
         <IoLogoGithub size={25}/>
          My Github
        </a>
      </div>

      <div>
        <IoMusicalNotesOutline size={30} />
      </div>
    </footer>
  );
};

export default Footer;
