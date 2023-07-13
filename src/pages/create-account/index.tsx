import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { METHOD } from "@/constants";
import useMutation from "@/libs/client/useMutation";
import { ResponseType } from "@/libs/server/withHandler";

export interface AccountForm {
  name: string;
  email: string;
}

export default function CreateAccount() {
  const { handleSubmit, register } = useForm<AccountForm>();
  const router = useRouter();

  const [mutate, { data, isLoading, error }] = useMutation<ResponseType>(
    "/api/users/create-account"
  );

  const handleCreateAccount = async (accountData: AccountForm) => {
    mutate(accountData, METHOD.POST);
  };
  useEffect(() => {
    if (data) {
      if (data.isSuccess) {
        router.push("/log-in");
      } else {
        alert(data?.message);
      }
    }
  }, [data, router]);
  return (
    <>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(handleCreateAccount)}>
        <div>
          <label>Name : </label>
          <input {...register("name", { required: true })} type="text" />
        </div>
        <div>
          <label>Email : </label>
          <input {...register("email", { required: true })} type="email" />
        </div>
        <button>Create Account</button>
        <Link href={"/log-in"}>Login</Link>
      </form>
    </>
  );
}
