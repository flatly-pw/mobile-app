import { useState, useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";

import BookingDetails from "./BookingDetails/BookingDetails";
import CustomTextInput from "./CustomTextInput";
import Header from "./Header/Header";
import OfficelyWindow from "./OfficelyWindow/OfficelyWindow";
import OfficelyData from "../../../interfaces/OfficelyData";

const ReservationPanel = ({ route, navigation, filters }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [request, setRequest] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);
  const [officelyData, setOfficelyData] = useState<OfficelyData>();

  const { data } = route.params;

  const isNumeric = (input) => {
    // Use a regular expression to check if the input contains only digits
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(input);
  };

  const phoneNumberHandler = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };

  const phoneNumberErrorVisible = () => {
    return !isNumeric(phoneNumber) && !(phoneNumber === "");
  };

  const phoneNumberErrorText = () => {
    return "Phone number should contain only digits";
  };

  const requestHandler = (newRequest) => {
    setRequest(newRequest);
    data.specialRequests = newRequest;
  };

  const requestErrorVisible = () => {
    return false;
  };

  const requestErrorText = () => {
    return "Congratulations if you have somehow made an error here";
  };

  const addressHandler = (newAddress) => {
    setAddress(newAddress);
  };

  const addressErrorVisible = () => {
    return !(address.length > 0);
  };

  const addressErrorText = () => {
    return "Address cannot be empty";
  };

  const cityHandler = (newCity) => {
    setCity(newCity);
  };

  const cityErrorVisible = () => {
    return !(city.length > 0);
  };

  const cityErrorText = () => {
    return "City name cannot be empty";
  };

  const postCodeHandler = (newPostCode) => {
    setPostCode(newPostCode);
  };

  const postCodeErrorVisible = () => {
    return !isNumeric(postCode) && !(postCode === "");
  };

  const postCodeErrorText = () => {
    return "Post/ZIP code should contain only digits";
  };

  const countryHandler = (newCountry) => {
    setCountry(newCountry);
  };

  const countryErrorVisible = () => {
    return !(country.length > 0);
  };

  const countryErrorText = () => {
    return "Country name cannot be empty";
  };

  const nameHandler = (newName: string) => {
    setName(newName);
  };

  const nameErrorVisible = () => {
    return !(name.length > 0);
  };

  const nameErrorText = () => {
    return "Name cannot be empty";
  };

  const lastNameHandler = (newLastName: string) => {
    setLastName(newLastName);
  };

  const lastNameErrorVisible = () => {
    return !(lastName.length > 0);
  };

  const lastNameErrorText = () => {
    return "Last Name cannot be empty";
  };

  const emailHandler = (newEmail: string) => {
    setEmail(newEmail);
  };

  const emailErrorVisible = () => {
    return !email.includes("@");
  };

  const emailErrorText = () => {
    return "Invalid email address";
  };

  const setDataFromFetch = (data: any) => {
    try {
      const fetchedName = data.name;
      const fetchedPricePerDay = data.pricePerDay;
      const fetchedAddress = data.address;
      const fetchedMainPhoto = data.mainPhoto;
      const fetchedRating = data.rating;
      const fetchedOfficeArea = data.officeArea;
      setOfficelyData({
        name: fetchedName,
        pricePerDay: fetchedPricePerDay,
        address: fetchedAddress,
        mainPhoto: fetchedMainPhoto,
        rating: fetchedRating,
        officeArea: fetchedOfficeArea,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://officely.azurewebsites.net/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Flatly",
          password: "Flatly",
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        const userToken = responseData.jwttoken;
        const searchResponse = await fetch(
          "https://officely.azurewebsites.net/offices?pageSize=10&pageNum=0&availableFrom=" +
            data.startDate +
            "T00:00:00.0000&availableTo=" +
            data.endDate +
            "T00:00:00.0000&maxDistance=20&lat=" +
            data.latitude +
            "&lng=" +
            data.longitude,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        if (searchResponse.ok) {
          const fetchedData = await searchResponse.json();
          const officeId = fetchedData[Math.floor(Math.random() * fetchedData.length)].id;
          const officeResponse = await fetch(
            "https://officely.azurewebsites.net/offices/" + officeId,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );

          if (officeResponse.ok) {
            const officeData = await officeResponse.json();
            setDataFromFetch(officeData);
          }
        }
      }
    };

    fetchData(); // Call the async function
  }, [data]);

  return (
    <View style={{ height: "100%", marginTop: 10 }}>
      <Header navigation={navigation} />
      <ScrollView>
        {officelyData ? (
          <View>
            <BookingDetails data={data} />
            <OfficelyWindow data={officelyData} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}>
              Enter your details
            </Text>
            <CustomTextInput
              label="Name (*)"
              value={name}
              valueHandler={nameHandler}
              errorVisible={nameErrorVisible}
              errorText={nameErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Last Name (*)"
              value={lastName}
              valueHandler={lastNameHandler}
              errorVisible={lastNameErrorVisible}
              errorText={lastNameErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Email (*)"
              value={email}
              valueHandler={emailHandler}
              errorVisible={emailErrorVisible}
              errorText={emailErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Phone Number"
              value={phoneNumber}
              valueHandler={phoneNumberHandler}
              errorVisible={phoneNumberErrorVisible}
              errorText={phoneNumberErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Address (*)"
              value={address}
              valueHandler={addressHandler}
              errorVisible={addressErrorVisible}
              errorText={addressErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="City (*)"
              value={city}
              valueHandler={cityHandler}
              errorVisible={cityErrorVisible}
              errorText={cityErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Post/ZIP code"
              value={postCode}
              valueHandler={postCodeHandler}
              errorVisible={postCodeErrorVisible}
              errorText={postCodeErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Country/region (*)"
              value={country}
              valueHandler={countryHandler}
              errorVisible={countryErrorVisible}
              errorText={countryErrorText}
              displayErrors={displayErrors}
            />
            <CustomTextInput
              label="Special requests"
              value={request}
              valueHandler={requestHandler}
              errorVisible={requestErrorVisible}
              errorText={requestErrorText}
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
                const nameValid = name.length > 0;
                const lastNameValid = lastName.length > 0;
                const emailValid = email.includes("@");
                const phoneNumberValid = isNumeric(phoneNumber) || phoneNumber === "";
                const addressValid = address.length > 0;
                const cityValid = city.length > 0;
                const postCodeValid = isNumeric(postCode) || postCode === "";
                const countryValid = country.length > 0;
                if (
                  nameValid &&
                  lastNameValid &&
                  emailValid &&
                  phoneNumberValid &&
                  addressValid &&
                  cityValid &&
                  postCodeValid &&
                  countryValid
                ) {
                  navigation.navigate("PaymentPanel", { data });
                } else {
                  setDisplayErrors(true);
                }
              }}>
              PROCEED TO PAYMENT
            </Button>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ReservationPanel;
