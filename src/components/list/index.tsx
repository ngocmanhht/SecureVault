import { FlatList, ListRenderItem } from 'react-native';
import { Text } from '../text';

export const List = <I, S>({
  data,
  renderItem,
  isLoading,
}: {
  data: ArrayLike<I> | null | undefined;
  renderItem: ListRenderItem<I>;
  isLoading: boolean;
}) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <FlatList
      data={data}
      renderItem={renderItem}
      // eslint-disable-next-line react/react-in-jsx-scope
      ListEmptyComponent={isLoading ? <Text>Loading</Text> : <Text>Empty</Text>}
    />
  );
};
