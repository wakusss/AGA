import axios from "axios";

axios({
  method: "post",
  url: "/api/auth/login",
  data: {
    firstName: "email",
    lastName: "password",
  },
});
