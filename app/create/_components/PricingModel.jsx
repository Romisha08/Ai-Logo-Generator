"use client";
import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SignIn, SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

function PricingModel({ formData }) {

const {user}=useUser();

  useEffect(() => {
    if (formData && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div>
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {Lookup?.pricingOption?.map((pricing, index) => (
          <div key={index} className="flex flex-col items-center p-5 border-2 rounded-xl">
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
              unoptimized // If it's an external URL
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature, featureIndex) => (
                <h2 className="text-lg mt-3" key={featureIndex}>{feature}</h2>
              ))}
            </div>
            {user? 
            <Link href={'/generate-logo?type='+pricing.title}>
  <Button className="mt-5">{pricing.button}</Button>
              </Link>
 : <SignInButton mode="modal" forceRedirectUrl={"/generate-logo?type="+pricing.title}>
    <Button className="mt-5">{pricing.button}</Button>
  </SignInButton>
}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
