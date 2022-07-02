import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

export default function Image({ photo }) {
  console.log(photo);
  return (
    <form>
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
            control={<Radio />}
            label="Default"
          />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="small" control={<Radio />} label="Small" />
          <FormControlLabel value="mini" control={<Radio />} label="Mini" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        sx={{ flexGrow: 1, margin: "10px auto 30px auto", width: "40%" }}
      >
        <Typography variant="h5">Resize Image</Typography>
      </Button>
    </form>
  );
}
