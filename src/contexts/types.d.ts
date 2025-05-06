export type User = {
  name: string;
  email: string;
};

export type SignInCredentials = {
  password: string;
  email: string;
};

export type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  signOut: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  authChecked: boolean; // Novo estado para controlar se a verificação foi concluída
};

export type AuthProviderProps = {
  children: ReactNode;
};
