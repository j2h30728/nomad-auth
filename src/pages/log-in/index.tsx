import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AccountForm } from "../create-account";
import useMutation from "@/libs/client/useMutation";
import { METHOD } from "@/constants";
import { ResponseType } from "@/libs/server/withHandler";

type LoginForm = Pick<AccountForm, "email">;

export default function CreateAccount() {
  const { handleSubmit, register } = useForm<LoginForm>();
  const [mutate, { data, isLoading }] =
    useMutation<ResponseType>("/api/users/log-in");
  const router = useRouter();

  const handleCreateAccount = (accountData: LoginForm) => {
    if (isLoading) return;
    mutate(accountData, METHOD.POST);
  };
  useEffect(() => {
    if (data) {
      if (data.isSuccess) {
        router.push("/");
      } else {
        alert(data?.message);
      }
    }
  }, [data, router]);
  return (
    <>
      <h1>Create Account</h1>
      {isLoading ? (
        <h2>로그인 중...</h2>
      ) : (
        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <div>
            <label>Email : </label>
            <input {...register("email", { required: true })} type="email" />
          </div>
          <button>Login</button>
          <Link href={"/log-in"}>Create Account</Link>
        </form>
      )}
    </>
  );
}
