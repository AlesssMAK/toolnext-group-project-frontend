import { NewNoteContent } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteDraft {
  draft: NewNoteContent;
  setDraft: (note: NewNoteContent) => void;
  clearDraft: () => void;
}

const initialDraft: NewNoteContent = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
