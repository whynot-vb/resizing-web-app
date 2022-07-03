import axios from "axios";
import React, { Fragment, useState } from "react";

import Image from "./Image";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  return (
    <Fragment>
      <form>
        <div>
          <input
            style={{ display: "block", margin: "0 auto" }}
            type="file"
            id="file"
            name="Upload images"
            multiple
            onChange={onChange}
          />
        </div>
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
        {Array.from(files).map((file) => {
          return (
            <Image
              key={URL.createObjectURL(file)}
              file={file}
              photo={URL.createObjectURL(file)}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default FileUpload;
