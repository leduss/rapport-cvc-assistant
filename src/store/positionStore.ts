// src/store/positionStore.ts
import { create } from 'zustand';

export const usePositionStore = create<{
  position: { lat: number; lon: number } | null;
  setPosition: (pos: { lat: number; lon: number }) => void;
}>((set) => ({
  position: null,
  setPosition: (position) => set({ position }),
}));
