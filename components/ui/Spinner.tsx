export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="inline-block rounded-full border-2 animate-spin"
      style={{
        width: size,
        height: size,
        borderColor: 'rgba(201,168,76,0.2)',
        borderTopColor: '#C9A84C',
      }}
    />
  );
}
