import React from 'react';
import { getDatabase, ref, query, get, orderByKey } from 'firebase/database';

export default function useQuestions(videoID) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    async function fetchQuestions() {
      // database related works
      const db = getDatabase();
      const quizRef = ref(db, 'quiz/' + videoID + '/questions');
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(quizQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
