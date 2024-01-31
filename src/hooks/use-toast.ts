import Toast, { ToastType } from 'react-native-toast-message';

const useCustomToast = () => {
  const show = ({
    type,
    title,
    content,
  }: {
    type: ToastType;
    title?: string;
    content: string;
  }) => {
    Toast.show({
      type: type,
      text1: title,
      text2: content,
    });
  };

  return { show };
};

export default useCustomToast;
