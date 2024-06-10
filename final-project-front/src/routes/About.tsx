import { useNavigate } from "react-router-dom";
import styles from "./page.module.scss";

const About = () => {
  const nav = useNavigate();

  return (
    <div className={styles.about}>
      <h1 className={styles.h1About}>MUSIC API</h1>
      <h2 className={styles.h2}>~ Music Is Art ~</h2>
      <p className={styles.p}>
        Every music lover knows that music is more than just a nice beat <br />
        Music is our way to express ourselves in a way that simple words can't <br />
        Every song is the story hidden in its lyrics <br />
        Every song is the people behid it <br />
        <br />
        Music API is a collection of artists, albums and songs <br />
        You will be able to get information about each of them <br />
        By expolring them, you can reach a deeper connection to the music you hear <br />
        {/* After all, knowing where things come from helps us understand them better <br /> */}
        And most importantly, you will know where the magic began <br />
        <br />
        Have a fruitful exploration!
      </p>
      <button onClick={() => nav("/artists")} className={styles.button}>
        start exploring artists
      </button>
    </div>
    
  );
};

export default About;
