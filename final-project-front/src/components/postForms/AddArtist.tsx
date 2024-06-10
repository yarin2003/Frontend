import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../services/artists-service";
import { Dialogs } from "../../ui/dialogs";
import InputField from "../InputField";
import { ArtistRequest } from "../../@types/types";

const AddArtist = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArtistRequest>({ mode: "onChange" });

  const onSubmit = async (request: ArtistRequest) => {
    try {
      await Artist.postArtist(request);
      await Dialogs.success("your artist has just been added");
      nav("/artists");
    } catch (e) {
      console.error('Error:', e);
      Dialogs.error(e);
    }
  };

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Add Artist</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        <InputField
          errors={errors}
          register={register}
          name="name"
          autoComplete="name"
          minLength={2}
          maxLength={30}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="birthDate"
          autoComplete="birthDate"
          minLength={4}
          maxLength={10}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="countryOfBirth"
          autoComplete="countryOfBirth"
          minLength={2}
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
          name="startYear"
          autoComplete="startYear"
          minLength={4}
          maxLength={4}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="endYear"
          autoComplete="endYear"
          minLength={4}
          maxLength={7}
          pattern={{
            value: /.*/,
            message: "",
          }}
          type="text"
        />
        <InputField
          errors={errors}
          register={register}
          name="artistImageUrl"
          autoComplete="artistImageUrl"
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

export default AddArtist;
