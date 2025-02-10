"use client";
import { UserDetailContex } from "@/app/_context/UserDetailContext";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useContext,useState } from "react";
import Image from "next/image";
function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [logoList, setLogoList] = useState([]); // Fixed useState declaration

  useEffect(() => {
    if (userDetail) {
      GetUserLogo();
    }
  }, [userDetail]);

  const GetUserLogo = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "users") // Ensure "logos" is the correct subcollection
    );
    const logos = [];
    querySnapshot.forEach((doc) => {
      logos.push(doc.data());
    });
    setLogoList(logos);
  };

  const ViewLogo = (image) => {
    const imageWindow=window.open();
    imageWindow.document.write(`<img src="${image}" alt="Base64 Image"/>`)
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-5">
        {logoList?.length > 0 ? (
          logoList.map((logo, index) => (
            <div key={index} className='hover:scale-105 transition-all cursor-pointer'
            onClick={()=>ViewLogo(logo.image)}>
              <Image src={logo?.image} width={400} height={200} className="w-full rounded-xl" alt={`Logo ${index}`} />
              <h2 className='text-center text-lg font-medium mt-2'>{logo?.title} </h2>
              <p className='text-sm text-gray-500 text-center'>{logo?.desc} </p>
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="bg-gray-200  rounded-xl animate-pulse h-[200px] w-full"></div> // Placeholder skeletons
          ))
        )}
      </div>
    </div>
  );
}

export default LogoList;