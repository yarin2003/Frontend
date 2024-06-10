import { useNavigate } from "react-router-dom";
import {
  Song as SongType,
  SongRequest,
} from "../../@types/types";
import { useForm } from "react-hook-form";
import { Song } from "../../services/songs-service";
import { Dialogs } from "../../ui/dialogs";
import InputField from "../InputField";

export type UpdateSongComponentProps = {
  id: number;
  req: SongType;
};

const UpdateSong = ({ id, req }: UpdateSongComponentProps) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SongRequest>({ mode: "onChange" });

  const onSubmit = async (request: SongRequest) => {
    if (await Dialogs.areUSure("Are you sure you want to update this song?")) {
      try {
        await Song.updateSong(id, request);
        await Dialogs.success("your song has just been added");
        nav(`/songs`);
      } catch (e) {
        Dialogs.error(e);
      }
    }
  };

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Update Song</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        <InputField
          errors={errors}
          register={register}
          defaultValue={req.songTitle}
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
          defaultValue={req.songReleased}
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
          defaultValue={req.genres}
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
          defaultValue={req.length}
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
          defaultValue={req.label}
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
          defaultValue={req.songWriters}
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
          defaultValue={req.producers}
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
          defaultValue={req.songImageUrl}
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
          value="update"
        />
      </form>
    </>
  );
};

export default UpdateSong;
