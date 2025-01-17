// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

const Home = () => {
  const router = useRouter();

  const startQuiz = () => {
    router.push('/quiz'); // Προχωρά στην σελίδα του κουίζ
  };

  return (
    <>
      <Head>
        <title>Η Πρόσκληση για Ανατολή</title>
        <meta name="description" content="Πρόσκληση για να δεις την ανατολή του ηλίου μαζί!" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 p-6 relative">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-14">
            Καλως όρισες δεινόσαυρε TΥΧΑΙΑ στο παιχνίδι αυτό.
          </h1>
          <p className="text-lg sm:text-xl text-white mb-12 sm:mb-16">
            Ξεκίνησε την περιπέτειά σου λύνοντας τους γρίφους και θα φτάσεις σε μία σπέσιαλ πρόσκληση!
          </p>
          <button
            onClick={startQuiz}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-cyan-500 text-white rounded shadow-lg hover:bg-green-600 transform transition-all duration-300"
          >
            Ξεκίνα το παιχνίδι
          </button>
        </div>
        <Image 
          src="/dinosaur.png" 
          alt="Ένας πολύχρωμος δεινόσαυρος σε κινούμενη πόζα" 
          className="absolute bottom-4 right-4 w-40 h-40 sm:w-64 sm:h-64"
          width={256}
          height={256}
        />
      </div>
    </>
  );
};

export default Home;
