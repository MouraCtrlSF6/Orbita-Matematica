import { ProfileCards } from './ProfileCards/ProfileCards';
import { SignBackdrop } from './SignBackdrop/SignBackdrop';
import { SignBrand } from './SignBrand/SignBrand';
import { SignIntro } from './SignIntro/SignIntro';

export function SignPage() {
  return (
    <main className="entry-page relative isolate grid min-h-svh max-w-none content-center justify-items-center gap-12 overflow-hidden bg-space px-6 py-16 text-center text-space-ink ds-down-mobile:gap-8 ds-down-mobile:px-6 ds-down-mobile:py-10">
      <SignBackdrop />
      <SignBrand />
      <SignIntro />
      <ProfileCards />
    </main>
  );
}
