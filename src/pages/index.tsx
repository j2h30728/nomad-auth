import useUser from "@/libs/client/useUser";

export default function Home() {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  }
  return (
    <>
      <main>
        <h1>Welcome {data?.profile?.name}!</h1>
        <h3>Your email is: {data?.profile?.email}</h3>
      </main>
    </>
  );
}
