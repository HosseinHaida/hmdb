import axios from "axios";

const http = axios.create({
  validateStatus(status) {
    return status < 500;
  }
});

export default http;
