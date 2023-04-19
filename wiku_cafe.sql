-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Apr 2023 pada 15.33
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wiku_cafe`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksis`
--

CREATE TABLE `detail_transaksis` (
  `id` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mejas`
--

CREATE TABLE `mejas` (
  `id` int(11) NOT NULL,
  `nomor_meja` varchar(255) DEFAULT NULL,
  `status_meja` enum('kosong','tidak_kosong') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `mejas`
--

INSERT INTO `mejas` (`id`, `nomor_meja`, `status_meja`, `createdAt`, `updatedAt`) VALUES
(1, '1A', 'kosong', '2023-04-08 05:26:48', '2023-04-08 05:26:48'),
(2, '2A', 'tidak_kosong', '2023-04-08 05:27:59', '2023-04-18 06:59:03'),
(3, '3A', 'kosong', '2023-04-08 05:34:13', '2023-04-08 05:34:41'),
(5, '4A', 'tidak_kosong', '2023-04-08 05:36:02', '2023-04-08 05:40:18'),
(6, '5A', 'kosong', '2023-04-08 05:39:32', '2023-04-08 05:39:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `nama_menu` varchar(100) DEFAULT NULL,
  `jenis` enum('makanan','minuman') DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `menus`
--

INSERT INTO `menus` (`id`, `nama_menu`, `jenis`, `deskripsi`, `gambar`, `harga`, `stok`, `createdAt`, `updatedAt`) VALUES
(1, 'Nasi Goreng', 'makanan', 'nasi goreng udang wiku cafe', 'menu-1681804787615.jpeg', 10000, 5, '2023-04-18 07:56:48', '2023-04-18 07:59:47'),
(3, 'Cah Kangkung', 'makanan', 'cah kangkung wiku cafe', 'menu-1681805663497.jpg', 5000, 17, '2023-04-18 08:14:23', '2023-04-18 08:14:23'),
(4, 'Spaghetti', 'makanan', 'spaghetti toping keju wiku cafe', 'menu-1681805923259.jpeg', 11000, 12, '2023-04-18 08:18:43', '2023-04-18 08:18:43'),
(5, 'Milkshake Strawberry', 'minuman', 'milkshake rasa strawberry wiku cafe', 'menu-1681806167255.jpg', 10000, 20, '2023-04-18 08:22:47', '2023-04-18 08:22:47'),
(6, 'Es Teh Manis', 'minuman', 'es teh manis wiku cafe', 'menu-1681806368007.jpg', 4000, 15, '2023-04-18 08:26:08', '2023-04-18 08:26:08'),
(7, 'Kopi Susu', 'minuman', 'kopi susu wiku cafe', 'menu-1681806615103.jpeg', 5000, 23, '2023-04-18 08:30:15', '2023-04-18 08:30:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230407231711-create-user.js'),
('20230407231941-create-meja.js'),
('20230407232233-create-menu.js'),
('20230407232325-create-transaksi.js'),
('20230407232432-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksis`
--

CREATE TABLE `transaksis` (
  `id` int(11) NOT NULL,
  `tgl_transaksi` datetime DEFAULT NULL,
  `id_meja` int(11) NOT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `status` enum('belum_bayar','lunas') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_user` varchar(100) DEFAULT NULL,
  `role` enum('admin','kasir','manajer') DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama_user`, `role`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Ersa', 'admin', 'ersaputri', '01cfcd4f6b8770febfb40cb906715822', '2023-04-08 00:49:38', '2023-04-08 04:23:47'),
(3, 'Nia', 'kasir', 'niaa_', 'caf1a3dfb505ffed0d024130f58c5cfa', '2023-04-08 01:35:48', '2023-04-08 02:05:00'),
(6, 'putri', 'manajer', 'putri_', '202cb962ac59075b964b07152d234b70', '2023-04-08 02:46:03', '2023-04-08 02:46:03');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indeks untuk tabel `mejas`
--
ALTER TABLE `mejas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_meja` (`id_meja`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `mejas`
--
ALTER TABLE `mejas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD CONSTRAINT `detail_transaksis_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksis` (`id`),
  ADD CONSTRAINT `detail_transaksis_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menus` (`id`);

--
-- Ketidakleluasaan untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  ADD CONSTRAINT `transaksis_ibfk_1` FOREIGN KEY (`id_meja`) REFERENCES `mejas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
