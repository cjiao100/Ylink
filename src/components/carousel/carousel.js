import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
import Swiper from 'react-native-swiper';

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
          activeDotColor="#E91B36"
          dotColor="#F5F5F5">
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
    backgroundColor: '#abc'
  },
  pagination: {
    bottom: 10,
    left: 300
  },
  activeDot: {
    backgroundColor: '#F5F5F5'
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
