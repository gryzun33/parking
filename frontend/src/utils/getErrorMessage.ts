import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ('status' in error) {
    if (error.data && typeof error.data === 'object') {
      if ('message' in error.data && typeof error.data.message === 'string') {
        return error.data.message;
      }
    }

    return 'error' in error
      ? error.error
      : JSON.stringify(error.data) || 'Произошла ошибка';
  }

  if ('message' in error) {
    return error.message || 'Произошла ошибка';
  }

  return 'Произошла ошибка';
};
