import { Link } from 'react-router-dom';
import React from 'react';
import classes from '../styles/Videos.module.css';
import Video from './Video';
import useVideoList from '../hooks/useVideoList';

export default function Videos() {
  const { loading, error, videos } = useVideoList(1);

  return (
    <div className={classes.videos}>
      {videos.length > 0 &&
        videos.map((video) =>
          video.noq > 0 ? (
            <Link to={`/quiz/${video.youtubeID}`} key={video.youtubeID}>
              <Video title={video.title} id={video.youtubeID} noq={video.noq} />
            </Link>
          ) : (
            <Video
              title={video.title}
              id={video.youtubeID}
              noq={video.noq}
              key={video.youtubeID}
            />
          ),
        )}
      {!loading && videos.length === 0 && <div>Database não encontrada!</div>}
      {error && <div>Há um error!</div>}
      {loading && <div>Carregando...</div>}
    </div>
  );
}
