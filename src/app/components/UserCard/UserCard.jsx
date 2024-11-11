import { useState } from 'react';
import Tooltip from '../shared/Tooltip/Tooltip';

import './UserCard.scss';

import cover from '../../assets/img/photo-cover.svg';

const UserCard = ({ user }) => {
  const [photo, setPhoto] = useState(user.photo);

  return (
    <div className="user-card">
      <div className="user-card__photo">
        <img src={photo} onError={() => setPhoto(cover)} alt={`${user.name}`} />
      </div>

      {user.name && (
        <Tooltip value={user.name}>
          <p className="user-card__name">{user.name}</p>
        </Tooltip>
      )}

      <div className="user-card__description">
        {user.position && (
          <Tooltip value={user.position}>
            <p>{user.position}</p>
          </Tooltip>
        )}

        {user.email && (
          <Tooltip value={user.email}>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </Tooltip>
        )}

        {user.phone && (
          <Tooltip value={user.phone}>
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default UserCard;
