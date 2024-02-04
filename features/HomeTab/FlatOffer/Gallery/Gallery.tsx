import { Image, View } from "react-native";

import ImageSlider from "../ImageSlider/ImageSlider";

const Gallery = ({ imageSource }) => {
  const images = Array.isArray(imageSource) ? imageSource : [imageSource];

  return (
    <View>
      {/* Use ImageSlider for multiple images or a single Image for a single image */}
      {images.length > 1 ? (
        <ImageSlider images={images} />
      ) : (
        <Image
          style={{
            height: 300,
            borderRadius: 10,
            marginBottom: 10,
          }}
          source={{
            uri: images[0],
          }}
        />
      )}
    </View>
  );
};

export default Gallery;
