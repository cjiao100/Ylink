import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';

function Viewer(props) {
  console.log(props);
  const imageUrls = props.imageList.map(item => ({
    url: `http://192.168.43.111:5000${item.url}`
  }));
  return (
    <Modal visible={props.visible}>
      <ImageViewer imageUrls={imageUrls} />
    </Modal>
  );
}

export default Viewer;
