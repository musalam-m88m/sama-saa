# ينسخ ملفات «سما صاع v3» لمجلد GitHub (sama-saa-site) ويرجّع وسوم معاينة الواتساب في index.html
param([string]$SiteUrl = 'https://musalam-m88m.github.io/sama-saa/')
$src = 'C:\Users\DELL\Desktop\SAA\سما صاع v3'
$dst = 'C:\Users\DELL\Desktop\SAA\sama-saa-site'
Copy-Item "$src\*" $dst -Recurse -Force

$q = "$dst\index.html"
$h = [IO.File]::ReadAllText($q, [Text.Encoding]::UTF8)
if (-not $h.Contains('og:image')) {
  $og = '<meta property="og:type" content="website"><meta property="og:site_name" content="سما صاع للعقارات"><meta property="og:title" content="سما صاع | إدارة العقارات"><meta property="og:description" content="الملاك والعقارات والعقود والتحصيل والصيانة والكشوفات في مكان واحد">' +
    "<meta property=`"og:url`" content=`"$SiteUrl`"><meta property=`"og:image`" content=`"${SiteUrl}og.jpg`">" +
    '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale" content="ar_AE"><meta name="twitter:card" content="summary_large_image"><meta name="description" content="سما صاع للعقارات — نظام إدارة العقارات">'
  $h = $h.Insert($h.IndexOf('</head>'), $og)
  [IO.File]::WriteAllText($q, $h, (New-Object Text.UTF8Encoding $false))
}
"synced; og tags: " + ([regex]::Matches($h, 'property="og:')).Count
