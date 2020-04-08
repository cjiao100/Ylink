import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';

function Viewer(props) {
  const imageUrls = props.imageList.map(item => ({
    url: `${global.URI}${item.url}`
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
