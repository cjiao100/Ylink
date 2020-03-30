import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';
import { color } from '../../assets/styles/theme';
import toast from '../../utils/toast';
import { uploadImage } from '../../utils/request';

const options = {
  title: '选择文件',
  cancelButtonTitle: '取消',
  mediaType: 'photo',
  storageOptions: {
    path: 'images',
    skipBackup: true,
    cameraRoll: true
  }
};

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [{ uri: 'content://media/external/images/media/26' }]
    };

    this.selectImages = this.selectImages.bind(this);
  }

  selectImages() {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        toast('取消选择');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        const imageList = [...this.state.imageList];
        imageList.push(source);

        this.upload(response);
        this.setState({ imageList });
      }
    });
  }
  upload(source) {
    const formData = new FormData();
    formData.append('photo', {
      uri: source.uri,
      type: source.type,
      name: source.fileName
    });

    // console.log(formData.get('photo'));
    uploadImage({
      url: '/upload/post',
      method: 'Post',
      data: formData
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    return (
      <View>
        <TextInput placeholder="来个标题~~" />
        <TextInput multiline={true} maxLength={200} placeholder="发点啥呢~~!" />
        <View style={styles.image_group}>
          {this.state.imageList.map(item => {
            return (
              <ImageBackground
                style={styles.image}
                key={item.uri}
                source={item}>
                <Text>删除</Text>
              </ImageBackground>
            );
          })}
          <TouchableHighlight
            underlayColor={color.bg_info_color}
            onPress={this.selectImages}
            style={styles.upload}>
            <Text style={styles.upload_text}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image_group: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  upload: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    height: 100,
    width: 100,
    margin: 10
  },
  upload_text: {
    fontSize: 50,
    lineHeight: 100,
    textAlign: 'center'
  }
});

export default CreatePost;
