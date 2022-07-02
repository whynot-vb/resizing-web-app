import axios from "axios";
import React, { Fragment, useState } from "react";

import Image from "./Image";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // Object.values(files).forEach((file) => {
    //   formData.append("uploadImages", file);
    // });
    // console.log(files);

    const filesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    console.log(filesArray);

    setSelectedFiles(filesArray);
    Array.from(files).map(
      (file) => URL.revokeObjectURL(file) // avoid memory leak
    );

    console.log(selectedFiles);

    // try {
    //   const res = await API.post("/api/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(res);
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     console.log(err);
    //   } else {
    //     console.log(err.response.data.msg);
    //   }
    // }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="file"
            id="file"
            name="uploadImages"
            multiple
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Upload" />
      </form>
      <div
        style={{
          width: "95%",
          margin: "100px auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {selectedFiles?.map((photo) => {
          return <Image key={photo} photo={photo} />;
        })}
      </div>
    </Fragment>
  );
};

export default FileUpload;
