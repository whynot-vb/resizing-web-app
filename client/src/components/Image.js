import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertToDisplay from "./AlertToDisplay";
import { saveAs } from "file-saver";

import { displayAlert } from "../actionCreators/photos";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

async function postImage({ image, size }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("size", size);

  const result = await API.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(result.data.imagePath);
  return result.data.imagePath;
}

export default function Image({ photo, file }) {
  const showAlert = useSelector((state) => state.photos.showAlert);
  const dispatch = useDispatch();
  const [size, setSize] = useState("default");
  const [isResizingSuccess, setIsResizingSuccess] = useState(false);
  const [sourceResize, setSourceResize] = useState("");
  const saveFile = () => {
    saveAs(`${sourceResize}`, `${sourceResize}`);
  };

  const handleSubmit = async (event) => {
    if (size !== "default") {
      dispatch(displayAlert("success", "Waiting to process the image"));
      event.preventDefault();
      try {
        const filePath = await postImage({ image: file, size });
        setSourceResize(filePath);
        setIsResizingSuccess(true);

        dispatch(displayAlert("success", "Image processed successfully"));
        setTimeout(
          () => async () => {
            await API.delete(`/images/${sourceResize}`);
          },
          30000
        );
      } catch (error) {
        dispatch(displayAlert("error", "Image processed failed"));
      }
    }
  };

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <>
      {" "}
      {!isResizingSuccess && (
        <form onSubmit={handleSubmit}>
          <img src={photo} key={photo} width="100%" height="100%" alt="pho" />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Choose Size
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="default"
                disabled
                checked={size === "default"}
                onChange={handleChange}
                control={<Radio />}
                label="Default"
              />
              <FormControlLabel
                value="medium"
                checked={size === "medium"}
                onChange={handleChange}
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="small"
                checked={size === "small"}
                onChange={handleChange}
                control={<Radio />}
                label="Small"
              />
              <FormControlLabel
                value="mini"
                checked={size === "mini"}
                onChange={handleChange}
                control={<Radio />}
                label="Mini"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ flexGrow: 1, margin: "10px auto 30px auto", width: "40%" }}
          >
            <Typography variant="h5">Resize Image</Typography>
          </Button>
          {showAlert && <AlertToDisplay />}
        </form>
      )}
      {isResizingSuccess && (
        <>
          <img src={sourceResize} alt="Resize source" />

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={saveFile}
            sx={{ flexGrow: 1, margin: "10px auto 30px auto", width: "100%" }}
          >
            <Typography variant="h5">Download Image</Typography>
          </Button>
        </>
      )}
    </>
  );
}
