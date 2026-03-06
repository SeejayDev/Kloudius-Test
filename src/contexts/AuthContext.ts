import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_ALL_USERS_KEY = 'users'
const STORAGE_USER_KEY = 'user'

export interface UserData {
  email: string;
  name: string;
  password: string;
}

export type LoginActionData = Omit<UserData, 'name'>;
type CurrentUserData = Omit<UserData, 'password'>;

interface AuthContextType {
  user: CurrentUserData | null;
  login: (params: LoginActionData) => Promise<boolean>;
  signup: (params: UserData) => Promise<boolean>;
  logout: () => Promise<void>;
  restorePreviousLogin: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  login: async () => false,
  signup: async () => false,
  logout: async () => undefined,
  user: null,
  restorePreviousLogin: async () => undefined
});

export function useAuthContextValue(): AuthContextType {
  const [user, setUser] = useState<CurrentUserData | null>(null);

  async function getUsersList(): Promise<UserData[]> {
    const rawUsers = await AsyncStorage.getItem(STORAGE_ALL_USERS_KEY)
    return rawUsers ? JSON.parse(rawUsers) : [];
  }

  async function login({ email, password }: LoginActionData) {
    const users = await getUsersList()
    const matchingUser = users.find(user => {
      return user.email === email.toLowerCase() && user.password === password
    })

    if (matchingUser) {
      const loggedInUser = {
        email: matchingUser.email,
        name: matchingUser.name,
      };

      setUser(loggedInUser);

      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(loggedInUser))
    }

    return Boolean(matchingUser);
  }

  async function signup(newUser: UserData) {
    const existingUsers = await getUsersList();
    const isEmailTaken = existingUsers.some(
      u => u.email === newUser.email.toLowerCase(),
    );

    if (!isEmailTaken) {
      const formattedEntry = { ...newUser, email: newUser.email.toLowerCase() };
      const newUsersItem = JSON.stringify(
        existingUsers.concat([formattedEntry]),
      );

      await AsyncStorage.setItem(STORAGE_ALL_USERS_KEY, newUsersItem)
    }

    return !isEmailTaken;
  }

  async function logout() {
    await AsyncStorage.removeItem(STORAGE_USER_KEY)
    setUser(null);
  }

  async function restorePreviousLogin() {
    const loggedInUserEntry = await AsyncStorage.getItem(STORAGE_USER_KEY)
    const loggedInUser = loggedInUserEntry
      ? JSON.parse(loggedInUserEntry)
      : null;
    setUser(loggedInUser);
  }

  return { user, login, logout, signup, restorePreviousLogin };
}
