"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [userPosts, setUserPosts] = useState([]);

  const searchParams  = useSearchParams();
  
  const userName = searchParams.get('name');

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };
    if (session?.user.id) fetchPost();
  }, []);

 

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personilized profile page. Explore ${userName}'s Exceptonal Prompts and be
      inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default MyProfile;
