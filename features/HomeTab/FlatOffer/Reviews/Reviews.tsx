import { Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";

const Reviews = ({ data }) => {
  // const items = [
  //   { rating: "5", user: "Janusz", text: "Very nice place to stay. I had a great time there." },
  //   {
  //     rating: "4",
  //     user: "John",
  //     text: "It was a pleasure to stay there although the service was not so good.",
  //   },
  // ];
  const items = data.reviews;

  return (
    <View>
      {items.map((item, index) => (
        <View style={{ marginTop: 10, marginBottom: 10 }} key={index}>
          <View style={{ flexDirection: "row" }}>
            <Octicons name="star-fill" size={24} color="black" />
            <Text style={{ padding: 4, fontSize: 14 }}>{item.rating}</Text>
            <Text style={{ padding: 4, paddingLeft: 10, fontSize: 14 }}>
              {item.reviewerName} ({item.date})
            </Text>
          </View>
          <Text>{item.review}</Text>
        </View>
      ))}
    </View>
  );
};

export default Reviews;
