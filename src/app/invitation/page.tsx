'use client'; // Χρησιμοποιούμε 'use client' για να ορίσουμε τον κώδικα ως Client Component.

import { useState } from 'react';

const Invitation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleResponse = async (response: string) => {
    try {
      console.log('Sending response:', response);
  
      const res = await fetch('/api/send-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Response from backend:', data);
        setModalMessage('Η απάντησή σας καταγράφηκε επιτυχώς!');
      } else {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        setModalMessage('Παρουσιάστηκε πρόβλημα. Παρακαλώ δοκιμάστε ξανά.');
      }
    } catch (error) {
      console.error('Error sending response:', error);
      setModalMessage('Παρουσιάστηκε πρόβλημα. Παρακαλώ δοκιμάστε ξανά.');
    }

    // Εμφανίζουμε το modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-gradient-to-r from-red-500 to-orange-500 p-6 overflow-hidden">
      {/* Background της θάλασσας, σταθερή */}
      <div className="sea" />

      {/* Ήλιος με animation ανύψωσης */}
      <div className="sun-animation" />

      <h1 className="text-4xl font-bold text-white  mb-12">🎉 Συγχαρητήρια! Ολοκλήρωσες επιτυχημένα όλους τους γρίφους! 🎉</h1>
      <p className="text-xl font-bold text-black mb-4 z-10">Είσαι έτοιμη να δεις την ανατολή του ηλίου; 🌅</p>
      <p className="text-lg font-bold text-black z-10">📅 Ημερομηνία: 09/02/2025, Κυριακή</p>
      <p className="text-lg font-bold text-black z-10">⏰ Ώρα: 05:30 π.μ.</p>
      <p className="text-lg font-bold text-black z-10 mb-24">📍 Τοποθεσία: Περβόλια, Λάρνακα</p>
      
      {/* Χρησιμοποιούμε 'mt-16' για μεγαλύτερο περιθώριο επάνω από τα κουμπιά */}
      <div className="flex gap-4 mt-16 z-10">
        <button
          onClick={() => handleResponse('Ναι')}
          className="px-10 py-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-600 transform transition-all duration-300"
        >
           Ναι δαγκωτό
        </button>
        <button
          onClick={() => handleResponse('Όχι')}
          className="px-10 py-4 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transform transition-all duration-300"
        >
           Όχι δεν μπορώ
        </button>
      </div>

      {/* Modal για να εμφανίζεται το μήνυμα */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl text-black font-bold text-center mb-4">Απάντηση</h2>
            <p className="text-lg text-black text-center mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Κλείσιμο
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invitation;
