"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter ,useSearchParams} from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPrompt = () => {

   const router = useRouter();
   const {data : session } = useSession();

   //for query string
   const searchParams = useSearchParams();
   const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(()=>{
        const getPromptDetails = async () =>{
            const response  = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt : data.prompt,
                tag : data.tag,

            })
        }
        //prompt id then it will run 
        if(promptId){
            getPromptDetails();
        }

  },[promptId])

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found')


    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          tag: post.tag,
          prompt: post.prompt,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submiting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
