import { Provider } from 'mobx-react';
import { rootStore } from '@/stores/rootStore';
import '@/styles/reset.css';

export default function App({ Component, pageProps }) {
  /**
   * getLayout 함수 정의getLayout 함수 정의
   * getLayout가 있으면 선언한 Layout에 맞춰 출력,
   * 없으면 기본 page만 출력될 수 있도록
   */
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <Provider {...rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
