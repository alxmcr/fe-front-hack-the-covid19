import axios from "axios";

import { HOST, PORT, API_VERSION } from "../config/backendServerConfig";

const baseDomain = `https://${HOST}:${PORT}`;

// The base URL
const baseURL = `${baseDomain}/api/${API_VERSION}/`;

export default axios.create({
  baseURL
});
