#!/bin/sh
# Пересчитывает SHA-256 файла index.html и вписывает его в README.md.
#
# Зачем: README советует сверять контрольную сумму, и этот совет бесполезен, если
# сумма опубликована неверная. Протухшая сумма ХУЖЕ отсутствующей: человек сверит,
# не сойдётся, и решит, что ему подсунули подделку. Поэтому — запускать перед
# каждым пушем, где менялся index.html:
#
#   ./checksum.sh          проверить, совпадает ли опубликованная сумма
#   ./checksum.sh --write  пересчитать и вписать в README.md
set -eu
cd "$(dirname "$0")"

SUM=$(shasum -a 256 index.html | cut -d' ' -f1)
PUB=$(grep -oE '^`[a-f0-9]{64}`' README.md | tr -d '`' | head -1 || true)

if [ "${1:-}" = "--write" ]; then
  if [ -n "$PUB" ]; then
    # заменяем ранее опубликованную сумму
    /usr/bin/sed -i '' "s/^\`$PUB\`/\`$SUM\`/" README.md
    echo "README.md: $PUB -> $SUM"
  else
    echo "В README.md нет строки вида \`<64 hex>\` — впишите сумму вручную один раз:"
    echo "  $SUM"
    exit 1
  fi
  exit 0
fi

echo "index.html : $SUM"
echo "README.md  : ${PUB:-(не опубликована)}"
if [ "$SUM" = "${PUB:-}" ]; then
  echo "OK — опубликованная сумма актуальна."
else
  echo "РАСХОЖДЕНИЕ — запустите ./checksum.sh --write перед пушем."
  exit 1
fi
