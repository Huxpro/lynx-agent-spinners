import { Spinner, type SpinnerProps } from './Spinner';
import { dots } from '../data';

type NamedSpinnerProps = Omit<SpinnerProps, 'definition'>;

export { Spinner, type SpinnerProps, type NamedSpinnerProps };

export function DotsSpinner(props: NamedSpinnerProps) {
  return <Spinner definition={dots} {...props} />;
}
