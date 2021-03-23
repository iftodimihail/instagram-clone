import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Progress, Upload } from "antd";
import { nanoid } from "nanoid";
import { auth, storage } from "utils/firebase";

function ProfileAvatarUpload({ isOpened, setIsOpened }) {
  const [file, setFile] = useState();
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
    const uploadTask = storage.ref(`avatars/${filename}`).put(file);

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
          .ref("avatars")
          .child(filename)
          .getDownloadURL()
          .then(async (photoURL) => {
            await auth.currentUser.updateProfile({
              photoURL,
            });

            setIsOpened(false);
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

export default ProfileAvatarUpload;
