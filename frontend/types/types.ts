import { ReactNode } from "react";

export type FormDataType = {
  name: string;
  role: string;
  techStack: string;
  experience: number;
  description: string;
  joiningDate: string;     
  //photoUrl?: string;
};

export interface Developer {
  _id: string;
  name: string;
  role: string;
  experience: number;
  description: string;
  joiningDate: string;
  techStack: string;
  photo?: string;
  photoUrl?: string;

  createdByEmail?: string;
}

export type DeveloperWithAuthor = Developer & {
  createdByName?: string;
  createdByEmail?: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
};


export type DevFormProps = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DevListProps = {
  refetch: boolean;
};

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export type AuthContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface AuthProviderProps {
  children: ReactNode;
}