import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

interface CustomTextInputProps {
  label: string;
  value: string;
  valueHandler: (newValue: string) => void;
  errorVisible: () => boolean;
  errorText: () => string;
  displayErrors: boolean;
  secureTextEntry?: boolean;
}

const CustomTextInput = ({
  label,
  value,
  valueHandler,
  errorVisible,
  errorText,
  displayErrors,
  secureTextEntry,
}: CustomTextInputProps) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}>
      <TextInput
        label={label}
        value={value}
        onChangeText={(newPassword) => valueHandler(newPassword)}
        secureTextEntry={secureTextEntry}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <HelperText type="error" visible={errorVisible() && displayErrors}>
        {errorText()}
      </HelperText>
    </View>
  );
};

export default CustomTextInput;
