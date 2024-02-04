import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import CustomTextInput from "./CustomTextInput";
import Header from "./Header/Header";

const PaymentPanel = ({ route, navigation }) => {
  const [cardOwnerName, setCardOwnerName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvvCode, setCvvCode] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);

  const isNumeric = (input) => {
    // Use a regular expression to check if the input contains only digits
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(input);
  };

  const cardOwnerNameHandler = (newCardOwnerName) => {
    setCardOwnerName(newCardOwnerName);
  };

  const cardOwnerNameErrorVisible = () => {
    return !(cardOwnerName.length > 0);
  };

  const cardOwnerNameErrorText = () => {
    return "Card owner name cannot be empty";
  };

  const cardNumberHandler = (newCardNumber) => {
    setCardNumber(newCardNumber);
  };

  const cardNumberErrorVisible = () => {
    return !isNumeric(cardNumber) || !(cardNumber.length === 16);
  };

  const cardNumberErrorText = () => {
    return "Card number should contain 16 digits";
  };

  const cvvCodeHandler = (newCvvCode) => {
    setCvvCode(newCvvCode);
  };

  const cvvCodeErrorVisible = () => {
    return !isNumeric(cvvCode) || !(cvvCode.length === 3);
  };

  const cvvCodeErrorText = () => {
    return "CVV/CVC code should contain 3 digits";
  };

  return (
    <View style={{ height: "100%", marginTop: 10 }}>
      <Header navigation={navigation} />
      <CustomTextInput
        label="Card owner name (*)"
        value={cardOwnerName}
        valueHandler={cardOwnerNameHandler}
        errorVisible={cardOwnerNameErrorVisible}
        errorText={cardOwnerNameErrorText}
        displayErrors={displayErrors}
      />
      <CustomTextInput
        label="Card number (*)"
        value={cardNumber}
        valueHandler={cardNumberHandler}
        errorVisible={cardNumberErrorVisible}
        errorText={cardNumberErrorText}
        displayErrors={displayErrors}
      />
      <CustomTextInput
        label="CVV/CVC code (*)"
        value={cvvCode}
        valueHandler={cvvCodeHandler}
        errorVisible={cvvCodeErrorVisible}
        errorText={cvvCodeErrorText}
        displayErrors={displayErrors}
      />
      <Button
        mode="contained"
        style={{
          borderRadius: 5,
          marginTop: 20,
          marginBottom: 20,
        }}
        onPress={async () => {
          const cardOwnerNameValid = cardOwnerName.length > 0;
          const cardNumberValid = cardNumber.length === 16 && isNumeric(cardNumber);
          const cvvCodeValid = cvvCode.length === 3 && isNumeric(cvvCode);
          if (cardOwnerNameValid && cardNumberValid && cvvCodeValid) {
            navigation.navigate("FlatOfferList");
          } else {
            setDisplayErrors(true);
          }
        }}>
        FINALIZE PAYMENT
      </Button>
    </View>
  );
};

export default PaymentPanel;
