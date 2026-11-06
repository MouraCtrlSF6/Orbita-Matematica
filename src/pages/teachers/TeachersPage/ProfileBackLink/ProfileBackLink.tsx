import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router';
import { Button } from '../../../../components/Button/Button';
import { ButtonVariant } from '../../../../components/Button/button-styles';

export function ProfileBackLink() {
  return (
    <Button asChild variant={ButtonVariant.Secondary}>
      <Link to="/sign">
        <ArrowLeftIcon aria-hidden="true" className="size-5 shrink-0" />
        Voltar à escolha de perfil
      </Link>
    </Button>
  );
}
