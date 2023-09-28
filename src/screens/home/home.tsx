import { Layout, LayoutMain } from '@/components/core/layout';
import reactLogo from '@/assets/react.svg';

export function Home() {
  return (
    <Layout>
      <LayoutMain>
        <div className="h-full max-w-7xl mx-auto my-20 md:my-0 flex flex-col place-content-center text-center">
          <div className="flex place-content-center mb-10">
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className="h-16 will-change-[filter] motion-safe:animate-spin-slow"
                alt="React logo"
              />
            </a>
          </div>
          <h1 className="text-5xl">Profiling React Apps</h1>
        </div>
      </LayoutMain>
    </Layout>
  );
}
