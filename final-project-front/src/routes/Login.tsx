import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { Auth } from "../services/auth-service";
import { Dialogs } from "../ui/dialogs";
import InputField from "../components/InputField";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export type LoginRequest = {
  username: string;
  password: string;
};

const Login = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest>({ mode: "onChange" });

  const onSubmit = async (request: LoginRequest) => {
    try {
      const res = await Auth.login(request);
      await Dialogs.success("you have logged in successfully");
      login(res.jwt);
      nav("/");
    } catch (e) {
      Dialogs.error(e);
    }
  };

  return (
    <>
      <h1 className="text-center font-light text-3xl my-2">Login</h1>
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
          value="login"
        />
      </form>
    </>
  );
};

export default Login;
