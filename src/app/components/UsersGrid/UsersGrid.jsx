import { useState, useEffect } from 'react';
import { getUsers } from '../../services/users';

import UserCard from '../UserCard/UserCard';
import Button from '../shared/Button/Button';
import Preloader from '../shared/Preloader/Preloader';

import './UsersGrid.scss';

const USERS_PER_PAGE = 6;

const UsersGrid = ({ page, setPage }) => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (page === 1 || status !== 'finished') {
      setStatus('loading');

      const fetchUsers = async () => {
        const { list, total } = await getUsers(page, USERS_PER_PAGE);

        setUsers((users) => (page === 1 ? list : [...users, ...list]));
        setStatus(page >= total ? 'finished' : 'idle');
      };

      fetchUsers();
    }
  }, [page]);

  return (
    <div className="users-grid">
      <div className="users-grid__list">
        {users
          .sort((a, b) => b.registration_timestamp - a.registration_timestamp)
          .map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
      </div>

      {status === 'idle' && (
        <Button size="md" onClick={() => setPage((page) => page + 1)}>
          Show more
        </Button>
      )}

      {status === 'loading' && <Preloader />}
    </div>
  );
};

export default UsersGrid;
