import axios from "axios";

import { HOST, API_VERSION } from "../config/backendServerConfig";

const baseDomain = `https://${HOST}`;

// The base URL
const baseURL = `${baseDomain}/api/${API_VERSION}/`;
console.log("baseURL", baseURL);

export default axios.create({
  baseURL
});
