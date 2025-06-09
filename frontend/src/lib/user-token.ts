import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  sub: string;
  borderId: string;
  name: string;
  exp: number;
  isAdmin: boolean;
};

const STORAGE_KEY = "access_token";

export function getUserDecodedToken(): DecodedToken | null {
  try {
    const token = localStorage.getItem(STORAGE_KEY); // You can replace this if you pass token through props/context

    if (!token) {
      throw new Error("Token is missing");
    }

    return jwtDecode<DecodedToken>(token);
  } catch (e: any) {
    console.error("Cannot decode token", e);
    return null;
  }
}

export function clearUserSession() {
  localStorage.removeItem(STORAGE_KEY);
}
