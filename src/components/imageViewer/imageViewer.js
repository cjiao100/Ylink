import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';

function Viewer(props) {
  const imageUrls = props.imageList.map(item => ({
    url: `http://192.168.43.111:5000${item.url}`
  }));
  return (
    <Modal visible={props.visible}>
      <ImageViewer
        imageUrls={imageUrls}
        enableSwipeDown={true}
        onCancel={props.closeModel}
        onClick={props.closeModel}
        saveToLocalByLongPress={false}
        index={props.currentImagIndex}
      />
    </Modal>
  );
}

export default Viewer;
