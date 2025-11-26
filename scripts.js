const yesBtn = document.getElementById('yesBtn');
const noBtn  = document.getElementById('noBtn');
const note   = document.getElementById('choiceNote');

function setChoice(choice){
  const yes = choice === 'yes';
  yesBtn.setAttribute('aria-pressed', String(yes));
  noBtn.setAttribute('aria-pressed', String(!yes));
  note.textContent = yes ? 'You chose: YES' : 'You chose: NO';
  // TODO: plug your actions here, e.g. redirect or open modal
  // if (yes) location.href = 'next.html';
}
// === Typewriter for paragraphs with class="tw" ===
// Types each paragraph in sequence. Respects punctuation with tiny pauses.
document.addEventListener('DOMContentLoaded', () => {
  const paras = Array.from(document.querySelectorAll('.tw'));
  if (!paras.length) return; // run only on pages that need it

  // Extract & clear original text
  const texts = paras.map(p => {
    const txt = p.textContent.trim();
    p.textContent = ''; // clear for typing
    return txt;
  });

  const baseSpeed = 24;        // ms per char (tweak to taste)
  const paraPause = 350;       // pause between paragraphs
  const punctExtra = 200;      // extra pause after .,!?;—…
  const punctRegex = /[.,!?;:—…]/;

  let pIdx = 0;

  const typeNextParagraph = () => {
    if (pIdx >= paras.length) return;
    const el = paras[pIdx];
    const text = texts[pIdx];
    el.classList.add('is-typing');

    let i = 0;
    const typeChar = () => {
      if (i > text.length) {
        el.classList.remove('is-typing');
        pIdx++;
        setTimeout(typeNextParagraph, paraPause);
        return;
      }
      el.textContent = text.slice(0, i);
      // compute delay for next char
      let delay = baseSpeed;
      const prev = text[i - 1];
      if (prev && punctRegex.test(prev)) delay += punctExtra;
      setTimeout(() => {
        i++;
        typeChar();
      }, delay);
    };
    typeChar();
  };

  typeNextParagraph();
});
