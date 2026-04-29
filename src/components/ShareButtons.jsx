import React from 'react';

function buildShareUrl(baseUrl, path) {
  const trimmedBase = (baseUrl || '').replace(/\/$/, '');
  const normalizedPath = (path || '/').startsWith('/') ? path : `/${path}`;
  return `${trimmedBase}${normalizedPath}`;
}

export default function ShareButtons({
  title = 'Reuben Wairicu Foundation',
  text = 'Join us in restoring dignity across Kenya.',
  path = '/',
  className = '',
}) {
  const shareUrl = buildShareUrl(window.location.origin, path);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${text} ${shareUrl}`);

  const onNativeShare = async () => {
    if (!navigator.share) return false;
    try {
      await navigator.share({ title, text, url: shareUrl });
      return true;
    } catch {
      return false;
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={onNativeShare}
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
      >
        Share
      </button>
      <a
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
        href={`https://wa.me/?text=${encodedText}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <a
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
      >
        Copy link
      </button>
    </div>
  );
}

