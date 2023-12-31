import { useEffect } from 'react';

export const useDisableBodyScroll = (open: boolean | string) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
};