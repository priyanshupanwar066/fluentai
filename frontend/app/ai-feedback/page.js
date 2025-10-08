"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clipboard, RotateCw, ArrowRight, Mic, Volume2 } from "lucide-react";

export default function FeedbackPage() {
  // State management
  const [userSentence, setUserSentence] = useState("");
  const [feedback, setFeedback] = useState({ content: "", isAnswer: false });
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [activeTab, setActiveTab] = useState("correction");

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== "undefined" && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const setupRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserSentence(prev => prev + ' ' + transcript);
          setIsRecording(false);
        };

        recognition.onerror = (event) => {
          setSpeechError(`Speech recognition error: ${event.error}`);
          setIsRecording(false);
        };

        setRecognition(recognition);
      };

      try {
        setupRecognition();
      } catch (error) {
        setSpeechError("Speech recognition initialization failed");
      }
    } else {
      setSpeechError("Speech recognition not supported in this browser");
    }
  }, []);

  // Speech functions
  const toggleRecording = () => {
    if (!recognition) return;
    
    if (isRecording) {
      recognition.stop();
    } else {
      setUserSentence('');
      try {
        recognition.start();
      } catch (error) {
        setSpeechError("Microphone access denied");
      }
    }
    setIsRecording(!isRecording);
  };

  const speakFeedback = () => {
    if (!window.speechSynthesis) {
      setSpeechError("Text-to-speech not supported");
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(feedback.content);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.speak(utterance);
  };

  // Feedback handling
  const exampleSentences = [
    "I has been working here since five years.",
    "She don't like to going to the party yesterday.",
    "If I would have knew, I might have came earlier.",
    "The man which I saw him was wearing a hat.",
    "We must to finish this project until Friday."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userSentence }),
      });

      const data = await response.json();
      const result = {
        input: userSentence,
        output: parseFeedback(data.feedback),
        date: new Date().toLocaleString()
      };

      setHistory([result, ...history.slice(0, 4)]);
      setFeedback(result.output);
      
    } catch (error) {
      setFeedback({ content: "❌ Something went wrong. Please try again.", isAnswer: false });
    } finally {
      setLoading(false);
      if (isSpeaking) window.speechSynthesis.cancel();
    }
  };

  // Feedback parsing
  const parseFeedback = (text) => {
    const isAnswer = text.includes("## Answer") || text.startsWith("**Answer**");
    const sections = text.split(/(## \w+)/g).filter(Boolean);
    
    return {
      content: text,
      isAnswer,
      sections: sections.reduce((acc, section, index) => {
        if (section.match(/## \w+/)) {
          acc[section.replace("## ", "").toLowerCase()] = sections[index + 1];
        }
        return acc;
      }, {})
    };
  };

  // UI components
  const FeedbackTabs = () => (
    <div className="flex gap-2 mb-6">
      {Object.keys(feedback.sections).map((section) => (
        <button
          key={section}
          onClick={() => setActiveTab(section)}
          className={`px-4 py-2 rounded-lg ${
            activeTab === section 
              ? "bg-blue-500 text-white" 
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 animate-gradient-flow" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI English Tutor
          </h1>
          <p className="text-gray-200 text-lg">
            Speak or type your English queries for instant feedback
          </p>
        </motion.div>

        {/* Example Sentences */}
        <motion.div
          className="mb-8 overflow-x-auto pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex gap-4">
            {exampleSentences.map((sentence, index) => (
              <button
                key={index}
                onClick={() => setUserSentence(sentence)}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="text-gray-200 text-sm">{sentence}</span>
                <ArrowRight className="inline ml-2 w-4 h-4 text-blue-400" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="relative">
            <textarea
              rows="4"
              className="w-full p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Type or speak your English sentence/question..."
              value={userSentence}
              onChange={(e) => setUserSentence(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-2 rounded-full transition-colors ${
                  isRecording 
                    ? "animate-pulse bg-red-500 hover:bg-red-600" 
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={!recognition || speechError}
                title={speechError || "Voice input"}
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
              <span className="text-gray-400 text-sm">
                {userSentence.length}/500
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !userSentence.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RotateCw className="animate-spin w-5 h-5" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Get Feedback
              </>
            )}
          </button>
        </motion.form>

        {/* Feedback Display */}
        <AnimatePresence>
          {feedback.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {feedback.isAnswer ? "Expert Answer" : "Feedback Analysis"}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={speakFeedback}
                    className={`p-2 hover:bg-white/10 rounded-lg ${
                      isSpeaking ? "text-blue-400" : "text-gray-300"
                    }`}
                    title="Read feedback"
                    disabled={!feedback.content || isSpeaking}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(feedback.content)}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-300"
                    title="Copy feedback"
                  >
                    <Clipboard className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {!feedback.isAnswer && <FeedbackTabs />}

              <div className="prose prose-invert text-white max-w-none">
                {feedback.isAnswer ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {feedback.content}
                  </ReactMarkdown>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {feedback.sections[activeTab] || feedback.content}
                  </ReactMarkdown>
                )}
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-gray-400 mb-2">Previous Feedback</h3>
                  {history.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setFeedback(item.output)}
                      className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="text-sm text-gray-300">
                        {item.input.substring(0, 40)}...
                      </div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Messages */}
        {speechError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-red-500/20 rounded-lg text-red-300 text-sm"
          >
            ⚠️ {speechError}
          </motion.div>
        )}
      </div>
    </div>
  );
}