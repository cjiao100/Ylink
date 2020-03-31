import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { color, font } from '../../assets/styles/theme';
import toast from '../../utils/toast';
import { uploadImage, requestWithToken } from '../../utils/request';

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
      imageList: [
        {
          filename: '3d79f75b68d9a420.png',
          status: 1,
          uri: '/post/3a7780533fbc109d68bd49eb733d2ad4.png'
        },
        {
          filename: 'S00331-09353973.jpg',
          status: 1,
          uri: '/post/799101e44be75b0082c6e0735cf29366.png'
        }
      ],
      title: '',
      content: '',
      disabled: true
    };
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableHighlight onPress={this.submit}>
            <Text style={styles.submit_button}>发布</Text>
          </TouchableHighlight>
        );
      }
    });

    this.selectImages = this.selectImages.bind(this);
    this.upload = this.upload.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.submit = this.submit.bind(this);
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
            item.uri = res.url;
            item.status = 1;
          }
          return item;
        });
        this.setState({
          imageList
        });
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
        this.setState({
          imageList
        });
      });
  }

  titleChange(text) {
    this.setState(
      {
        title: text
      },
      () => {
        this.disableSubmit();
      }
    );
  }
  contentChange(text) {
    this.setState(
      {
        content: text
      },
      () => {
        this.disableSubmit();
      }
    );
  }

  submit() {
    const { disabled, title, content, imageList } = this.state;
    if (!disabled) {
      const uploadImageUrl = imageList
        .filter(item => item.status === 1)
        .map(item => item.uri);

      const data = {
        title,
        content,
        images: uploadImageUrl
      };

      requestWithToken({
        url: '/post/add',
        method: 'Post',
        data
      })
        .then(res => {
          console.info(res);
          toast('发布成功');
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.warn(err);
          toast(err.message);
        });
    } else {
      toast('内容不全,请完善');
    }
  }

  disableSubmit() {
    const { title, content } = this.state;
    this.setState({
      disabled: title === '' || content === '' ? true : false
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
        <TextInput
          style={[styles.input, styles.input_title]}
          value={this.state.title}
          onChangeText={this.titleChange}
          maxLength={30}
          placeholder="来个标题~~"
        />
        <TextInput
          style={styles.input}
          value={this.state.content}
          onChangeText={this.contentChange}
          multiline={true}
          maxLength={200}
          placeholder="发点啥呢~~!"
        />
        <View style={styles.image_group}>
          {this.state.imageList.map(item => {
            return (
              <ImageBackground
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
                roundAsCircle={true}
                key={item.uri}
                source={{ uri: `http://192.168.43.111:5000${item.uri}` }}>
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
  },
  input: {
    margin: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: font.primary_size
  },
  input_title: {
    fontSize: font.big_size,
    fontWeight: 'bold'
  },
  submit_button: {
    color: color.white_color,
    fontSize: font.big_size,
    marginRight: 10
  }
});

export default CreatePost;
