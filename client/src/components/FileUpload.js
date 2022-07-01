import axios from "axios";
import React, { Fragment, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("uploadImages", file);
    });

    const filesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setSelectedFiles(filesArray);
    Array.from(files).map(
      (file) => URL.revokeObjectURL(file) // avoid memory leak
    );

    try {
      const res = await API.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return (
        <>
          <img src={photo} key={photo} width="100%" height="100%" alt="pho" />
          <ButtonGroup
            size="large"
            variant="contained"
            aria-label="outlined primary button group"
            sx={{ flexGrow: 1, margin: "0px auto", width: "30%" }}
          >
            <Button key="one" sx={{ width: "33.3%" }}>
              Big{" "}
            </Button>
            <Button key="two" sx={{ width: "33.3%" }}>
              Medium{" "}
            </Button>
            <Button key="three" sx={{ width: "33.3%" }}>
              Small{" "}
            </Button>{" "}
          </ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            sx={{ flexGrow: 1, margin: "0px auto 30px auto", width: "30%" }}
          >
            Download Image
          </Button>
        </>
      );
    });
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
          width: "100%",
          margin: "100px auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderPhotos(selectedFiles)}
      </div>
    </Fragment>
  );
};

export default FileUpload;
