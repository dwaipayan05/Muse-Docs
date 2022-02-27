import dynamic from 'next/dynamic';


const Output = () => {
  const GenerateMelodies = dynamic(() => import('../components/meloGen'), {
    ssr: false,
  });

  return <GenerateMelodies />;
};
export default Output;
