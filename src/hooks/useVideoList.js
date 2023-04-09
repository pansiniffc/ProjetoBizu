import React from 'react';
import {
  getDatabase,
  ref,
  query,
  get,
  orderByKey,
  startAt,
  limitToFirst,
} from 'firebase/database';

export default function useVideoList(page) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    async function fetchVideos() {
      // database related works
      const db = getDatabase();
      const videosRef = ref(db, 'videos');
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt('' + page),
        limitToFirst(8),
      );

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
  };
}
