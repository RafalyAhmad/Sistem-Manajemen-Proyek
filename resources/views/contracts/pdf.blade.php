<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kontrak</title>
    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 12px;
        }
        h1 {
            text-align: center;
        }
    </style>
</head>
<body>

<h1>PERJANJIAN KONTRAK</h1>

<p>Nomor Kontrak: {{ $contract->contract_number }}</p>
<p>Tanggal: {{ \Carbon\Carbon::parse($contract->contract_date)->format('d M Y') }}</p>

<hr>

<p>
Kontrak ini dibuat antara:
</p>

<p>
<strong>Pihak Pertama:</strong><br>
Nama: {{ $contract->user->name }}
</p>

<p>
<strong>Pihak Kedua:</strong><br>
Proyek: {{ $contract->project->project_name }}
</p>

<br><br>

<p>Demikian kontrak ini dibuat untuk dipatuhi oleh kedua belah pihak.</p>

<br><br><br>

<table width="100%">
    <tr>
        <td>Pihak Pertama</td>
        <td align="right">Pihak Kedua</td>
    </tr>
</table>

</body>
</html>
