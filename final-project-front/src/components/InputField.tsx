import React from "react";

import { 
    FieldErrors, 
    FieldValues,
    Path,
    UseFormRegister,
    ValidationRule
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    name: Path<T>;
    pattern: ValidationRule<RegExp> | undefined;
}&Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">, "pattern">;

const InputField = <T extends FieldValues> ({
    errors, 
    register, 
    name, 
    pattern, 
    ...rest
}: InputFieldProps<T>) => {  
    const errorMessage = (errors[name]?.message ?? "") as string;
    const MAX = Number.MAX_SAFE_INTEGER;
    return (
        <div className="w-3/5 p-2">
            <input 
                className="font-light rounded-3xl p-1 w-full border-2 border-slate-500"
                placeholder={`${name}`}
                {...rest}
                {...register(name, {
                    required: `${name} is required`,
                    minLength: {
                        value:rest.minLength ?? 2,
                        message: `min length is ${rest.minLength ?? 2}`
                    },
                    maxLength: {
                        value: rest.maxLength ?? MAX,
                        message: `max length is ${rest.maxLength ?? MAX}`
                    },
                    pattern: pattern ?? null 
                })}      
                type={rest.type ?? "text"}
                autoComplete={rest.autoComplete ?? "username"}
            />
            {errors[name] && <p className="text-red-600">{errorMessage}</p>}
        </div>
    )
}

export default InputField