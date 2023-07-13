import Link from "next/link";
import { useForm } from "react-hook-form";

export interface AccountForm {
  name: string;
  email: string;
}

export default function CreateAccount() {
  const { handleSubmit, register } = useForm<AccountForm>();
  const handleCreateAccount = (accountData: AccountForm) => {
    console.log(accountData);
  };

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
