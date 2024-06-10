import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Artist as ArtistType, ArtistRequest } from "../../@types/types";
import { Dialogs } from "../../ui/dialogs";
import InputField from "../InputField";
import { Artist } from "../../services/artists-service";

export type UpdateArtistComponentProps = {
    id: number;
    req: ArtistType;
}

const UpdateArtist = ({id, req}: UpdateArtistComponentProps) => {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ArtistRequest>({ mode: "onChange" });
    
      const onSubmit = async (request: ArtistRequest) => {
        if(await Dialogs.areUSure("Are you sure you want to update this artist?")){
            try {
                await Artist.updateArtist(id, request)
                await Dialogs.success("your artist has been updated successfully!");
                nav("/artists");
            } catch (e) {
                Dialogs.error(e);
            }
        }
      };

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Update Artist</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        <InputField
          errors={errors}
          register={register}
          defaultValue={req.name} 
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
          defaultValue={req.birthDate}
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
          defaultValue={req.countryOfBirth}
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
          defaultValue={req.startYear}
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
          defaultValue={req.endYear}
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
          defaultValue={req.artistImageUrl}
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
          value="update"
        />
      </form>
    </>
  )
}

export default UpdateArtist