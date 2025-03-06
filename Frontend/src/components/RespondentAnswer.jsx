import React, { useState, forwardRef } from "react";
import { ChevronLeft, ChevronRight, Save, Send, XCircle } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../utils/utils";

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
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

  const [questions] = useState(sampleQuestions);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [savedAnswers, setSavedAnswers] = useState(
    Array(questions.length).fill(false)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

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

  const handleSubmit = () => {
    const allAnswered = savedAnswers.every(Boolean);
    if (!allAnswered) {
      setSubmissionError("Please answer all questions before submitting.");
      return;
    }
    console.log("Submitting answers:", answers);
    setIsSubmitted(true);
    setSubmissionError("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          <ChevronLeft /> Previous
        </Button>
        <Button
          onClick={handleSave}
          disabled={savedAnswers[currentQuestionIndex]}
        >
          <Save /> Save
        </Button>
        <Button
          onClick={handleSkip}
          disabled={savedAnswers[currentQuestionIndex]}
        >
          <XCircle /> Skip
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next <ChevronRight />
        </Button>
      </div>
      <Button onClick={handleSubmit} className="mt-4 w-full">
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
