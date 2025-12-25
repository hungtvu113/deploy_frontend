-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 04, 2025 lúc 07:31 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tuvannnghenghiep`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bailamtracnghiem`
--

CREATE TABLE `bailamtracnghiem` (
  `MaBaiLam` int(11) NOT NULL,
  `MaNguoiDung` int(11) NOT NULL,
  `ThoiGian` datetime DEFAULT current_timestamp(),
  `TongDiem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cauhoi`
--

CREATE TABLE `cauhoi` (
  `MaCauHoi` int(11) NOT NULL,
  `NoiDung` text NOT NULL,
  `LoaiCauHoi` varchar(50) NOT NULL,
  `ThuTu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietbailam`
--

CREATE TABLE `chitietbailam` (
  `MaChiTiet` int(11) NOT NULL,
  `MaBaiLam` int(11) NOT NULL,
  `MaCauHoi` int(11) NOT NULL,
  `MaLuaChon` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ketquatuvan`
--

CREATE TABLE `ketquatuvan` (
  `MaKetQua` int(11) NOT NULL,
  `MaBaiLam` int(11) NOT NULL,
  `MaNghe` int(11) NOT NULL,
  `TyLePhuHop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichsutuvan`
--

CREATE TABLE `lichsutuvan` (
  `MaLichSu` int(11) NOT NULL,
  `MaNguoiDung` int(11) NOT NULL,
  `MaKetQua` int(11) NOT NULL,
  `ThoiGian` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `luachon`
--

CREATE TABLE `luachon` (
  `MaLuaChon` int(11) NOT NULL,
  `MaCauHoi` int(11) NOT NULL,
  `NoiDung` text NOT NULL,
  `Diem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nghenghiep`
--

CREATE TABLE `nghenghiep` (
  `MaNghe` int(11) NOT NULL,
  `MaNhom` int(11) NOT NULL,
  `TenNghe` varchar(200) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `LuongTB` decimal(18,2) DEFAULT NULL,
  `KyNangCanThiet` text DEFAULT NULL,
  `XuHuong` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `MaNguoiDung` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `VaiTro` varchar(20) NOT NULL,
  `NgayTao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhomnganh`
--

CREATE TABLE `nhomnganh` (
  `MaNhom` int(11) NOT NULL,
  `TenNhom` varchar(200) NOT NULL,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bailamtracnghiem`
--
ALTER TABLE `bailamtracnghiem`
  ADD PRIMARY KEY (`MaBaiLam`),
  ADD KEY `MaNguoiDung` (`MaNguoiDung`);

--
-- Chỉ mục cho bảng `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD PRIMARY KEY (`MaCauHoi`);

--
-- Chỉ mục cho bảng `chitietbailam`
--
ALTER TABLE `chitietbailam`
  ADD PRIMARY KEY (`MaChiTiet`),
  ADD KEY `MaBaiLam` (`MaBaiLam`),
  ADD KEY `MaCauHoi` (`MaCauHoi`),
  ADD KEY `MaLuaChon` (`MaLuaChon`);

--
-- Chỉ mục cho bảng `ketquatuvan`
--
ALTER TABLE `ketquatuvan`
  ADD PRIMARY KEY (`MaKetQua`),
  ADD KEY `MaBaiLam` (`MaBaiLam`),
  ADD KEY `MaNghe` (`MaNghe`);

--
-- Chỉ mục cho bảng `lichsutuvan`
--
ALTER TABLE `lichsutuvan`
  ADD PRIMARY KEY (`MaLichSu`),
  ADD KEY `MaNguoiDung` (`MaNguoiDung`),
  ADD KEY `MaKetQua` (`MaKetQua`);

--
-- Chỉ mục cho bảng `luachon`
--
ALTER TABLE `luachon`
  ADD PRIMARY KEY (`MaLuaChon`),
  ADD KEY `MaCauHoi` (`MaCauHoi`);

--
-- Chỉ mục cho bảng `nghenghiep`
--
ALTER TABLE `nghenghiep`
  ADD PRIMARY KEY (`MaNghe`),
  ADD KEY `MaNhom` (`MaNhom`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`MaNguoiDung`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Chỉ mục cho bảng `nhomnganh`
--
ALTER TABLE `nhomnganh`
  ADD PRIMARY KEY (`MaNhom`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bailamtracnghiem`
--
ALTER TABLE `bailamtracnghiem`
  MODIFY `MaBaiLam` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cauhoi`
--
ALTER TABLE `cauhoi`
  MODIFY `MaCauHoi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chitietbailam`
--
ALTER TABLE `chitietbailam`
  MODIFY `MaChiTiet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `ketquatuvan`
--
ALTER TABLE `ketquatuvan`
  MODIFY `MaKetQua` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lichsutuvan`
--
ALTER TABLE `lichsutuvan`
  MODIFY `MaLichSu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `luachon`
--
ALTER TABLE `luachon`
  MODIFY `MaLuaChon` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nghenghiep`
--
ALTER TABLE `nghenghiep`
  MODIFY `MaNghe` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `MaNguoiDung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nhomnganh`
--
ALTER TABLE `nhomnganh`
  MODIFY `MaNhom` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bailamtracnghiem`
--
ALTER TABLE `bailamtracnghiem`
  ADD CONSTRAINT `bailamtracnghiem_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `chitietbailam`
--
ALTER TABLE `chitietbailam`
  ADD CONSTRAINT `chitietbailam_ibfk_1` FOREIGN KEY (`MaBaiLam`) REFERENCES `bailamtracnghiem` (`MaBaiLam`) ON DELETE CASCADE,
  ADD CONSTRAINT `chitietbailam_ibfk_2` FOREIGN KEY (`MaCauHoi`) REFERENCES `cauhoi` (`MaCauHoi`),
  ADD CONSTRAINT `chitietbailam_ibfk_3` FOREIGN KEY (`MaLuaChon`) REFERENCES `luachon` (`MaLuaChon`);

--
-- Các ràng buộc cho bảng `ketquatuvan`
--
ALTER TABLE `ketquatuvan`
  ADD CONSTRAINT `ketquatuvan_ibfk_1` FOREIGN KEY (`MaBaiLam`) REFERENCES `bailamtracnghiem` (`MaBaiLam`) ON DELETE CASCADE,
  ADD CONSTRAINT `ketquatuvan_ibfk_2` FOREIGN KEY (`MaNghe`) REFERENCES `nghenghiep` (`MaNghe`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lichsutuvan`
--
ALTER TABLE `lichsutuvan`
  ADD CONSTRAINT `lichsutuvan_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`),
  ADD CONSTRAINT `lichsutuvan_ibfk_2` FOREIGN KEY (`MaKetQua`) REFERENCES `ketquatuvan` (`MaKetQua`);

--
-- Các ràng buộc cho bảng `luachon`
--
ALTER TABLE `luachon`
  ADD CONSTRAINT `luachon_ibfk_1` FOREIGN KEY (`MaCauHoi`) REFERENCES `cauhoi` (`MaCauHoi`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `nghenghiep`
--
ALTER TABLE `nghenghiep`
  ADD CONSTRAINT `nghenghiep_ibfk_1` FOREIGN KEY (`MaNhom`) REFERENCES `nhomnganh` (`MaNhom`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
