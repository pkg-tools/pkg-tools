import { style } from '@vanilla-extract/css';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '6rem',
  minHeight: '100vh',
  fontFamily: 'var(--font-mono)'
})

export const description = style({
  display: 'inherit',
  justifyContent: 'inherit',
  alignItems: 'inherit',
  fontSize: '0.85rem',
  maxWidth: 'var(--max-width)',
  width: '100%',
  zIndex: '2',
  fontFamily: 'var(--font-mono)',
  paddingBottom: '2em'
})

export const hero = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
});

export const h1 = style({
  fontSize: '3em',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px'
})


export const h2 = style({
  fontSize: '2em',
  fontWeight: 500
})

export const h3 = style({
  display: 'flex',
  fontSize: '1.25em',
  fontWeight: 500,
  alignItems: "center",
  gap: '6px'
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '10px'
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1em 0',
  gap: '10px'
})

export const steps = style({
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  maxWidth: 'var(--max-width)',
  width: '100%',
  padding: '18px 0'
})

export const step = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1
})

export const code = style({
  flex: 1,
  fontWeight: 700,
  fontFamily: 'var(--font-mono)'
})

export const stepTitle = style({
  padding: '10px 0'
})

export const footer = style({
  display: 'flex',
  paddingTop: '4em'
})
export const byCrowProse = style({
  display: 'flex',
  gap: '8px'
})


/*



.description a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.description p {
  position: relative;
  margin: 0;
  padding: 1rem 0;
}
*/
