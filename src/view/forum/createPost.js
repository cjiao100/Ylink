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
      imageList: [],
      uploadImgUrl: []
    };

    this.selectImages = this.selectImages.bind(this);
    this.upload = this.upload.bind(this);
  }

  selectImages() {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        toast('取消选择');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.uri,
          status: 0,
          filename: response.fileName
        };
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
        const imageList = this.state.imageList.map(item => {
          if (res.filename === item.filename) {
            console.log(item);
            item.uri = `http://192.168.43.111:5000${res.url}`;
            item.status = 1;
          }
          return item;
        });
        this.setState(
          {
            imageList
          },
          () => {
            console.log(this.state.imageList);
          }
        );
      })
      .catch(err => {
        toast(err);
        const imageList = this.state.imageList.map(item => {
          if (err.filename === item.filename) {
            console.log(item);
            item.status = -1;
          }
          return item;
        });
        this.setState(
          {
            imageList
          },
          () => {
            console.log(this.state.imageList);
          }
        );
      });
  }
  renderTipButton(image) {
    let renderItem;
    switch (image.status) {
      case -1:
        renderItem = (
          <View style={styles.upload_background}>
            <Text style={styles.upload_background_text}>
              <Text>重新上传</Text>
              <Text> | </Text>
              <Text>删除</Text>
            </Text>
          </View>
        );
        break;
      case 0:
        renderItem = (
          <View style={styles.upload_background}>
            <Text style={styles.upload_background_text}>上传中</Text>
          </View>
        );
        break;
      case 1:
        renderItem = (
          <View style={styles.upload_background}>
            <Text style={styles.upload_background_text}>删除</Text>
          </View>
        );
        break;
    }

    return renderItem;
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
                imageStyle={{ borderRadius: 10 }}
                roundAsCircle={true}
                key={item.uri}
                source={item}>
                {this.renderTipButton(item)}
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
  upload_background: {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  upload_background_text: {
    width: 100,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: color.white_color,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
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
