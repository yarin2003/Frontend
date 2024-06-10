import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dialogs } from "../../ui/dialogs";
import InputField from "../InputField";
import { Album } from "../../services/albums-service";
import { Artist as ArtistType, FullAlbumRequest } from "../../@types/types";
import { useEffect, useState } from "react";
import { Artist } from "../../services/artists-service";
import Select from "react-select";
import styles from "./Form.module.scss"

const AddAlbum = () => {
  const [artists, setArtists] = useState<ArtistType[]>([]);

  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FullAlbumRequest>({ mode: "onChange" });

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await Artist.getArtistsNoLimit();
        setArtists(res.artists);
      } catch (e) {
        console.error("Error fetching artists:", e);
      }
    };

    fetchArtists();
  }, []);

  const onSubmit = async (request: FullAlbumRequest) => {
    try {
      await Album.postAlbum(request);
      await Dialogs.success("your album has just been added!");
      nav(`/albums`);
    } catch (e) {
      Dialogs.error(e);
    }
  };

  const handleArtistSelect = (selectOption) => {
    setValue("artistId", selectOption ? selectOption.value : "");
  };

  const artistOptions = artists.map((artist) => ({
    value: artist.id,
    label: artist.name,
  }));

  

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Add Album</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        <Select
          className={styles.select}
          {...register("artistId", { required: true })}
          options={artistOptions}
          onChange={handleArtistSelect}
          placeholder="Select an artist..."
          name="atist"
          id="artist"
        />
        {errors.artistId && (
          <span className="text-red-600 flex start-0 w-7/12 pl-1">
            artist is required
          </span>
        )}
        <InputField
          errors={errors}
          register={register}
          name="albumTitle"
          autoComplete="albumTitle"
          minLength={2}
          maxLength={40}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="albumReleased"
          autoComplete="albumReleased"
          minLength={4}
          maxLength={20}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="length"
          autoComplete="length"
          minLength={5}
          maxLength={5}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="albumImageUrl"
          autoComplete="albumImageUrl"
          minLength={10}
          maxLength={500}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <input
          className="font-light self-center w-28 rounded-2xl bg-slate-500 text-white p-1 hover:bg-green-500"
          type="submit"
          value="Add"
        />
      </form>
    </>
  );
};

export default AddAlbum;
