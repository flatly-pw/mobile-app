import { View } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

interface HeaderProp {
  navigation: any;
}

const Header = ({ navigation }: HeaderProp) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.backdrop,
      }}>
      <IconButton
        icon="arrow-left-thin-circle-outline"
        iconColor={theme.colors.primary}
        size={32}
        onPress={() => {
          navigation.navigate("FlatOfferList");
        }}
        style={{ zIndex: 1 }}
      />
      <Text
        variant="displaySmall"
        style={{
          textAlign: "center",
          fontSize: 20,
        }}>
        Complete your reservation
      </Text>
    </View>
  );
};

export default Header;
