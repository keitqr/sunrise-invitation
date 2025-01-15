'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Χρησιμοποίησε την 'useRouter' από 'next/navigation'

const QuizPage = () => {
  const router = useRouter(); // Χρησιμοποιούμε το 'router' εδώ
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  // Οι γρίφοι
  const riddles = [
    {
      question: "Είμαι αυτό που εμφανίζεται κάθε μέρα, αλλά λίγοι ξυπνούν για να με δουν. Τι είμαι;",
      correctAnswer: "ανατολή",
    },
    {
      question: "Με βλέπεις να αγκαλιάζω τη στεριά, είμαι ατελείωτη και αντανακλώ τον ουρανό. Τι είμαι;",
      correctAnswer: "θάλασσα",
      backgroundSound: "/sounds/waves.mp3", // Ήχος για το δεύτερο γρίφο
    },
    {
      question: "Σε ποια παραλιακή περιοχή της Λάρνακας είναι το αγαπημένο σημείο της Κέιτ για περπάτημα;",
      correctAnswer: "Περβόλια",
    },
  ];

  useEffect(() => {
    // Αναπαραγωγή ήχου στο background για τον δεύτερο γρίφο
    let audio: HTMLAudioElement | null = null;

    if (riddles[questionIndex].backgroundSound) {
      audio = new Audio(riddles[questionIndex].backgroundSound);
      audio.loop = true;
      audio.volume = 0.5; // Προσαρμόσιμο επίπεδο έντασης
      audio.play();
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [questionIndex]);

  const checkAnswer = () => {
    // Αφαίρεση τόνων και σύγκριση πεζών/κεφαλαίων
    const normalizeString = (str: string) =>
      str
        .normalize('NFD') // Διαχωρίζει τα διακριτικά (τόνους) από τα γράμματα
        .replace(/[\u0300-\u036f]/g, '') // Αφαιρεί τους τόνους
        .toLowerCase(); // Μετατρέπει σε πεζά
  
    if (normalizeString(answer.trim()) === normalizeString(riddles[questionIndex].correctAnswer)) {
      const audio = new Audio('/sounds/success.mp3');
      audio.play();
      setError(false);
      if (questionIndex < riddles.length - 1) {
        setTimeout(() => {
          setQuestionIndex(questionIndex + 1);
          setAnswer('');
        }, 1000);
      } else {
        setTimeout(() => {
          router.push('/invitation'); // Τελευταία σελίδα μετά την ολοκλήρωση των γρίφων
        }, 1000);
      }
    } else {
      // Αν η απάντηση είναι λάθος, παίζει ο ήχος wrong.mp3
      const audio = new Audio('/sounds/wrong.mp3');
      audio.play();
      setError(true);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 p-6">
      {/* Κεντραρισμένο περιεχόμενο */}
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 bg-opacity-70 p-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Γρίφος {questionIndex + 1}</h1>
        <p className="text-lg text-gray-200 mb-8 text-center">{riddles[questionIndex].question}</p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-cyan-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <button
          onClick={checkAnswer}
          className="mt-4 px-12 py-2 bg-cyan-500 text-white rounded shadow-lg hover:bg-green-600 transform transition-all duration-300"
        >
          Υποβολή
        </button>
        {error && <p className="text-red-500 mt-4 text-center">Λάθος απάντηση, δοκίμασε ξανά!</p>}
        
        {/* Μετρητής προόδου */}
        <div className="mt-8 w-full text-center">
          <p className="text-sm text-gray-200">Πρόοδος: {questionIndex + 1}/{riddles.length} </p>
          <div className="w-full bg-gray-400 rounded-full h-2.5 mt-2">
            <div
              className="bg-teal-500 h-2.5 rounded-full"
              style={{ width: `${((questionIndex + 1) / riddles.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
