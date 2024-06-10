import { Link } from "react-router-dom";
import { Artist } from "../../@types/types";
import Card from "../Card";
import styles from "./Item.module.scss";

const ArtistItem = (request: Artist) => {

  const {
    id,
    name,
    birthDate,
    countryOfBirth,
    startYear,
    endYear,
    artistImageUrl
  } = request


  return (
    <Link to={`/artists/${id}/albums`} state={{name: name}}>
        <Card>
        <img src={artistImageUrl} alt="artist img" className={styles.img} />
        <h2><b>Name:</b> {name}</h2>
        <p><b>Birth date:</b> {birthDate}</p>
        <p><b>Country of birth:</b> {countryOfBirth}</p>
        <p><b>Years active:</b> {startYear} - {endYear}</p>
      </Card> 
    </Link>
  );
};

export default ArtistItem;
