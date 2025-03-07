import React, { useState, forwardRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Save, Send, XCircle } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../utils/utils";
import { useParams } from "react-router-dom";
import { FetchData } from "../utils/FetchFromApi";
import { useSelector } from "react-redux";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] h-96 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export default function QuestionAnswerPage() {
  const sampleQuestions = [
    "What are the key differences between functional and class components in React?",
    "Explain the concept of state and props in React. How do they differ?",
    "What is the purpose of useEffect hook in React?",
    "Describe the concept of lifting state up in React.",
    "What are controlled components in React?",
  ];

  const user = useSelector((store) => store.user.user);
  console.log(user);
  const [questionPaperId, setQuestionPaperId] = useState();
  const [questions, setQuestions] = useState([]);
  const { testId } = useParams();
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [savedAnswers, setSavedAnswers] = useState(
    Array(questions.length).fill(false)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const fetchQuestions = async () => {
    try {
      const response = await FetchData(
        `test/get-question-paper/${testId}`,
        "get"
      );
      console.log(response);
      setQuestionPaperId(response.data.data._id);
      setQuestions(response.data.data.questions);
    } catch (error) {
      console.error("error", error);
    }
  };


  useEffect(() => {
    fetchQuestions();
  }, []);

  console.log(answers);

  const loadAnswer = (index) => {
    setCurrentAnswer(answers[index] || "");
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      loadAnswer(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      loadAnswer(currentQuestionIndex + 1);
    }
  };

  const handleSave = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);

    const newSavedAnswers = [...savedAnswers];
    newSavedAnswers[currentQuestionIndex] = true;
    setSavedAnswers(newSavedAnswers);
  };

  const handleSkip = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = "N/A";
    setAnswers(newAnswers);

    const newSavedAnswers = [...savedAnswers];
    newSavedAnswers[currentQuestionIndex] = true;
    setSavedAnswers(newSavedAnswers);

    setCurrentAnswer("N/A");
  };

  const handleSubmit = async () => {
    const allAnswered = savedAnswers.every(Boolean);
    if (!allAnswered) {
      setSubmissionError("Please answer all questions before submitting.");
      return;
    }
    // console.log("Submitting answers:", answers);
    setIsSubmitted(true);
    setSubmissionError("");

    try {
      const response = await FetchData(
        `test/submit-response/${user?.[0]?._id}`,
        "post",
        { answers, setId: questionPaperId, testId: testId }
      );
      console.log(response);
    } catch (error) {
      console.error("error", error);
      // alert("error.response.data");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h2 className="text-xl font-bold">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p className="mb-4">{questions[currentQuestionIndex]}</p>
      <Textarea
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={savedAnswers[currentQuestionIndex]}
      />
      <div className="mt-4 flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-[#6A46FF]"
        >
          <ChevronLeft /> Previous
        </Button>
        <Button
          onClick={handleSave}
          disabled={savedAnswers[currentQuestionIndex]}
          className="bg-[#6A46FF]  hover:bg-green-500 duration-300 ease-in-out hover:text-black"
        >
          <Save /> Save
        </Button>
        <Button
          onClick={handleSkip}
          disabled={savedAnswers[currentQuestionIndex]}
          className="bg-[#6A46FF]"
        >
          <XCircle /> Skip
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className="bg-[#6A46FF]"
        >
          Next <ChevronRight />
        </Button>
      </div>
      <Button
        onClick={handleSubmit}
        className="mt-4 w-full bg-[#6A46FF] hover:bg-red-500 duration-300 ease-in-out"
      >
        <Send /> Submit All Answers
      </Button>
      {isSubmitted && (
        <p className="text-green-600 mt-2">
          Your answers have been submitted successfully!
        </p>
      )}
      {submissionError && (
        <p className="text-red-600 mt-2">{submissionError}</p>
      )}
    </div>
  );
}
