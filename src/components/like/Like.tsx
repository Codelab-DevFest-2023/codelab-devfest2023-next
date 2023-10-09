'use client';
import { useEffect, useState } from 'react';
import './like.css';

interface Props {
  id: number;
}

const Like = ({ id }: Props) => {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const isFind = JSON.parse(favorites).find(
        (element: { id: number }) => element.id === id,
      );
      if (isFind) {
        setFilled(true);
      }
    } else {
      setFilled(false);
    }
  }, [id]);

  const handleClick = () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favoritesList = JSON.parse(favorites);

      const filterFav = favoritesList.filter(
        (fav: { id: number }) => fav.id !== id,
      );

      if (filterFav.length === favoritesList.length) {
        setFilled(true);
        favoritesList.push({ id: id });
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
      } else {
        setFilled(false);
        localStorage.setItem('favorites', JSON.stringify(filterFav));
      }
    } else {
      setFilled(true);
      localStorage.setItem('favorites', JSON.stringify([{ id: id }]));
    }
  };

  return (
    <button
      className={`heart-button ${filled ? 'filled' : ''}`}
      onClick={handleClick}
    >
      <svg className="heart-icon" viewBox="0 0 26 26">
        <path d="M12 21.35l-1.45-1.32C5.4 16.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 7.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default Like;
