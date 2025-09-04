import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function for conditional className merging
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
