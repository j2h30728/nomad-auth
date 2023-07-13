import { useRouter } from "next/router";
import { useEffect } from "react";
import { ResponseType } from "../server/withHandler";
import useQuery from "./useQuery";

interface ProfileResponse extends ResponseType {
  profile: {
    id: number;
    name: string;
    email: string;
  };
}

export default function useUser() {
  const router = useRouter();
  const { data, isLoading } = useQuery<ProfileResponse>("/api/users/profile");
  useEffect(() => {
    if (data && !data.isSuccess) router.replace("/log-in");
  }, [data, router]);

  return { data, isLoading };
}
