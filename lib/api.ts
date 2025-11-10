import axios from "axios";
import type { Note } from "../types/note";

// Базова URL для всіх запитів
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// Функція для динамічного отримання заголовків з токеном
const getOptions = () => ({
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

// Отримати список нотаток
export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesProps> {
  const perPage = 12;
  const res = await axios.get<FetchNotesProps>("notes", {
    ...getOptions(),
    params: {
      search: query,
      page,
      perPage,
      tag,
    },
  });
  return res.data;
}

// Створити нову нотатку
export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await axios.post<Note>("notes", newNote, getOptions());
  return res.data;
}

// Видалити нотатку за ID
export async function deleteNote(id: string): Promise<Note> {
  const res = await axios.delete<Note>(`notes/${id}`, getOptions());
  return res.data;
}

// Отримати нотатку за ID
export async function fetchNoteById(id: string): Promise<Note> {
  const res = await axios.get<Note>(`notes/${id}`, getOptions());
  return res.data;
}
