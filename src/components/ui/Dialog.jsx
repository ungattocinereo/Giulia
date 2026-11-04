import React, { useEffect, useRef } from 'react';

export default function Dialog({ open = true, onClose, labelledBy, className = '', children }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const dialog = ref.current;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        dialog.querySelector('[data-dialog-focus]')?.focus({ preventScroll: true });
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
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
