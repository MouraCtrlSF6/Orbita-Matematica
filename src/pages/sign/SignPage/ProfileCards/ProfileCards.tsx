import { IconName } from '../../../../components/icon-names';
import { ProfileCard } from './ProfileCard/ProfileCard';

export function ProfileCards() {
  return (
    <div className="profile-cards relative grid w-full max-w-[47rem] grid-cols-2 gap-6 ds-down-mobile:max-w-[24rem] ds-down-mobile:grid-cols-1 ds-down-mobile:gap-4">
      <ProfileCard
        to="/teachers"
        title="Sou Professor"
        description="Organize salas e acompanhe seus alunos."
        icon={IconName.Book}
        iconClassName="bg-selected"
        id="teacher-profile"
      />
      <ProfileCard
        to="/students"
        title="Sou aluno"
        description="Entre na sua sala e explore as missões."
        icon={IconName.Rocket}
        iconClassName="bg-success"
        id="student-profile"
      />
    </div>
  );
}
