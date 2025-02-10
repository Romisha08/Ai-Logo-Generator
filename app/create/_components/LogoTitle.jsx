"use client"
import Lookup from '@/app/_data/Lookup'
import HeadingDescription from '@/app/create/_components/HeadingDescription'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'


function LogoTitle({onHandleInputChange}) {
  
        const searchParam=useSearchParams();
        const [title,setTitle]=useState(searchParam?.get('title')??'')
    return (
    <div className='my-10'>
        <HeadingDescription 
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
        />

        <input type='text' placeholder={Lookup.InputTitlePlaceholder} 
        className='p-4 border rounded-lg mt-5 w-full'
        value={title}
       
        // onChange={(e) => {
        //   setTitle(e.target.value); // Update the local state
        //   onHandleInputChange(e.target.value); // Update the parent state
        // }}
        
        onChange={(e)=>{
          setTitle(e.target.value);
          onHandleInputChange(e.target.value)}}
       />
    </div>
  )
}

export default LogoTitle



// "use client";
// import Lookup from "@/app/_data/Lookup";
// import HeadingDescription from "@/app/create/_components/HeadingDescription";
// import React, { useState, useEffect } from "react";

// function LogoTitle({ onHandleInputChange, formData }) {
//   const [title, setTitle] = useState(formData?.title || ""); // Sync with formData

//   useEffect(() => {
//     setTitle(formData?.title || ""); // Update local state when formData changes
//   }, [formData]);

//   return (
//     <div className="my-10">
//       <HeadingDescription
//         title={Lookup.LogoTitle}
//         description={Lookup.LogoTitleDesc}
//       />

//       <input
//         type="text"
//         placeholder={Lookup.InputTitlePlaceholder}
//         className="p-4 border rounded-lg mt-5 w-full"
//         value={title} // Controlled input
//         onChange={(e) => {
//           setTitle(e.target.value); // Update local state
//           onHandleInputChange("title", e.target.value); // Update parent state
//         }}
//       />
//     </div>
//   );
// }

// export default LogoTitle;

