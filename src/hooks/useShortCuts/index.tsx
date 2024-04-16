import { NativeEventEmitter } from 'react-native';
import Shortcuts, { ShortcutItem } from 'react-native-actions-shortcuts';
import { ShortCuts } from '../../consts';

const ShortcutsEmitter = new NativeEventEmitter(Shortcuts as any);

const useShortCuts = () => {
  const getShortcuts = async () => {
    return Shortcuts.getShortcuts();
  };

  const setShortcuts = (data: ShortcutItem[]) => {
    const newItems = data.map(item => {
      return Object.values(ShortCuts).find(value => value.type === item.type);
    });
    Shortcuts.setShortcuts(newItems as ShortcutItem[]);
  };

  const setShortcut = async (data: ShortcutItem, position?: number) => {
    const items = await getShortcuts();
    if (!items.some(item => item.type === data.type)) {
      const selectePosition =
        position !== undefined && position <= items.length
          ? position
          : items.length;
      items.splice(selectePosition, 0, data);
      setShortcuts(items);
    }
  };

  const removerShortcuts = async (types: string[]) => {
    const items = await getShortcuts();
    setShortcuts(items.filter(item => !types.includes(item.type)));
  };

  return {
    ShortcutsEmitter,
    getShortcuts,
    setShortcuts,
    setShortcut,
    removerShortcuts,
  };
};

export default useShortCuts;
