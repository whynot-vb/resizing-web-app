import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export default function AlertToDisplay() {
  const alertType = useSelector((state) => state.photos.alertType);
  const alertText = useSelector((state) => state.photos.alertText);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={alertType}>
        <AlertTitle>{alertType}</AlertTitle>
        {alertText} — <strong>check it out!</strong>
      </Alert>
    </Stack>
  );
}
