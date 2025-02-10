"use client"
import React, { useState,useEffect } from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoDesc from './_components/LogoDesc'
import LogoPalette from './_components/LogoPalette'
import LogoIdea from './_components/LogoIdea'
import LogoDesigns from './_components/LogoDesigns'
import PricingModel from './_components/PricingModel'

function CreateLogo() {
  const [step,setStep]=useState(1);
  const [formData,setFormData]=useState({
    title: '',
    desc: '',
    palette: '',
    design: { title: '', prompt: '' }, // Ensure design object exists
    idea: ''
  });
  const onHandleInputChange=(field,value)=>{

    setFormData(prev=>({
      ...prev,
      [field]:value
    }))
    // useEffect(() => {
    //   console.log("Updated formData:", formData);
    //   localStorage.setItem("formData", JSON.stringify(formData)); // Store in local storage
    // }, [formData]);
      // console.log(formData)
      console.log("Clerk API:", process.env.NEXT_PUBLIC_CLERK_FRONTEND_API);
console.log("Firebase API:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("Gemini API (Should be undefined in browser):", process.env.GEMINI_API_KEY);


  }
  return (
    <div className='mt-28 p-10 border rounded-xl 2xl:mx-82'>
      {step==1?
         <LogoTitle onHandleInputChange={(v)=>onHandleInputChange('title',v)}
         formData={formData}
          /> :  
         step==2?
         <LogoDesc onHandleInputChange={(v)=>onHandleInputChange('desc',v)} 
         formData={formData} 
        />:
         step==3?
         <LogoPalette onHandleInputChange={(v)=>onHandleInputChange('palette',v)}
         formData={formData}
          />:
         step==4?
         <LogoDesigns onHandleInputChange={(v)=>onHandleInputChange('design',v)} 
         formData={formData}
          />:
         step==5?
         <LogoIdea onHandleInputChange={(v)=>onHandleInputChange('idea',v)} 
         formData={formData}
         />:
         step==6?
         <PricingModel   onHandleInputChange={(v)=>onHandleInputChange('pricing',v)} 
         formData={formData}
         />:

         
         null
    }
   

      <div className='flex items-centre justify-between mt-10'>
      {step!=1 &&  <Button variant="outline" onClick={()=>setStep(step-1)} ><ArrowLeft/>Previous</Button>}
        <Button onClick={()=>setStep(step+1)} ><ArrowRight/> Continue</Button>
      </div>
    </div>
  )
}

export default CreateLogo