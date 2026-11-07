let activeLocks = 0;
let restoreStyles;

export function lockPageScroll() {
    if (activeLocks === 0) {
        const body = document.body;
        const root = document.documentElement;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const previousOverflow = root.style.overflowY;
        const previousStyles = Object.fromEntries(
            ['overflow', 'position', 'top', 'left', 'right'].map(property => [property, body.style[property]]),
        );
        const hasScrollbar = window.innerWidth > root.clientWidth;

        // Keep the existing viewport width, including at responsive breakpoints.
        // Fixing the body prevents scrolling while the scrollbar gutter stays reserved.
        root.style.overflowY = hasScrollbar ? 'scroll' : 'hidden';
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = `-${scrollX}px`;
        body.style.right = '0';

        restoreStyles = () => {
            Object.assign(body.style, previousStyles);
            root.style.overflowY = previousOverflow;
            window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
        };
    }

    activeLocks += 1;
    let released = false;
    return () => {
        if (released) return;
        released = true;
        activeLocks -= 1;
        if (activeLocks === 0) restoreStyles();
    };
}
