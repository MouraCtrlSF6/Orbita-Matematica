import { OrbitIcon } from '../../../../components/Icon/OrbitIcon/OrbitIcon';
import orbits from './sign-orbits.svg';

export function SignBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[min(52rem,110vw)] -translate-x-1/2 -translate-y-1/2 text-sector-purple opacity-[0.07] [&_svg]:h-full [&_svg]:w-full">
        <OrbitIcon />
      </div>
      <img src={orbits} alt="" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}
