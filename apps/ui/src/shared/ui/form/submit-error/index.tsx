export const SubmitError = ({ message }: { message?: string | null | undefined }) => {
  if (!message) return null;

  return <span className='mt-3 text-[#d32f2f]'>{message}</span>;
};
