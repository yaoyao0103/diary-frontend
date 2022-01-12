
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import UserIdList from "./UserIdList";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemSecondaryAction } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function UserIdListTable(props) {
  const userIds = [
    {
      name: "test",
      total: "4",
    },
    {
      name: "test2",
      total: "5",
    },
    {
      name: "test3",
      total: "4",
    },
    {
      name: "test4",
      total: "76",
    },
  ];

  return (
    <Box
      sx={{
        marginTop: 8,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}>
      <ListItem alignItems="center">
        <ListItemText edge="start" primary="No." />
        <ListItemText primary="Name" />
        <ListItemIcon>
          <ListItemText primary="Total." />
        </ListItemIcon>
        <ListItemIcon>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
      </ListItemIcon>
    </ListItem>
        <Divider />

        {userIds.map((userId, index) => (
          <>
            <UserIdList
              key={index}
              index={index + 1}
              name={userId.name}
              total={userId.total}
            />
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
}
