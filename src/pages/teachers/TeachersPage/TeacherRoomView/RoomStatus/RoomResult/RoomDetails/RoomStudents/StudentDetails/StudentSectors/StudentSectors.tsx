import { Accordion } from '../../../../../../../../../../components/Accordion/Accordion';
import { sectors } from '../../../../../../../../../../content/sectors';
import type { RoomStudent } from '../../../../../../../../../../game/room-progress';
import { SectorTitle } from './SectorTitle/SectorTitle';
import { StudentSector } from './StudentSector/StudentSector';

export interface StudentSectorsProps {
  student: RoomStudent;
}

export function StudentSectors({ student }: StudentSectorsProps) {
  const items = sectors.flatMap(({ id }) => {
    const sector = student.sectors[id];

    return sector
      ? [
          {
            value: id,
            title: <SectorTitle sector={sector} />,
            content: <StudentSector sector={sector} />,
            keepMounted: true,
          },
        ]
      : [];
  });

  return <Accordion label={`Setores de ${student.name}`} type="single" collapsible items={items} />;
}
