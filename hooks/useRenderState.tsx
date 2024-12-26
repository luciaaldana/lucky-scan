import Spinner from '@/components/Spinner';
import React from 'react';
import { Text } from 'react-native';

type RenderState = 'loading' | 'error' | 'success';

type ComponentsMap = {
  loading: JSX.Element;
  error: JSX.Element;
  success: React.ComponentType<any> | JSX.Element;
};

export const useRenderState = (
  loading: boolean,
  error: string | null,
  data: any,
  customComponents?: Partial<ComponentsMap>,
  props?: Record<string, any>
): JSX.Element => {
  const defaultComponents: ComponentsMap = {
    loading: <Spinner />,
    error: <Text style={{ color: 'red' }}>Ha ocurrido un error</Text>,
    success: <Text>Datos cargados: {JSON.stringify(data)}</Text>,
  };

  const components = { ...defaultComponents, ...customComponents };

  const currentState: RenderState = loading ? 'loading' : error ? 'error' : 'success';

  if (currentState === 'success' && typeof components.success === 'function') {
    const SuccessComponent = components.success;
    return <SuccessComponent data={data} {...props} />;
  }

  return components[currentState] as JSX.Element;
};
