# صورة معاينة الرابط (واتساب وغيره): 1200×630، شعار على لوح أبيض + الاسم
param([string]$Logo, [string]$Out)
Add-Type -AssemblyName System.Drawing
$W = 1200; $H = 630
$bmp = New-Object Drawing.Bitmap $W, $H
$g = [Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'; $g.InterpolationMode = 'HighQualityBicubic'

# خلفية بلون البراند (#0c77ad ينزل لكحلي)
$bg = New-Object Drawing.Drawing2D.LinearGradientBrush((New-Object Drawing.Point 0, 0), (New-Object Drawing.Point 0, $H), [Drawing.Color]::FromArgb(12, 119, 173), [Drawing.Color]::FromArgb(7, 20, 31))
$g.FillRectangle($bg, 0, 0, $W, $H)

# لوح أبيض مدوّر للشعار (عشان خط العلم الأبيض يبين)
$px = 70; $py = 115; $pw = 460; $ph = 400; $r = 36
$path = New-Object Drawing.Drawing2D.GraphicsPath
$path.AddArc($px, $py, $r, $r, 180, 90); $path.AddArc($px + $pw - $r, $py, $r, $r, 270, 90)
$path.AddArc($px + $pw - $r, $py + $ph - $r, $r, $r, 0, 90); $path.AddArc($px, $py + $ph - $r, $r, $r, 90, 90); $path.CloseFigure()
$g.FillPath([Drawing.Brushes]::White, $path)
$logoImg = [Drawing.Image]::FromFile($Logo)
$lw = 400; $lh = [int]($lw * $logoImg.Height / $logoImg.Width)
$g.DrawImage($logoImg, $px + ($pw - $lw) / 2, $py + ($ph - $lh) / 2, $lw, $lh)

# النصوص (عربي، من اليمين)
$sf = New-Object Drawing.StringFormat; $sf.FormatFlags = 'DirectionRightToLeft'; $sf.Alignment = 'Near'
$white = [Drawing.Brushes]::White
$soft = New-Object Drawing.SolidBrush([Drawing.Color]::FromArgb(224, 242, 254))
$f1 = New-Object Drawing.Font('Segoe UI', 64, [Drawing.FontStyle]::Bold)
$f2 = New-Object Drawing.Font('Segoe UI', 38, [Drawing.FontStyle]::Bold)
$f3 = New-Object Drawing.Font('Segoe UI', 24)
$box = { param($y, $hh) New-Object Drawing.RectangleF 580, $y, 560, $hh }
$g.DrawString('سما صاع', $f1, $white, (& $box 150 100), $sf)
$g.DrawString('إدارة العقارات', $f2, $white, (& $box 265 70), $sf)
$g.FillRectangle((New-Object Drawing.SolidBrush([Drawing.Color]::FromArgb(200, 16, 46))), 1040, 355, 100, 6)
$g.FillRectangle((New-Object Drawing.SolidBrush([Drawing.Color]::FromArgb(0, 157, 69))), 930, 355, 100, 6)
$g.DrawString('الملاك · العقارات · العقود · التحصيل · الصيانة · الكشوفات', $f3, $soft, (& $box 385 110), $sf)

$enc = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? MimeType -eq 'image/jpeg'
$ep = New-Object Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object Drawing.Imaging.EncoderParameter([Drawing.Imaging.Encoder]::Quality, [long]90)
$bmp.Save($Out, $enc, $ep)
$g.Dispose(); $bmp.Dispose(); $logoImg.Dispose()
"saved $Out"
