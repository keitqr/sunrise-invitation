'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const riddles = useMemo(() => [
    {
      question: "Είμαι αυτό που εμφανίζεται κάθε μέρα, αλλά λίγοι ξυπνούν για να με δουν. Τι είμαι;",
      correctAnswer: "ανατολή",
    },
    {
      question: "Με βλέπεις να αγκαλιάζω τη στεριά, είμαι ατελείωτη και αντανακλώ τον ουρανό. Τι είμαι;",
      correctAnswer: "θάλασσα",
      backgroundSound: "/sounds/waves.mp3",
    },
    {
      question: "Σε ποια παραλιακή περιοχή της Λάρνακας είναι το αγαπημένο σημείο της Κέιτ για περπάτημα;",
      correctAnswer: "Περβόλια",
    },
  ], []);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    if (riddles[questionIndex].backgroundSound) {
      audio = new Audio(riddles[questionIndex].backgroundSound);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [questionIndex, riddles]);

  // Υπόλοιπος κώδικας...
};

export default QuizPage;
