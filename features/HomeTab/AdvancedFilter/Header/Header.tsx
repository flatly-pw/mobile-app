import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

interface HeaderProps {
  navigation: any;
}

const Header = ({ navigation }: HeaderProps) => {
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
        icon="close-circle-outline"
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
          position: "absolute",
          width: "100%",
        }}>
        Filters
      </Text>
    </View>
  );
};

export default Header;
