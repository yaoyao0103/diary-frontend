

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function UserListPage(props) {
  return (
    <div>
      <ListItem
        secondaryAction={<ListItemText edge="end" primary={props.total} />}
      >
        <ListItem>
          <ListItemText edge="start" primary={props.index} />
          <ListItemText primary={props.name} />
        </ListItem>
      </ListItem>
    </div>
  );
}

export default UserListPage;
