import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OptionType } from '../../../type/options';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { LongButton } from '../../../components/long-button';
import { Divider, Icon } from 'react-native-paper';
import useStores from '../../../hooks/use-stores';
import SessionStore from '../../../stores/session';

export const Options = () => {
  const route = useRoute();
  const params = route.params as {
    optionType: OptionType;
  };
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.optionType,
    });
  }, []);

  const content = useMemo(() => {
    switch (params.optionType) {
      case OptionType.Lock:
        return <LockOptions />;
      case OptionType.AutoLogout:
        return <LogOutOptions />;
      case OptionType.ClearClipBoard:
        return <ClearClipboardOptions />;
      case OptionType.SkipReprompt:
        return <SkipRepromptOptions />;
      default:
        return <></>;
    }
  }, [params.optionType]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: Padding.screen,
      }}>
      {content}
    </View>
  );
};

const LockOptions = () => {
  const data = [
    {
      id: 2,
      label: '1 phút',
      value: 60000,
    },
    {
      id: 3,
      label: '3 phút',
      value: 60000 * 3,
    },
    {
      id: 4,
      label: '5 phút',
      value: 60000 * 5,
    },
    {
      id: 5,
      label: '15 phút',
      value: 60000 * 15,
    },
    {
      id: 6,
      label: '1 giờ',
      value: 60000 * 60,
    },
    {
      id: 7,
      label: '24 giờ',
      value: 24 * 60000 * 60,
    },
    {
      id: 8,
      label: 'Không bao giờ',
      value: 0,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(2);
  const navigation = useNavigation();
  const sessionStore: SessionStore = useStores().sessionStore;
  return (
    <View style={{ flex: 1, gap: 15 }}>
      <View style={[{ padding: 10 }, appStyles.shadowStyle]}>
        {
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                style={{ gap: 10, paddingVertical: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>{item.label}</Text>
                  {index === selectedIndex && (
                    <Icon size={20} source={'check'} color={Colors.primary} />
                  )}
                </View>
                <Divider />
              </TouchableOpacity>
            )}
          />
        }
      </View>

      <LongButton
        buttonColor={Colors.primary}
        textColor={Colors.white}
        buttonStyle={{ width: '100%' }}
        title='Lưu'
        onPress={() => {
          const value = data[selectedIndex].value;
          sessionStore.changeLockOption(value);
          navigation.goBack();
        }}
      />
      <Text style={{ color: Colors.gray300, fontSize: FontSizes.sm }}>
        Sau khi khóa, SecureVault sẽ yêu cầu Face ID, mã PIN SecureVault hoặc
        mật khẩu chính của bạn để mở khóa - tùy thuộc vào cài đặt bạn đã chọn.
      </Text>
    </View>
  );
};

const SkipRepromptOptions = () => {
  const sessionStore: SessionStore = useStores().sessionStore;

  const data = [
    {
      id: 1,
      label: 'Vô hiệu hóa',
      value: 0,
    },
    {
      id: 2,
      label: '1 phút',
      value: 60000,
    },
    {
      id: 3,
      label: '2 phút',
      value: 60000 * 2,
    },
    {
      id: 4,
      label: '3 phút',
      value: 60000 * 3,
    },
    {
      id: 5,
      label: '4 phút',
      value: 60000 * 4,
    },
    {
      id: 6,
      label: '5 phút',
      value: 60000 * 5,
    },
    {
      id: 7,
      label: '10 phút',
      value: 60000 * 10,
    },
    {
      id: 8,
      label: '20 phút',
      value: 60000 * 20,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(2);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, gap: 15 }}>
      <View style={[{ padding: 10 }, appStyles.shadowStyle]}>
        {
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                style={{ gap: 10, paddingVertical: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>{item.label}</Text>
                  {index === selectedIndex && (
                    <Icon size={20} source={'check'} color={Colors.primary} />
                  )}
                </View>
                <Divider />
              </TouchableOpacity>
            )}
          />
        }
      </View>

      <LongButton
        buttonColor={Colors.primary}
        textColor={Colors.white}
        buttonStyle={{ width: '100%' }}
        title='Lưu'
        onPress={() => {
          const value = data[selectedIndex].value;
          sessionStore.changeSkipPrompt(value);
          navigation.goBack();
        }}
      />
      <Text style={{ color: Colors.gray300, fontSize: FontSizes.sm }}>
        Điều này giúp bạn không phải nhập lại mật khẩu chính ngay sau khi đăng
        nhập đối với các mục yêu cầu nhắc lại mật khẩu chính.
      </Text>
    </View>
  );
};

const LogOutOptions = () => {
  const sessionStore: SessionStore = useStores().sessionStore;
  const data = [
    {
      id: 1,
      label: 'Không bao giờ',
      value: 0,
    },
    {
      id: 2,
      label: '1 phút',
      value: 1 * 60000,
    },
    {
      id: 3,
      label: '5 phút',
      value: 5 * 60000,
    },
    {
      id: 4,
      label: '15 phút',
      value: 15 * 60000,
    },
    {
      id: 5,
      label: '1 giờ',
      value: 60 * 60000,
    },
    {
      id: 6,
      label: '8 giờ',
      value: 60 * 60000 * 8,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(2);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, gap: 15 }}>
      <View style={[{ padding: 10 }, appStyles.shadowStyle]}>
        {
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                style={{ gap: 10, paddingVertical: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>{item.label}</Text>
                  {index === selectedIndex && (
                    <Icon size={20} source={'check'} color={Colors.primary} />
                  )}
                </View>
                <Divider />
              </TouchableOpacity>
            )}
          />
        }
      </View>

      <LongButton
        buttonColor={Colors.primary}
        textColor={Colors.white}
        buttonStyle={{ width: '100%' }}
        title='Lưu'
        onPress={() => {
          const value = data[selectedIndex].value;
          sessionStore.changeAutoLogoutTime(value);
          navigation.goBack();
        }}
      />
      <Text style={{ color: Colors.gray300, fontSize: FontSizes.sm }}>
        Sau khi đăng xuất tự động, bạn sẽ cần nhập mật khẩu chính của mình để
        truy cập SecureVault.
      </Text>
    </View>
  );
};

const ClearClipboardOptions = () => {
  const data = [
    {
      id: 1,
      label: 'Không bao giờ',
      value: 0,
    },
    {
      id: 2,
      label: '30 giây',
      value: 60000 / 2,
    },
    {
      id: 3,
      label: '45 giây',
      value: 60000 * 0.75,
    },
    {
      id: 4,
      label: '60 giây',
      value: 60000,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(2);
  const navigation = useNavigation();
  const sessionStore: SessionStore = useStores().sessionStore;
  return (
    <View style={{ flex: 1, gap: 15 }}>
      <View style={[{ padding: 10 }, appStyles.shadowStyle]}>
        {
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                style={{ gap: 10, paddingVertical: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>{item.label}</Text>
                  {index === selectedIndex && (
                    <Icon size={20} source={'check'} color={Colors.primary} />
                  )}
                </View>
                <Divider />
              </TouchableOpacity>
            )}
          />
        }
      </View>

      <LongButton
        buttonColor={Colors.primary}
        textColor={Colors.white}
        buttonStyle={{ width: '100%' }}
        title='Lưu'
        onPress={() => {
          const value = data[selectedIndex].value;
          sessionStore.changeAutoClearClipBoard(value);
          navigation.goBack();
        }}
      />
      <Text style={{ color: Colors.gray300, fontSize: FontSizes.sm }}>
        Bất kỳ nội dung nào được sao chép từ SecureVault đều có thể bị xóa khỏi
        khay nhớ tạm của bạn sau khoảng thời gian đã chọn.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
