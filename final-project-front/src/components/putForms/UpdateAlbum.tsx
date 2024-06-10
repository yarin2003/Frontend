import { useNavigate } from "react-router-dom";
import { Album } from "../../services/albums-service";
import { Dialogs } from "../../ui/dialogs";
import { useForm } from "react-hook-form";
import { Album as AlbumType, AlbumRequest } from "../../@types/types";
import InputField from "../InputField";

export type UpdateAlbumComponentProps = {
  id: number;
  req: AlbumType;
}

const UpdateAlbum = ({id, req}: UpdateAlbumComponentProps) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlbumRequest>({ mode: "onChange" });

  const onSubmit = async (request: AlbumRequest) => {
    if (await Dialogs.areUSure("Are you sure you want to update this album?")) {
      try {
        await Album.updateAlbum(id, request);
        await Dialogs.success("your album has been updated!");
        nav(`/albums`);
      } catch (e) {
        Dialogs.error(e);
      }
    }
  };

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Update Album</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        <InputField
          errors={errors}
          register={register}
          defaultValue={req.albumTitle}
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
          defaultValue={req.albumReleased}
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
          defaultValue={req.length}
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
          defaultValue={req.albumImageUrl}
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
          value="update"
        />
      </form>
    </>
  )
};

export default UpdateAlbum;
