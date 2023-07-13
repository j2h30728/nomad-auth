import { ResponseType } from "@/libs/server/withHandler";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<ResponseType>();
  useEffect(() => {
    (async () => {
      const response = await (await fetch("/api/users/profile")).json();
      setUser(response);
    })();
  }, []);

  if (!user) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  }

  return (
    <>
      <main>
        <h1>Welcome {user?.profile.name}!</h1>
        <h3>Your email is: {user?.profile.email}</h3>
      </main>
    </>
  );
}
