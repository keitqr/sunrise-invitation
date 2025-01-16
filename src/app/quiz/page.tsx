'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const router = useRouter(); // Χρησιμοποιείται για πλοήγηση μεταξύ σελίδων
  const [questionIndex, setQuestionIndex] = useState(0); // Χρησιμοποιείται για διαχείριση των ερωτήσεων
  const [answer, setAnswer] = useState(''); // Χρησιμοποιείται για αποθήκευση της απάντησης
  const [error, setError] = useState(false); // Διαχειρίζεται τα σφάλματα

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

  const handleNextQuestion = () => {
    if (answer.toLowerCase() === riddles[questionIndex].correctAnswer.toLowerCase()) {
      setError(false);
      if (questionIndex + 1 < riddles.length) {
        setQuestionIndex(questionIndex + 1);
        setAnswer('');
      } else {
        router.push('/success'); // Πλοήγηση στη σελίδα επιτυχίας
      }
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h1>{riddles[questionIndex].question}</h1>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Η απάντησή σου"
      />
      {error && <p style={{ color: 'red' }}>Λάθος απάντηση, προσπάθησε ξανά!</p>}
      <button onClick={handleNextQuestion}>Επόμενη ερώτηση</button>
    </div>
  );
};

export default QuizPage;
