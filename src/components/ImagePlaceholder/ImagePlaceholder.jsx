import './ImagePlaceholder.css'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round', strokeLinejoin: 'round' }

const motifs = {
  archive: (
    <>
      {/* מפה מקופלת */}
      <path {...S} d="M12 96V40l26-8 26 8 26-8v56l-26 8-26-8z" />
      <path {...S} d="M38 32v56M64 40v56" />
      <path {...S} d="M18 62c8-6 16-6 24 0s16 6 24 0 16-6 24 0" />
      <path {...S} d="M20 78c10-4 20-4 30 0" />
      {/* תיק מסמכים */}
      <path {...S} d="M104 44h72a6 6 0 0 1 6 6v46h-78z" />
      <path {...S} d="M104 56h78" />
      <path {...S} d="M118 44V34h44v10" />
      <circle {...S} cx="143" cy="76" r="7" />
      <path {...S} d="M143 83v9" />
      <path {...S} d="M8 100h184" />
    </>
  ),
  desk: (
    <>
      <path {...S} d="M18 100h164" />
      <path {...S} d="M40 46h56v40H40z" />
      <path {...S} d="M40 60h56M68 46v40" />
      <path {...S} d="M118 100V58" />
      <path {...S} d="M104 58h28l-6-14h-16z" />
      <path {...S} d="M112 100h12" />
      <path {...S} d="M140 86h34v14h-34z" />
      <path {...S} d="M140 92h34" />
      <circle {...S} cx="118" cy="70" r="3" />
    </>
  ),
  magnifier: (
    <>
      <path {...S} d="M26 92V34h68v58z" />
      <path {...S} d="M38 46h44M38 56h44M38 66h30" />
      <circle {...S} cx="126" cy="58" r="26" />
      <path {...S} d="m145 78 22 22" />
      <path {...S} d="M14 100h172" />
    </>
  ),
  globe: (
    <>
      <circle {...S} cx="100" cy="62" r="40" />
      <path {...S} d="M100 22c14 12 14 68 0 80M100 22c-14 12-14 68 0 80" />
      <path {...S} d="M62 46h76M62 78h76M60 62h80" />
      <path {...S} d="M18 100h164" />
    </>
  ),
  city: (
    <>
      <path {...S} d="M18 100h164" />
      <path {...S} d="M34 100V60h26v40M60 100V44h30v56M90 100V70h26v30M116 100V52h28v48M144 100V74h24v26" />
      <path {...S} d="M42 68h8M42 80h8M68 54h10M68 68h10M68 82h10M124 62h10M124 76h10" />
    </>
  ),
  folders: (
    <>
      <path {...S} d="M28 96h144M32 84h136M38 72h124M44 60h112" />
      <path {...S} d="M56 48h92v12H56z" />
      <path {...S} d="M76 30h56v18H76z" />
      <path {...S} d="M104 30v18" />
    </>
  ),
  generic: (
    <>
      <path {...S} d="M30 30h140v72H30z" />
      <path {...S} d="m30 84 36-30 26 22 24-20 54 40" />
      <circle {...S} cx="62" cy="50" r="8" />
    </>
  ),
}

export default function ImagePlaceholder({
  label,
  motif = 'generic',
  ratio = '16 / 9',
  className = '',
  minHeight,
}) {
  return (
    <figure
      className={`imgph ${className}`}
      style={{ aspectRatio: minHeight ? undefined : ratio, minHeight }}
      role="img"
      aria-label={label}
    >
      <span className="imgph__corner imgph__corner--tr" aria-hidden="true" />
      <span className="imgph__corner imgph__corner--tl" aria-hidden="true" />
      <span className="imgph__corner imgph__corner--br" aria-hidden="true" />
      <span className="imgph__corner imgph__corner--bl" aria-hidden="true" />
      <svg className="imgph__art" viewBox="0 0 200 120" aria-hidden="true" focusable="false">
        {motifs[motif] || motifs.generic}
      </svg>
    </figure>
  )
}
