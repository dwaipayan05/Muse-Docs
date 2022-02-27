import dynamic from 'next/dynamic';

const Output = () => {
  //@ts-ignore
  const MidiConverter = dynamic(() => import('../components/MidiConvert'), {
    ssr: false,
  });

  return <MidiConverter />;
};
export default Output;