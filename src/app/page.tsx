// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'; // Εισαγωγή του Head component
import Image from 'next/image'; // Εισαγωγή του Image component

const Home = () => {
  const router = useRouter();

  const startQuiz = () => {
    router.push('/quiz'); // Προχωρά στην σελίδα του κουίζ
  };

  return (
    <>
      <Head>
        {/* Εδώ μπορείς να προσθέσεις τα στοιχεία του head */}
        <title>Η Πρόσκληση για Ανατολή</title>
        <meta name="description" content="Πρόσκληση για να δεις την ανατολή του ηλίου μαζί!" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 p-6 relative">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-14">Καλως όρισες δεινόσαυρε TΥΧΑΙΑ στο παιχνίδι αυτό.</h1>
          <p className="text-xl mb-20 text-white mb-16">Ξεκίνησε την περιπέτειά σου λύνοντας τους γρίφους και θα φτάσεις σε μία σπέσιαλ πρόσκληση!</p>
          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-cyan-500 text-white rounded shadow-lg hover:bg-green-600 transform transition-all duration-300"
          >
            Ξεκίνα το παιχνίδι
          </button>
        </div>

        {/* Εικόνα Δεινοσαύρου κάτω δεξιά με διπλάσιο μέγεθος */}
        <Image 
          src="/dinosaur.png" 
          alt="Ένας πολύχρωμος δεινόσαυρος σε κινούμενη πόζα" 
          className="absolute bottom-4 right-4 w-64 h-64"
          width={256} 
          height={256} 
        />
      </div>
    </>
  );
};

export default Home;
