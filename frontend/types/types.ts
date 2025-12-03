export type FormData = {
  name: string;
  role: string;
  techStack: string;
  experience: number;
};

export type DevFormProps = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DevListProps = {
  refetch: boolean;
};