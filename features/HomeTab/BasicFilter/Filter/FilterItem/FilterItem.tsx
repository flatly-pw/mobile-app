import { Surface, Text } from "react-native-paper";

interface FilterItemProps {
  children: React.JSX.Element | React.JSX.Element[];
  label: string;
}

const FilterItem = ({ children, label }: FilterItemProps) => {
  return (
    <Surface
      elevation={1}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}>
      <Text variant="headlineLarge" style={{ marginBottom: 10 }}>
        {label}
      </Text>
      {children}
    </Surface>
  );
};

export default FilterItem;
