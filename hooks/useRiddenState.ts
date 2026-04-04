"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const LS_KEY = "ac_local_ridden_v1";

export interface RiddenState {
  riddenIds: Set<string>;
  markAsRidden: (id: string) => void;
  unmarkRidden: (id: string) => void;
  unsavedCount: number;
  /** ID of the most-recently marked pass (cleared after 1.5s) */
  justMarkedId: string | null;
  /** Whether the save-progress modal should be shown */
  showSaveModal: boolean;
  dismissSaveModal: () => void;
}

export function useRiddenState(): RiddenState {
  const [riddenIds, setRiddenIds] = useState<Set<string>>(new Set());
  const [justMarkedId, setJustMarkedId] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const modalShownRef = useRef(false);
  const justMarkedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setRiddenIds(new Set(JSON.parse(raw) as string[]));
    } catch { /* ignore */ }
  }, []);

  // Persist to localStorage whenever riddenIds changes
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(Array.from(riddenIds)));
    } catch { /* ignore */ }
  }, [riddenIds]);

  // Warn before leaving if there are unsaved passes
  useEffect(() => {
    if (riddenIds.size === 0) return;
    const handler = (e: BeforeUnloadEvent) => {
      const msg = `Du hast ${riddenIds.size} Pass${riddenIds.size !== 1 ? "e" : ""} markiert, die noch nicht gespeichert sind!`;
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [riddenIds.size]);

  const markAsRidden = useCallback((id: string) => {
    setRiddenIds(prev => {
      if (prev.has(id)) return prev;
      return new Set(Array.from(prev).concat(id));
    });

    // Flash animation trigger
    if (justMarkedTimerRef.current) clearTimeout(justMarkedTimerRef.current);
    setJustMarkedId(id);
    justMarkedTimerRef.current = setTimeout(() => setJustMarkedId(null), 1500);

    // Show save modal after 2.5s on first marking
    if (!modalShownRef.current) {
      if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
      modalTimerRef.current = setTimeout(() => {
        setShowSaveModal(true);
        modalShownRef.current = true;
      }, 2500);
    }
  }, []);

  const unmarkRidden = useCallback((id: string) => {
    setRiddenIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const dismissSaveModal = useCallback(() => setShowSaveModal(false), []);

  return {
    riddenIds,
    markAsRidden,
    unmarkRidden,
    unsavedCount: riddenIds.size,
    justMarkedId,
    showSaveModal,
    dismissSaveModal,
  };
}
