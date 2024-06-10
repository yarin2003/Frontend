import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/auth-service";
import { Dialogs } from "../ui/dialogs";
import InputField from "../components/InputField";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterRequest>({ mode: "onChange" });

  const onSubmit = async (request: RegisterRequest) => {
    try {
      await Auth.register(request);
      await Dialogs.success("you have registered successfully");
      nav("/login");
    } catch (e) {
      Dialogs.error(e);
    }
  };

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center gap-3 w-1/1 mt-6 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-2xl p-4"
      >
        <InputField
          errors={errors}
          register={register}
          name="username"
          autoComplete="username"
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
          name="email"
          autoComplete="email"
          pattern={{
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Email must be valid",
          }}
          type="email"
        />
        <InputField
          errors={errors}
          register={register}
          name="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={32}
          pattern={{
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&]).{8,32}$/,
            message:
              "password must contain at least 1 lowercase letter,1 uppercase letter,1 digit and 1 special character",
          }}
          type="password"
        />
        <input
          className="font-light self-center w-28 rounded-2xl bg-slate-500 text-white p-1"
          type="submit"
          value="register"
        />
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Register;
