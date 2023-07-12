import Link from "next/link";
import { useForm } from "react-hook-form";
import { AccountForm } from "../create-account";

type LoginForm = Pick<AccountForm, "email">;

export default function CreateAccount() {
  const { handleSubmit, register } = useForm<LoginForm>();
  const handleCreateAccount = (accountData: LoginForm) => {
    console.log(accountData);
  };

  return (
    <>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(handleCreateAccount)}>
        <div>
          <label>Email : </label>
          <input {...register("email", { required: true })} type="email" />
        </div>
        <button>Login</button>
        <Link href={"/log-in"}>Create Account</Link>
      </form>
    </>
  );
}
