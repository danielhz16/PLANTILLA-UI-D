import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { LottieRenderer } from 'lottie-react';

export interface UseAnimationOptions {
    /** Animación Lottie: JSON importado por path. */
    src: string | object;
    loop?: boolean;
    autoplay?: boolean;
    speed?: number;
    /** Se ejecuta cuando la animación llega al último fotograma (una pasada). */
    onComplete?: () => void;
    /** Se ejecuta cada vez que se completa un ciclo en bucle. */
    onLoopComplete?: () => void;
    className?: string;
    style?: CSSProperties;
}

interface LottiePropsShape {
    src: string | object;
    loop?: boolean;
    autoplay?: boolean;
    speed?: number;
    renderer?: LottieRenderer;
    subscriptions?: Partial<{
        complete: () => void;
        loopCompleted: () => void;
    }>;
    className?: string;
    style?: CSSProperties;
}

export const useAnimation = ({
    src,
    loop = true,
    autoplay = true,
    speed,
    onComplete,
    onLoopComplete,
    className,
    style,
}: UseAnimationOptions): LottiePropsShape => {
    const subscriptions = useMemo(() => {
        const subs: NonNullable<LottiePropsShape['subscriptions']> = {};
        if (onComplete) subs.complete = onComplete;
        if (onLoopComplete) subs.loopCompleted = onLoopComplete;
        return subs;
    }, [onComplete, onLoopComplete]);

    return useMemo(
        () => ({
            src,
            loop,
            autoplay,
            speed,
            subscriptions,
            className,
            style,
        }),
        [src, loop, autoplay, speed, subscriptions, className, style],
    );
};

export default useAnimation;