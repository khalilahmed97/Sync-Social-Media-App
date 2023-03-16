import { Box } from "@mui/material";
import { useSelector } from "react-redux";
const UserImage = ({size = "60px" }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={user.picturePath.url}
      />
    </Box>
  );
};

export default UserImage;