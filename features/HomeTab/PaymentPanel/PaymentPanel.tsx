import * as SecureStore from "expo-secure-store";
import { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import CustomTextInput from "./CustomTextInput";
import Header from "./Header/Header";
import SettingsContext from "../../../contexts/SettingsContext";
import getPriceWithCurrency from "../../../preferences/currencies";
import ReservationPostData from "../../../interfaces/ReservationPostData";

const PaymentPanel = ({ route, navigation }) => {
  const { data } = route.params;
  const { settings } = useContext(SettingsContext);

  const [isError, setIsError] = useState(false);
  const [cardOwnerName, setCardOwnerName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvvCode, setCvvCode] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);
  const [reservationPostData, setReservationPostData] = useState<ReservationPostData>();

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

  useEffect(() => {
    setReservationPostData({
      flatId: data.flatId,
      startDate: data.startDate.toISOString().split("T")[0],
      endDate: data.endDate.toISOString().split("T")[0],
      adults: data.adults,
      children: data.children,
      pets: data.pets,
      specialRequests: data.specialRequests,
    });
  }, []);

  return (
    <View style={{ height: "100%", marginTop: 10 }}>
      <Header navigation={navigation} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
        }}>
        Total price: {getPriceWithCurrency(data.price * data.nightsCount, settings.currency, 2)}
      </Text>
      <Text>{JSON.stringify(reservationPostData)}</Text>
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
            let userToken: string | null;
            try {
              userToken = await SecureStore.getItemAsync("userToken");
            } catch {
              // Token was not found in the secure store. User is not authenticated.
              userToken = null;
            }

            if (!userToken) {
              setIsError(true);
              return;
            }

            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/reservation", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
              },
              body: JSON.stringify(reservationPostData),
            });

            if (response.ok) {
              navigation.navigate("FlatOfferList", { shouldRefresh: true });
            } else {
              console.log(
                "Problem with fetch, status text:",
                response.statusText,
                ", status code:",
                response.status,
                ", token:",
                userToken
              );
            }
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
