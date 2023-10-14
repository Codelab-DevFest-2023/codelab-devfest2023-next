'use client';
import { useEffect, useState } from 'react';
import HeartIcon from './HeartIcon';

interface Props {
  id: number;
}

interface Favorite {
  id: number;
}

const Like = ({ id }: Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const isFound = JSON.parse(favorites).find(
        (favorite: Favorite) => favorite.id === id,
      );
      if (isFound) {
        setIsFavorite(true);
      }
    } else {
      setIsFavorite(false);
    }
  }, [id]);

  const handleClick = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoritesList: Favorite[] = JSON.parse(storedFavorites);
      const hasFavorite = favoritesList.some(
        (favorite: Favorite) => favorite.id === id,
      );

      if (!hasFavorite) {
        favoritesList.push({ id });
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
        setIsFavorite(true);
      } else {
        const updatedFavoritesList = favoritesList.filter(
          (favorite: Favorite) => favorite.id !== id,
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavoritesList));
        setIsFavorite(false);
      }
    } else {
      localStorage.setItem('favorites', JSON.stringify([{ id: id }]));
      setIsFavorite(true);
    }
  };

  return (
    <button
      className={`heart-button ${isFavorite ? 'filled' : ''}`}
      onClick={handleClick}
    >
      <HeartIcon />
    </button>
  );
};

export default Like;
