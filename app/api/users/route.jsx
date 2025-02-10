import { db } from "@/configs/FirebaseConfig";
import { doc ,getDoc,setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userEmail, userName } = await req.json();

  try {
    //If user already exits
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      //Insert new user
      const data = {
        userName: userName,
        email: userEmail,
        credits: 5,
      };

    //   await setDoc(db, "users", userEmail, {
    //     ...data,
    //   });

    const userRef = doc(db, "users", userEmail);
    await setDoc(userRef, data);

      return NextResponse.json(data);
    }
  } catch (e) {
    
  }
}
// import { db } from "@/configs/FirebaseConfig";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     console.log("🔥 Received request at /api/users");

//     const body = await req.json();
//     console.log("📩 Request body:", body);

//     const { userEmail, userName } = body;
//     if (!userEmail || !userName) {
//       console.log("❌ Missing fields");
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const userRef = doc(db, "users", userEmail);
//     const docSnap = await getDoc(userRef);

//     if (docSnap.exists()) {
//       console.log("✅ User exists:", docSnap.data());
//       return NextResponse.json(docSnap.data(), { status: 200 });
//     } else {
//       console.log("➕ Creating new user:", { userName, email: userEmail, credits: 5 });
//       await setDoc(userRef, { userName, email: userEmail, credits: 5 });
//       console.log("✔ User created successfully");
//       return NextResponse.json({ userName, email: userEmail, credits: 5 }, { status: 201 });
//     }
//   } catch (error) {
//     console.error("❗ ERROR in /api/users:", error); // Log the error
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
