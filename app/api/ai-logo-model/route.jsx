import { NextResponse } from "next/server";
import { AILogoPrompt } from "@/configs/AiModel";
import axios from "axios";
import { setDoc } from "firebase/firestore";
import Replicate from "replicate";

export async function POST(req){

  const {prompt,email,desc,type,userCredits}=await req.json();
let base64ImageWithMime='';
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
  try {
    //generate ai text prompt for logo
const AiPromptResult=await AILogoPrompt.sendMessage(prompt);
console.log(JSON.parse(AiPromptResult.response.text()).prompt)
const AIPrompt=JSON.parse(AiPromptResult.response.text()).prompt;

//Generate logo
if(type=='Free'){
const response=await axios.post('https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
  AIPrompt,
  {
  headers: {
    Authorization: "Bearer"+process.env.HUGGING_FACE_API_KEY,
    "Content-Type": "application/json",
  },
  responseType:"arraybuffer"
  
  }
)
const buffer=Buffer.from(response.data,"binary");
const base64Image=buffer.toString("base64")

base64ImageWithMime=`data:image/png;base64,${base64Image}`
} else{
  //Replicate api endpoint
  const output = await replicate.run(
    "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
    {
      input: {
        prompt:AIPrompt,
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "png",
        guidance_scale: 3.5,
        output_quality: 80,
        num_inference_steps: 8
      }
    }
  );
  console.log(output);
  base64ImageWithMime=await ConvertImageToBase64(output);

  const docRef=doc(db,'users',email)
  await updateDoc(docRef,{
    credits:Number(userCredits-1)
  })
}
//Convert to Base 64 image

console.log( base64ImageWithMime);

//save to firebase Database
try {
  await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
    image:base64ImageWithMime,
    // title:title,
    desc:desc
  })
} catch (e) {
  
}

return NextResponse.json({image:base64ImageWithMime})
    //ai logo image modal
  } catch (e) {
    return NextResponse.json({error:e})
  }
}

async function ConvertImageToBase64(image){
  const resp=await axios.get(image,{responseType:'arraybuffer'})
  const base64ImageRaw=Buffer.from(resp.data).toString('base64');
  return `data:image/png;base64,${base64ImageRaw}`
}
