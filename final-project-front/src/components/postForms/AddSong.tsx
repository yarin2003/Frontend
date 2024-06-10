import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dialogs } from "../../ui/dialogs";
import { Song } from "../../services/songs-service";
import InputField from "../InputField";
import { Album as AlbumType, FullSongRequest } from "../../@types/types";
import { useEffect, useState } from "react";
import { Album } from "../../services/albums-service";
import Select from "react-select";
import styles from "./Form.module.scss"

const AddSong = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FullSongRequest>({ mode: "onChange" });

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await Album.getAllAlbumsNoLimit();
        setAlbums(res.albums);
      } catch (e) {
        console.error("Error fetching artists:", e);
      }
    };

    fetchAlbums();
  }, []);

  const onSubmit = async (request: FullSongRequest) => {
    try {
      await Song.postSong(request);
      await Dialogs.success("your song has just been added");
      nav(`/songs`);
    } catch (e) {
      Dialogs.error(e);
    }
  };

  const handleAlbumSelect = (selectOption) => {
    setValue("albumId", selectOption ? selectOption.value : "");
  };

  const albumOptions = albums.map((album) => ({
    value: album.id,
    label: album.albumTitle,
  }));

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Add Song</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        {/* react-select */}
        <Select
          className={styles.select}
          {...register("albumId", { required: true })}
          options={albumOptions}
          onChange={handleAlbumSelect}
          placeholder="Select an album..."
          name="album"
          id="album"
        />
        {errors.albumId && (
          <span className="text-red-600 flex start-0 w-7/12 pl-1">
            album is required 
          </span>
        )}
        <InputField
          errors={errors}
          register={register}
          name="songTitle"
          autoComplete="songTitle"
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
          name="songReleased"
          autoComplete="songReleased"
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
          name="genres"
          autoComplete="genres"
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
          name="length"
          autoComplete="length"
          minLength={4}
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
          name="label"
          autoComplete="label"
          minLength={2}
          maxLength={60}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="songWriters"
          autoComplete="songWriters"
          minLength={2}
          maxLength={150}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="producers"
          autoComplete="producers"
          minLength={2}
          maxLength={150}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="songImageUrl"
          autoComplete="songImageUrl"
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

export default AddSong;
function setValue(arg0: string, arg1: any) {
  throw new Error("Function not implemented.");
}
