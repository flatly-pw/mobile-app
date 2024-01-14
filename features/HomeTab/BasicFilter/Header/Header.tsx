import { AntDesign, Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

interface HeaderProp {
  navigation: any;
  isSearching: boolean;
  isSearchingHandler: (newIsSearching: boolean) => void;
}

const Header = ({ navigation, isSearching, isSearchingHandler }: HeaderProp) => {
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
      {isSearching ? (
        <IconButton
          icon="arrow-left-thin-circle-outline"
          iconColor={theme.colors.primary}
          size={32}
          onPress={() => {
            isSearchingHandler(false);
          }}
          style={{ zIndex: 1 }}
        />
      ) : (
        <IconButton
          icon="close-circle-outline"
          iconColor={theme.colors.primary}
          size={32}
          onPress={() => {
            navigation.navigate("FlatOfferList");
          }}
          style={{ zIndex: 1 }}
        />
      )}
      <Text
        variant="displaySmall"
        style={{
          textAlign: "center",
          position: "absolute",
          width: "100%",
        }}>
        Stays
      </Text>
    </View>
  );
};

export default Header;
