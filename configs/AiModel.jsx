const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice  with decription: Indian Restaurant and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am currently unable to generate images, as that capability is only enabled for early testers. However, I can provide you with text prompts in JSON format for creating the logo.\n\n```json\n{\n  \"ideas\": [\n    \"Spice Mascot Chef\",\n    \"Smiling Elephant Cook\",\n    \"Friendly Curry Character\",\n    \"Playful Chili Pepper\",\n    \"Animated Saffron Man\"\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
   export const AILogoPrompt= model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : ,with description: indian restaurant, with Color combination of Ocean Blues, also include the {logoIdea} and include undefined design idea and Referring to this Logo Prompt:Create a minimalist and modern logo design that is clean, simple, and visually appealing. The logo should be easy to recognize and remember, and it should be versatile enough to be used in a variety of contexts. Use a combination of typography and simple geometric shapes to create a visually striking and memorable design. The logo should be timeless and elegant, and it should convey a sense of professionalism and sophistication.  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a minimalist and modern logo design that is clean, simple, and visually appealing for an Indian restaurant. The logo should be easy to recognize and remember, and it should be versatile enough to be used in a variety of contexts. The color combination should be primarily Ocean Blues (various shades acceptable). Use a combination of typography and simple geometric shapes inspired by {logoIdea} to create a visually striking and memorable design. Consider undefined design ideas that might incorporate subtle Indian motifs without being overly literal. The logo should be timeless and elegant, and it should convey a sense of professionalism and sophistication.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  