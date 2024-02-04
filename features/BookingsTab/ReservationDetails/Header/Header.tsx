import { View } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

const Header = ({ route, navigation }) => {
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
          navigation.navigate("ReservationList");
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
        Reservation details
      </Text>
    </View>
  );
};

export default Header;
