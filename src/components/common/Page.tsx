import { PropsWithChildren } from "react";

interface PageProps {
  title: string;
}

const Page = ({ title, children }: PropsWithChildren<PageProps>) => {
  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-3xl font-bold mb-10">{title}</h1>
      {children}
    </main>
  );
};

export default Page;
