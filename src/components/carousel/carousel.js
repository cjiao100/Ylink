import React, { Component } from 'react';
import { View, Image } from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
import Swiper from '../../assets/react-native-swiper';
import { color } from '../../assets/styles/theme';

class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={carouselStyle.viewPager}>
        <Swiper
          style={carouselStyle.swiper}
          height={100}
          horizontal={true}
          autoplay={true}
          autoplayTimeout={3}
          showsButtons={false}
          paginationStyle={carouselStyle.pagination}
          activeDotColor={color.primary_color}
          dotColor={color.info_color}>
          {/* <View style={carouselStyle.page}> */}
          <Image
            style={carouselStyle.page}
            resizeMode="contain"
            source={{
              uri:
                'https://img.zcool.cn/community/015ad25de0d4eba80120686bb3796b.jpg'
            }}
          />
          {/* </View> */}
          {/* <View style={carouselStyle.page}> */}
          <Image
            style={carouselStyle.page}
            resizeMode="contain"
            source={{
              uri:
                'https://img.zcool.cn/community/0197c05de0d4eba8012159724164dd.jpg'
            }}
          />
          {/* </View> */}
        </Swiper>
      </View>
    );
  }
}

const carouselStyle = {
  viewPager: {
    display: 'flex',
    margin: 5,
    // height: 150,
    borderRadius: 10,
    backgroundColor: color.white_color
  },
  pagination: {
    bottom: 10,
    left: 300
  },
  swiper: { flex: 1 },
  page: {
    flex: 1
    // position: 'relative'
  },
  pageText: {
    position: 'absolute',
    bottom: 5,
    left: 5
  }
};

export default Carousel;
