import { useStudentGame } from '../../../pages/students/hooks/useStudentGame';
import { Tutorial } from '../../../features/tutorial/Tutorial/Tutorial';

export function TutorialScreen() {
  const { state, navigation, settingsOpen } = useStudentGame();

  return (
    <Tutorial
      reducedMotion={state.save.preferences.reducedMotion}
      soundEnabled={state.save.preferences.soundEnabled}
      paused={settingsOpen}
      onBack={navigation.map}
      onFinish={navigation.finishTutorial}
    />
  );
}
