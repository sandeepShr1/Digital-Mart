import React, { useState } from 'react';
import "./Header.css";
import { useNavigate } from "react-router-dom"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Dashboard, Person, ExitToApp, ListAlt } from "@mui/icons-material";
import { useAlert } from "react-alert";
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';
import { Backdrop } from '@mui/material';

const UserOptions = ({ user }) => {

      const [open, setOpen] = useState(false);
      const history = useNavigate();
      const alert = useAlert();
      const dispatch = useDispatch();

      const options = [
            { icon: <Person />, name: "Profile", func: account },
            { icon: <ListAlt />, name: "Orders", func: orders },
            { icon: <ExitToApp />, name: "Logout", func: logoutUser },
      ]

      if (user.role === "admin") {
            options.unshift({
                  icon: <Dashboard />,
                  name: "Dashboard",
                  func: dashboard
            })
      }

      function dashboard() {
            history("/admin/dashboard")
      }
      function account() {
            history("/account")
      }
      function orders() {
            history("/orders")
      }
      function logoutUser() {
            dispatch(logout());
            alert.success("Logout Successfully");
            history('/')
      }



      return (
            <>

                  <Backdrop open={open} style={{ zIndex: "10" }} />
                  <SpeedDial
                        ariaLabel='SpeedDial tooltip'
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        style={{ zIndex: "11" }}
                        icon={<img
                              className='speedDialIcon'
                              src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                              alt="Profile"
                        />}
                        direction="down"
                        className="speedDial"
                  >
                        {options.map((item) => (
                              <SpeedDialAction
                                    key={item.name}
                                    icon={item.icon}
                                    tooltipTitle={item.name}
                                    onClick={item.func}
                              />
                        ))}

                  </SpeedDial>
            </>
      )
}

export default UserOptions