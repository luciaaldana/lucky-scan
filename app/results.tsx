import { useRoute } from '@react-navigation/native';
import { useRenderState } from '@/hooks/useRenderState';
import useScrape from '@/hooks/useScrape';
import LotteryResults from '@/components/LotteryResults';

export default function Results() {
  const route = useRoute() as { params: { numbers: string } };
  const { data, loading, error } = useScrape();

  const numbers: string = route.params?.numbers ? JSON.parse(route.params.numbers) : [];

  const renderedComponent = useRenderState(
    loading,
    error,
    data,
    {
      success: LotteryResults,
    },
    {
      numbers,
    }
  );

  return renderedComponent;
}
