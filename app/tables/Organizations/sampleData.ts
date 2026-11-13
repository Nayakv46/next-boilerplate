export interface Organization {
  id: string;
  name: string;
  description?: string | null | undefined;
  created_at: string;
  updated_at: string;
}

export const sampleRows = [
  {
    id: "",
    name: "Organization 1",
    description: "This is a sample organization.",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "",
    name: "Organization 2",
    description: "This is another sample organization.",
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
  },
  {
    id: "",
    name: "Organization 3",
    description: "This is yet another sample organization.",
    created_at: "2023-03-01T00:00:00Z",
    updated_at: "2023-03-01T00:00:00Z",
  },
];
