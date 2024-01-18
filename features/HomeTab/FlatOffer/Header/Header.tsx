import { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

interface HeaderProp {
  navigation: any;
  name: any;
}

const Header = ({ navigation, name }: HeaderProp) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.backdrop,
      }}>
      <IconButton
        icon="arrow-left-drop-circle-outline"
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
          fontSize: 24,
        }}>
        {name}
      </Text>
      <IconButton
        icon="share-outline"
        iconColor={theme.colors.primary}
        size={32}
        onPress={() => {
          // Add your logic here
        }}
        style={{ zIndex: 1, marginLeft: 100 }}
      />
      {isLiked ? (
        <IconButton
          icon="heart"
          iconColor={theme.colors.primary}
          size={32}
          onPress={() => {
            setIsLiked(false);
          }}
          style={{ zIndex: 1 }}
        />
      ) : (
        <IconButton
          icon="heart-outline"
          iconColor={theme.colors.primary}
          size={32}
          onPress={() => {
            setIsLiked(true);
          }}
          style={{ zIndex: 1 }}
        />
      )}
    </View>
  );
};

export default Header;
