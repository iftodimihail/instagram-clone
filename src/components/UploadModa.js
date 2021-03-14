import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Input, message, Modal, Progress, Upload } from "antd";
import { nanoid } from "nanoid";
import firebase, { db, storage } from "utils/firebase";

function UploadModal({ isOpened, setIsOpened, username }) {
  const [file, setFile] = useState();
  const [photoCaption, setPhotoCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const { Dragger } = Upload;

  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },

    fileList: file ? [file] : [],
  };

  const handleUpload = () => {
    const filename = `${file.name}_${nanoid()}`;
    const uploadTask = storage.ref(`images/${filename}`).put(file);

    uploadTask.on(
      "state_changed",
      // progress function
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      // error function
      (error) => message.error(`${filename} failed to upload.`),
      // complete function
      () => {
        storage
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(async (imageUrl) => {
            await db.collection("posts").add({
              caption: photoCaption,
              imageUrl,
              username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setIsOpened(false);
            setPhotoCaption("");
            setFile("");
            setProgress(0);
          });
      }
    );
  };

  return (
    <Modal
      title="Upload image"
      visible={isOpened}
      onCancel={() => setIsOpened(false)}
      onOk={handleUpload}
    >
      <Input
        value={photoCaption}
        placeholder="Enter photo caption..."
        onChange={(e) => setPhotoCaption(e.target.value)}
      />
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      <Progress percent={progress} />
    </Modal>
  );
}

export default UploadModal;
