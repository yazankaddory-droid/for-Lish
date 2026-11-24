(() => {
  const $ = (id) => document.getElementById(id);
  const dlg = $('viewer'), frame = $('v'), letter = $('letter');
  const id = SITE.driveId;

  // ---- letter ----
  const add = (cls, text, inner) => {
    const p = document.createElement('p');
    if (cls) p.className = cls;
    if (inner) { const s = document.createElement('span'); s.textContent = text; p.appendChild(s); }
    else p.textContent = text;
    letter.appendChild(p);
  };
  add('hi', SITE.greeting);
  SITE.paragraphs.forEach((t) => add('', t));
  add('end', SITE.signoff, true);

  // ---- video: streams from Google Drive, with a download link as backup ----
  $('dl').href = `https://drive.google.com/uc?export=download&id=${id}`;

  // load the player only when the card opens, and unload it on close so the video stops
  $('open').addEventListener('click', () => {
    frame.src = `https://drive.google.com/file/d/${id}/preview`;
    dlg.showModal();
  });
  $('close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { frame.src = 'about:blank'; });
})();
