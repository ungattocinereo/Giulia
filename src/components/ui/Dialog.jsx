import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { lockPageScroll } from '../../utils/scrollLock';

const useModalEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Dialog({ open = true, onClose, labelledBy, className = '', children }) {
    const ref = useRef(null);

    useModalEffect(() => {
        if (!open) return;
        const dialog = ref.current;
        const previousFocus = document.activeElement;
        const unlockScroll = lockPageScroll();
        dialog.showModal();
        dialog.querySelector('[data-dialog-focus]')?.focus({ preventScroll: true });
        return () => {
            dialog.close();
            unlockScroll();
            if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
        };
    }, [open]);

    const keepFocus = event => {
        if (event.key !== 'Tab' || event.target.closest('dialog') !== ref.current) return;
        const items = [...ref.current.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')]
            .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && element.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (!first) { event.preventDefault(); return; }
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first.focus();
        }
    };

    return <dialog ref={ref} aria-labelledby={labelledBy} className={`site-dialog ${className}`} onKeyDown={keepFocus} onCancel={event => { event.preventDefault(); onClose(); }}>{children}</dialog>;
}
