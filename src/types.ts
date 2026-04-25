/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum StudyStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface StudyTask {
  id: string;
  subject: string;
  taskName: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  status: StudyStatus;
  color: string;
  priority: Priority;
  date: string; // YYYY-MM-DD
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  streak: number;
  lastActive: string; // YYYY-MM-DD
  points: number;
  badges: string[];
}

export interface StudyTip {
  id: string;
  title: string;
  content: string;
  category: 'motivation' | 'technique' | 'subject-guide';
}
