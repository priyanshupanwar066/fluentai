import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Improved question detection patterns
const questionPatterns = [
  /^what/i,
  /^how/i,
  /^why/i,
  /^when/i,
  /^where/i,
  /^who/i,
  /^is\s+/i,
  /^are\s+/i,
  /^do\s+/i,
  /^does\s+/i,
  /^did\s+/i,
  /^can\s+/i,
  /^could\s+/i,
  /^would\s+/i,
  /^will\s+/i,
  /^shall\s+/i,
  /^may\s+/i,
  /^might\s+/i,
  /^should\s+/i,
  /^has\s+/i,
  /^have\s+/i,
  /^had\s+/i,
  /^am\s+/i,
  /^isn't\s+/i,
  /^aren't\s+/i,
  /^don't\s+/i,
  /^doesn't\s+/i,
  /^didn't\s+/i,
  /^can't\s+/i,
  /^couldn't\s+/i,
  /^wouldn't\s+/i,
  /^won't\s+/i,
  /^shan't\s+/i,
  /^mightn't\s+/i,
  /^shouldn't\s+/i,
  /^doesn't\s+have\s+/i,
  /^doesn't\s+have\s+/i,
  /^doesn't\s+have\s+/i,

  /\?$/,
];

export const getFeedback = async (req, res) => {
  const { userSentence } = req.body;

  if (!userSentence?.trim()) {
    return res.status(400).json({ error: "Please provide a sentence 🙏" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const trimmedInput = userSentence.trim();

    // Improved question detection
    const isQuestion = questionPatterns.some(pattern => 
      pattern.test(trimmedInput)
    );

    const tutorRole = "You are a friendly English tutor. Your responses should be:"
      + "\n- Clear and simple"
      + "\n- Use examples when explaining concepts"
      + "\n- Supportive and encouraging"
      + "\n- Structure your answers for easy reading";

    const prompt = isQuestion
      ? `
        ${tutorRole}
        Student's question: "${trimmedInput}"
        
        Please:
        1. Answer the question directly
        2. Provide 1-2 examples
        3. Explain any relevant grammar rules
        4. Keep it under 150 words
      `
      : `
        ${tutorRole}
        Student's statement: "${trimmedInput}"
        
        Please provide:
        1. Grammar corrections (highlight changes)
        2. Fluency improvements
        3. A natural-sounding rewritten version
        4. Brief explanation of key improvements
      
      `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ feedback: text });
  } catch (err) {
    console.error("API Error:", err);
    const errorMessage = err.message.includes("API_KEY")
      ? "Invalid API configuration"
      : "Error processing your request";
      
    res.status(500).json({ 
      error: "Failed to get feedback ❌",
      message: errorMessage,
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};