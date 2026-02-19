import { css } from "styled-system/css";

const mainStyles = css({
  paddingX: { base: '4', md: '6' },
  paddingY: { base: '6', md: '8' },
  maxWidth: 'container.lg',
  margin: 'auto',
});

const spinnerStyles = css({
  width: '8',
  height: '8',
  border: '3px solid',
  borderColor: 'gray.200',
  borderTopColor: 'blue.500',
  borderRadius: 'full',
  animation: 'spin 0.6s linear infinite',
});

export default function Loading() {
  return (
    <main className={mainStyles}>
      <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3', paddingY: '16' })}>
        <div className={spinnerStyles} />
        <h1 className={css({ fontSize: { base: 'xl', md: '2xl' }, fontWeight: 'bold', marginBottom: '4' })}>
          Loading...
        </h1>
      </div>
    </main>
  );
}