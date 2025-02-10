"use client";
import React, { useEffect, useContext, useState} from "react";
import { UserDetailContex } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";



function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const searchParams=useSearchParams();
  const modelType=searchParams.get('type');
  // console.log(userDetail);
  useEffect(() => {
    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.desc) {
      GenerateAILogo();
    }
  }, [formData]);
  useEffect(()=>{
    if(typeof window !=undefined &&logoImage)
    {
      localStorafe.clear();
    }
  },[logoImage])

  const GenerateAILogo = async () => {

    if(modelType!='Free'&&userDetail?.credits<=0)
    {
      console.log('not enough credits')
      toast('not enough credits!!!')
      return;
    }
     setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData.palette)
      .replace("{logoDesign}", formData?.Design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log(PROMPT);

    //Generate Logo Prompt from ai
    //generate logo image
    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      // title: formData?.title,
      desc: formData.desc,
      type:modelType,
      userCredits:userDetail?.credits
    });
    console.log(result?.data);
    setLogoImage(result?.data?.image);
    setLoading(false);
  };
  return (
    <div>
      <h2>{loading && "Loading..."}</h2>
      {!loading && (
        <Image src={logoImage|| "/placeholder.png"} alt="logo" width={200} height={200} />
      )}
    </div>
  );
}

export default GenerateLogo;
