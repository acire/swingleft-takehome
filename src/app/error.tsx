"use client";

import { css } from "styled-system/css";

const mainStyles = css({
  paddingX: { base: '4', md: '6' },
  paddingY: { base: '6', md: '8' },
  maxWidth: 'container.lg',
  margin: 'auto',
});

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className={mainStyles}>
      <h1 className={css({ fontSize: { base: 'xl', md: '2xl' }, fontWeight: 'bold', marginBottom: '4' })}>
        Oops! Something went wrong
      </h1>
      <p className={css({ color: 'gray.600', marginBottom: '4' })}>Error message: {error.message}</p>
      <button
        onClick={reset}
        className={css({
          padding: '2',
          paddingX: '4',
          backgroundColor: 'gray.500',
          color: 'white',
          borderRadius: 'md',
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'gray.600' },
        })}
      >
        Try again
      </button>
    </main>
  );
}