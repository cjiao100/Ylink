import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
          height={200}
          horizontal={true}
          autoplay={true}
          autoplayTimeout={3}
          showsButtons={false}
          paginationStyle={carouselStyle.pagination}
          activeDotColor={color.primary_color}
          dotColor={color.info_color}>
          <View style={carouselStyle.page}>
            <Text style={carouselStyle.pageText}>First page</Text>
          </View>
          <View style={carouselStyle.page}>
            <Text style={carouselStyle.pageText}>Second page</Text>
          </View>
        </Swiper>
      </View>
    );
  }
}

const carouselStyle = {
  viewPager: {
    display: 'flex',
    margin: 5,
    height: 150,
    borderRadius: 10,
    backgroundColor: color.white_color
  },
  pagination: {
    bottom: 10,
    left: 300
  },
  page: {
    flex: 1,
    position: 'relative'
  },
  pageText: {
    position: 'absolute',
    bottom: 5,
    left: 5
  }
};

export default Carousel;
