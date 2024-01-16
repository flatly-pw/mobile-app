import { View } from "react-native";
import { Icon, Text, TouchableRipple, useTheme } from "react-native-paper";

interface SectionItemProps {
  route: any;
  navigation: any;
  label: string;
  icon: string;
  destination: string;
}

const SectionItem = ({ route, navigation, label, icon, destination }: SectionItemProps) => {
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={() => navigation.navigate(destination)}
      rippleColor={theme.colors.primaryContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ padding: 10 }}>
            <Icon source={icon} size={32} color={theme.colors.primary} />
          </View>
          <Text variant="titleMedium">{label}</Text>
        </View>
        <Icon source="chevron-right" size={28} />
      </View>
    </TouchableRipple>
  );
};

export default SectionItem;
