import { Button, Card, CardContent, CardHeader, Input, Typography } from "@mui/material";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "../toast/toastObserver";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

export default function LoginModal() {
  const [reveal, setReveal] = useState(false);
  const username = useRef("");
  const pass = useRef("");
  const navigate = useNavigate();
  const user = useMutation(api.users.confirmUser);

  const handleReveal = () => {
    setReveal(() => !reveal);
  };

  const handleLogin = async () => {
    const checkUser = await user({ username: username.current, password: pass.current });
    if (!checkUser) return toast.error("Invalid username or password");
    sessionStorage.setItem("user", checkUser || "");
    toast.success("Login successful");
    navigate("/monthlyBudget"); 
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Login" sx={{ maxWidth: 345, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)" }}>
        <CardHeader align="center" title="Login" />
        <CardContent sx={{textAlign: "left"}}>
          <Typography variant="h6" align="center">Username</Typography>
          <Input sx={{width: "95%"}} type="text" ref={username} onChange={(e) => (username.current = e.target.value)}/>
          <Typography variant="h6" align="center">Password</Typography>
          <Input
            sx={{padding: '4px 0 5px 5px', width: '95%'}}
            type={!reveal ? "password" : "text"}
            ref={pass}
            onChange={(e) => (pass.current = e.target.value)}
            endAdornment={!reveal ? <VisibilityIcon onClick={handleReveal} /> : <VisibilityOff onClick={handleReveal} />}
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                align: "center",
                margin: "10px",
                padding: "10px",
                justifyContent: "center",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}