import { useState, useCallback } from 'react';
import type { Task, IceValues } from '../types/task';
import { calculateIceScore, normalizeIceValues } from '../utils/ice';
import { sortTasksByPriority } from '../utils/taskSort';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createTask = useCallback((name: string, description: string): string => {
    const taskId = crypto.randomUUID();
    const newTask: Task = {
      id: taskId,
      name,
      description,
      status: 'idle',
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
    return taskId;
  }, []);

  const updateIceValues = useCallback((taskId: string, iceValues: Partial<IceValues>) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const normalized = normalizeIceValues(iceValues);
        const iceScore = calculateIceScore(normalized.impact, normalized.confidence, normalized.ease);

        return {
          ...task,
          impact: normalized.impact,
          confidence: normalized.confidence,
          ease: normalized.ease,
          iceScore,
        };
      })
    );
  }, []);

  const selectTask = useCallback((taskId: string | null) => {
    setSelectedTaskId(taskId);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const getSelectedTask = useCallback((): Task | undefined => {
    return tasks.find((task) => task.id === selectedTaskId);
  }, [tasks, selectedTaskId]);

  const getSortedTasks = useCallback((): Task[] => {
    return sortTasksByPriority(tasks);
  }, [tasks]);

  return {
    tasks: getSortedTasks(),
    selectedTaskId,
    isModalOpen,
    createTask,
    updateIceValues,
    selectTask,
    openModal,
    closeModal,
    getSelectedTask,
  };
};
