import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OptionType } from '../../../type/options';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { LongButton } from '../../../components/long-button';
import { Divider, Icon } from 'react-native-paper';

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
      id: 1,
      label: 'Ngay lập tức',
    },
    {
      id: 2,
      label: '1 phút',
    },
    {
      id: 3,
      label: '3 phút',
    },
    {
      id: 4,
      label: '5 phút',
    },
    {
      id: 5,
      label: '15 phút',
    },
    {
      id: 6,
      label: '1 giờ',
    },
    {
      id: 7,
      label: '24 giờ',
    },
    {
      id: 8,
      label: 'Không bao giờ',
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
  const data = [
    {
      id: 1,
      label: 'Vô hiệu hóa',
    },
    {
      id: 2,
      label: '1 phút',
    },
    {
      id: 3,
      label: '2 phút',
    },
    {
      id: 4,
      label: '3 phút',
    },
    {
      id: 5,
      label: '4 phút',
    },
    {
      id: 6,
      label: '5 phút',
    },
    {
      id: 7,
      label: '10 phút',
    },
    {
      id: 8,
      label: '20 phút',
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
  const data = [
    {
      id: 1,
      label: 'Không bao giờ',
    },
    {
      id: 2,
      label: '1 phút',
    },
    {
      id: 3,
      label: '5 phút',
    },
    {
      id: 4,
      label: '15 phút',
    },
    {
      id: 5,
      label: '1 giờ',
    },
    {
      id: 6,
      label: '8 giờ',
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
    },
    {
      id: 2,
      label: '30 giây',
    },
    {
      id: 3,
      label: '45 giây',
    },
    {
      id: 4,
      label: '60 giây',
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
