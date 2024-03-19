import { renderHook } from '@testing-library/react-native';
import SoundHandle from 'react-native-sound';
import useSound from './index';

// jest.mock('react-native-sound', () => ({
//   __esModule: true, //When module has multiple exports
//   setCategory: jest.fn(),
//   default: jest
//     .fn()
//     .mockImplementation((_path, _basePathOrCallback, callback) => {
//       console.log('yes: ', _path);
//       callback();
//       return {
//         setNumberOfLoops: jest.fn(),
//         play: jest.fn(),
//         stop: jest.fn(),
//         release: jest.fn(),
//       };
//     }),
// }));

describe.skip('useSound', () => {
  it('should play a sound', async () => {
    const { result } = renderHook(() => useSound());
    result.current.playSound('someSound.mp4');

    expect(SoundHandle).toHaveBeenCalledWith(
      'someSound.mp4',
      SoundHandle.MAIN_BUNDLE,
      expect.any(Function),
    );
    
    // await waitFor(() => {
    //   expect(SoundHandle.prototype.play).toHaveBeenCalled();
    // });
  });
});
