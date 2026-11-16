import { Link } from 'react-router';

export function LeaveRoomLink() {
  return (
    <Link to="/sign" className="block py-3 px-3.5 text-small rounded-control ds-hover:text-white">
      Sair da sala
    </Link>
  );
}
