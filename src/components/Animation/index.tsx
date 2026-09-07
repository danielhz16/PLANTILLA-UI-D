import { Lottie } from 'lottie-react';
import { useAnimation, type UseAnimationOptions } from './useAnimation';

export type AnimationProps = UseAnimationOptions;

/** Renderiza una animación Lottie. Toda la lógica vive en useAnimation. */
export const Animation = (props: AnimationProps) => {
    const lottieProps = useAnimation(props);
    return <Lottie {...lottieProps} />;
};

export default Animation;