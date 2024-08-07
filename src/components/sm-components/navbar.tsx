"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { UserProfile } from "@/types/types";
import { Button } from "../ui/button";
import Avatar from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Youtube } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetch('/api/get-profile');
      const response = await profile.json();
      setProfile(response);
    };
    fetchProfile();
  }, []);

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    router.push('/signin');
  }

  if (!profile) {
    return <Loading />;
  }

  return (
    <div >
      <div className="navbar border-b-2 border-red-300 fixed bg-black" >
        <div className="navbar-start flex items-center">
          <Link href={'/youtube'} className="flex ">
            <Youtube  className=" cursor-pointer " color="red"  size={30} />
            <span className="ml-2 cursor-pointer ">My Youtube <h2 className=" inline-block font-semibold" >(beta)</h2></span>
          </Link>
          
        </div>
        <div className="navbar-center">
          <h1 className="font-semibold text-lg">Welcome {profile.name}</h1>
        </div>
        <div className="navbar-end">
          <Avatar image={profile.image} name={profile.name} email={profile.email} />
        </div>
      </div>
    </div>
  );
}
