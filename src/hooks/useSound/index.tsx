import { useCallback, useState } from 'react';
import SoundHandle from 'react-native-sound';

SoundHandle.setCategory('Alarm');

const useSound = () => {
  const [selectedSound, setSelectedSound] = useState<SoundHandle>();

  const handleSoundConfiguration = (error: any, sound: SoundHandle) => {
    sound.setNumberOfLoops(-1);
    sound.play(success => {
      if (success) {
        console.warn('successfully finished playing');
      } else {
        console.warn('playback failed due to audio decoding errors');
      }
    });
    setSelectedSound(sound);
  };

  const stopSound = useCallback(() => {
    selectedSound?.stop().release();
  }, [selectedSound]);

  const playSound = useCallback((soundFile: string) => {
    stopSound();
    const sound: SoundHandle = new SoundHandle(
      soundFile,
      SoundHandle.MAIN_BUNDLE,
      error => handleSoundConfiguration(error, sound),
    );
  }, []);

  return {
    playSound,
    stopSound,
  };
};

export default useSound;
