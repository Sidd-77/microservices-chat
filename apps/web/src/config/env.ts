const AUTH_URL = import.meta.env.VITE_AUTH_URL || "http://localhost:4000";
const DB_URL = import.meta.env.VITE_DB_URL || "http://localhost:4100";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4200";
const FILE_URL = import.meta.env.VITE_FILE_URL || "http://localhost:4300";
const NOTIFICATION_URL = import.meta.env.VITE_NOTIFICATION_URL || "http://localhost:4400";
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || "ADD_YOUR_VAPID_PUBLIC_KEY";

export { AUTH_URL, DB_URL, SOCKET_URL, FILE_URL, NOTIFICATION_URL, VAPID_PUBLIC_KEY };