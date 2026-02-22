-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2026 at 01:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `providerAccountId` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(50) DEFAULT NULL,
  `scope` text DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `analytics`
--

CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `movieId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `event` varchar(100) NOT NULL,
  `metadata` text DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `userAgent` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `analytics`
--

INSERT INTO `analytics` (`id`, `movieId`, `userId`, `event`, `metadata`, `ip`, `userAgent`, `createdAt`) VALUES
(1, 71, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:48:20.736'),
(2, 71, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:48:30.493'),
(3, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:50:22.268'),
(4, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:50:31.842'),
(5, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:50:41.979'),
(6, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:50:47.376'),
(7, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:50:51.813'),
(8, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:50:52.136'),
(9, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:19.863'),
(10, 116, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt3758814\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:20.877'),
(11, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:29.863'),
(12, 116, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt3758814\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:31.464'),
(13, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:35.172'),
(14, 116, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt3758814\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:35.210'),
(15, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:43.054'),
(16, 118, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt3554046\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:43.915'),
(17, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:46.978'),
(18, 118, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt3554046\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:54:47.340'),
(19, 76, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0120768\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 13:56:19.366'),
(20, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:07.432'),
(21, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:07.450'),
(22, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:07.497'),
(23, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:07.521'),
(24, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:16.983'),
(25, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:17.024'),
(26, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:26.986'),
(27, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:27.037'),
(28, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:36.992'),
(29, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:37.043'),
(30, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:46.979'),
(31, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:47.025'),
(32, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:56.985'),
(33, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:05:57.064'),
(34, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:06:15.351'),
(35, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:06:15.394'),
(36, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:06:15.427'),
(37, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:06:25.215'),
(38, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:06:25.261'),
(39, 179, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0266987\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:07:52.505'),
(40, 179, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt0266987\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:07:57.765'),
(41, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:07.591'),
(42, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:07.657'),
(43, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:07.758'),
(44, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:07.795'),
(45, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:14.554'),
(46, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:14.617'),
(47, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:14.889'),
(48, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:17.650'),
(49, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:17.714'),
(50, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:18.720'),
(51, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:18.959'),
(52, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:22.307'),
(53, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:22.541'),
(54, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:24.538'),
(55, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:27.626'),
(56, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:27.667'),
(57, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:32.460'),
(58, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:34.524'),
(59, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:37.625'),
(60, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:37.697'),
(61, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:42.453'),
(62, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:44.530'),
(63, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:47.674'),
(64, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:47.728'),
(65, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:52.445'),
(66, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:08:54.526'),
(67, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:57.640'),
(68, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:08:57.700'),
(69, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:02.489'),
(70, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:04.526'),
(71, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:09:07.632'),
(72, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:09:07.685'),
(73, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:12.451'),
(74, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:14.542'),
(75, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:22.444'),
(76, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:24.529'),
(77, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:32.459'),
(78, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:34.521'),
(79, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:42.458'),
(80, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:44.546'),
(81, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:52.468'),
(82, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:09:54.526'),
(83, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:02.465'),
(84, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:04.530'),
(85, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:12.483'),
(86, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:10:12.665'),
(87, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:10:12.717'),
(88, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:14.524'),
(89, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:22.444'),
(90, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:24.522'),
(91, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:32.456'),
(92, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:34.524'),
(93, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:42.446'),
(94, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:44.522'),
(95, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:47.623'),
(96, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:10:47.698'),
(97, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:10:48.688'),
(98, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:10:48.786'),
(99, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:52.452'),
(100, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:10:54.524'),
(101, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:02.478'),
(102, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:04.527'),
(103, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:12.461'),
(104, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:12.660'),
(105, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:12.712'),
(106, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:14.527'),
(107, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:15.834'),
(108, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:15.975'),
(109, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:17.539'),
(110, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:22.690'),
(111, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:24.592'),
(112, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:25.885'),
(113, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:27.520'),
(114, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:32.715'),
(115, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:34.595'),
(116, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:35.910'),
(117, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:37.532'),
(118, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:42.724'),
(119, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:44.590'),
(120, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:45.879'),
(121, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:47.516'),
(122, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:52.698'),
(123, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:11:54.585'),
(124, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:55.899'),
(125, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:11:57.522'),
(126, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:12:02.707'),
(127, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:12:04.593'),
(128, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:05.885'),
(129, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:07.519'),
(130, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:12:12.717'),
(131, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:12:14.594'),
(132, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:15.878'),
(133, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:17.520'),
(134, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:25.888'),
(135, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:27.523'),
(136, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:35.900'),
(137, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:37.516'),
(138, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:45.873'),
(139, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:47.523'),
(140, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:55.896'),
(141, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:12:57.512'),
(142, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:05.915'),
(143, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:07.519'),
(144, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:13:12.719'),
(145, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:13:12.887'),
(146, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:15.886'),
(147, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:17.522'),
(148, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:25.890'),
(149, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:27.525'),
(150, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:35.904'),
(151, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:37.522'),
(152, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:45.884'),
(153, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:47.521'),
(154, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:55.923'),
(155, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:13:57.518'),
(156, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:05.917'),
(157, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:07.520'),
(158, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:14:12.799'),
(159, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:14:12.885'),
(160, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:15.885'),
(161, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:17.548'),
(162, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:25.941'),
(163, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:27.541'),
(164, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:35.897'),
(165, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:37.519'),
(166, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:45.901'),
(167, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:47.532'),
(168, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:55.920'),
(169, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:14:57.527'),
(170, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:05.902'),
(171, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:07.517'),
(172, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:12.813'),
(173, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:12.869'),
(174, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:15.885'),
(175, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:17.528'),
(176, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:25.893'),
(177, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:30.973'),
(178, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:31.498'),
(179, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:31.517');
INSERT INTO `analytics` (`id`, `movieId`, `userId`, `event`, `metadata`, `ip`, `userAgent`, `createdAt`) VALUES
(180, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:31.913'),
(181, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:32.074'),
(182, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:32.270'),
(183, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:32.691'),
(184, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:32.822'),
(185, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:40.421'),
(186, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:40.624'),
(187, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:41.771'),
(188, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:42.751'),
(189, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:50.428'),
(190, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:50.600'),
(191, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:15:51.754'),
(192, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:15:52.765'),
(193, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:00.426'),
(194, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:00.596'),
(195, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:01.719'),
(196, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:02.724'),
(197, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:10.418'),
(198, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:10.601'),
(199, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:11.731'),
(200, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:12.749'),
(201, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:20.425'),
(202, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:20.586'),
(203, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:21.697'),
(204, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:22.771'),
(205, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:30.423'),
(206, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:30.595'),
(207, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:31.768'),
(208, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:32.734'),
(209, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:40.413'),
(210, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:42.773'),
(211, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:46.874'),
(212, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:47.031'),
(213, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:47.536'),
(214, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:47.615'),
(215, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:47.657'),
(216, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:47.837'),
(217, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:56.638'),
(218, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:56.732'),
(219, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:16:57.718'),
(220, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:16:57.794'),
(221, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:06.592'),
(222, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:06.633'),
(223, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:07.556'),
(224, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:07.767'),
(225, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:16.587'),
(226, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:16.636'),
(227, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:17.541'),
(228, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:17.801'),
(229, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:26.600'),
(230, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:26.640'),
(231, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:27.670'),
(232, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:27.749'),
(233, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:36.583'),
(234, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:36.633'),
(235, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:37.569'),
(236, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:37.787'),
(237, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:17:46.588'),
(238, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:17:46.651'),
(239, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:24:46.354'),
(240, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:24:46.425'),
(241, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:24:47.083'),
(242, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:24:47.137'),
(243, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:24:47.540'),
(244, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:24:47.745'),
(245, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:24:48.214'),
(246, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:24:48.285'),
(247, 73, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 14:24:48.480'),
(248, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:24:56.605'),
(249, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:24:57.723'),
(250, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:06.598'),
(251, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:07.716'),
(252, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:16.596'),
(253, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:17.764'),
(254, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:26.581'),
(255, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:27.713'),
(256, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:36.578'),
(257, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:37.707'),
(258, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:46.581'),
(259, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:25:47.723'),
(260, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:26:12.721'),
(261, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:26:12.787'),
(262, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:27:12.727'),
(263, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:27:12.768'),
(264, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:28:12.722'),
(265, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:28:12.796'),
(266, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:29:12.732'),
(267, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:29:12.786'),
(268, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:30:12.760'),
(269, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:30:12.806'),
(270, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:31:12.777'),
(271, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:31:12.815'),
(272, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:32:12.739'),
(273, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:32:12.780'),
(274, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:33:12.740'),
(275, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:33:12.791'),
(276, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:34:12.721'),
(277, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:34:12.779'),
(278, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:35:12.752'),
(279, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:35:12.807'),
(280, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:36:12.747'),
(281, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:36:12.809'),
(282, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:37:12.720'),
(283, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:37:12.761'),
(284, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:38:12.741'),
(285, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:38:12.794'),
(286, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:39:12.752'),
(287, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:39:12.782'),
(288, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:40:12.716'),
(289, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:40:12.772'),
(290, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:41:12.734'),
(291, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:41:12.782'),
(292, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:42:12.785'),
(293, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:42:12.830'),
(294, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:43:12.710'),
(295, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:43:12.766'),
(296, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:44:12.716'),
(297, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:44:12.775'),
(298, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:45:12.732'),
(299, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:45:12.784'),
(300, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:46:12.719'),
(301, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:46:13.503'),
(302, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:47:12.725'),
(303, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:47:12.796'),
(304, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:48:12.765'),
(305, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:48:12.840'),
(306, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:49:12.718'),
(307, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:49:12.769'),
(308, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:50:12.723'),
(309, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:50:12.794'),
(310, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:51:12.704'),
(311, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:51:12.755'),
(312, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:52:12.757'),
(313, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:52:12.801'),
(314, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:53:12.748'),
(315, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:53:12.812'),
(316, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:54:12.717'),
(317, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:54:12.765'),
(318, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:55:12.721'),
(319, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:55:12.785'),
(320, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:56:12.725'),
(321, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:56:12.782'),
(322, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:57:12.715'),
(323, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:57:12.770'),
(324, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:58:12.713'),
(325, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:58:12.771'),
(326, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:59:12.751'),
(327, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 14:59:12.818'),
(328, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:00:12.725'),
(329, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:00:12.777'),
(330, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:01:12.706'),
(331, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:01:12.768'),
(332, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:02:12.719'),
(333, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:02:12.785'),
(334, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:03:12.705'),
(335, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:03:12.743'),
(336, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:04:12.705'),
(337, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:04:12.772'),
(338, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:05:12.750'),
(339, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:05:12.782'),
(340, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:06:12.714'),
(341, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:06:12.757'),
(342, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:07:12.711'),
(343, 73, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt8579674\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:07:12.779'),
(344, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:08:12.710'),
(345, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:08:12.756'),
(346, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:09:12.734'),
(347, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:09:12.776'),
(348, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:10:12.746'),
(349, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:10:12.810'),
(350, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:11:12.714'),
(351, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:11:12.758'),
(352, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:12:12.703'),
(353, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:12:12.772'),
(354, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:13:12.708'),
(355, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:13:12.765'),
(356, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:14:12.701'),
(357, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:14:12.748'),
(358, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:15:12.710'),
(359, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:15:12.777'),
(360, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:16:12.755'),
(361, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:16:12.796');
INSERT INTO `analytics` (`id`, `movieId`, `userId`, `event`, `metadata`, `ip`, `userAgent`, `createdAt`) VALUES
(362, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:17:12.719'),
(363, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:17:12.743'),
(364, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:18:12.716'),
(365, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:18:12.774'),
(366, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:19:12.713'),
(367, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:19:12.757'),
(368, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:20:12.748'),
(369, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:20:12.801'),
(370, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:21:12.733'),
(371, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:21:12.780'),
(372, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:22:12.770'),
(373, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:22:12.811'),
(374, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:23:12.703'),
(375, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:23:12.756'),
(376, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:24:12.695'),
(377, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:24:12.752'),
(378, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:25:12.719'),
(379, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:25:12.763'),
(380, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:26:12.738'),
(381, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:26:12.785'),
(382, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:27:12.750'),
(383, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:27:12.801'),
(384, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:28:12.696'),
(385, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:28:12.745'),
(386, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:29:12.702'),
(387, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:29:12.764'),
(388, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:30:12.711'),
(389, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:30:12.753'),
(390, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:31:12.704'),
(391, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:31:12.747'),
(392, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:32:12.717'),
(393, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:32:12.788'),
(394, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:33:12.755'),
(395, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:33:12.800'),
(396, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:34:12.716'),
(397, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:34:12.747'),
(398, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:35:12.730'),
(399, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:35:12.774'),
(400, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:36:12.720'),
(401, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:36:12.765'),
(402, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:37:12.746'),
(403, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:37:12.787'),
(404, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:38:12.765'),
(405, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:38:12.801'),
(406, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:39:12.715'),
(407, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:39:12.747'),
(408, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:40:12.705'),
(409, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:40:12.772'),
(410, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:41:12.726'),
(411, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:41:12.755'),
(412, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:42:12.756'),
(413, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:42:12.800'),
(414, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:43:12.737'),
(415, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:43:12.797'),
(416, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:44:12.700'),
(417, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:44:12.750'),
(418, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:45:12.722'),
(419, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:45:12.782'),
(420, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:46:13.246'),
(421, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:46:13.276'),
(422, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:47:12.707'),
(423, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:47:12.752'),
(424, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:48:12.698'),
(425, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:48:12.767'),
(426, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:49:12.764'),
(427, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:49:12.807'),
(428, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:50:12.704'),
(429, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:50:12.752'),
(430, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:51:12.721'),
(431, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:51:12.789'),
(432, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:52:12.722'),
(433, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:52:12.769'),
(434, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:53:12.726'),
(435, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:53:12.762'),
(436, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:54:12.744'),
(437, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:54:12.792'),
(438, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:55:12.692'),
(439, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:55:12.734'),
(440, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:56:12.712'),
(441, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:56:12.757'),
(442, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:57:12.693'),
(443, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:57:12.747'),
(444, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:58:12.703'),
(445, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:58:12.751'),
(446, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:59:12.698'),
(447, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 15:59:12.760'),
(448, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:00:12.737'),
(449, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:00:12.792'),
(450, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:01:12.714'),
(451, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:01:12.737'),
(452, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:02:12.711'),
(453, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:02:12.776'),
(454, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:03:12.723'),
(455, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:03:12.767'),
(456, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:04:12.734'),
(457, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:04:12.781'),
(458, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:05:12.752'),
(459, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:05:12.787'),
(460, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:06:12.727'),
(461, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:06:12.758'),
(462, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:07:12.719'),
(463, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:07:12.774'),
(464, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:08:12.716'),
(465, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:08:12.759'),
(466, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:09:12.740'),
(467, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:09:12.781'),
(468, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:10:12.739'),
(469, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:10:12.796'),
(470, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:11:12.706'),
(471, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:11:12.749'),
(472, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:12:12.737'),
(473, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:12:12.792'),
(474, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:13:12.723'),
(475, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:13:12.765'),
(476, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:14:12.732'),
(477, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:14:12.777'),
(478, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:15:12.774'),
(479, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:15:12.812'),
(480, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:16:12.712'),
(481, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:16:12.762'),
(482, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:17:12.707'),
(483, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:17:12.770'),
(484, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:18:12.705'),
(485, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:18:12.762'),
(486, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:19:12.706'),
(487, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:19:12.749'),
(488, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:20:12.715'),
(489, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:20:12.766'),
(490, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:21:12.733'),
(491, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:21:12.789'),
(492, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:22:12.725'),
(493, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:22:12.751'),
(494, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:23:12.713'),
(495, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:23:12.776'),
(496, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:24:12.714'),
(497, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:24:12.757'),
(498, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:25:12.728'),
(499, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:25:12.765'),
(500, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:26:12.754'),
(501, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:26:12.816'),
(502, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:27:12.725'),
(503, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:27:12.777'),
(504, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:28:12.714'),
(505, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:28:12.766'),
(506, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:29:12.735'),
(507, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:29:12.760'),
(508, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:30:12.734'),
(509, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:30:12.773'),
(510, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:31:12.731'),
(511, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:31:12.786'),
(512, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:32:12.716'),
(513, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:32:12.755'),
(514, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:33:12.714'),
(515, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:33:12.775'),
(516, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:34:12.724'),
(517, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:34:12.771'),
(518, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:35:12.737'),
(519, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:35:12.775'),
(520, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:36:12.755'),
(521, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:36:12.792'),
(522, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:37:12.713'),
(523, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:37:12.759'),
(524, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:38:12.720'),
(525, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:38:12.765'),
(526, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:39:12.714'),
(527, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:39:12.774'),
(528, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:40:12.705'),
(529, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:40:12.750'),
(530, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:41:12.768'),
(531, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:41:12.811'),
(532, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:42:12.749'),
(533, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:42:12.810'),
(534, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:43:12.707'),
(535, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:43:12.753'),
(536, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:44:12.709'),
(537, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:44:12.764'),
(538, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:45:12.734'),
(539, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:45:12.771'),
(540, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:46:12.720'),
(541, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:46:12.771'),
(542, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:47:12.718'),
(543, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:47:12.781'),
(544, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:48:12.749'),
(545, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:48:12.802');
INSERT INTO `analytics` (`id`, `movieId`, `userId`, `event`, `metadata`, `ip`, `userAgent`, `createdAt`) VALUES
(546, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:49:12.706'),
(547, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:49:12.757'),
(548, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:50:12.716'),
(549, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:50:12.776'),
(550, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:51:12.726'),
(551, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:51:12.772'),
(552, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:52:12.708'),
(553, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:52:12.751'),
(554, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:53:12.711'),
(555, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:53:12.770'),
(556, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:54:12.745'),
(557, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:54:12.791'),
(558, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:55:12.705'),
(559, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:55:12.741'),
(560, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:56:12.734'),
(561, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:56:12.790'),
(562, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:57:12.737'),
(563, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:57:12.776'),
(564, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:58:12.727'),
(565, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:58:12.764'),
(566, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:59:12.753'),
(567, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 16:59:12.808'),
(568, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:00:12.721'),
(569, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:00:12.763'),
(570, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:01:12.738'),
(571, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:01:12.784'),
(572, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:02:12.708'),
(573, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:02:12.748'),
(574, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:03:12.717'),
(575, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:03:12.762'),
(576, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:04:12.754'),
(577, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:04:12.798'),
(578, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:05:12.752'),
(579, 71, 2, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt4154796\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-19 17:05:12.796'),
(580, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:01:15.994'),
(581, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:01:19.555'),
(582, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:01:54.789'),
(583, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:03:07.627'),
(584, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:03:11.026'),
(585, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:07:14.083'),
(586, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 18:12:59.446'),
(587, 92, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt7979580\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-19 19:10:06.871'),
(588, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:29:11.817'),
(589, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:31:27.470'),
(590, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:31:27.577'),
(591, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:31:29.523'),
(592, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:33:01.198'),
(593, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:34:14.101'),
(594, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:35:32.452'),
(595, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:35:32.533'),
(596, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:35:36.591'),
(597, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:36:22.523'),
(598, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:36:25.524'),
(599, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:36:32.352'),
(600, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:36:36.493'),
(601, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:36:45.129'),
(602, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:37:40.369'),
(603, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:37:43.084'),
(604, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:38:15.280'),
(605, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:38:19.542'),
(606, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:38:19.605'),
(607, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:38:20.190'),
(608, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:38:21.527'),
(609, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:38:36.052'),
(610, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:39:56.397'),
(611, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:40:09.877'),
(612, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:40:09.941'),
(613, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:40:13.557'),
(614, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:40:13.641'),
(615, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:42:30.060'),
(616, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:42:36.199'),
(617, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:42:36.248'),
(618, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:43:51.711'),
(619, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:46:33.969'),
(620, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:46:34.977'),
(621, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:48:56.335'),
(622, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:48:56.390'),
(623, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:05.038'),
(624, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:05.172'),
(625, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:05.239'),
(626, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:08.600'),
(627, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:08.697'),
(628, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:16.670'),
(629, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:49:17.217'),
(630, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:53:20.793'),
(631, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:53:21.294'),
(632, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:53:24.460'),
(633, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:53:24.927'),
(634, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:53:33.070'),
(635, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:53:34.643'),
(636, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 09:54:33.051'),
(637, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:20:17.921'),
(638, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:20:18.001'),
(639, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:21:14.293'),
(640, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:21:18.940'),
(641, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:21:44.436'),
(642, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:21:59.160'),
(643, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 10:24:07.580'),
(644, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:17.716'),
(645, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:18.430'),
(646, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:28.949'),
(647, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:30.537'),
(648, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:30.569'),
(649, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:34.204'),
(650, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:34.249'),
(651, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:37.846'),
(652, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:37.906'),
(653, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:42.150'),
(654, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:42.221'),
(655, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:41:53.971'),
(656, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:42:23.172'),
(657, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:42:39.754'),
(658, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:42:39.826'),
(659, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:42:47.804'),
(660, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:42:53.271'),
(661, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:42:53.346'),
(662, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:45:15.632'),
(663, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:45:16.029'),
(664, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:45:16.760'),
(665, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:16.743'),
(666, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:17.584'),
(667, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:25.319'),
(668, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:32.202'),
(669, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:33.762'),
(670, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:41.491'),
(671, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:41.943'),
(672, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:45.839'),
(673, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:47.990'),
(674, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:49.439'),
(675, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:51.213'),
(676, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:46:52.356'),
(677, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:48:00.398'),
(678, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:51:01.254'),
(679, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:57:19.044'),
(680, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:57:19.503'),
(681, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:57:24.020'),
(682, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:57:24.397'),
(683, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 12:59:28.029'),
(684, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:16:28.030'),
(685, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:16:28.792'),
(686, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:16:46.772'),
(687, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:16:46.845'),
(688, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:19:24.230'),
(689, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:19:26.771'),
(690, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:19:33.907'),
(691, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 13:19:34.540'),
(692, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 18:16:24.326'),
(693, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 18:16:24.703'),
(694, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 18:21:36.721'),
(695, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 18:21:37.226'),
(696, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:00:48.814'),
(697, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:00:50.732'),
(698, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:00:58.963'),
(699, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:01:32.176'),
(700, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:01:45.970'),
(701, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:01:47.046'),
(702, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:03:00.869'),
(703, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:03:00.955'),
(704, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:03:43.436'),
(705, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:03:52.101'),
(706, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:06:06.243'),
(707, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:06:07.764'),
(708, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:08:32.140'),
(709, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:08:33.023'),
(710, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:37:07.360'),
(711, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:37:07.951'),
(712, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:37:10.549'),
(713, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:37:10.643'),
(714, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 20:37:49.352'),
(715, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:02:33.679'),
(716, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:02:34.421'),
(717, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:03:40.930'),
(718, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:29:44.847'),
(719, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:29:45.287'),
(720, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:30:36.818'),
(721, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:30:41.513'),
(722, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:30:42.286'),
(723, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-20 21:30:47.576'),
(724, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:31:52.368'),
(725, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:31:52.862'),
(726, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:31:54.376');
INSERT INTO `analytics` (`id`, `movieId`, `userId`, `event`, `metadata`, `ip`, `userAgent`, `createdAt`) VALUES
(727, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:32:07.594'),
(728, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:33:12.656'),
(729, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:33:31.283'),
(730, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:33:51.575'),
(731, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:34:36.042'),
(732, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:35:36.425'),
(733, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:46:52.629'),
(734, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:46:52.857'),
(735, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:46:59.423'),
(736, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:11.803'),
(737, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:11.871'),
(738, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:38.551'),
(739, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:39.759'),
(740, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:40.203'),
(741, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:48.304'),
(742, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:50.646'),
(743, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:47:55.261'),
(744, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:48:06.013'),
(745, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 10:48:06.896'),
(746, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:01:47.139'),
(747, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:01:57.988'),
(748, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:01:58.393'),
(749, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:03:18.707'),
(750, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:03:19.605'),
(751, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:18:26.001'),
(752, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:18:26.316'),
(753, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:18:35.109'),
(754, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:18:51.599'),
(755, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:18:52.387'),
(756, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:18:57.505'),
(757, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:21:41.858'),
(758, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:21:50.815'),
(759, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:21:51.279'),
(760, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:21:59.659'),
(761, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:18.771'),
(762, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:19.423'),
(763, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:21.869'),
(764, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:31.723'),
(765, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:32.019'),
(766, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:35.259'),
(767, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:23:36.161'),
(768, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:24:04.672'),
(769, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:25:08.027'),
(770, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:25:41.527'),
(771, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:26:02.819'),
(772, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:26:08.427'),
(773, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 11:26:08.754'),
(774, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:04:46.046'),
(775, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 18:04:46.188'),
(776, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:04:46.400'),
(777, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:05:08.013'),
(778, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:05:19.821'),
(779, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:06:37.611'),
(780, 348, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1655442\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:13.592'),
(781, 348, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1655442\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:15.095'),
(782, 334, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt2461150\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:19.382'),
(783, 334, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt2461150\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:20.844'),
(784, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:39.644'),
(785, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:43.486'),
(786, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:52.392'),
(787, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:53.669'),
(788, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:18:57.979'),
(789, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:19:08.122'),
(790, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:19:20.448'),
(791, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:19:32.439'),
(792, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:19:49.762'),
(793, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:19:53.498'),
(794, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:20:11.144'),
(795, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:48:09.622'),
(796, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:48:24.354'),
(797, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:48:29.385'),
(798, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:49:21.065'),
(799, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:49:33.155'),
(800, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:54:42.348'),
(801, 357, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt1410063\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 18:54:43.469'),
(802, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:54:50.101'),
(803, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:54:58.722'),
(804, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:55:11.383'),
(805, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:55:29.034'),
(806, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:55:51.656'),
(807, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:56:00.509'),
(808, 180, 1, 'movie_view_start', '{\"movieUrl\":\"https://vidsrc.xyz/embed/movie/tt15239678\",\"serverName\":\"Vidsrc\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:56:05.223'),
(809, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:57:31.442'),
(810, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:57:31.567'),
(811, 179, 1, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-02-21 22:57:32.443'),
(812, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:57:47.130'),
(813, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:57:52.932'),
(814, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:57:53.114'),
(815, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:58:07.913'),
(816, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:58:17.361'),
(817, 179, 2, 'movie_view_start', '{\"movieUrl\":\"/uploads/cinema/movie-179.mp4\",\"serverName\":\"Сървър 1\"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-02-21 22:58:19.945');

-- --------------------------------------------------------

--
-- Table structure for table `broken_servers`
--

CREATE TABLE `broken_servers` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `serverId` int(11) NOT NULL,
  `serverName` varchar(100) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `statusCode` int(11) DEFAULT NULL,
  `error` text DEFAULT NULL,
  `checkedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `fixed` int(11) NOT NULL DEFAULT 0,
  `fixedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `nameEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `nameEN`) VALUES
(1, 'Екшън', 'action', 'Action'),
(2, 'Комедия', 'comedy', 'Comedy'),
(3, 'Фантастика', 'sci-fi', 'Sci-Fi'),
(4, 'Ужаси', 'horror', 'Horror'),
(5, 'Приключенски', 'adventure', 'Adventure'),
(6, 'Драма', 'drama', 'Drama'),
(7, 'Трилър', 'thriller', 'Thriller'),
(8, 'Анимация', 'animation', 'Animation'),
(15, 'Исторически', 'исторически', NULL),
(16, 'Фентъзи', 'фентъзи', NULL),
(17, 'Криминален', 'криминален', NULL),
(18, 'Семеен', 'семеен', NULL),
(19, 'Биография', 'биография', NULL),
(20, 'Мистерия', 'мистерия', NULL),
(21, 'Военни', 'военни', NULL),
(22, 'Спорт', 'спорт', NULL),
(23, 'Романтичен', 'романтичен', NULL),
(24, 'Мюзикъл', 'мюзикъл', NULL),
(25, 'Музикален', 'музикален', NULL),
(26, 'Уестърн', 'уестърн', NULL),
(27, 'Документален', 'документален', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cinema_library`
--

CREATE TABLE `cinema_library` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `videoPath` varchar(1000) NOT NULL,
  `fileSize` bigint(20) DEFAULT NULL,
  `uploadedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinema_library`
--

INSERT INTO `cinema_library` (`id`, `movieId`, `videoPath`, `fileSize`, `uploadedAt`) VALUES
(1, 179, '/uploads/cinema/movie-179.mp4', 16969585, '2026-02-20 09:23:12.725');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_message`
--

CREATE TABLE `cinema_message` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `userId` int(11) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'text',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinema_message`
--

INSERT INTO `cinema_message` (`id`, `content`, `userId`, `type`, `createdAt`) VALUES
(1, 'ее', 1, 'text', '2026-02-19 12:53:35.567'),
(2, 'тест', 1, 'text', '2026-02-19 12:58:58.861'),
(3, 'yrdy', 1, 'text', '2026-02-19 14:06:17.697'),
(4, 'test', 1, 'text', '2026-02-20 09:17:08.382'),
(5, 'test', 1, 'text', '2026-02-20 09:17:10.166'),
(6, 'test', 1, 'text', '2026-02-20 09:17:11.059'),
(7, 'test', 1, 'text', '2026-02-20 09:17:12.320'),
(8, 'тест', 1, 'text', '2026-02-20 09:40:30.558'),
(9, 'teasgfasg', 1, 'text', '2026-02-20 10:20:28.053'),
(27, 'Роза 🌹', 1, 'gift', '2026-02-21 12:39:03.475'),
(28, 'Пуканки 🍿', 1, 'gift', '2026-02-21 12:39:15.158'),
(29, 'Сърце ❤️', 1, 'gift', '2026-02-21 12:54:30.688'),
(30, 'Роза 🌹', 2, 'gift', '2026-02-21 12:54:57.481'),
(31, 'Роза 🌹', 1, 'gift', '2026-02-21 13:02:56.872'),
(32, 'Пуканки 🍿', 1, 'gift', '2026-02-21 13:03:06.459'),
(33, 'Роза 🌹', 1, 'gift', '2026-02-21 13:05:43.998'),
(34, 'Шоколад 🍫', 1, 'gift', '2026-02-21 17:29:12.915'),
(35, 'Пръстен 💍', 1, 'gift', '2026-02-21 17:29:34.919'),
(36, 'Popcorn 🍿', 1, 'gift', '2026-02-21 22:58:05.942'),
(37, 'Chocolate 🍫', 1, 'gift', '2026-02-21 22:58:16.362');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_presence`
--

CREATE TABLE `cinema_presence` (
  `userId` int(11) NOT NULL,
  `lastSeen` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinema_presence`
--

INSERT INTO `cinema_presence` (`userId`, `lastSeen`) VALUES
(1, '2026-02-19 19:58:27.853');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_schedule`
--

CREATE TABLE `cinema_schedule` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinema_schedule`
--

INSERT INTO `cinema_schedule` (`id`, `movieId`, `startTime`, `endTime`, `createdAt`) VALUES
(2, 71, '2026-02-19 14:05:00.000', '2026-02-19 17:06:00.000', '2026-02-19 13:08:23.308'),
(3, 73, '2026-02-19 13:09:00.000', '2026-02-19 15:08:00.000', '2026-02-19 13:08:38.052');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Rush Hour', 'rush-hour', '2026-02-19 14:01:05.176', '2026-02-19 14:01:05.176'),
(2, 'Dune', 'dune', '2026-02-21 18:09:35.068', '2026-02-21 18:09:35.068'),
(3, 'Venom', 'venom', '2026-02-21 18:10:57.071', '2026-02-21 18:10:57.071'),
(4, 'Avengers', 'avengers', '2026-02-21 18:11:57.233', '2026-02-21 18:11:57.233'),
(5, 'Hotel Transylvania', 'hotel-transylvania', '2026-02-21 18:12:36.277', '2026-02-21 18:12:36.277'),
(6, 'Legend', 'legend', '2026-02-21 18:14:39.778', '2026-02-21 18:14:39.778'),
(7, 'Deadpool', 'deadpool', '2026-02-21 18:14:57.880', '2026-02-21 18:14:57.880'),
(8, 'Sing', 'sing', '2026-02-21 18:15:40.131', '2026-02-21 18:15:40.131'),
(9, 'Kung Fu Panda', 'kung-fu-panda', '2026-02-21 18:15:42.971', '2026-02-21 18:15:42.971'),
(10, 'Ghostbusters', 'ghostbusters', '2026-02-21 18:15:52.028', '2026-02-21 18:15:52.028'),
(11, 'Lethal Weapon', 'lethal-weapon', '2026-02-21 18:17:37.978', '2026-02-21 18:17:37.978');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `content`, `rating`, `userId`, `movieId`, `parentId`, `createdAt`, `updatedAt`) VALUES
(1, 'тт', 10, 1, 95, NULL, '2026-02-19 13:51:59.827', '2026-02-19 13:51:59.827'),
(2, 'якоо', 6, 1, 180, NULL, '2026-02-21 22:54:38.800', '2026-02-21 22:54:38.800'),
(3, 'тест', 6, 1, 72, NULL, '2026-02-21 23:31:28.437', '2026-02-21 23:31:28.437');

-- --------------------------------------------------------

--
-- Table structure for table `comment_like`
--

CREATE TABLE `comment_like` (
  `id` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comment_like`
--

INSERT INTO `comment_like` (`id`, `commentId`, `userId`, `createdAt`) VALUES
(1, 1, 1, '2026-02-19 13:52:01.981');

-- --------------------------------------------------------

--
-- Table structure for table `critical_movies`
--

CREATE TABLE `critical_movies` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `imdbId` varchar(20) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `previousServers` text DEFAULT NULL,
  `archivedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `resolvedAt` datetime(3) DEFAULT NULL,
  `resolvedBy` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `id` int(11) NOT NULL,
  `seasonId` int(11) NOT NULL,
  `episodeNumber` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `posterUrl` varchar(1000) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fixed_movies_review`
--

CREATE TABLE `fixed_movies_review` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `movieTitle` varchar(255) NOT NULL,
  `movieSlug` varchar(500) NOT NULL,
  `fixType` varchar(50) NOT NULL,
  `serversRemoved` int(11) NOT NULL DEFAULT 0,
  `serversAdded` int(11) NOT NULL DEFAULT 0,
  `fixedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `reviewStatus` varchar(20) NOT NULL DEFAULT 'pending',
  `reviewedBy` varchar(100) DEFAULT NULL,
  `reviewedAt` datetime(3) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fixed_movies_review`
--

INSERT INTO `fixed_movies_review` (`id`, `movieId`, `movieTitle`, `movieSlug`, `fixType`, `serversRemoved`, `serversAdded`, `fixedAt`, `reviewStatus`, `reviewedBy`, `reviewedAt`, `notes`) VALUES
(1, 97, 'Sing 2', 'sing-2', 'manual', 0, 0, '2026-02-19 13:51:31.030', 'pending', NULL, NULL, NULL),
(2, 99, 'The Suicide Squad', 'the-suicide-squad', 'manual', 0, 0, '2026-02-19 13:51:48.849', 'pending', NULL, NULL, NULL),
(3, 100, 'The Witcher: Nightmare of the Wolf', 'the-witcher-nightmare-of-the-wolf', 'manual', 0, 0, '2026-02-19 13:51:58.686', 'pending', NULL, NULL, NULL),
(4, 101, 'Free Guy', 'free-guy', 'manual', 0, 0, '2026-02-19 13:52:06.992', 'pending', NULL, NULL, NULL),
(5, 102, 'Ghostbusters: Afterlife', 'ghostbusters-afterlife', 'manual', 0, 0, '2026-02-19 13:52:16.407', 'pending', NULL, NULL, NULL),
(6, 103, 'Finch', 'finch', 'manual', 0, 0, '2026-02-19 13:52:25.289', 'pending', NULL, NULL, NULL),
(7, 104, 'The Tomorrow War', 'the-tomorrow-war', 'manual', 0, 0, '2026-02-19 13:52:34.647', 'pending', NULL, NULL, NULL),
(8, 105, 'Black Widow', 'black-widow', 'manual', 0, 0, '2026-02-19 13:52:42.647', 'pending', NULL, NULL, NULL),
(9, 106, 'The Green Knight', 'the-green-knight', 'manual', 0, 0, '2026-02-19 13:52:51.667', 'pending', NULL, NULL, NULL),
(10, 107, 'Jungle Cruise', 'jungle-cruise', 'manual', 0, 0, '2026-02-19 13:53:00.061', 'pending', NULL, NULL, NULL),
(11, 108, 'The King\'s Man', 'the-kings-man', 'manual', 0, 0, '2026-02-19 13:53:08.173', 'pending', NULL, NULL, NULL),
(12, 109, 'Kate', 'kate', 'manual', 0, 0, '2026-02-19 13:53:17.611', 'pending', NULL, NULL, NULL),
(13, 111, 'Mortal Kombat', 'mortal-kombat', 'manual', 0, 0, '2026-02-19 13:53:30.356', 'pending', NULL, NULL, NULL),
(14, 112, 'Venom: Let There Be Carnage', 'venom-let-there-be-carnage', 'manual', 0, 0, '2026-02-19 13:53:38.048', 'pending', NULL, NULL, NULL),
(15, 113, 'Army of the Dead', 'army-of-the-dead', 'manual', 0, 0, '2026-02-19 13:53:47.055', 'pending', NULL, NULL, NULL),
(16, 114, 'Escape Room: Tournament of Champions', 'escape-room-tournament-of-champions', 'manual', 0, 0, '2026-02-19 13:53:56.484', 'pending', NULL, NULL, NULL),
(17, 115, 'Chaos Walking', 'chaos-walking', 'manual', 0, 0, '2026-02-19 13:54:04.986', 'pending', NULL, NULL, NULL),
(18, 116, 'The Ice Road', 'the-ice-road', 'manual', 0, 0, '2026-02-19 13:54:13.173', 'rejected', 'admin', '2026-02-19 13:54:37.891', 'No servers found'),
(19, 117, 'Stowaway', 'stowaway', 'manual', 0, 0, '2026-02-19 13:54:22.970', 'pending', NULL, NULL, NULL),
(20, 118, 'Space Jam: A New Legacy', 'space-jam-a-new-legacy', 'manual', 0, 0, '2026-02-19 13:54:31.344', 'pending', NULL, NULL, NULL),
(21, 119, 'Ôkami kodomo no Ame to Yuki', 'kami-kodomo-no-ame-to-yuki', 'manual', 0, 0, '2026-02-19 13:54:42.890', 'pending', NULL, NULL, NULL),
(22, 120, 'Wreck-It Ralph', 'wreck-it-ralph', 'manual', 0, 0, '2026-02-19 13:54:52.332', 'pending', NULL, NULL, NULL),
(23, 121, 'Rise of the Guardians', 'rise-of-the-guardians', 'manual', 0, 0, '2026-02-19 13:54:59.909', 'pending', NULL, NULL, NULL),
(24, 122, 'Brave', 'brave', 'manual', 0, 0, '2026-02-19 13:55:09.046', 'pending', NULL, NULL, NULL),
(25, 123, 'Hotel Transylvania', 'hotel-transylvania', 'manual', 0, 0, '2026-02-19 13:55:17.430', 'pending', NULL, NULL, NULL),
(26, 124, 'ParaNorman', 'paranorman', 'manual', 0, 0, '2026-02-19 13:55:25.387', 'pending', NULL, NULL, NULL),
(27, 125, 'Frankenweenie', 'frankenweenie', 'manual', 0, 0, '2026-02-19 13:55:34.540', 'pending', NULL, NULL, NULL),
(28, 126, 'Madagascar 3: Europe\'s Most Wanted', 'madagascar-3-europes-most-wanted', 'manual', 0, 0, '2026-02-19 13:55:43.040', 'pending', NULL, NULL, NULL),
(29, 127, 'The Pirates! In an Adventure with Scientists!', 'the-pirates-in-an-adventure-with-scientists', 'manual', 0, 0, '2026-02-19 13:55:51.177', 'pending', NULL, NULL, NULL),
(30, 128, 'Ice Age: Continental Drift', 'ice-age-continental-drift', 'manual', 0, 0, '2026-02-19 13:56:00.129', 'pending', NULL, NULL, NULL),
(31, 129, 'The Lorax', 'the-lorax', 'manual', 0, 0, '2026-02-19 13:56:09.641', 'pending', NULL, NULL, NULL),
(32, 130, 'Moneyball', 'moneyball', 'manual', 0, 0, '2026-02-19 13:56:17.916', 'pending', NULL, NULL, NULL),
(33, 131, 'Soul Surfer', 'soul-surfer', 'manual', 0, 0, '2026-02-19 13:56:25.585', 'pending', NULL, NULL, NULL),
(34, 132, 'Kill the Irishman', 'kill-the-irishman', 'manual', 0, 0, '2026-02-19 13:56:34.409', 'pending', NULL, NULL, NULL),
(35, 133, 'The Devil\'s Double', 'the-devils-double', 'manual', 0, 0, '2026-02-19 13:56:42.712', 'pending', NULL, NULL, NULL),
(36, 134, 'My Week with Marilyn', 'my-week-with-marilyn', 'manual', 0, 0, '2026-02-19 13:56:51.133', 'pending', NULL, NULL, NULL),
(37, 135, 'Bernie', 'bernie', 'manual', 0, 0, '2026-02-19 13:56:59.165', 'pending', NULL, NULL, NULL),
(38, 136, 'Machine Gun Preacher', 'machine-gun-preacher', 'manual', 0, 0, '2026-02-19 13:57:08.701', 'pending', NULL, NULL, NULL),
(39, 137, 'J. Edgar', 'j-edgar', 'manual', 0, 0, '2026-02-19 13:57:17.778', 'pending', NULL, NULL, NULL),
(40, 138, 'A Dangerous Method', 'a-dangerous-method', 'manual', 0, 0, '2026-02-19 13:57:26.840', 'pending', NULL, NULL, NULL),
(41, 139, 'The Iron Lady', 'the-iron-lady', 'manual', 0, 0, '2026-02-19 13:57:36.473', 'pending', NULL, NULL, NULL),
(42, 140, 'Ratatouille', 'ratatouille', 'manual', 0, 0, '2026-02-19 13:57:47.173', 'pending', NULL, NULL, NULL),
(43, 141, 'Hot Fuzz', 'hot-fuzz', 'manual', 0, 0, '2026-02-19 13:57:55.142', 'pending', NULL, NULL, NULL),
(44, 142, 'Superbad', 'superbad', 'manual', 0, 0, '2026-02-19 13:58:04.016', 'pending', NULL, NULL, NULL),
(45, 143, 'Juno', 'juno', 'manual', 0, 0, '2026-02-19 13:58:12.042', 'pending', NULL, NULL, NULL),
(46, 144, 'Lars and the Real Girl', 'lars-and-the-real-girl', 'manual', 0, 0, '2026-02-19 13:58:21.578', 'pending', NULL, NULL, NULL),
(47, 145, 'The Bucket List', 'the-bucket-list', 'manual', 0, 0, '2026-02-19 13:58:29.447', 'pending', NULL, NULL, NULL),
(48, 146, 'Death at a Funeral', 'death-at-a-funeral', 'manual', 0, 0, '2026-02-19 13:58:38.203', 'pending', NULL, NULL, NULL),
(49, 147, 'The Simpsons Movie', 'the-simpsons-movie', 'manual', 0, 0, '2026-02-19 13:58:46.134', 'pending', NULL, NULL, NULL),
(50, 148, 'The Darjeeling Limited', 'the-darjeeling-limited', 'manual', 0, 0, '2026-02-19 13:58:55.243', 'pending', NULL, NULL, NULL),
(51, 149, 'Enchanted', 'enchanted', 'manual', 0, 0, '2026-02-19 13:59:04.048', 'pending', NULL, NULL, NULL),
(52, 150, 'P.S. I Love You', 'ps-i-love-you', 'manual', 0, 0, '2026-02-19 13:59:12.579', 'pending', NULL, NULL, NULL),
(53, 151, 'Planet Terror', 'planet-terror', 'manual', 0, 0, '2026-02-19 13:59:21.139', 'pending', NULL, NULL, NULL),
(54, 152, 'Charlie Wilson\'s War', 'charlie-wilsons-war', 'manual', 0, 0, '2026-02-19 13:59:28.708', 'pending', NULL, NULL, NULL),
(55, 153, 'Knocked Up', 'knocked-up', 'manual', 0, 0, '2026-02-19 13:59:37.915', 'pending', NULL, NULL, NULL),
(56, 154, 'Meet the Robinsons', 'meet-the-robinsons', 'manual', 0, 0, '2026-02-19 13:59:46.166', 'pending', NULL, NULL, NULL),
(57, 155, 'Dan in Real Life', 'dan-in-real-life', 'manual', 0, 0, '2026-02-19 13:59:53.978', 'pending', NULL, NULL, NULL),
(58, 156, 'Hairspray', 'hairspray', 'manual', 0, 0, '2026-02-19 14:00:02.519', 'pending', NULL, NULL, NULL),
(59, 157, 'Surf\'s Up', 'surfs-up', 'manual', 0, 0, '2026-02-19 14:00:13.319', 'pending', NULL, NULL, NULL),
(60, 158, 'Trick \'r Treat', 'trick-r-treat', 'manual', 0, 0, '2026-02-19 14:00:20.960', 'pending', NULL, NULL, NULL),
(61, 159, 'Shoot \'Em Up', 'shoot-em-up', 'manual', 0, 0, '2026-02-19 14:00:28.487', 'pending', NULL, NULL, NULL),
(62, 160, 'Music and Lyrics', 'music-and-lyrics', 'manual', 0, 0, '2026-02-19 14:00:38.032', 'pending', NULL, NULL, NULL),
(63, 161, 'Mr. Bean\'s Holiday', 'mr-beans-holiday', 'manual', 0, 0, '2026-02-19 14:00:46.571', 'pending', NULL, NULL, NULL),
(64, 162, 'Blades of Glory', 'blades-of-glory', 'manual', 0, 0, '2026-02-19 14:00:55.629', 'pending', NULL, NULL, NULL),
(65, 163, 'Rush Hour 3', 'rush-hour-3', 'manual', 0, 0, '2026-02-19 14:01:05.160', 'pending', NULL, NULL, NULL),
(66, 164, 'The Game Plan', 'the-game-plan', 'manual', 0, 0, '2026-02-19 14:01:14.003', 'pending', NULL, NULL, NULL),
(67, 165, 'Shrek the Third', 'shrek-the-third', 'manual', 0, 0, '2026-02-19 14:01:22.821', 'pending', NULL, NULL, NULL),
(68, 166, 'Bee Movie', 'bee-movie', 'manual', 0, 0, '2026-02-19 14:01:32.903', 'pending', NULL, NULL, NULL),
(69, 167, 'The Heartbreak Kid', 'the-heartbreak-kid', 'manual', 0, 0, '2026-02-19 14:01:42.329', 'pending', NULL, NULL, NULL),
(70, 168, 'I Now Pronounce You Chuck & Larry', 'i-now-pronounce-you-chuck-larry', 'manual', 0, 0, '2026-02-19 14:01:52.007', 'pending', NULL, NULL, NULL),
(71, 169, 'Wild Hogs', 'wild-hogs', 'manual', 0, 0, '2026-02-19 14:02:01.596', 'pending', NULL, NULL, NULL),
(72, 170, 'Evan Almighty', 'evan-almighty', 'manual', 0, 0, '2026-02-19 14:02:10.513', 'pending', NULL, NULL, NULL),
(73, 171, 'Alvin and the Chipmunks', 'alvin-and-the-chipmunks', 'manual', 0, 0, '2026-02-19 14:02:20.021', 'pending', NULL, NULL, NULL),
(74, 172, 'Epic Movie', 'epic-movie', 'manual', 0, 0, '2026-02-19 14:02:27.712', 'pending', NULL, NULL, NULL),
(75, 173, 'Kill Bill: Vol. 1', 'kill-bill-vol-1', 'manual', 0, 0, '2026-02-19 14:02:37.217', 'pending', NULL, NULL, NULL),
(76, 174, 'Salinui chueok', 'salinui-chueok', 'manual', 0, 0, '2026-02-19 14:02:45.991', 'pending', NULL, NULL, NULL),
(77, 175, 'Dogville', 'dogville', 'manual', 0, 0, '2026-02-19 14:02:54.518', 'pending', NULL, NULL, NULL),
(78, 177, 'Black Hawk Down', 'black-hawk-down', 'manual', 0, 0, '2026-02-19 14:07:37.403', 'pending', NULL, NULL, NULL),
(79, 178, 'Enemy at the Gates', 'enemy-at-the-gates', 'manual', 0, 0, '2026-02-19 14:07:41.189', 'pending', NULL, NULL, NULL),
(80, 179, 'Spy Game', 'spy-game', 'manual', 0, 0, '2026-02-19 14:07:45.466', 'pending', NULL, NULL, NULL),
(81, 354, '50/50', '5050', 'manual', 0, 0, '2026-02-21 18:18:20.301', 'completed', NULL, NULL, 'Manually verified by admin following import validation failure'),
(82, 355, 'Source Code', 'source-code', 'manual', 0, 0, '2026-02-21 18:18:23.281', 'completed', NULL, NULL, 'Manually verified by admin following import validation failure'),
(83, 356, 'Hugo', 'hugo', 'manual', 0, 0, '2026-02-21 18:18:26.347', 'completed', NULL, NULL, 'Manually verified by admin following import validation failure'),
(84, 357, 'Jin ling shi san chai', 'jin-ling-shi-san-chai', 'manual', 0, 0, '2026-02-21 18:18:29.296', 'completed', NULL, NULL, 'Manually verified by admin following import validation failure');

-- --------------------------------------------------------

--
-- Table structure for table `gift`
--

CREATE TABLE `gift` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `titleBG` varchar(500) NOT NULL,
  `titleEN` varchar(500) NOT NULL,
  `slug` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `year` int(11) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `cast` text DEFAULT NULL,
  `videoUrl` varchar(1000) DEFAULT NULL,
  `trailerUrl` varchar(1000) DEFAULT NULL,
  `posterUrl` varchar(1000) NOT NULL,
  `backdropUrl` varchar(1000) DEFAULT NULL,
  `isHD` tinyint(1) NOT NULL DEFAULT 1,
  `rating` double DEFAULT NULL,
  `imdbLink` varchar(500) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `tmdbId` int(11) DEFAULT NULL,
  `imdbId` varchar(20) DEFAULT NULL,
  `isSeries` tinyint(1) NOT NULL DEFAULT 0,
  `descriptionEN` text DEFAULT NULL,
  `healthStatus` varchar(20) NOT NULL DEFAULT 'UNKNOWN',
  `lastChecked` datetime(3) DEFAULT NULL,
  `collectionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `titleBG`, `titleEN`, `slug`, `description`, `year`, `duration`, `director`, `cast`, `videoUrl`, `trailerUrl`, `posterUrl`, `backdropUrl`, `isHD`, `rating`, `imdbLink`, `views`, `featured`, `published`, `createdAt`, `updatedAt`, `tmdbId`, `imdbId`, `isSeries`, `descriptionEN`, `healthStatus`, `lastChecked`, `collectionId`) VALUES
(71, 'Avengers: Endgame', 'Avengers: Endgame', 'avengers-endgame', 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos&apos; actions and restore balance to the universe.', 2019, 181, 'Anthony Russo', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg', NULL, 1, 8.4, 'https://www.imdb.com/title/tt4154796/', 238, 0, 1, '2026-02-19 12:52:28.991', '2026-02-21 18:11:57.237', NULL, 'tt4154796', 0, NULL, 'OK', NULL, 4),
(72, 'Kaithi', 'Kaithi', 'kaithi', 'Dilli, an ex-convict, endeavours to meet his daughter for the first time after leaving prison. However, his attempts are interrupted due to a drug raid planned by Inspector Bejoy.', 2019, 145, 'Lokesh Kanagaraj', 'Karthi, Narain, Arjun Das', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDk2NWQyMjQtODlkYi00YTJjLTkxMGItMGU0ZDExODI3OWIxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.4, 'https://www.imdb.com/title/tt9900782/', 0, 0, 1, '2026-02-19 12:52:34.419', '2026-02-19 12:52:34.419', NULL, 'tt9900782', 0, NULL, 'OK', NULL, NULL),
(73, '1917', '1917', '1917', 'April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.', 2020, 119, 'Sam Mendes', 'Dean-Charles Chapman, George MacKay, Daniel Mays', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYzkxZjg2NDQtMGVjMy00NWZkLTk0ZDEtZWE3NDYwYjAyMTg1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.2, 'https://www.imdb.com/title/tt8579674/', 322, 0, 1, '2026-02-19 12:52:37.604', '2026-02-19 15:07:12.786', NULL, 'tt8579674', 0, NULL, 'OK', '2026-02-21 19:15:10.424', NULL),
(74, 'Lola rennt', 'Lola rennt', 'lola-rennt', 'After a botched money delivery, Lola has 20 minutes to come up with 100,000 Deutschmarks.', 1999, 80, 'Tom Tykwer', 'Franka Potente, Moritz Bleibtreu, Herbert Knaup', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzA0NDdiNDgtNjI4Ny00OTc0LTg3NGMtZDBlNmI1ZGUxYTg2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt0130827/', 0, 0, 1, '2026-02-19 13:49:50.892', '2026-02-19 13:49:50.892', NULL, 'tt0130827', 0, NULL, 'OK', NULL, NULL),
(75, 'Enemy of the State', 'Enemy of the State', 'enemy-of-the-state', 'A lawyer becomes targeted by a corrupt politician and his N.S.A. goons when he accidentally receives key evidence to a politically motivated crime.', 1998, 132, 'Tony Scott', 'Will Smith, Gene Hackman, Jon Voight', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOWVhZmRiODktNzM0Zi00YmVlLWI3MGQtY2M0NmYzN2Q4Yzg4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt0120660/', 0, 0, 1, '2026-02-19 13:49:54.893', '2026-02-19 13:49:54.893', NULL, 'tt0120660', 0, NULL, 'OK', NULL, NULL),
(76, 'The Negotiator', 'The Negotiator', 'the-negotiator', 'A police negotiator confronts a framed counterpart.', 1998, 140, 'F. Gary Gray', 'Samuel L. Jackson, Kevin Spacey, David Morse', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTBjZDM3NzctOGE2YS00NDZiLTk4ZWMtY2IwOWI5ZTE4ZDc0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt0120768/', 12, 0, 1, '2026-02-19 13:49:59.329', '2026-02-19 13:56:19.381', NULL, 'tt0120768', 0, NULL, 'OK', NULL, NULL),
(77, 'Ronin', 'Ronin', 'ronin', 'A freelancing former U.S. intelligence agent tries to track down a mysterious package that&apos;s wanted by both the Irish and the Russian governments.', 1998, 122, 'John Frankenheimer', 'Robert De Niro, Jean Reno, Natascha McElhone', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYzU0MDEwOGMtZWFlMy00ZjllLWFmMWQtYWIxN2M1YmU5ZWQwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt0122690/', 0, 0, 1, '2026-02-19 13:50:02.717', '2026-02-19 13:50:02.717', NULL, 'tt0122690', 0, NULL, 'OK', NULL, NULL),
(78, 'Blade', 'Blade', 'blade', 'A half-vampire, half-mortal man becomes a protector of the mortal race, while slaying evil vampires.', 1998, 120, 'Stephen Norrington', 'Wesley Snipes, Stephen Dorff, Kris Kristofferson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzAzMmY3OWMtNDgyMS00Y2U4LTlmM2UtY2YwMmM0MDI5ODJmXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0120611/', 0, 0, 1, '2026-02-19 13:50:06.925', '2026-02-19 13:50:06.925', NULL, 'tt0120611', 0, NULL, 'OK', NULL, NULL),
(79, 'Rush Hour', 'Rush Hour', 'rush-hour', 'A loyal and dedicated Hong Kong Inspector teams up with a reckless and loudmouthed L.A.P.D. detective to rescue the Chinese Consul&apos;s kidnapped daughter, while trying to arrest a dangerous crime lord along the way.', 1998, 98, 'Brett Ratner', 'Jackie Chan, Chris Tucker, Ken Leung', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMGZiMzViNmEtNTNlZi00MzFmLTk5NTEtNDE2OTUzNmNlMTY4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0120812/', 0, 0, 1, '2026-02-19 13:50:11.360', '2026-02-19 14:01:05.195', NULL, 'tt0120812', 0, NULL, 'OK', NULL, 1),
(80, 'Fallen', 'Fallen', 'fallen', 'Homicide detective John Hobbes witnesses the execution of serial killer Edgar Reese. Soon after the execution, the killings start again, and they are very similar to Reese&apos;s style.', 1998, 124, 'Gregory Hoblit', 'Denzel Washington, John Goodman, Donald Sutherland', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNWQ5Zjg2ZjMtYThjMC00YmU5LWIxNGYtM2Y3MTg5OGRiNDkwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt0119099/', 0, 0, 1, '2026-02-19 13:50:15.633', '2026-02-19 13:50:15.633', NULL, 'tt0119099', 0, NULL, 'OK', NULL, NULL),
(81, 'The Mask of Zorro', 'The Mask of Zorro', 'the-mask-of-zorro', 'A young thief seeking revenge for his brother&apos;s death is trained by the once-great, aging Zorro, who is pursuing his own vengeance.', 1998, 136, 'Martin Campbell', 'Antonio Banderas, Anthony Hopkins, Catherine Zeta-Jones', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzA2MDgyYzMtNjc4OC00YjU0LWEzMWEtOTRhMTViODY0Mjk0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt0120746/', 0, 0, 1, '2026-02-19 13:50:20.516', '2026-02-19 13:50:20.516', NULL, 'tt0120746', 0, NULL, 'OK', NULL, NULL),
(82, 'Armageddon', 'Armageddon', 'armageddon', 'After discovering that an asteroid the size of Texas will impact Earth in less than a month, NASA recruits a misfit team of deep-core drillers to save the planet.', 1998, 151, 'Michael Bay', 'Bruce Willis, Billy Bob Thornton, Ben Affleck', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYzQ3MzJmZjUtNTc0OC00ZWRiLWJkMTYtMTZkMDVhMDQ4OGU4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt0120591/', 0, 0, 1, '2026-02-19 13:50:24.618', '2026-02-19 13:50:24.618', NULL, 'tt0120591', 0, NULL, 'OK', NULL, NULL),
(83, 'U.S. Marshals', 'U.S. Marshals', 'us-marshals', 'U.S. Marshal Samuel Gerard and his team of Marshals are assigned to track down Sheridan, who has been accused of a double-murder.', 1998, 131, 'Stuart Baird', 'Tommy Lee Jones, Wesley Snipes, Robert Downey Jr.', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTdlYTU2OGYtZjljOS00ZjFhLTk5NjAtZDQwZmNkYzk4YWQ5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt0120873/', 0, 0, 1, '2026-02-19 13:50:29.133', '2026-02-19 13:50:29.133', NULL, 'tt0120873', 0, NULL, 'OK', NULL, NULL),
(84, 'Lethal Weapon 4', 'Lethal Weapon 4', 'lethal-weapon-4', 'With personal crises and age weighing in on them, LAPD officers Riggs and Murtaugh must contend with deadly Chinese triads that are trying to free their former leaders out of prison and onto American soil.', 1998, 127, 'Richard Donner', 'Mel Gibson, Danny Glover, Joe Pesci', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDU4MDIyMzEtZjEwZi00NmFjLTljMzQtNDgzNDE5ZDhlMTZmXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt0122151/', 0, 0, 1, '2026-02-19 13:50:33.447', '2026-02-21 18:17:37.982', NULL, 'tt0122151', 0, NULL, 'OK', NULL, 11),
(85, 'The Man in the Iron Mask', 'The Man in the Iron Mask', 'the-man-in-the-iron-mask', 'The cruel King Louis XIV of France has a secret twin brother whom he keeps imprisoned. Can the twin be substituted for the real king?', 1998, 132, 'Randall Wallace', 'Leonardo DiCaprio, Jeremy Irons, John Malkovich', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDc4YWYzNzEtNWMwMC00Y2ZlLWEzZWEtZDcwYjcwYTE3Y2ZlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt0120744/', 0, 0, 1, '2026-02-19 13:50:36.728', '2026-02-19 13:50:36.728', NULL, 'tt0120744', 0, NULL, 'OK', NULL, NULL),
(86, 'Deep Impact', 'Deep Impact', 'deep-impact', 'A comet is discovered to be on a collision course with Earth. As doomsday nears, the human race prepares for the worst.', 1998, 120, 'Mimi Leder', 'Robert Duvall, Téa Leoni, Elijah Wood', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BN2EwNjMxOWYtYWE5Zi00MWEyLWJlMGMtYzA1NDQyZGE5YWZjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt0120647/', 0, 0, 1, '2026-02-19 13:50:40.742', '2026-02-19 13:50:40.742', NULL, 'tt0120647', 0, NULL, 'OK', NULL, NULL),
(87, 'Small Soldiers', 'Small Soldiers', 'small-soldiers', 'When missile technology is used to enhance toy action figures, the toys soon begin to take their battle programming too seriously.', 1998, 110, 'Joe Dante', 'Kirsten Dunst, Gregory Smith, David Cross', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjM3NjczNTUtOTYxZi00NWEyLTk4YmEtZTA0NWY0YzU4NDhkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt0122718/', 0, 0, 1, '2026-02-19 13:50:45.209', '2026-02-19 13:50:45.209', NULL, 'tt0122718', 0, NULL, 'OK', NULL, NULL),
(88, 'Godzilla', 'Godzilla', 'godzilla', 'French nuclear tests irradiate an iguana into a giant monster that heads off to New York City. The American military must chase the monster across the city to stop it before it reproduces.', 1998, 139, 'Roland Emmerich', 'Matthew Broderick, Jean Reno, Maria Pitillo', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzdmYmUzYjAtMmJhNi00NGU3LWJiODYtM2I5MGFhZjBhM2NhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.5, 'https://www.imdb.com/title/tt0120685/', 0, 0, 1, '2026-02-19 13:50:49.315', '2026-02-19 13:50:49.315', NULL, 'tt0120685', 0, NULL, 'OK', NULL, NULL),
(89, 'Spider-Man: No Way Home', 'Spider-Man: No Way Home', 'spider-man-no-way-home', 'With Spider-Man&apos;s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.', 2021, 148, 'Jon Watts', 'Tom Holland, Zendaya, Benedict Cumberbatch', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt10872600/', 0, 0, 1, '2026-02-19 13:50:53.663', '2026-02-19 13:50:53.663', NULL, 'tt10872600', 0, NULL, 'OK', NULL, NULL),
(90, 'Dune: Part One', 'Dune: Part One', 'dune-part-one', 'Paul Atreides arrives on Arrakis after his father accepts the stewardship of the dangerous planet. However, chaos ensues after a betrayal as forces clash to control melange, a precious resource.', 2021, 155, 'Denis Villeneuve', 'Timothée Chalamet, Rebecca Ferguson, Zendaya', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNWIyNmU5MGYtZDZmNi00ZjAwLWJlYjgtZTc0ZGIxMDE4ZGYwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt1160419/', 0, 0, 1, '2026-02-19 13:50:57.653', '2026-02-21 18:09:35.072', NULL, 'tt1160419', 0, NULL, 'OK', NULL, 2),
(91, 'Zack Snyder\'s Justice League', 'Zack Snyder\'s Justice League', 'zack-snyders-justice-league', 'Determined to ensure that Superman&apos;s ultimate sacrifice wasn&apos;t in vain, Bruce Wayne recruits a team of metahumans to protect the world from an approaching threat of catastrophic proportions.', 2021, 242, 'Zack Snyder', 'Henry Cavill, Ben Affleck, Gal Gadot', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDA0MzM5YTctZTU2My00NGQ5LWE2NTEtNDM0MjZmMDBkOTZkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.9, 'https://www.imdb.com/title/tt12361974/', 0, 0, 1, '2026-02-19 13:51:00.451', '2026-02-19 13:51:00.451', NULL, 'tt12361974', 0, NULL, 'OK', NULL, NULL),
(92, 'The Mitchells vs the Machines', 'The Mitchells vs the Machines', 'the-mitchells-vs-the-machines', 'A quirky, dysfunctional family&apos;s road trip is upended when they find themselves in the middle of the robot apocalypse and suddenly become humanity&apos;s unlikeliest last hope.', 2021, 114, 'Michael Rianda', 'Abbi Jacobson, Danny McBride, Maya Rudolph', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzAyOWNiMjAtNWUzMi00ZDk1LWE5NzYtNDUzMWE1Y2M0NDM2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt7979580/', 8, 0, 1, '2026-02-19 13:51:04.604', '2026-02-19 19:10:06.883', NULL, 'tt7979580', 0, NULL, 'OK', NULL, NULL),
(93, 'Luca', 'Luca', 'luca', 'On the Italian Riviera, an unlikely but strong friendship grows between a human being and a sea monster disguised as a human.', 2021, 95, 'Enrico Casarosa', 'Jacob Tremblay, Jack Dylan Grazer, Emma Berman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWMyNGNlZTktODVkNS00ZmMyLTk0NmUtNWVjOWU1MWMzZGMzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt12801262/', 0, 0, 1, '2026-02-19 13:51:08.003', '2026-02-19 13:51:08.003', NULL, 'tt12801262', 0, NULL, 'OK', NULL, NULL),
(94, 'No Time to Die', 'No Time to Die', 'no-time-to-die', 'James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.', 2021, 163, 'Cary Joji Fukunaga', 'Daniel Craig, Ana de Armas, Rami Malek', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZGZiOGZhZDQtZmRkNy00ZmUzLTliMGEtZGU0NjExOGMxZDVkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt2382320/', 0, 0, 1, '2026-02-19 13:51:12.008', '2026-02-19 13:51:12.008', NULL, 'tt2382320', 0, NULL, 'OK', NULL, NULL),
(95, 'Shang-Chi and the Legend of the Ten Rings', 'Shang-Chi and the Legend of the Ten Rings', 'shang-chi-and-the-legend-of-the-ten-rings', 'Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.', 2021, 132, 'Destin Daniel Cretton', 'Simu Liu, Awkwafina, Tony Leung Chiu-wai', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZmY5MDcyNzAtYzg3MC00MGNlLTg3OGItNmRjYThkZGVlNzAyXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt9376612/', 0, 0, 1, '2026-02-19 13:51:16.551', '2026-02-19 13:51:16.551', NULL, 'tt9376612', 0, NULL, 'OK', NULL, NULL),
(96, 'Cruella', 'Cruella', 'cruella', 'During the 1970s London punk rock revolution, young grifter Estella transforms herself into the raucous, revenge-bent Cruella de Vil.', 2021, 134, 'Craig Gillespie', 'Emma Stone, Emma Thompson, Joel Fry', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWY5MjljNjctZjhjZS00MWY0LTgwYzUtZTJiYTVmMmJkM2E0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt3228774/', 0, 0, 1, '2026-02-19 13:51:21.083', '2026-02-19 13:51:21.083', NULL, 'tt3228774', 0, NULL, 'OK', NULL, NULL),
(97, 'Sing 2', 'Sing 2', 'sing-2', 'Buster Moon and his friends must persuade reclusive rock star Clay Calloway to join them for the opening of a new show.', 2021, 110, 'Garth Jennings', 'Matthew McConaughey, Reese Witherspoon, Scarlett Johansson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzZkZmMzNzItYzBhOS00ZGEwLWFiNWYtMWRjNzM4MjRjZTRjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt6467266/', 0, 0, 0, '2026-02-19 13:51:26.005', '2026-02-21 18:15:40.135', NULL, 'tt6467266', 0, NULL, 'ARCHIVED', NULL, 8),
(98, 'Raya and the Last Dragon', 'Raya and the Last Dragon', 'raya-and-the-last-dragon', 'In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon.', 2021, 107, 'Paul Briggs', 'Kelly Marie Tran, Awkwafina, Gemma Chan', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BN2QzZTQ3MzktN2JiYS00MDEzLTgxMWQtZWFmMDI3NWFkZTY0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt5109280/', 0, 0, 1, '2026-02-19 13:51:34.944', '2026-02-19 13:51:34.944', NULL, 'tt5109280', 0, NULL, 'OK', NULL, NULL),
(99, 'The Suicide Squad', 'The Suicide Squad', 'the-suicide-squad', 'Supervillains Harley Quinn, Bloodsport, Peacemaker, and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.', 2021, 132, 'James Gunn', 'Margot Robbie, Idris Elba, John Cena', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWU3Y2NlZmEtMjJjNS00ZWMxLWE1MzctYWYyMjMzMDdkNTE4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt6334354/', 0, 0, 0, '2026-02-19 13:51:43.806', '2026-02-19 13:51:43.806', NULL, 'tt6334354', 0, NULL, 'ARCHIVED', NULL, NULL),
(100, 'The Witcher: Nightmare of the Wolf', 'The Witcher: Nightmare of the Wolf', 'the-witcher-nightmare-of-the-wolf', 'Escaping from poverty to become a witcher, Vesemir slays monsters for coin and glory, but when a new menace rises, he must face the demons of his past.', 2021, 83, 'Kwang Il Han', 'Theo James, Mary McDonnell, Lara Pulver', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODQzNDE4N2ItZDAwMC00YzA3LTkwMTEtZDgyMjE3M2ZiY2NiXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt11657662/', 0, 0, 0, '2026-02-19 13:51:53.661', '2026-02-19 13:51:53.661', NULL, 'tt11657662', 0, NULL, 'ARCHIVED', NULL, NULL),
(101, 'Free Guy', 'Free Guy', 'free-guy', 'When Guy, a bank teller, learns that he is a non-player character in a bloodthirsty, open-world video game, he goes on to become the hero of the story and takes the responsibility of saving the world.', 2021, 115, 'Shawn Levy', 'Ryan Reynolds, Jodie Comer, Taika Waititi', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BN2I0MGMxYjUtZTZiMS00MzMxLTkzNWYtMDUyZmUwY2ViYTljXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt6264654/', 0, 0, 0, '2026-02-19 13:52:01.956', '2026-02-19 13:52:01.956', NULL, 'tt6264654', 0, NULL, 'ARCHIVED', NULL, NULL),
(102, 'Ghostbusters: Afterlife', 'Ghostbusters: Afterlife', 'ghostbusters-afterlife', 'When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.', 2021, 124, 'Jason Reitman', 'Carrie Coon, Paul Rudd, Finn Wolfhard', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDJmZmM2NmQtMzhlYi00MGNkLTlhMWUtYjM1MmFlMTA1YTliXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt4513678/', 0, 0, 0, '2026-02-19 13:52:11.377', '2026-02-21 18:15:52.050', NULL, 'tt4513678', 0, NULL, 'ARCHIVED', NULL, 10),
(103, 'Finch', 'Finch', 'finch', 'On a post-apocalyptic Earth, a robot, built to protect the life of his creator&apos;s beloved dog learns about life, love, friendship and what it means to be human.', 2021, 115, 'Miguel Sapochnik', 'Tom Hanks, Caleb Landry Jones, Marie Wagenman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjhhMGVkN2MtNDA3OC00M2E5LTg3ODYtZGJiNmIwNmQwMWYyXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt3420504/', 0, 0, 0, '2026-02-19 13:52:20.275', '2026-02-19 13:52:20.275', NULL, 'tt3420504', 0, NULL, 'ARCHIVED', NULL, NULL),
(104, 'The Tomorrow War', 'The Tomorrow War', 'the-tomorrow-war', 'A family man travels to the year 2051 to join a global war against a deadly alien species.', 2021, 138, 'Chris McKay', 'Chris Pratt, Yvonne Strahovski, J.K. Simmons', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmUyNzY2YWYtNWQ0My00ODMwLTkwOTQtOTA0ZjM0MjRmYjJiXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt9777666/', 0, 0, 0, '2026-02-19 13:52:29.633', '2026-02-19 13:52:29.633', NULL, 'tt9777666', 0, NULL, 'ARCHIVED', NULL, NULL),
(105, 'Black Widow', 'Black Widow', 'black-widow', 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.', 2021, 134, 'Cate Shortland', 'Scarlett Johansson, Florence Pugh, David Harbour', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTMyZTA0ZTItYjY3Yi00ODNjLWExYTgtYzgxZTk0NTg0Y2FlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt3480822/', 0, 0, 0, '2026-02-19 13:52:37.613', '2026-02-19 13:52:37.613', NULL, 'tt3480822', 0, NULL, 'ARCHIVED', NULL, NULL),
(106, 'The Green Knight', 'The Green Knight', 'the-green-knight', 'A fantasy retelling of the medieval story of Sir Gawain and the Green Knight.', 2021, 130, 'David Lowery', 'Dev Patel, Alicia Vikander, Joel Edgerton', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjRjNmU1M2ItNDU4Ni00ZGY2LTlmNzItY2MxYmY3OTllZjMwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt9243804/', 0, 0, 0, '2026-02-19 13:52:46.648', '2026-02-19 13:52:46.648', NULL, 'tt9243804', 0, NULL, 'ARCHIVED', NULL, NULL),
(107, 'Jungle Cruise', 'Jungle Cruise', 'jungle-cruise', 'A small riverboat takes a group of travelers through a jungle filled with dangerous animals.', 2021, 127, 'Jaume Collet-Serra', 'Dwayne Johnson, Emily Blunt, Edgar Ramírez', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWU5ZTBkMjQtMzg2Yi00ZmJlLTk4YWEtYTc0ZjU1YzE1NGNkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt0870154/', 0, 0, 0, '2026-02-19 13:52:55.022', '2026-02-19 13:52:55.022', NULL, 'tt0870154', 0, NULL, 'ARCHIVED', NULL, NULL),
(108, 'The King\'s Man', 'The King\'s Man', 'the-kings-man', 'In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions of people.', 2021, 131, 'Matthew Vaughn', 'Ralph Fiennes, Gemma Arterton, Rhys Ifans', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjY3YTY3MGMtMjVmYS00ZmM3LWIxMDAtYWVhZTAyZDMwNmMwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt6856242/', 0, 0, 0, '2026-02-19 13:53:03.142', '2026-02-19 13:53:03.142', NULL, 'tt6856242', 0, NULL, 'ARCHIVED', NULL, NULL),
(109, 'Kate', 'Kate', 'kate', 'A jaded assassin assigned to target a yakuza clan has 24 hours to find out who poisoned her and get vengeance before she dies.', 2021, 106, 'Cedric Nicolas-Troyan', 'Mary Elizabeth Winstead, Woody Harrelson, Miku Martineau', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTliYmJjYzQtOTU1Mi00NDE1LTgxZTEtYmQwOTk1NTZlOTBjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt7737528/', 0, 0, 0, '2026-02-19 13:53:12.588', '2026-02-19 13:53:12.588', NULL, 'tt7737528', 0, NULL, 'ARCHIVED', NULL, NULL),
(110, 'Eternals', 'Eternals', 'eternals', 'The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.', 2021, 156, 'Chloé Zhao', 'Gemma Chan, Richard Madden, Angelina Jolie', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTBiZjI2M2UtZTNiNy00NmU4LWJiMjYtZjk4MDIzMzhlMjFlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt9032400/', 0, 0, 1, '2026-02-19 13:53:20.674', '2026-02-19 13:53:20.674', NULL, 'tt9032400', 0, NULL, 'OK', NULL, NULL),
(111, 'Mortal Kombat', 'Mortal Kombat', 'mortal-kombat', 'MMA fighter Cole Young seeks out Earth&apos;s greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.', 2021, 110, 'Simon McQuoid', 'Lewis Tan, Jessica McNamee, Josh Lawson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNmRmN2I5M2EtNDA1Ny00N2ZmLWE3YWYtMjQ1NTFjY2Q4NWM5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt0293429/', 0, 0, 0, '2026-02-19 13:53:25.308', '2026-02-19 13:53:25.308', NULL, 'tt0293429', 0, NULL, 'ARCHIVED', NULL, NULL),
(112, 'Venom: Let There Be Carnage', 'Venom: Let There Be Carnage', 'venom-let-there-be-carnage', 'Eddie Brock attempts to reignite his career by interviewing serial killer Cletus Kasady, who becomes the host of the symbiote Carnage and escapes prison after a failed execution.', 2021, 97, 'Andy Serkis', 'Tom Hardy, Woody Harrelson, Michelle Williams', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZGIxMTU1MjItM2FmMi00YmFiLTgwNDMtMTczYmVjYTBhNGZhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt7097896/', 0, 0, 0, '2026-02-19 13:53:33.025', '2026-02-21 18:10:57.121', NULL, 'tt7097896', 0, NULL, 'ARCHIVED', NULL, 3),
(113, 'Army of the Dead', 'Army of the Dead', 'army-of-the-dead', 'Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist ever attempted.', 2021, 148, 'Zack Snyder', 'Dave Bautista, Ella Purnell, Ana de la Reguera', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjc0MDFjZmQtMWMxZi00YzY4LWI5N2EtOGQwM2IzZjRkYmY1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.8, 'https://www.imdb.com/title/tt0993840/', 0, 0, 0, '2026-02-19 13:53:42.021', '2026-02-19 13:53:42.021', NULL, 'tt0993840', 0, NULL, 'ARCHIVED', NULL, NULL),
(114, 'Escape Room: Tournament of Champions', 'Escape Room: Tournament of Champions', 'escape-room-tournament-of-champions', 'Six people unwillingly find themselves locked in another series of escape rooms, slowly uncovering what they have in common to survive. Joining forces with two of the original survivors, they soon discover they&apos;ve all played the g...', 2021, 88, 'Adam Robitel', 'Taylor Russell, Logan Miller, Deborah Ann Woll', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNWNlMjU3NGQtYTEwZC00NDE3LWFmMTgtZTEzNjA1OGZiZjI3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.8, 'https://www.imdb.com/title/tt9844522/', 0, 0, 0, '2026-02-19 13:53:51.463', '2026-02-19 13:53:51.463', NULL, 'tt9844522', 0, NULL, 'ARCHIVED', NULL, NULL),
(115, 'Chaos Walking', 'Chaos Walking', 'chaos-walking', 'Two unlikely companions embark on a perilous adventure through the badlands of an unexplored planet as they try to escape a dangerous and disorienting reality where all thoughts are seen and heard by everyone.', 2021, 109, 'Doug Liman', 'Tom Holland, Daisy Ridley, Demián Bichir', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODI3NjZiZDAtZWRlZi00MzYyLWEwOTctNjFhMmQ3MzBjMGJhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.7, 'https://www.imdb.com/title/tt2076822/', 0, 0, 0, '2026-02-19 13:53:59.972', '2026-02-19 13:53:59.972', NULL, 'tt2076822', 0, NULL, 'ARCHIVED', NULL, NULL),
(116, 'The Ice Road', 'The Ice Road', 'the-ice-road', 'After a remote diamond mine collapses in far northern Canada, a &apos;big-rig&apos; ice road driver must lead an impossible rescue mission over a frozen lake to save the trapped miners.', 2021, 109, 'Jonathan Hensleigh', 'Liam Neeson, Marcus Thomas, Laurence Fishburne', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDNiMjM2NTYtOGI4MC00YjZkLWE2ZjAtZjcyNDg5ZDNmYWVjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.7, 'https://www.imdb.com/title/tt3758814/', 3, 0, 0, '2026-02-19 13:54:08.142', '2026-02-19 13:54:35.218', NULL, 'tt3758814', 0, NULL, 'NO_SERVER', NULL, NULL),
(117, 'Stowaway', 'Stowaway', 'stowaway', 'A three-person crew on a mission to Mars faces an impossible choice when an unplanned passenger jeopardizes the lives of everyone on board.', 2021, 116, 'Joe Penna', 'Anna Kendrick, Daniel Dae Kim, Shamier Anderson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNGQ3YjViNDgtMjQwZC00ZmVmLTljM2EtNjU0Y2EwN2EwMjIxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.7, 'https://www.imdb.com/title/tt9203694/', 0, 0, 0, '2026-02-19 13:54:17.946', '2026-02-19 13:54:17.946', NULL, 'tt9203694', 0, NULL, 'ARCHIVED', NULL, NULL),
(118, 'Space Jam: A New Legacy', 'Space Jam: A New Legacy', 'space-jam-a-new-legacy', 'A rogue artificial intelligence kidnaps the son of famed basketball player LeBron James, who then has to work with the Looney Tunes to win a basketball game.', 2021, 115, 'Malcolm D. Lee', 'LeBron James, Don Cheadle, Cedric Joe', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDkyOGM4MDMtZWU4ZS00YWMxLTgzNjAtYzI4M2Y1ODA4YWJlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 4.5, 'https://www.imdb.com/title/tt3554046/', 2, 0, 0, '2026-02-19 13:54:26.330', '2026-02-19 13:54:47.357', NULL, 'tt3554046', 0, NULL, 'ARCHIVED', NULL, NULL),
(119, 'Ôkami kodomo no Ame to Yuki', 'Ôkami kodomo no Ame to Yuki', 'kami-kodomo-no-ame-to-yuki', 'After her werewolf lover unexpectedly dies in an accident, a young woman must find ways to raise their werewolf son and daughter while keeping their trait hidden from society.', 2012, 117, 'Mamoru Hosoda', 'Aoi Miyazaki, Takao Osawa, Haru Kuroki', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDc4MTk0ZTEtMWNiMC00MTM3LWFmOTQtMDAwMjQ2MjhiNTcxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt2140203/', 0, 0, 0, '2026-02-19 13:54:37.863', '2026-02-19 13:54:37.863', NULL, 'tt2140203', 0, NULL, 'ARCHIVED', NULL, NULL),
(120, 'Wreck-It Ralph', 'Wreck-It Ralph', 'wreck-it-ralph', 'Ralph is tired of playing the role of a bad guy and embarks on a journey to become a video game hero. But he accidentally lets loose a deadly enemy that threatens the entire arcade.', 2012, 101, 'Rich Moore', 'John C. Reilly, Jack McBrayer, Jane Lynch', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzMxNTExOTkyMF5BMl5BanBnXkFtZTcwMzEyNDc0OA@@._V1_.jpg', NULL, 1, 7.7, 'https://www.imdb.com/title/tt1772341/', 0, 0, 0, '2026-02-19 13:54:47.309', '2026-02-19 13:54:47.309', NULL, 'tt1772341', 0, NULL, 'ARCHIVED', NULL, NULL),
(121, 'Rise of the Guardians', 'Rise of the Guardians', 'rise-of-the-guardians', 'When the evil spirit Pitch launches an assault on Earth, the Immortal Guardians team up to protect the innocence of children all around the world.', 2012, 97, 'Peter Ramsey', 'Hugh Jackman, Alec Baldwin, Isla Fisher', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTkzMjgwMDg1M15BMl5BanBnXkFtZTcwMTgzNTI1OA@@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt1446192/', 0, 0, 0, '2026-02-19 13:54:54.887', '2026-02-19 13:54:54.887', NULL, 'tt1446192', 0, NULL, 'ARCHIVED', NULL, NULL),
(122, 'Brave', 'Brave', 'brave', 'Determined to make her own path in life, Princess Merida defies a custom that brings chaos to her kingdom. Granted one wish, Merida must rely on her bravery and her archery skills to undo a beastly curse.', 2012, 93, 'Mark Andrews', 'Kelly Macdonald, Billy Connolly, Emma Thompson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt1217209/', 0, 0, 0, '2026-02-19 13:55:04.019', '2026-02-19 13:55:04.019', NULL, 'tt1217209', 0, NULL, 'ARCHIVED', NULL, NULL),
(123, 'Hotel Transylvania', 'Hotel Transylvania', 'hotel-transylvania', 'Dracula, who operates a high-end resort away from the human world, goes into overprotective mode when a boy discovers the resort and falls for the count&apos;s teenaged daughter.', 2012, 91, 'Genndy Tartakovsky', 'Adam Sandler, Kevin James, Andy Samberg', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTM3NjQyODI3M15BMl5BanBnXkFtZTcwMDM4NjM0OA@@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt0837562/', 0, 0, 0, '2026-02-19 13:55:12.414', '2026-02-21 18:12:36.286', NULL, 'tt0837562', 0, NULL, 'ARCHIVED', NULL, 5),
(124, 'ParaNorman', 'ParaNorman', 'paranorman', 'A misunderstood boy takes on ghosts, zombies and grown-ups to save his town from a centuries-old curse.', 2012, 92, 'Chris Butler', 'Kodi Smit-McPhee, Anna Kendrick, Christopher Mintz-Plasse', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTI0MjA3M2ItY2QzMS00MzZiLWE5YTAtM2ZlODk1MjBhNjA0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt1623288/', 0, 0, 0, '2026-02-19 13:55:20.357', '2026-02-19 13:55:20.357', NULL, 'tt1623288', 0, NULL, 'ARCHIVED', NULL, NULL),
(125, 'Frankenweenie', 'Frankenweenie', 'frankenweenie', 'When a boy&apos;s beloved dog passes away suddenly, he attempts to bring the animal back to life through a powerful science experiment.', 2012, 87, 'Tim Burton', 'Winona Ryder, Catherine O&apos;Hara, Martin Short', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjNjOThlZTctMjNmNy00YjdmLTgwOTYtMzg1N2VmNmMyOTBlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt1142977/', 0, 0, 0, '2026-02-19 13:55:29.514', '2026-02-19 13:55:29.514', NULL, 'tt1142977', 0, NULL, 'ARCHIVED', NULL, NULL),
(126, 'Madagascar 3: Europe\'s Most Wanted', 'Madagascar 3: Europe\'s Most Wanted', 'madagascar-3-europes-most-wanted', 'The Madagascar animals join a struggling European circus to get back to New York, but find themselves being pursued by a psychotic animal-control officer.', 2012, 93, 'Eric Darnell', 'Ben Stiller, Jada Pinkett Smith, Chris Rock', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTM5OWRiZTAtOTNkMS00NzNhLTkwYmYtMWI1MzkyMjE3MWE1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt1277953/', 0, 0, 0, '2026-02-19 13:55:38.026', '2026-02-19 13:55:38.026', NULL, 'tt1277953', 0, NULL, 'ARCHIVED', NULL, NULL),
(127, 'The Pirates! In an Adventure with Scientists!', 'The Pirates! In an Adventure with Scientists!', 'the-pirates-in-an-adventure-with-scientists', 'Pirate Captain sets out on a mission to defeat his rivals Black Bellamy and Cutlass Liz for the Pirate of the year Award. The quest takes Captain and his crew from the shores of Blood Island to the foggy streets of Victorian London.', 2012, 88, 'Peter Lord', 'Hugh Grant, Salma Hayek, Jeremy Piven', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjAyNDc5ZTYtZGQyZi00NGFkLWI0Y2MtNTU5YTgxNGVjY2Y1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt1430626/', 0, 0, 0, '2026-02-19 13:55:46.159', '2026-02-19 13:55:46.159', NULL, 'tt1430626', 0, NULL, 'ARCHIVED', NULL, NULL),
(128, 'Ice Age: Continental Drift', 'Ice Age: Continental Drift', 'ice-age-continental-drift', 'Manny, Diego, and Sid embark upon another adventure after their continent is set adrift. Using an iceberg as a ship, they encounter sea creatures and battle pirates as they explore a new world.', 2012, 88, 'Steve Martino', 'Ray Romano, Denis Leary, John Leguizamo', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTM3NDM5MzY5Ml5BMl5BanBnXkFtZTcwNjExMDUwOA@@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt1667889/', 0, 0, 0, '2026-02-19 13:55:55.097', '2026-02-19 13:55:55.097', NULL, 'tt1667889', 0, NULL, 'ARCHIVED', NULL, NULL),
(129, 'The Lorax', 'The Lorax', 'the-lorax', 'A 12-year-old boy searches for the one thing that will enable him to win the affection of the girl of his dreams. To find it he must discover the story of the Lorax, the grumpy yet charming creature who fights to protect his world.', 2012, 86, 'Kyle Balda', 'Zac Efron, Taylor Swift, Danny DeVito', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTU1MTAwMjk1NF5BMl5BanBnXkFtZTcwMDI5NDc4Ng@@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt1482459/', 0, 0, 0, '2026-02-19 13:56:04.608', '2026-02-19 13:56:04.608', NULL, 'tt1482459', 0, NULL, 'ARCHIVED', NULL, NULL),
(130, 'Moneyball', 'Moneyball', 'moneyball', 'Oakland A&apos;s general manager Billy Beane&apos;s successful attempt to assemble a baseball team on a lean budget by employing computer-generated analysis to acquire new players.', 2011, 133, 'Bennett Miller', 'Brad Pitt, Robin Wright, Jonah Hill', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjAxOTU3Mzc1M15BMl5BanBnXkFtZTcwMzk1ODUzNg@@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1210166/', 0, 0, 0, '2026-02-19 13:56:12.770', '2026-02-19 13:56:12.770', NULL, 'tt1210166', 0, NULL, 'ARCHIVED', NULL, NULL),
(131, 'Soul Surfer', 'Soul Surfer', 'soul-surfer', 'Bethany Hamilton, a professional surfer, loses her left arm in a shark attack. Unwilling to pay attention to the gravity of her situation, Bethany decides to get back into the ocean and surf again.', 2011, 112, 'Sean McNamara', 'AnnaSophia Robb, Dennis Quaid, Helen Hunt', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTU2MDg0OTYyM15BMl5BanBnXkFtZTcwMjg5MjY0NA@@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt1596346/', 0, 0, 0, '2026-02-19 13:56:20.463', '2026-02-19 13:56:20.463', NULL, 'tt1596346', 0, NULL, 'ARCHIVED', NULL, NULL),
(132, 'Kill the Irishman', 'Kill the Irishman', 'kill-the-irishman', 'The true story of Danny Greene, a tough Irish thug working for mobsters in Cleveland during the 1970&apos;s.', 2012, 106, 'Jonathan Hensleigh', 'Ray Stevenson, Christopher Walken, Vincent D&apos;Onofrio', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTQyNzIxMzMwMV5BMl5BanBnXkFtZTcwOTU4OTcxNA@@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt1416801/', 0, 0, 0, '2026-02-19 13:56:29.385', '2026-02-19 13:56:29.385', NULL, 'tt1416801', 0, NULL, 'ARCHIVED', NULL, NULL),
(133, 'The Devil\'s Double', 'The Devil\'s Double', 'the-devils-double', 'A chilling vision of the house of Saddam. The world of Hussein comes to life through the eyes of the man who was given a choice; either be the double for Saddam&apos;s sadistic son, or die.', 2011, 109, 'Lee Tamahori', 'Dominic Cooper, Ludivine Sagnier, Raad Rawi', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjI2MjA3MTQ0N15BMl5BanBnXkFtZTcwNjc4NDYwNQ@@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt1270262/', 0, 0, 0, '2026-02-19 13:56:37.679', '2026-02-19 13:56:37.679', NULL, 'tt1270262', 0, NULL, 'ARCHIVED', NULL, NULL),
(134, 'My Week with Marilyn', 'My Week with Marilyn', 'my-week-with-marilyn', 'Colin Clark, an employee of Sir Laurence Olivier, documents the tense interactions between Olivier and Marilyn Monroe during the production of The Prince and the Showgirl (1957).', 2011, 99, 'Simon Curtis', 'Michelle Williams, Eddie Redmayne, Kenneth Branagh', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTYzODYwOTIzOV5BMl5BanBnXkFtZTcwODE2NjAwNw@@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt1655420/', 0, 0, 0, '2026-02-19 13:56:46.097', '2026-02-19 13:56:46.097', NULL, 'tt1655420', 0, NULL, 'ARCHIVED', NULL, NULL),
(135, 'Bernie', 'Bernie', 'bernie', 'In small-town Texas, an affable mortician strikes up a friendship with a wealthy widow, though when she starts to become controlling, he goes to great lengths to separate himself from her grasp.', 2012, 104, 'Richard Linklater', 'Jack Black, Shirley MacLaine, Matthew McConaughey', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTk2NDEwODU5M15BMl5BanBnXkFtZTcwNDMwNzc0Nw@@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt1704573/', 0, 0, 0, '2026-02-19 13:56:54.080', '2026-02-19 13:56:54.080', NULL, 'tt1704573', 0, NULL, 'ARCHIVED', NULL, NULL),
(136, 'Machine Gun Preacher', 'Machine Gun Preacher', 'machine-gun-preacher', 'Sam Childers is a former drug-dealing biker tough guy who found God and became a crusader for hundreds of Sudanese children who&apos;ve been forced to become soldiers.', 2011, 129, 'Marc Forster', 'Gerard Butler, Michelle Monaghan, Michael Shannon', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDI0NDMzMDU3N15BMl5BanBnXkFtZTcwMTIzNjQzNg@@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt1586752/', 0, 0, 0, '2026-02-19 13:57:03.676', '2026-02-19 13:57:03.676', NULL, 'tt1586752', 0, NULL, 'ARCHIVED', NULL, NULL),
(137, 'J. Edgar', 'J. Edgar', 'j-edgar', 'J. Edgar Hoover, powerful head of the F.B.I. for nearly fifty years, looks back on his professional and personal life.', 2011, 137, 'Clint Eastwood', 'Leonardo DiCaprio, Armie Hammer, Naomi Watts', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTc0NDM4ODU2Nl5BMl5BanBnXkFtZTcwNzQ0NTg4Ng@@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt1616195/', 0, 0, 0, '2026-02-19 13:57:12.751', '2026-02-19 13:57:12.751', NULL, 'tt1616195', 0, NULL, 'ARCHIVED', NULL, NULL),
(138, 'A Dangerous Method', 'A Dangerous Method', 'a-dangerous-method', 'A look at how the intense relationship between Carl Jung and Sigmund Freud gives birth to psychoanalysis.', 2011, 99, 'David Cronenberg', 'Michael Fassbender, Keira Knightley, Viggo Mortensen', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTU5Mjk3NjgxMl5BMl5BanBnXkFtZTcwMDM5MjA5Ng@@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt1571222/', 0, 0, 0, '2026-02-19 13:57:21.825', '2026-02-19 13:57:21.825', NULL, 'tt1571222', 0, NULL, 'ARCHIVED', NULL, NULL),
(139, 'The Iron Lady', 'The Iron Lady', 'the-iron-lady', 'An elderly Margaret Thatcher talks to the imagined presence of her recently deceased husband as she struggles to come to terms with his death while scenes from her past life, from girlhood to British prime minister, intervene.', 2012, 105, 'Phyllida Lloyd', 'Meryl Streep, Jim Broadbent, Richard E. Grant', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODEzNDUyMDE3NF5BMl5BanBnXkFtZTcwMTgzOTg3Ng@@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt1007029/', 0, 0, 0, '2026-02-19 13:57:31.446', '2026-02-19 13:57:31.446', NULL, 'tt1007029', 0, NULL, 'ARCHIVED', NULL, NULL),
(140, 'Ratatouille', 'Ratatouille', 'ratatouille', 'A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.', 2007, 111, 'Brad Bird', 'Brad Garrett, Lou Romano, Patton Oswalt', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt0382932/', 0, 0, 0, '2026-02-19 13:57:42.114', '2026-02-19 13:57:42.114', NULL, 'tt0382932', 0, NULL, 'ARCHIVED', NULL, NULL),
(141, 'Hot Fuzz', 'Hot Fuzz', 'hot-fuzz', 'An overachieving London police sergeant is transferred to a village where the easygoing officers object to his fervor for regulations, all while a string of grisly murders strikes the town.', 2007, 121, 'Edgar Wright', 'Simon Pegg, Nick Frost, Martin Freeman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjFkZTkzZTQtNjM1ZS00M2EyLWE3MTAtMmY5Yzk0NTc0NDc3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt0425112/', 0, 0, 0, '2026-02-19 13:57:50.125', '2026-02-19 13:57:50.125', NULL, 'tt0425112', 0, NULL, 'ARCHIVED', NULL, NULL),
(142, 'Superbad', 'Superbad', 'superbad', 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.', 2007, 113, 'Greg Mottola', 'Michael Cera, Jonah Hill, Christopher Mintz-Plasse', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjk0MzdlZGEtNTRkOC00ZDRiLWJkYjAtMzUzYTRiNzk1YTViXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt0829482/', 0, 0, 0, '2026-02-19 13:57:58.994', '2026-02-19 13:57:58.994', NULL, 'tt0829482', 0, NULL, 'ARCHIVED', NULL, NULL),
(143, 'Juno', 'Juno', 'juno', 'Faced with an unplanned pregnancy, an offbeat young woman makes a selfless decision regarding the unborn child.', 2007, 96, 'Jason Reitman', 'Elliot Page, Michael Cera, Jennifer Garner', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTIwMDgwODc5Nl5BMl5BanBnXkFtZTYwMjQzMDM4._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt0467406/', 0, 0, 0, '2026-02-19 13:58:07.023', '2026-02-19 13:58:07.023', NULL, 'tt0467406', 0, NULL, 'ARCHIVED', NULL, NULL),
(144, 'Lars and the Real Girl', 'Lars and the Real Girl', 'lars-and-the-real-girl', 'A delusional young man strikes up an unconventional relationship with a doll he finds on the Internet.', 2007, 106, 'Craig Gillespie', 'Ryan Gosling, Emily Mortimer, Paul Schneider', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZThiOTA4N2UtNzJiYS00MDI0LWI3OWItYzYxYzU3M2YwM2M4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt0805564/', 0, 0, 0, '2026-02-19 13:58:16.569', '2026-02-19 13:58:16.569', NULL, 'tt0805564', 0, NULL, 'ARCHIVED', NULL, NULL),
(145, 'The Bucket List', 'The Bucket List', 'the-bucket-list', 'Two terminally ill men escape from a cancer ward and head off on a road trip with a wish list of to-dos before they die.', 2008, 97, 'Rob Reiner', 'Jack Nicholson, Morgan Freeman, Sean Hayes', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY2NTUyMjIyNF5BMl5BanBnXkFtZTYwNzYwMDM4._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt0825232/', 0, 0, 0, '2026-02-19 13:58:24.416', '2026-02-19 13:58:24.416', NULL, 'tt0825232', 0, NULL, 'ARCHIVED', NULL, NULL),
(146, 'Death at a Funeral', 'Death at a Funeral', 'death-at-a-funeral', 'Chaos ensues when a man tries to expose a dark secret regarding a recently deceased patriarch of a dysfunctional British family.', 2007, 90, 'Frank Oz', 'Matthew Macfadyen, Peter Dinklage, Ewen Bremner', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE4OTIyNTM1MF5BMl5BanBnXkFtZTcwMjUzNTg0MQ@@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt0795368/', 0, 0, 0, '2026-02-19 13:58:33.189', '2026-02-19 13:58:33.189', NULL, 'tt0795368', 0, NULL, 'ARCHIVED', NULL, NULL),
(147, 'The Simpsons Movie', 'The Simpsons Movie', 'the-simpsons-movie', 'After Homer pollutes the town&apos;s water supply, Springfield is encased in a gigantic dome by the EPA and the Simpsons are declared fugitives.', 2007, 87, 'David Silverman', 'Dan Castellaneta, Julie Kavner, Nancy Cartwright', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzIxN2IzOGItOTcyZi00MTkzLWE4ZjktZTdlOWFiYWE4NzlmXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt0462538/', 0, 0, 0, '2026-02-19 13:58:41.111', '2026-02-19 13:58:41.111', NULL, 'tt0462538', 0, NULL, 'ARCHIVED', NULL, NULL),
(148, 'The Darjeeling Limited', 'The Darjeeling Limited', 'the-darjeeling-limited', 'A year after their father&apos;s funeral, three brothers travel across India by train in an attempt to bond with each other.', 2007, 91, 'Wes Anderson', 'Owen Wilson, Adrien Brody, Jason Schwartzman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDY4Mzc2YTQtZDg4ZS00OGIzLWJhOGMtOTQ2OThmNzg4NTc4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt0838221/', 0, 0, 0, '2026-02-19 13:58:50.222', '2026-02-19 13:58:50.222', NULL, 'tt0838221', 0, NULL, 'ARCHIVED', NULL, NULL),
(149, 'Enchanted', 'Enchanted', 'enchanted', 'A young maiden in a land called Andalasia, who is prepared to be wed, is sent away to New York City by an evil Queen, where she falls in love with a lawyer.', 2007, 107, 'Kevin Lima', 'Amy Adams, Susan Sarandon, James Marsden', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE4NDQ2Mjc0OF5BMl5BanBnXkFtZTcwNzQ2NDE1MQ@@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0461770/', 0, 0, 0, '2026-02-19 13:58:59.023', '2026-02-19 13:58:59.023', NULL, 'tt0461770', 0, NULL, 'ARCHIVED', NULL, NULL),
(150, 'P.S. I Love You', 'P.S. I Love You', 'ps-i-love-you', 'A young widow discovers that her late husband has left her 10 messages intended to help ease her pain and start a new life.', 2007, 126, 'Richard LaGravenese', 'Hilary Swank, Gerard Butler, Harry Connick Jr.', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTg2MDg4MjI5NV5BMl5BanBnXkFtZTcwMzQ0MDczMw@@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt0431308/', 0, 0, 0, '2026-02-19 13:59:07.555', '2026-02-19 13:59:07.555', NULL, 'tt0431308', 0, NULL, 'ARCHIVED', NULL, NULL),
(151, 'Planet Terror', 'Planet Terror', 'planet-terror', 'After an experimental bio-weapon is released, turning thousands into zombie-like creatures, it&apos;s up to a rag-tag group of survivors to stop the infected and those behind its release.', 2007, 105, 'Robert Rodriguez', 'Rose McGowan, Freddy Rodríguez, Josh Brolin', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNmEzZTAxNDQtN2ZmMy00NGNlLWI3NDYtNGI3ZTlkNWU1NWZhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt1077258/', 0, 0, 0, '2026-02-19 13:59:16.127', '2026-02-19 13:59:16.127', NULL, 'tt1077258', 0, NULL, 'ARCHIVED', NULL, NULL),
(152, 'Charlie Wilson\'s War', 'Charlie Wilson\'s War', 'charlie-wilsons-war', 'A drama based on Texas congressman Charlie Wilson&apos;s covert dealings in Afghanistan, where his efforts to assist rebels in their war with the Soviets have some unforeseen and long-reaching effects.', 2007, 102, 'Mike Nichols', 'Tom Hanks, Julia Roberts, Philip Seymour Hoffman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTgwMDgwMDc4MF5BMl5BanBnXkFtZTYwOTU3MDM4._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt0472062/', 0, 0, 0, '2026-02-19 13:59:23.697', '2026-02-19 13:59:23.697', NULL, 'tt0472062', 0, NULL, 'ARCHIVED', NULL, NULL),
(153, 'Knocked Up', 'Knocked Up', 'knocked-up', 'For fun-loving party animal Ben Stone, the last thing he ever expected was for his one-night stand to show up on his doorstep eight weeks later to tell him she&apos;s pregnant with his child.', 2007, 129, 'Judd Apatow', 'Seth Rogen, Katherine Heigl, Paul Rudd', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmIyMDA5YzgtZmNhMC00YWNlLTgwYjItOTc0ZGNjNTcwNzAxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt0478311/', 0, 0, 0, '2026-02-19 13:59:32.894', '2026-02-19 13:59:32.894', NULL, 'tt0478311', 0, NULL, 'ARCHIVED', NULL, NULL),
(154, 'Meet the Robinsons', 'Meet the Robinsons', 'meet-the-robinsons', 'Lewis is a brilliant inventor who meets mysterious stranger named Wilbur Robinson, whisking Lewis away in a time machine and together they team up to track down Bowler Hat Guy in a showdown that ends with an unexpected twist of fate.', 2007, 95, 'Stephen J. Anderson', 'Daniel Hansen, Wesley Singerman, Angela Bassett', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjVjY2E5MWYtZDZmNy00NzllLThlNzEtMmQ4MjExNTIxZDUzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt0396555/', 0, 0, 0, '2026-02-19 13:59:41.148', '2026-02-19 13:59:41.148', NULL, 'tt0396555', 0, NULL, 'ARCHIVED', NULL, NULL);
INSERT INTO `movie` (`id`, `titleBG`, `titleEN`, `slug`, `description`, `year`, `duration`, `director`, `cast`, `videoUrl`, `trailerUrl`, `posterUrl`, `backdropUrl`, `isHD`, `rating`, `imdbLink`, `views`, `featured`, `published`, `createdAt`, `updatedAt`, `tmdbId`, `imdbId`, `isSeries`, `descriptionEN`, `healthStatus`, `lastChecked`, `collectionId`) VALUES
(155, 'Dan in Real Life', 'Dan in Real Life', 'dan-in-real-life', 'A widower finds out the woman he fell in love with is his brother&apos;s girlfriend.', 2007, 98, 'Peter Hedges', 'Steve Carell, Juliette Binoche, Dane Cook', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA2Nzc1NzQ1OV5BMl5BanBnXkFtZTcwOTE0MDE1MQ@@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt0480242/', 0, 0, 0, '2026-02-19 13:59:48.940', '2026-02-19 13:59:48.940', NULL, 'tt0480242', 0, NULL, 'ARCHIVED', NULL, NULL),
(156, 'Hairspray', 'Hairspray', 'hairspray', 'Pleasantly plump teenager Tracy Turnblad teaches 1962 Baltimore a thing or two about integration after landing a spot on a local TV dance show.', 2007, 117, 'Adam Shankman', 'John Travolta, Queen Latifah, Nikki Blonsky', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYzBiNjJhNmUtMjM0Yi00ZjZkLTliNzUtYWEyYmVkZTFhMmQzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt0427327/', 0, 0, 0, '2026-02-19 13:59:57.508', '2026-02-19 13:59:57.508', NULL, 'tt0427327', 0, NULL, 'ARCHIVED', NULL, NULL),
(157, 'Surf\'s Up', 'Surf\'s Up', 'surfs-up', 'A behind-the-scenes look at the annual Penguin World Surfing Championship, and its newest participant, up-and-comer Cody Maverick.', 2007, 85, 'Ash Brannon', 'Shia LaBeouf, Zooey Deschanel, Jon Heder', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE4NDE3NzcwM15BMl5BanBnXkFtZTcwMTI0ODYzMw@@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt0423294/', 0, 0, 0, '2026-02-19 14:00:08.305', '2026-02-19 14:00:08.305', NULL, 'tt0423294', 0, NULL, 'ARCHIVED', NULL, NULL),
(158, 'Trick \'r Treat', 'Trick \'r Treat', 'trick-r-treat', 'Five Halloween stories: A principal has a secret life, a virgin is looking for her first time, a group of kids pull a prank, a woman who loathes Halloween does not respect the rules and a mean old man meets a demonic trick-or-trea...', 2015, 82, 'Michael Dougherty', 'Anna Paquin, Brian Cox, Dylan Baker', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjI2YTA2NmUtOTY4MS00ZGJjLWI1NzctOWRlNzgzNDk1ZTk2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt0862856/', 0, 0, 0, '2026-02-19 14:00:15.937', '2026-02-19 14:00:15.937', NULL, 'tt0862856', 0, NULL, 'ARCHIVED', NULL, NULL),
(159, 'Shoot \'Em Up', 'Shoot \'Em Up', 'shoot-em-up', 'A man named Mr. Smith delivers a woman&apos;s baby during a shootout, and is then called upon to protect the newborn from the army of gunmen.', 2007, 86, 'Michael Davis', 'Clive Owen, Monica Bellucci, Paul Giamatti', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjEwMDA1MDUwNl5BMl5BanBnXkFtZTcwMDQzMzM1MQ@@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt0465602/', 0, 0, 0, '2026-02-19 14:00:23.473', '2026-02-19 14:00:23.473', NULL, 'tt0465602', 0, NULL, 'ARCHIVED', NULL, NULL),
(160, 'Music and Lyrics', 'Music and Lyrics', 'music-and-lyrics', 'A washed up singer is given a couple days to compose a chart-topping hit for an aspiring teen sensation. Though he&apos;s never written a decent lyric in his life, he sparks with an offbeat younger woman with a flair for words.', 2007, 104, 'Marc Lawrence', 'Hugh Grant, Drew Barrymore, Scott Porter', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDY5MTQwODI3OV5BMl5BanBnXkFtZTcwODM2MjEzMw@@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt0758766/', 0, 0, 0, '2026-02-19 14:00:32.957', '2026-02-19 14:00:32.957', NULL, 'tt0758766', 0, NULL, 'ARCHIVED', NULL, NULL),
(161, 'Mr. Bean\'s Holiday', 'Mr. Bean\'s Holiday', 'mr-beans-holiday', 'Mr. Bean wins a trip to Cannes where he unwittingly separates a young boy from his father and must help the two reunite. Along the way, he discovers the wonders of France, bicycling, and true love.', 2007, 90, 'Steve Bendelack', 'Rowan Atkinson, Willem Dafoe, Steve Pemberton', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTFlZTIxMzYtZTU4Ny00YjZiLTg0OGMtOTFmNmI1ZDVmODQ3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt0453451/', 0, 0, 0, '2026-02-19 14:00:41.550', '2026-02-19 14:00:41.550', NULL, 'tt0453451', 0, NULL, 'ARCHIVED', NULL, NULL),
(162, 'Blades of Glory', 'Blades of Glory', 'blades-of-glory', 'Two rival Olympic ice skaters, who have been permanently banned from the men&apos;s singles competition due to a feud, exploit a loophole that will allow them to qualify as a pairs team.', 2007, 93, 'Josh Gordon', 'Will Ferrell, Jon Heder, Amy Poehler', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY3MDMyMTYxMl5BMl5BanBnXkFtZTcwMjk0NzI0MQ@@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt0445934/', 0, 0, 0, '2026-02-19 14:00:50.595', '2026-02-19 14:00:50.595', NULL, 'tt0445934', 0, NULL, 'ARCHIVED', NULL, NULL),
(163, 'Rush Hour 3', 'Rush Hour 3', 'rush-hour-3', 'After an attempted assassination on Ambassador Han, Lee and Carter head to Paris to protect a French woman with knowledge of the Triads&apos; secret leaders.', 2007, 91, 'Brett Ratner', 'Jackie Chan, Chris Tucker, Max von Sydow', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTA0Nzg5NjQ0MDBeQTJeQWpwZ15BbWU3MDE4Mzg5NDE@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt0293564/', 0, 0, 0, '2026-02-19 14:01:00.095', '2026-02-19 14:01:05.204', NULL, 'tt0293564', 0, NULL, 'ARCHIVED', NULL, 1),
(164, 'The Game Plan', 'The Game Plan', 'the-game-plan', 'An NFL quarterback living the bachelor lifestyle discovers that he has an 8-year-old daughter from a previous relationship.', 2007, 110, 'Andy Fickman', 'Dwayne Johnson, Kyra Sedgwick, Madison Pettis', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjIzMDQ1ZDctNTUwOC00YmQyLTlhZGItNDIwZDIwMjcxMzVjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt0492956/', 0, 0, 0, '2026-02-19 14:01:08.955', '2026-02-19 14:01:08.955', NULL, 'tt0492956', 0, NULL, 'ARCHIVED', NULL, NULL),
(165, 'Shrek the Third', 'Shrek the Third', 'shrek-the-third', 'Reluctantly designated as the heir to the land of Far, Far Away, Shrek hatches a plan to install the rebellious Artie as the new king while Princess Fiona tries to fend off a coup d&apos;état by the jilted Prince Charming.', 2007, 93, 'Raman Hui', 'Mike Myers, Cameron Diaz, Eddie Murphy', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTgyMjc3ODk2MV5BMl5BanBnXkFtZTcwMjY0MjEzMw@@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt0413267/', 0, 0, 0, '2026-02-19 14:01:17.795', '2026-02-19 14:01:17.795', NULL, 'tt0413267', 0, NULL, 'ARCHIVED', NULL, NULL),
(166, 'Bee Movie', 'Bee Movie', 'bee-movie', 'Barry B. Benson, a bee just graduated from college, is disillusioned at his lone career choice: making honey. On a special trip outside the hive, Barry&apos;s life is saved by Vanessa, a florist in New York City. As their relationship ...', 2007, 91, 'Steve Hickner', 'Jerry Seinfeld, Renée Zellweger, Matthew Broderick', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt0389790/', 0, 0, 0, '2026-02-19 14:01:27.891', '2026-02-19 14:01:27.891', NULL, 'tt0389790', 0, NULL, 'ARCHIVED', NULL, NULL),
(167, 'The Heartbreak Kid', 'The Heartbreak Kid', 'the-heartbreak-kid', 'A newly wed man who believes he&apos;s just gotten hitched to the perfect woman encounters another lady on his honeymoon.', 2007, 116, 'Bobby Farrelly', 'Ben Stiller, Michelle Monaghan, Malin Akerman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjExNTM2NTE2NF5BMl5BanBnXkFtZTcwOTI5MDUzMw@@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt0408839/', 0, 0, 0, '2026-02-19 14:01:37.307', '2026-02-19 14:01:37.307', NULL, 'tt0408839', 0, NULL, 'ARCHIVED', NULL, NULL),
(168, 'I Now Pronounce You Chuck & Larry', 'I Now Pronounce You Chuck & Larry', 'i-now-pronounce-you-chuck-larry', 'Two straight, single Brooklyn firefighters pretend to be a gay couple in order to receive domestic partner benefits.', 2007, 115, 'Dennis Dugan', 'Adam Sandler, Kevin James, Jessica Biel', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjdlZWU3MTQtODRhNi00YWFlLWE1ZmYtZjU0MWEzYzhlZmM4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt0762107/', 0, 0, 0, '2026-02-19 14:01:46.987', '2026-02-19 14:01:46.987', NULL, 'tt0762107', 0, NULL, 'ARCHIVED', NULL, NULL),
(169, 'Wild Hogs', 'Wild Hogs', 'wild-hogs', 'A group of suburban biker wannabes looking for adventure hit the open road, but get more than they bargained for when they encounter a New Mexico gang called the Del Fuegos.', 2007, 100, 'Walt Becker', 'Tim Allen, Martin Lawrence, John Travolta', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTRmMWQ2NWEtMjM3Ni00ZGZhLWE1NGYtOWVjODYzNDA1M2ZmXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt0486946/', 0, 0, 0, '2026-02-19 14:01:56.340', '2026-02-19 14:01:56.340', NULL, 'tt0486946', 0, NULL, 'ARCHIVED', NULL, NULL),
(170, 'Evan Almighty', 'Evan Almighty', 'evan-almighty', 'God contacts Congressman Evan Baxter and tells him to build an ark in preparation for a great flood.', 2007, 96, 'Tom Shadyac', 'Steve Carell, Morgan Freeman, Lauren Graham', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTUxMTEzODYxMV5BMl5BanBnXkFtZTcwNzQ4ODU0MQ@@._V1_.jpg', NULL, 1, 5.4, 'https://www.imdb.com/title/tt0413099/', 0, 0, 0, '2026-02-19 14:02:05.500', '2026-02-19 14:02:05.500', NULL, 'tt0413099', 0, NULL, 'ARCHIVED', NULL, NULL),
(171, 'Alvin and the Chipmunks', 'Alvin and the Chipmunks', 'alvin-and-the-chipmunks', 'Three musical chipmunks are discovered by an aspiring songwriter who wants to use their amazing singing abilities to become famous.', 2007, 92, 'Tim Hill', 'Jason Lee, Ross Bagdasarian Jr., Janice Karman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDVjMWNkNjEtOGU5YS00Y2Q2LTgwYjMtMTg0YWM2ZGE2MDM3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.3, 'https://www.imdb.com/title/tt0952640/', 0, 0, 0, '2026-02-19 14:02:14.963', '2026-02-19 14:02:14.963', NULL, 'tt0952640', 0, NULL, 'ARCHIVED', NULL, NULL),
(172, 'Epic Movie', 'Epic Movie', 'epic-movie', 'A spoof on previous years&apos; epic movies (The Da Vinci Code (2006), The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (2005) + 20 more), TV series, music videos and celebs. 4 orphans are on an epic adventure.', 2007, 86, 'Jason Friedberg', 'Kal Penn, Jennifer Coolidge, Fred Willard', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTA3NDM5ODU3NzleQTJeQWpwZ15BbWU3MDgyMjgyNDE@._V1_.jpg', NULL, 1, 2.5, 'https://www.imdb.com/title/tt0799949/', 0, 0, 0, '2026-02-19 14:02:22.692', '2026-02-19 14:02:22.692', NULL, 'tt0799949', 0, NULL, 'ARCHIVED', NULL, NULL),
(173, 'Kill Bill: Vol. 1', 'Kill Bill: Vol. 1', 'kill-bill-vol-1', 'After waking from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.', 2003, 111, 'Quentin Tarantino', 'Uma Thurman, David Carradine, Daryl Hannah', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZmMyYzJlZmYtY2I3NC00NjAyLTkyZWItZjdjZDI1YTYyYTEwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.2, 'https://www.imdb.com/title/tt0266697/', 0, 0, 0, '2026-02-19 14:02:32.197', '2026-02-19 14:02:32.197', NULL, 'tt0266697', 0, NULL, 'ARCHIVED', NULL, NULL),
(174, 'Salinui chueok', 'Salinui chueok', 'salinui-chueok', 'In a small Korean province in 1986, two detectives struggle with the case of multiple young women being found raped and murdered by an unknown culprit.', 2003, 131, 'Bong Joon Ho', 'Song Kang-ho, Kim Sang-kyung, Kim Roe-ha', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmRjOWE5NmMtYTdkYS00ODFlLWJiMTMtYzE2NDZlZjlkZDQ0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt0353969/', 0, 0, 0, '2026-02-19 14:02:40.970', '2026-02-19 14:02:40.970', NULL, 'tt0353969', 0, NULL, 'ARCHIVED', NULL, NULL),
(175, 'Dogville', 'Dogville', 'dogville', 'A woman on the run from the mob is reluctantly accepted in a small Colorado community in exchange for labor, but when a search visits the town she finds out that their support has a price.', 2004, 171, 'Lars von Trier', 'Nicole Kidman, Paul Bettany, Lauren Bacall', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMThkZDEzYWEtMDZhMC00NWQwLTlmMWYtNTEwYjMzY2UxMDRjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt0276919/', 0, 0, 0, '2026-02-19 14:02:49.505', '2026-02-19 14:02:49.505', NULL, 'tt0276919', 0, NULL, 'ARCHIVED', NULL, NULL),
(176, 'Mystic River', 'Mystic River', 'mystic-river', 'The tragic murder of a 19-year-old girl reunites three childhood friends still living in Boston--the victim&apos;s gangster father, a detective, and the disturbed man they both suspect of killing her.', 2003, 138, 'Clint Eastwood', 'Sean Penn, Tim Robbins, Kevin Bacon', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTIzNDUyMjA4MV5BMl5BanBnXkFtZTYwNDc4ODM3._V1_.jpg', NULL, 1, 7.9, 'https://www.imdb.com/title/tt0327056/', 0, 0, 1, '2026-02-19 14:02:57.115', '2026-02-19 14:02:57.115', NULL, 'tt0327056', 0, NULL, 'OK', '2026-02-21 19:11:58.311', NULL),
(177, 'Black Hawk Down', 'Black Hawk Down', 'black-hawk-down', 'The story of one hundred and sixty elite U.S. soldiers who dropped into Mogadishu in October 1993 to capture two top lieutenants of a renegade warlord, but found themselves in a desperate battle with a large force of heavily armed...', 2002, 144, 'Ridley Scott', 'Josh Hartnett, Ewan McGregor, Tom Sizemore', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTM3YTQ1M2MtNDEyNC00NzRlLWFmOTgtYjBhNDg2ODNjNTU0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.7, 'https://www.imdb.com/title/tt0265086/', 0, 0, 0, '2026-02-19 14:07:36.919', '2026-02-19 14:07:36.919', NULL, 'tt0265086', 0, NULL, 'ARCHIVED', NULL, NULL),
(178, 'Enemy at the Gates', 'Enemy at the Gates', 'enemy-at-the-gates', 'A Russian and a German sniper play a game of cat-and-mouse during the Battle of Stalingrad.', 2001, 131, 'Jean-Jacques Annaud', 'Jude Law, Ed Harris, Joseph Fiennes', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODM5MmQyYjktMzg5Ny00Y2Y1LThlNWQtNjQ5OGMwNmY2YjcyXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.5, 'https://www.imdb.com/title/tt0215750/', 0, 0, 0, '2026-02-19 14:07:41.128', '2026-02-19 14:07:41.128', NULL, 'tt0215750', 0, NULL, 'ARCHIVED', NULL, NULL),
(179, 'Spy Game', 'Spy Game', 'spy-game', 'A CIA agent tries to rescue his one-time protege who awaits execution in a Chinese prison.', 2001, 126, 'Tony Scott', 'Robert Redford, Brad Pitt, Catherine McCormack', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTljZmI1MjctMWJmMC00ZjJmLTkwNzUtNGQxNWJhZGRjMjM3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0266987/', 203, 0, 0, '2026-02-19 14:07:45.332', '2026-02-21 22:58:19.940', NULL, 'tt0266987', 0, NULL, 'ARCHIVED', NULL, NULL),
(180, 'Dune: Part Two', 'Dune: Part Two', 'dune-part-two', 'Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible fu...', 2024, 166, 'Denis Villeneuve', 'Timothée Chalamet, Zendaya, Rebecca Ferguson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.4, 'https://www.imdb.com/title/tt15239678/', 7, 0, 1, '2026-02-21 18:09:34.829', '2026-02-21 22:56:05.261', NULL, 'tt15239678', 0, NULL, 'OK', NULL, 2),
(181, 'Maharaja', 'Maharaja', 'maharaja', 'A barber seeks vengeance after his home is burglarized, cryptically telling police his &quot;lakshmi&quot; has been taken, leaving them uncertain if it&apos;s a person or object. His quest to recover the elusive &quot;lakshmi&quot; unfolds.', 2024, 141, 'Nithilan Saminathan', 'Vijay Sethupathi, Anurag Kashyap, Mamta Mohandas', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTFlMTIxOGItZTk0Zi00MTk2LWJiM2UtMzlhZWYzNjQ4N2Y3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.3, 'https://www.imdb.com/title/tt26548265/', 0, 0, 1, '2026-02-21 18:09:36.430', '2026-02-21 18:09:36.430', NULL, 'tt26548265', 0, NULL, 'OK', NULL, NULL),
(182, 'Transformers One', 'Transformers One', 'transformers-one', 'The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but who once were friends bonded like brothers who changed the fate of Cybertron forever.', 2024, 104, 'Josh Cooley', 'Chris Hemsworth, Brian Tyree Henry, Scarlett Johansson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZWI1ZDY1YTQtMjRkNy00ZDZhLWE3OTItMTIwNzliY2Y1MTZhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt8864596/', 0, 0, 1, '2026-02-21 18:09:39.674', '2026-02-21 18:09:39.674', NULL, 'tt8864596', 0, NULL, 'OK', NULL, NULL),
(183, 'Deadpool & Wolverine', 'Deadpool & Wolverine', 'deadpool-wolverine', 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.', 2024, 128, 'Shawn Levy', 'Ryan Reynolds, Hugh Jackman, Emma Corrin', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.5, 'https://www.imdb.com/title/tt6263850/', 0, 0, 1, '2026-02-21 18:09:42.572', '2026-02-21 18:14:57.883', NULL, 'tt6263850', 0, NULL, 'OK', NULL, 7),
(184, 'Furiosa: A Mad Max Saga', 'Furiosa: A Mad Max Saga', 'furiosa-a-mad-max-saga', 'After being snatched from the Green Place of Many Mothers, while the tyrants Dementus and Immortan Joe fight for power and control, the young Furiosa must survive many trials as she puts together the means to find her way home.', 2024, 148, 'George Miller', 'Anya Taylor-Joy, Chris Hemsworth, Tom Burke', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.5, 'https://www.imdb.com/title/tt12037194/', 0, 0, 1, '2026-02-21 18:09:45.600', '2026-02-21 18:09:45.600', NULL, 'tt12037194', 0, NULL, 'OK', NULL, NULL),
(185, 'Civil War', 'Civil War', 'civil-war', 'In a dystopian future, four journalists travel across the United States during a nation-wide conflict. While trying to survive, they aim to reach the White House to interview the president before he is overthrown.', 2024, 109, 'Alex Garland', 'Kirsten Dunst, Wagner Moura, Cailee Spaeny', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTkzMjc0YzgtY2E0Yi00NDBlLWI0MWUtODY1ZjExMDAyOWZiXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt17279496/', 0, 0, 1, '2026-02-21 18:09:49.314', '2026-02-21 18:09:49.314', NULL, 'tt17279496', 0, NULL, 'OK', NULL, NULL),
(186, 'Kalki 2898-AD', 'Kalki 2898-AD', 'kalki-2898-ad', 'A pregnant woman comes under the protection of an immortal warrior while being tracked down by bounty hunters.', 2024, 180, 'Nag Ashwin', 'Prabhas, Amitabh Bachchan, Kamal Haasan', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt12735488/', 0, 0, 1, '2026-02-21 18:09:51.334', '2026-02-21 18:09:51.334', NULL, 'tt12735488', 0, NULL, 'OK', NULL, NULL),
(187, 'Sonic the Hedgehog 3', 'Sonic the Hedgehog 3', 'sonic-the-hedgehog-3', 'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched, Team Sonic must seek out an unlikely alliance.', 2024, 110, 'Jeff Fowler', 'Jim Carrey, Ben Schwartz, Keanu Reeves', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjZjNjE5NDEtOWJjYS00Mjk2LWI1ZDYtOWI1ZWI3MzRjM2UzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt18259086/', 0, 0, 1, '2026-02-21 18:09:55.264', '2026-02-21 18:09:55.264', NULL, 'tt18259086', 0, NULL, 'OK', NULL, NULL),
(188, 'The Fall Guy', 'The Fall Guy', 'the-fall-guy', 'A stuntman, fresh off an almost career-ending accident, has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.', 2024, 126, 'David Leitch', 'Ryan Gosling, Emily Blunt, Aaron Taylor-Johnson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BM2U0MTJiYTItMjNiZS00MzU4LTkxYTAtYTU0ZGY1ODJhMjRhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt1684562/', 0, 0, 1, '2026-02-21 18:09:57.494', '2026-02-21 18:09:57.494', NULL, 'tt1684562', 0, NULL, 'OK', NULL, NULL),
(189, 'The Ministry of Ungentlemanly Warfare', 'The Ministry of Ungentlemanly Warfare', 'the-ministry-of-ungentlemanly-warfare', 'The British military recruits a small group of highly skilled soldiers to strike against German forces behind enemy lines during World War II.', 2024, 122, 'Guy Ritchie', 'Henry Cavill, Alan Ritchson, Alex Pettyfer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmIxODc5ZjMtYzZmZS00OTE5LThkZDktNWNmODNiZjFhMDgyXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt5177120/', 0, 0, 1, '2026-02-21 18:10:00.782', '2026-02-21 18:10:00.782', NULL, 'tt5177120', 0, NULL, 'OK', NULL, NULL),
(190, 'Rebel Ridge', 'Rebel Ridge', 'rebel-ridge', 'A former Marine grapples his way through a web of small-town corruption when an attempt to post bail for his cousin escalates into a violent standoff with the local police chief.', 2024, 131, 'Jeremy Saulnier', 'Aaron Pierre, Don Johnson, AnnaSophia Robb', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTE4ZDE5ZTktZWZkMC00MGY4LWFkZDUtZTc5YWU3NzM2YmM3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt11301886/', 0, 0, 1, '2026-02-21 18:10:05.481', '2026-02-21 18:10:05.481', NULL, 'tt11301886', 0, NULL, 'OK', NULL, NULL),
(191, 'Kingdom of the Planet of the Apes', 'Kingdom of the Planet of the Apes', 'kingdom-of-the-planet-of-the-apes', 'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he&apos;s been taught about the past and make choices that will define a future for apes and humans alike.', 2024, 145, 'Wes Ball', 'Owen Teague, Freya Allan, Kevin Durand', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDRlZTc3YTItOTk3Yi00NmU4LWFiOGUtNjgwMDZjNjIzNTU1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt11389872/', 0, 0, 1, '2026-02-21 18:10:07.357', '2026-02-21 18:10:07.357', NULL, 'tt11389872', 0, NULL, 'OK', NULL, NULL),
(192, 'Monkey Man', 'Monkey Man', 'monkey-man', 'An anonymous young man unleashes a campaign of vengeance against the corrupt leaders who murdered his mother and continue to systematically victimize the poor and powerless.', 2024, 121, 'Dev Patel', 'Dev Patel, Sharlto Copley, Pitobash', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODM2ZmZjYmQtNTA3NC00MmYzLWEwOTItMDNjYzc3MzI1NWNmXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt9214772/', 0, 0, 1, '2026-02-21 18:10:10.595', '2026-02-21 18:10:10.595', NULL, 'tt9214772', 0, NULL, 'OK', NULL, NULL),
(193, 'Land of Bad', 'Land of Bad', 'land-of-bad', 'A Delta Force team fights for survival as an Air Force drone pilot becomes its eyes in the sky.', 2024, 113, 'William Eubank', 'Liam Hemsworth, Russell Crowe, Luke Hemsworth', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOWI2YjMwMGEtZDJlZC00NGVkLTk2OTktMjhjNTZiNTIxOTg3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt19864802/', 0, 0, 1, '2026-02-21 18:10:12.892', '2026-02-21 18:10:12.892', NULL, 'tt19864802', 0, NULL, 'OK', NULL, NULL),
(194, 'Gladiator II', 'Gladiator II', 'gladiator-ii', 'After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.', 2024, 148, 'Ridley Scott', 'Paul Mescal, Denzel Washington, Pedro Pascal', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWYzZTM5ZGQtOGE5My00NmM2LWFlMDEtMGNjYjdmOWM1MzA1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt9218128/', 0, 0, 1, '2026-02-21 18:10:16.135', '2026-02-21 18:10:16.135', NULL, 'tt9218128', 0, NULL, 'OK', NULL, NULL),
(195, 'Twisters', 'Twisters', 'twisters', 'Kate Carter, a retired tornado-chaser and meteorologist, is persuaded to return to Oklahoma to work with a new team and new technologies.', 2024, 122, 'Lee Isaac Chung', 'Daisy Edgar-Jones, Glen Powell, Anthony Ramos', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjM4MWEwMTEtNTcwYi00ZDI4LWEwMzUtNDMzODBhZmI5MWE1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt12584954/', 0, 0, 1, '2026-02-21 18:10:19.444', '2026-02-21 18:10:19.444', NULL, 'tt12584954', 0, NULL, 'OK', NULL, NULL),
(196, 'Abigail', 'Abigail', 'abigail', 'After a group of criminals kidnap the ballerina daughter of a powerful underworld figure, they retreat to an isolated mansion, unaware that they&apos;re locked inside with no normal little girl.', 2024, 109, 'Matt Bettinelli-Olpin', 'Melissa Barrera, Dan Stevens, Alisha Weir', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNmUxMDRiNjQtYjE0NS00OWZkLTlhZjktYjQ1MmNjNDlhNDdkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt27489557/', 0, 0, 1, '2026-02-21 18:10:22.441', '2026-02-21 18:10:22.441', NULL, 'tt27489557', 0, NULL, 'OK', NULL, NULL),
(197, 'Bad Boys: Ride or Die', 'Bad Boys: Ride or Die', 'bad-boys-ride-or-die', 'When their late police captain gets linked to drug cartels, wisecracking Miami cops Mike Lowrey and Marcus Burnett embark on a dangerous mission to clear his name.', 2024, 115, 'Adil El Arbi', 'Will Smith, Martin Lawrence, Vanessa Hudgens', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZWNjZWUwNDgtYTM4ZC00Zjk0LTg3ZWItNGEyZmVkZTIxZDk0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt4919268/', 0, 0, 1, '2026-02-21 18:10:25.370', '2026-02-21 18:10:25.370', NULL, 'tt4919268', 0, NULL, 'OK', NULL, NULL),
(198, 'Carry-On', 'Carry-On', 'carry-on', 'A mysterious traveler blackmails a young TSA agent into letting a dangerous package slip through security and onto a Christmas Eve flight.', 2024, 119, 'Jaume Collet-Serra', 'Taron Egerton, Jason Bateman, Sofia Carson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTNkMjQzNmQtNzE4ZC00NDlmLTkyYjAtZDZkYTQ5NjBmYThlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt21382296/', 0, 0, 1, '2026-02-21 18:10:28.443', '2026-02-21 18:10:28.443', NULL, 'tt21382296', 0, NULL, 'OK', NULL, NULL),
(199, 'Beverly Hills Cop: Axel F', 'Beverly Hills Cop: Axel F', 'beverly-hills-cop-axel-f', 'Axel Foley returns to Beverly Hills after his daughter&apos;s life is threatened for a family reunion that includes old pals John Taggart and Billy Rosewood to uncover a conspiracy.', 2024, 118, 'Mark Molloy', 'Eddie Murphy, Joseph Gordon-Levitt, Taylour Paige', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDVhYWNkNTUtZWVjMC00Y2M1LWEzNmItZjFiMzA4ZjNiODI4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt3083016/', 0, 0, 1, '2026-02-21 18:10:31.217', '2026-02-21 18:10:31.217', NULL, 'tt3083016', 0, NULL, 'OK', NULL, NULL),
(200, 'The Beekeeper', 'The Beekeeper', 'the-beekeeper', 'A former operative of a powerful organization embarks on a brutal campaign for vengeance.', 2024, 105, 'David Ayer', 'Jason Statham, Emmy Raver-Lampman, Bobby Naderi', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzg3YjVmZGYtOTc5MC00MDdiLTllOTYtZWQ0ODQ1MmMyNTExXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt15314262/', 0, 0, 1, '2026-02-21 18:10:34.393', '2026-02-21 18:10:34.393', NULL, 'tt15314262', 0, NULL, 'OK', NULL, NULL),
(201, 'Kung Fu Panda 4', 'Kung Fu Panda 4', 'kung-fu-panda-4', 'After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior, while a wicked sorceress plans to re-summon all the master villains whom Po has vanquished to the spirit re...', 2024, 94, 'Mike Mitchell', 'Jack Black, Awkwafina, Viola Davis', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzJlNGYxYzQtOTg4MC00OTMyLTkwYzMtZDRlNTgwY2YwOWYxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt21692408/', 0, 0, 1, '2026-02-21 18:10:36.934', '2026-02-21 18:15:42.977', NULL, 'tt21692408', 0, NULL, 'OK', NULL, 9),
(202, 'Road House', 'Road House', 'road-house', 'Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.', 2024, 121, 'Doug Liman', 'Jake Gyllenhaal, Daniela Melchior, Conor McGregor', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODVkYjlkM2UtNWVlMS00N2U1LTgxOTYtODlmNmE1YTgzMjczXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt3359350/', 0, 0, 1, '2026-02-21 18:10:39.900', '2026-02-21 18:10:39.900', NULL, 'tt3359350', 0, NULL, 'OK', NULL, NULL),
(203, 'Red One', 'Red One', 'red-one', 'After Santa Claus is kidnapped, the North Pole&apos;s Head of Security must team up with a notorious hacker in a globe-trotting, action-packed mission to save Christmas.', 2024, 123, 'Jake Kasdan', 'Dwayne Johnson, Chris Evans, Lucy Liu', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZmFkMjE4NjQtZTVmZS00MDZjLWE2ZmEtZTkzODljNjhlNWUxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt14948432/', 0, 0, 1, '2026-02-21 18:10:43.060', '2026-02-21 18:10:43.060', NULL, 'tt14948432', 0, NULL, 'OK', NULL, NULL),
(204, 'Fighter', 'Fighter', 'fighter', 'A reckless yet brilliant squadron leader and his team of elite fighter pilots face mortal dangers and inner demons as they unite for a deadly mission.', 2024, 166, 'Siddharth Anand', 'Hrithik Roshan, Deepika Padukone, Anil Kapoor', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZjdkNDRjNzEtZDY1MS00ZDZkLWJjYzAtZWM0MzEwMjdmY2MxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt13818368/', 0, 0, 1, '2026-02-21 18:10:45.839', '2026-02-21 18:10:45.839', NULL, 'tt13818368', 0, NULL, 'OK', NULL, NULL),
(205, 'Damsel', 'Damsel', 'damsel', 'A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt.', 2024, 110, 'Juan Carlos Fresnadillo', 'Millie Bobby Brown, Ray Winstone, Angela Bassett', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTAzODc1ZjUtNGQwZS00YTc2LTliNzQtMDdlNzllNmU5Yzk4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt13452446/', 0, 0, 1, '2026-02-21 18:10:50.358', '2026-02-21 18:10:50.358', NULL, 'tt13452446', 0, NULL, 'OK', NULL, NULL),
(206, 'Pushpa: The Rule - Part 2', 'Pushpa: The Rule - Part 2', 'pushpa-the-rule-part-2', 'A smuggling kingpin faces off against a vengeful rival while manipulating politics, making big deals, and navigating tense confrontations. A public apology leads to a dramatic showdown, ending with challenge.', 2024, 201, 'Sukumar', 'Allu Arjun, Rashmika Mandanna, Fahadh Faasil', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDM3N2UzM2UtMjEwMC00NGUzLThmMmQtNGMyM2VmMDA0ZWEwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt16539454/', 0, 0, 1, '2026-02-21 18:10:52.052', '2026-02-21 18:10:52.052', NULL, 'tt16539454', 0, NULL, 'OK', NULL, NULL),
(207, 'Venom: The Last Dance', 'Venom: The Last Dance', 'venom-the-last-dance', 'Eddie Brock and Venom must make a devastating decision as they&apos;re pursued by a mysterious military man and alien monsters from Venom&apos;s home world.', 2024, 110, 'Kelly Marcel', 'Tom Hardy, Chiwetel Ejiofor, Juno Temple', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6, 'https://www.imdb.com/title/tt16366836/', 0, 0, 1, '2026-02-21 18:10:55.573', '2026-02-21 18:10:57.177', NULL, 'tt16366836', 0, NULL, 'OK', NULL, 3),
(208, 'Godzilla x Kong: The New Empire', 'Godzilla x Kong: The New Empire', 'godzilla-x-kong-the-new-empire', 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island&apos;s mysteries.', 2024, 115, 'Adam Wingard', 'Rebecca Hall, Brian Tyree Henry, Dan Stevens', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY0N2MzODctY2ExYy00OWYxLTkyNDItMTVhZGIxZjliZjU5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6, 'https://www.imdb.com/title/tt14539740/', 0, 0, 1, '2026-02-21 18:10:58.594', '2026-02-21 18:10:58.594', NULL, 'tt14539740', 0, NULL, 'OK', NULL, NULL),
(209, 'Argylle', 'Argylle', 'argylle', 'A reclusive author who writes espionage novels about a secret agent and a global spy syndicate realizes that the plot of the new book she&apos;s writing starts to mirror real-world events in real time.', 2024, 139, 'Matthew Vaughn', 'Henry Cavill, Bryce Dallas Howard, Sam Rockwell', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDkzMTU2OWUtZjA2ZS00ZmYxLWE2MzgtZDlhZDc1YjM4Yjk5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.6, 'https://www.imdb.com/title/tt15009428/', 0, 0, 1, '2026-02-21 18:11:01.372', '2026-02-21 18:11:01.372', NULL, 'tt15009428', 0, NULL, 'OK', NULL, NULL),
(210, 'Lift', 'Lift', 'lift', 'A female master thief and her ex-boyfriend who works for the FBI team up to steal $100M worth of gold bullion being transported on a 777 passenger flight from London to Zurich.', 2024, 107, 'F. Gary Gray', 'Kevin Hart, Gugu Mbatha-Raw, Sam Worthington', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOWRkYmNiNDUtYTY0OC00YTZlLTlmMTYtMTJhMTU4OTBkMDY5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.6, 'https://www.imdb.com/title/tt14371878/', 0, 0, 1, '2026-02-21 18:11:04.768', '2026-02-21 18:11:04.768', NULL, 'tt14371878', 0, NULL, 'OK', NULL, NULL),
(211, 'Atlas', 'Atlas', 'atlas', 'In a bleak-sounding future, an A.I. soldier has determined that the only way to end war is to end humanity.', 2024, 118, 'Brad Peyton', 'Jennifer Lopez, Simu Liu, Sterling K. Brown', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDUwNTFkNzYtMGM5NS00NTc4LWEwMDUtMmE5MzgyMjcwOWM4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.6, 'https://www.imdb.com/title/tt14856980/', 0, 0, 1, '2026-02-21 18:11:07.782', '2026-02-21 18:11:07.782', NULL, 'tt14856980', 0, NULL, 'OK', NULL, NULL),
(212, 'Kraven the Hunter', 'Kraven the Hunter', 'kraven-the-hunter', 'Kraven&apos;s complex relationship with his ruthless father, Nikolai Kravinoff, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most ...', 2024, 127, 'J.C. Chandor', 'Aaron Taylor-Johnson, Ariana DeBose, Fred Hechinger', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDU0YTI5ODAtN2NmMS00YTg3LTgyNDItN2RmOWEzOTkzZjcyXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.5, 'https://www.imdb.com/title/tt8790086/', 0, 0, 1, '2026-02-21 18:11:11.304', '2026-02-21 18:11:11.304', NULL, 'tt8790086', 0, NULL, 'OK', NULL, NULL),
(213, 'The Union', 'The Union', 'the-union', 'Construction worker Mike is thrust into the world of espionage when his high school sweetheart, Roxanne, recruits him for a high-stakes intelligence mission.', 2024, 107, 'Julian Farino', 'Mark Wahlberg, Halle Berry, J.K. Simmons', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BY2I0YmNiNmEtNWI2My00NDU5LWIwZWItNWNkNjFmYWJjNTMxXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.5, 'https://www.imdb.com/title/tt12610390/', 0, 0, 1, '2026-02-21 18:11:13.409', '2026-02-21 18:11:13.409', NULL, 'tt12610390', 0, NULL, 'OK', NULL, NULL),
(214, 'Rebel Moon - Part Two: The Scargiver', 'Rebel Moon - Part Two: The Scargiver', 'rebel-moon-part-two-the-scargiver', 'Kora and surviving warriors prepare to defend Veldt, their new home, alongside its people against the Realm. The warriors face their pasts, revealing their motivations before the Realm&apos;s forces arrive to crush the growing rebellion.', 2024, 122, 'Zack Snyder', 'Sofia Boutella, Djimon Hounsou, Ed Skrein', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOGYzMDQ1ZWItNjMyYi00ZjM4LWE5YTctYTJhNTYxZDI4OTU0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.3, 'https://www.imdb.com/title/tt23137904/', 0, 0, 1, '2026-02-21 18:11:16.342', '2026-02-21 18:11:16.342', NULL, 'tt23137904', 0, NULL, 'OK', NULL, NULL),
(215, 'Borderlands', 'Borderlands', 'borderlands', 'An infamous bounty hunter returns to her childhood home, the chaotic planet Pandora, and forms an unlikely alliance with a team of misfits to find the missing daughter of the most powerful man in the universe.', 2024, 101, 'Eli Roth', 'Cate Blanchett, Kevin Hart, Edgar Ramírez', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDhkMzQzZmQtOGQ1NS00Y2FhLTkzYjAtNWE1MmRiOWM1MjUzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 4.7, 'https://www.imdb.com/title/tt4978420/', 0, 0, 1, '2026-02-21 18:11:19.194', '2026-02-21 18:11:19.194', NULL, 'tt4978420', 0, NULL, 'OK', NULL, NULL),
(216, 'Singham Again', 'Singham Again', 'singham-again', 'Bajirao Singham and a team of super cops must rescue his wife, Avni, who is producing a stage play based on the Ramayana, from a villainous kidnapper.', 2024, 144, 'Rohit Shetty', 'Ajay Devgn, Kareena Kapoor, Deepika Padukone', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjQzZDExZDEtYjAxYy00ZGVhLWE4YWItNTVkZjA5ZjVjZWM3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 4.3, 'https://www.imdb.com/title/tt11976134/', 0, 0, 1, '2026-02-21 18:11:21.960', '2026-02-21 18:15:40.135', NULL, 'tt11976134', 0, NULL, 'OK', NULL, 8),
(217, 'Madame Web', 'Madame Web', 'madame-web', 'Forced to confront her past, Cassandra Webb, a Manhattan paramedic that may have clairvoyant abilities, forms a relationship with three young women destined for powerful futures, if they can survive their threatening present.', 2024, 116, 'S.J. Clarkson', 'Dakota Johnson, Sydney Sweeney, Isabela Merced', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODViOTZiOTQtOTc4ZC00ZjUxLWEzMjItY2ExMmNlNDliNjE4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 4.1, 'https://www.imdb.com/title/tt11057302/', 0, 0, 1, '2026-02-21 18:11:25.428', '2026-02-21 18:11:25.428', NULL, 'tt11057302', 0, NULL, 'OK', NULL, NULL),
(218, 'Mad Max: Fury Road', 'Mad Max: Fury Road', 'mad-max-fury-road', 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshipper and a drifter named Max.', 2015, 120, 'George Miller', 'Tom Hardy, Charlize Theron, Nicholas Hoult', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDRkODJhOTgtOTc1OC00NTgzLTk4NjItNDgxZDY4YjlmNDY2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt1392190/', 0, 0, 1, '2026-02-21 18:11:29.966', '2026-02-21 18:11:29.966', NULL, 'tt1392190', 0, NULL, 'OK', NULL, NULL),
(219, 'Inside Out', 'Inside Out', 'inside-out', 'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions, Joy, Fear, Anger, Disgust, and Sadness, conflict on how best to navigate a new city, house, and school.', 2015, 95, 'Ronnie Del Carmen', 'Amy Poehler, Bill Hader, Lewis Black', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt2096673/', 0, 0, 1, '2026-02-21 18:11:31.472', '2026-02-21 18:11:31.472', NULL, 'tt2096673', 0, NULL, 'OK', NULL, NULL),
(220, 'Bajrangi Bhaijaan', 'Bajrangi Bhaijaan', 'bajrangi-bhaijaan', 'An Indian man with a magnanimous heart takes a young mute Pakistani girl back to her homeland to reunite her with her family.', 2015, 163, 'Kabir Khan', 'Salman Khan, Harshaali Malhotra, Nawazuddin Siddiqui', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYzVjMjZiNGUtZjZiNy00Yzg4LWEzYzYtMmI1NDg5NWNiNjUwXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt3863552/', 0, 0, 1, '2026-02-21 18:11:34.582', '2026-02-21 18:11:34.582', NULL, 'tt3863552', 0, NULL, 'OK', NULL, NULL),
(221, 'The Revenant', 'The Revenant', 'the-revenant', 'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.', 2016, 156, 'Alejandro G. Iñárritu', 'Leonardo DiCaprio, Tom Hardy, Will Poulter', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTgwNmQzZDctMjNmOS00OTExLTkwM2UtNzJmOTJhODFjOTdlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt1663202/', 0, 0, 1, '2026-02-21 18:11:37.470', '2026-02-21 18:11:37.470', NULL, 'tt1663202', 0, NULL, 'OK', NULL, NULL),
(222, 'The Martian', 'The Martian', 'the-martian', 'An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.', 2015, 144, 'Ridley Scott', 'Matt Damon, Jessica Chastain, Kristen Wiig', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt3659388/', 0, 0, 1, '2026-02-21 18:11:40.601', '2026-02-21 18:11:40.601', NULL, 'tt3659388', 0, NULL, 'OK', NULL, NULL),
(223, 'Star Wars: Episode VII - The Force Awakens', 'Star Wars: Episode VII - The Force Awakens', 'star-wars-episode-vii-the-force-awakens', 'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.', 2015, 138, 'J.J. Abrams', 'Daisy Ridley, John Boyega, Oscar Isaac', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg', NULL, 1, 7.7, 'https://www.imdb.com/title/tt2488496/', 0, 0, 1, '2026-02-21 18:11:44.778', '2026-02-21 18:11:44.778', NULL, 'tt2488496', 0, NULL, 'OK', NULL, NULL),
(224, 'Le petit prince', 'Le petit prince', 'le-petit-prince', 'A little girl lives in a very grown-up world with her mother, who tries to prepare her for it. Her neighbor, the Aviator, introduces the girl to an extraordinary world where anything is possible, the world of the Little Prince.', 2016, 108, 'Mark Osborne', 'Jeff Bridges, Mackenzie Foy, Rachel McAdams', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjg0OTM5OTQyNV5BMl5BanBnXkFtZTgwNDg5NDQ0NTE@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1754656/', 0, 0, 1, '2026-02-21 18:11:46.513', '2026-02-21 18:11:46.513', NULL, 'tt1754656', 0, NULL, 'OK', NULL, NULL),
(225, 'Mission: Impossible - Rogue Nation', 'Mission: Impossible - Rogue Nation', 'mission-impossible-rogue-nation', 'Ethan and his team take on their most impossible mission yet when they have to eradicate an international rogue organization as highly skilled as they are and committed to destroying the IMF.', 2015, 131, 'Christopher McQuarrie', 'Tom Cruise, Rebecca Ferguson, Jeremy Renner', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZjUwZjg2ZjAtY2RhZi00YmZjLTlhNGQtOWQwNDk1MjhhM2NhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt2381249/', 0, 0, 1, '2026-02-21 18:11:49.438', '2026-02-21 18:11:49.438', NULL, 'tt2381249', 0, NULL, 'OK', NULL, NULL),
(226, 'Eddie the Eagle', 'Eddie the Eagle', 'eddie-the-eagle', 'The story of Eddie Edwards, the notoriously tenacious British underdog ski jumper who charmed the world at the 1988 Winter Olympics.', 2016, 106, 'Dexter Fletcher', 'Taron Egerton, Hugh Jackman, Tom Costello', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTUxOTc5MTU1NF5BMl5BanBnXkFtZTgwODYyNTA1NzE@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1083452/', 0, 0, 1, '2026-02-21 18:11:52.408', '2026-02-21 18:11:52.408', NULL, 'tt1083452', 0, NULL, 'OK', NULL, NULL),
(227, 'Avengers: Age of Ultron', 'Avengers: Age of Ultron', 'avengers-age-of-ultron', 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it&apos;s up to Earth&apos;s mightiest heroes to stop the villainous Ultron from enacting his terrible plan.', 2015, 141, 'Joss Whedon', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODBhYTg1NGQtNGVmNS00ZTdiLThjYTYtZDFkNzRiNTZmNDZjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt2395427/', 0, 0, 1, '2026-02-21 18:11:55.334', '2026-02-21 18:11:57.240', NULL, 'tt2395427', 0, NULL, 'OK', NULL, 4),
(228, 'The Walk', 'The Walk', 'the-walk', 'In 1974, high-wire artist Philippe Petit recruits a team of people to help him realize his dream: to walk the immense void between the World Trade Center towers.', 2015, 123, 'Robert Zemeckis', 'Joseph Gordon-Levitt, Charlotte Le Bon, Ben Kingsley', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTY4MzA4Mzc5Nl5BMl5BanBnXkFtZTgwNDIzMzk5NjE@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt3488710/', 0, 0, 1, '2026-02-21 18:11:58.543', '2026-02-21 18:11:58.543', NULL, 'tt3488710', 0, NULL, 'OK', NULL, NULL),
(229, 'The Man from U.N.C.L.E.', 'The Man from U.N.C.L.E.', 'the-man-from-uncle', 'In the early 1960s, CIA agent Napoleon Solo and KGB operative Illya Kuryakin participate in a joint mission against a mysterious criminal organization, which is working to proliferate nuclear weapons.', 2015, 116, 'Guy Ritchie', 'Henry Cavill, Armie Hammer, Alicia Vikander', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDFjN2NlOGItYjZiZi00OThhLTlhYWUtYjgyNWFjMWJlNGU4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt1638355/', 0, 0, 1, '2026-02-21 18:12:01.611', '2026-02-21 18:12:01.611', NULL, 'tt1638355', 0, NULL, 'OK', NULL, NULL),
(230, 'Dope', 'Dope', 'dope', 'Life changes for Malcolm, a geek who&apos;s surviving life in a tough neighborhood, after a chance invitation to an underground party leads him and his friends into a Los Angeles adventure.', 2015, 103, 'Rick Famuyiwa', 'Shameik Moore, Tony Revolori, Kiersey Clemons', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA3MjYyNTk0Nl5BMl5BanBnXkFtZTgwODc1NzQ1NTE@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt3850214/', 0, 0, 1, '2026-02-21 18:12:04.585', '2026-02-21 18:12:04.585', NULL, 'tt3850214', 0, NULL, 'OK', NULL, NULL),
(231, 'Everest', 'Everest', 'everest', 'On May 10, 1996, mountain guides Rob Hall and Scott Fischer combine their expedition teams for a final ascent to the summit of Mount Everest. With little warning, a storm strikes the mountain and the climbers must now battle to su...', 2015, 121, 'Baltasar Kormákur', 'Jason Clarke, Ang Phula Sherpa, Thomas M. Wright', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDAzOTYxMTctY2ViNi00NDI3LTgwMGItY2FhN2JjZWE5MjRkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt2719848/', 0, 0, 1, '2026-02-21 18:12:08.457', '2026-02-21 18:12:08.457', NULL, 'tt2719848', 0, NULL, 'OK', NULL, NULL),
(232, 'The Peanuts Movie', 'The Peanuts Movie', 'the-peanuts-movie', 'Snoopy embarks upon his greatest mission as he and his team take to the skies to pursue their archnemesis, while his best pal Charlie Brown begins his own epic quest back home to win the love of his life.', 2015, 88, 'Steve Martino', 'Noah Schnapp, Bill Melendez, Hadley Belle Miller', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTE5NzMxNzkwNl5BMl5BanBnXkFtZTgwOTQ0Nzk5NzE@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt2452042/', 0, 0, 1, '2026-02-21 18:12:10.572', '2026-02-21 18:12:10.572', NULL, 'tt2452042', 0, NULL, 'OK', NULL, NULL),
(233, 'Jurassic World', 'Jurassic World', 'jurassic-world', 'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.', 2015, 124, 'Colin Trevorrow', 'Chris Pratt, Bryce Dallas Howard, Ty Simpkins', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt0369610/', 0, 0, 1, '2026-02-21 18:12:13.944', '2026-02-21 18:12:13.944', NULL, 'tt0369610', 0, NULL, 'OK', NULL, NULL),
(234, 'Cinderella', 'Cinderella', 'cinderella', 'When her father unexpectedly dies, young Ella finds herself at the mercy of her cruel stepmother and her scheming stepsisters. Never one to give up hope, Ella&apos;s fortunes begin to change after meeting a dashing stranger.', 2015, 105, 'Kenneth Branagh', 'Lily James, Cate Blanchett, Richard Madden', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjMxODYyODEzN15BMl5BanBnXkFtZTgwMDk4OTU0MzE@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt1661199/', 0, 0, 1, '2026-02-21 18:12:17.081', '2026-02-21 18:12:17.081', NULL, 'tt1661199', 0, NULL, 'OK', NULL, NULL),
(235, 'In the Heart of the Sea', 'In the Heart of the Sea', 'in-the-heart-of-the-sea', 'A recounting of a New England whaling ship&apos;s sinking by a giant whale in 1820, an experience that later inspired the great novel Moby-Dick.', 2015, 122, 'Ron Howard', 'Chris Hemsworth, Cillian Murphy, Brendan Gleeson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA5NzUwODExM15BMl5BanBnXkFtZTgwNjM0MzE4NjE@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt1390411/', 0, 0, 1, '2026-02-21 18:12:19.690', '2026-02-21 18:12:19.690', NULL, 'tt1390411', 0, NULL, 'OK', NULL, NULL),
(236, 'Spectre', 'Spectre', 'spectre', 'A cryptic message from James Bond&apos;s past sends him on a trail to uncover the existence of a sinister organisation named SPECTRE. With a new threat dawning, Bond learns the terrible truth about the author of all his pain in his mos...', 2015, 148, 'Sam Mendes', 'Daniel Craig, Christoph Waltz, Léa Seydoux', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzA5MzFiNDAtYTI0NC00MDE5LTljYTctYTNkODk1OTZlODI5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt2379713/', 0, 0, 1, '2026-02-21 18:12:22.714', '2026-02-21 18:12:22.714', NULL, 'tt2379713', 0, NULL, 'OK', NULL, NULL);
INSERT INTO `movie` (`id`, `titleBG`, `titleEN`, `slug`, `description`, `year`, `duration`, `director`, `cast`, `videoUrl`, `trailerUrl`, `posterUrl`, `backdropUrl`, `isHD`, `rating`, `imdbLink`, `views`, `featured`, `published`, `createdAt`, `updatedAt`, `tmdbId`, `imdbId`, `isSeries`, `descriptionEN`, `healthStatus`, `lastChecked`, `collectionId`) VALUES
(237, 'Hardcore Henry', 'Hardcore Henry', 'hardcore-henry', 'Henry is resurrected from death with no memory, and he must save his wife from a telekinetic warlord with a plan to bio-engineer soldiers.', 2016, 96, 'Ilya Naishuller', 'Sharlto Copley, Tim Roth, Haley Bennett', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjIzNTcwMDc3Nl5BMl5BanBnXkFtZTgwNzU5NTY5NzE@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt3072482/', 0, 0, 1, '2026-02-21 18:12:25.618', '2026-02-21 18:12:25.618', NULL, 'tt3072482', 0, NULL, 'OK', NULL, NULL),
(238, 'The Good Dinosaur', 'The Good Dinosaur', 'the-good-dinosaur', 'In a world where dinosaurs and humans live side-by-side, an Apatosaurus named Arlo makes an unlikely human friend.', 2015, 93, 'Peter Sohn', 'Jeffrey Wright, Frances McDormand, Maleah Nipay-Padilla', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTc5MTg2NjQ4MV5BMl5BanBnXkFtZTgwNzcxOTY5NjE@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt1979388/', 0, 0, 1, '2026-02-21 18:12:28.718', '2026-02-21 18:12:28.718', NULL, 'tt1979388', 0, NULL, 'OK', NULL, NULL),
(239, 'The Hunger Games: Mockingjay - Part 2', 'The Hunger Games: Mockingjay - Part 2', 'the-hunger-games-mockingjay-part-2', 'Katniss and a team of rebels from District 13 prepare for the final battle that will decide the fate of Panem.', 2015, 137, 'Francis Lawrence', 'Jennifer Lawrence, Josh Hutcherson, Liam Hemsworth', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjQzNDI2NTU1Ml5BMl5BanBnXkFtZTgwNTAyMDQ5NjE@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt1951266/', 0, 0, 1, '2026-02-21 18:12:32.019', '2026-02-21 18:12:32.019', NULL, 'tt1951266', 0, NULL, 'OK', NULL, NULL),
(240, 'Hotel Transylvania 2', 'Hotel Transylvania 2', 'hotel-transylvania-2', 'Dracula and his friends try to bring out the monster in his half human, half vampire grandson in order to keep Mavis from leaving the hotel.', 2015, 89, 'Genndy Tartakovsky', 'Adam Sandler, Andy Samberg, Selena Gomez', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BY2ExYWJhMDYtYjcwMy00YjA2LTk2YzQtY2FhMWYxZThiNDQzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt2510894/', 0, 0, 1, '2026-02-21 18:12:34.984', '2026-02-21 18:12:36.290', NULL, 'tt2510894', 0, NULL, 'OK', NULL, 5),
(241, 'Home', 'Home', 'home', 'Oh, a lovable misfit alien, runs away from his planet and takes shelter on Earth, where he befriends Tip, an adventurous young girl who is on a quest to find her displaced mother Lucy.', 2015, 94, 'Tim Johnson', 'Jim Parsons, Rihanna, Steve Martin', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjExOTQ4MDMyMV5BMl5BanBnXkFtZTgwMTE3NDM2MzE@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt2224026/', 0, 0, 1, '2026-02-21 18:12:37.642', '2026-02-21 18:12:37.642', NULL, 'tt2224026', 0, NULL, 'OK', NULL, NULL),
(242, 'Minions', 'Minions', 'minions', 'Minions Stuart, Kevin, and Bob are recruited by Scarlet Overkill, a supervillain who, alongside her inventor husband Herb, hatches a plot to take over the world.', 2015, 91, 'Kyle Balda', 'Sandra Bullock, Jon Hamm, Michael Keaton', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODI4NzMyNjE0MF5BMl5BanBnXkFtZTgwMTcwNzI0MzE@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt2293640/', 0, 0, 1, '2026-02-21 18:12:40.840', '2026-02-21 18:12:40.840', NULL, 'tt2293640', 0, NULL, 'OK', NULL, NULL),
(243, 'Tomorrowland', 'Tomorrowland', 'tomorrowland', 'Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.', 2015, 130, 'Brad Bird', 'George Clooney, Britt Robertson, Hugh Laurie', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTQ4OTgzNTkwNF5BMl5BanBnXkFtZTgwMzI3MDE3NDE@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt1964418/', 0, 0, 1, '2026-02-21 18:12:43.528', '2026-02-21 18:12:43.528', NULL, 'tt1964418', 0, NULL, 'OK', NULL, NULL),
(244, 'Terminator Genisys', 'Terminator Genisys', 'terminator-genisys', 'When John Connor, leader of the human resistance, sends Sgt. Kyle Reese back to 1984 to protect Sarah Connor and safeguard the future, an unexpected turn of events creates a fractured timeline.', 2015, 126, 'Alan Taylor', 'Arnold Schwarzenegger, Jason Clarke, Emilia Clarke', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjM1NTc0NzE4OF5BMl5BanBnXkFtZTgwNDkyNjQ1NTE@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt1340138/', 0, 0, 1, '2026-02-21 18:12:46.448', '2026-02-21 18:12:46.448', NULL, 'tt1340138', 0, NULL, 'OK', NULL, NULL),
(245, 'Maze Runner: The Scorch Trials', 'Maze Runner: The Scorch Trials', 'maze-runner-the-scorch-trials', 'After having escaped the Maze, the Gladers face a new set of challenges on the open roads of a desolate landscape filled with unimaginable obstacles.', 2015, 131, 'Wes Ball', 'Dylan O&apos;Brien, Kaya Scodelario, Thomas Brodie-Sangster', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt4046784/', 0, 0, 1, '2026-02-21 18:12:49.478', '2026-02-21 18:12:49.478', NULL, 'tt4046784', 0, NULL, 'OK', NULL, NULL),
(246, 'Goosebumps', 'Goosebumps', 'goosebumps', 'A teenager teams up with the daughter of young-adult horror author R.L. Stine after the writer&apos;s imaginary demons are set free on the town of Madison, Delaware.', 2015, 103, 'Rob Letterman', 'Jack Black, Dylan Minnette, Odeya Rush', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA1OTUzNTQ5Ml5BMl5BanBnXkFtZTgwODQ4NDkxNjE@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt1051904/', 0, 0, 1, '2026-02-21 18:12:53.597', '2026-02-21 18:12:53.597', NULL, 'tt1051904', 0, NULL, 'OK', NULL, NULL),
(247, 'Vacation', 'Vacation', 'vacation', 'Rusty Griswold takes his own family on a road trip to &quot;Walley World&quot; in order to spice things up with his wife and reconnect with his sons.', 2015, 99, 'John Francis Daley', 'Ed Helms, Christina Applegate, Skyler Gisondo', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZWJmYTcwN2QtNTc4MC00YjcwLTk4YmUtOWQwM2RkMmVlYThhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt1524930/', 0, 0, 1, '2026-02-21 18:12:55.778', '2026-02-21 18:12:55.778', NULL, 'tt1524930', 0, NULL, 'OK', NULL, NULL),
(248, 'The Divergent Series: Insurgent', 'The Divergent Series: Insurgent', 'the-divergent-series-insurgent', 'Tris Prior must confront her inner demons, and with help from those closest to her, continue the fight against a powerful alliance that threatens to tear her society apart.', 2015, 119, 'Robert Schwentke', 'Shailene Woodley, Ansel Elgort, Theo James', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTgxOTYxMTg3OF5BMl5BanBnXkFtZTgwMDgyMzA2NDE@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt2908446/', 0, 0, 1, '2026-02-21 18:12:58.665', '2026-02-21 18:12:58.665', NULL, 'tt2908446', 0, NULL, 'OK', NULL, NULL),
(249, 'Paper Towns', 'Paper Towns', 'paper-towns', 'After an all-night adventure, Quentin&apos;s lifelong crush, Margo, disappears, leaving behind clues that Quentin and his friends follow on the journey of a lifetime.', 2015, 109, 'Jake Schreier', 'Nat Wolff, Cara Delevingne, Austin Abrams', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE2ODQxODMwOF5BMl5BanBnXkFtZTgwNDY5NjY3NDE@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt3622592/', 0, 0, 1, '2026-02-21 18:13:01.994', '2026-02-21 18:13:01.994', NULL, 'tt3622592', 0, NULL, 'OK', NULL, NULL),
(250, 'San Andreas', 'San Andreas', 'san-andreas', 'In the aftermath of a massive earthquake in California, a rescue-chopper pilot makes a dangerous journey with his ex-wife across the state in order to rescue his daughter.', 2015, 114, 'Brad Peyton', 'Dwayne Johnson, Carla Gugino, Alexandra Daddario', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmQzNDEzMzMtM2U5OS00YTUzLWI2NDYtYjI2NjAyNWE5YzMzXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt2126355/', 0, 0, 1, '2026-02-21 18:13:04.986', '2026-02-21 18:13:04.986', NULL, 'tt2126355', 0, NULL, 'OK', NULL, NULL),
(251, 'The SpongeBob Movie: Sponge Out of Water', 'The SpongeBob Movie: Sponge Out of Water', 'the-spongebob-movie-sponge-out-of-water', 'When a diabolical pirate above the sea steals the secret Krabby Patty formula, SpongeBob and his friends team up in order to get it back.', 2015, 92, 'Mike Mitchell', 'Tom Kenny, Antonio Banderas, Bill Fagerbakke', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDhlMDM3ZDUtMGNhZi00ZTFmLTg1YjYtZTM3ZTE1MGIwNWFjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6, 'https://www.imdb.com/title/tt2279373/', 0, 0, 1, '2026-02-21 18:13:08.544', '2026-02-21 18:13:08.544', NULL, 'tt2279373', 0, NULL, 'OK', NULL, NULL),
(252, 'The Last Witch Hunter', 'The Last Witch Hunter', 'the-last-witch-hunter', 'The last witch hunter is all that stands between humanity and the combined forces of the most horrifying witches in history.', 2015, 106, 'Breck Eisner', 'Vin Diesel, Rose Leslie, Elijah Wood', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjM5Njk5MzYzM15BMl5BanBnXkFtZTgwNzM1Mjk4NjE@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt1618442/', 0, 0, 1, '2026-02-21 18:13:10.755', '2026-02-21 18:13:10.755', NULL, 'tt1618442', 0, NULL, 'OK', NULL, NULL),
(253, 'Hitman: Agent 47', 'Hitman: Agent 47', 'hitman-agent-47', 'An assassin teams up with a woman to help her find her father and uncover the mysteries of her ancestry.', 2015, 96, 'Aleksander Bach', 'Rupert Friend, Hannah Ware, Zachary Quinto', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTBiYjg1ZGYtZjQxZS00NDBkLTgyZjEtZGIzYWNmNjhiOGRjXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.7, 'https://www.imdb.com/title/tt2679042/', 0, 0, 1, '2026-02-21 18:13:13.637', '2026-02-21 18:13:13.637', NULL, 'tt2679042', 0, NULL, 'OK', NULL, NULL),
(254, 'Pan', 'Pan', 'pan', 'Twelve-year-old orphan Peter is spirited away to the magical world of Neverland, where he finds both fun and danger, and ultimately discovers his destiny: to become the hero who will be forever known as Peter Pan.', 2015, 111, 'Joe Wright', 'Levi Miller, Hugh Jackman, Garrett Hedlund', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzk2MDg5MDczMl5BMl5BanBnXkFtZTgwNTE2NjYyNjE@._V1_.jpg', NULL, 1, 5.7, 'https://www.imdb.com/title/tt3332064/', 0, 0, 1, '2026-02-21 18:13:16.995', '2026-02-21 18:13:16.995', NULL, 'tt3332064', 0, NULL, 'OK', NULL, NULL),
(255, 'Pixels', 'Pixels', 'pixels', 'When aliens misinterpret video feeds of classic arcade games as a declaration of war, they attack the Earth in the form of the video games.', 2015, 105, 'Chris Columbus', 'Adam Sandler, Kevin James, Michelle Monaghan', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzIyNTc1NmUtOTBlNS00YzEwLTlkZTMtZjJkMGM2YzNkYmY3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.6, 'https://www.imdb.com/title/tt2120120/', 0, 0, 1, '2026-02-21 18:13:19.694', '2026-02-21 18:13:19.694', NULL, 'tt2120120', 0, NULL, 'OK', NULL, NULL),
(256, 'Mortdecai', 'Mortdecai', 'mortdecai', 'Juggling angry Russians, the British Mi5, and an international terrorist, debonair art dealer and part-time rogue Charlie Mortdecai races to recover a stolen painting rumored to contain a code that leads to lost gold.', 2015, 107, 'David Koepp', 'Johnny Depp, Gwyneth Paltrow, Ewan McGregor', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjM3NDcxOTM5Ml5BMl5BanBnXkFtZTgwNTEwNzE0MzE@._V1_.jpg', NULL, 1, 5.5, 'https://www.imdb.com/title/tt3045616/', 0, 0, 1, '2026-02-21 18:13:22.575', '2026-02-21 18:13:22.575', NULL, 'tt3045616', 0, NULL, 'OK', NULL, NULL),
(257, 'Jupiter Ascending', 'Jupiter Ascending', 'jupiter-ascending', 'A genetically engineered soldier informs a young woman of her extraordinary destiny.', 2015, 127, 'Lana Wachowski', 'Channing Tatum, Mila Kunis, Eddie Redmayne', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTQyNzk2MjA2NF5BMl5BanBnXkFtZTgwMjEwNzk3MjE@._V1_.jpg', NULL, 1, 5.3, 'https://www.imdb.com/title/tt1617661/', 0, 0, 1, '2026-02-21 18:13:25.763', '2026-02-21 18:13:25.763', NULL, 'tt1617661', 0, NULL, 'OK', NULL, NULL),
(258, 'Point Break', 'Point Break', 'point-break', 'A young FBI agent infiltrates an extraordinary team of extreme sports athletes he suspects of masterminding a string of unprecedented, sophisticated corporate heists.', 2015, 114, 'Ericson Core', 'Edgar Ramírez, Luke Bracey, Ray Winstone', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjIxNDkzOTAyNV5BMl5BanBnXkFtZTgwNjEyOTY3NjE@._V1_.jpg', NULL, 1, 5.3, 'https://www.imdb.com/title/tt2058673/', 0, 0, 1, '2026-02-21 18:13:29.004', '2026-02-21 18:13:29.004', NULL, 'tt2058673', 0, NULL, 'OK', NULL, NULL),
(259, 'The Ridiculous 6', 'The Ridiculous 6', 'the-ridiculous-6', 'An outlaw who was raised by Native Americans discovers that he has five half-brothers. Together the men go on a mission to find their wayward, deadbeat dad.', 2015, 119, 'Frank Coraci', 'Adam Sandler, Terry Crews, Jorge Garcia', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzM2NWQzMzAtYzdiNi00YTk0LWEyNjQtOTJkMTk4YTdlYmY2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 4.9, 'https://www.imdb.com/title/tt2479478/', 0, 0, 1, '2026-02-21 18:13:31.597', '2026-02-21 18:13:31.597', NULL, 'tt2479478', 0, NULL, 'OK', NULL, NULL),
(260, 'Fantastic Four', 'Fantastic Four', 'fantastic-four', 'Four young outsiders teleport to an alternate and dangerous universe which alters their physical form in shocking ways. The four must learn to harness their new abilities and work together to save Earth from a former friend turned...', 2015, 100, 'Josh Trank', 'Miles Teller, Kate Mara, Michael B. Jordan', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTk0OTMyMDA0OF5BMl5BanBnXkFtZTgwMzY5NTkzNTE@._V1_.jpg', NULL, 1, 4.3, 'https://www.imdb.com/title/tt1502712/', 0, 0, 1, '2026-02-21 18:13:34.946', '2026-02-21 18:13:34.946', NULL, 'tt1502712', 0, NULL, 'OK', NULL, NULL),
(261, 'Toy Story 3', 'Toy Story 3', 'toy-story-3', 'The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it&apos;s up to Woody to convince the other toys that they weren&apos;t abandoned and to return home.', 2010, 103, 'Lee Unkrich', 'Tom Hanks, Tim Allen, Joan Cusack', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_.jpg', NULL, 1, 8.3, 'https://www.imdb.com/title/tt0435761/', 0, 0, 1, '2026-02-21 18:13:39.113', '2026-02-21 18:13:39.113', NULL, 'tt0435761', 0, NULL, 'OK', NULL, NULL),
(262, 'How to Train Your Dragon', 'How to Train Your Dragon', 'how-to-train-your-dragon', 'A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.', 2010, 98, 'Dean DeBlois', 'Jay Baruchel, Gerard Butler, Christopher Mintz-Plasse', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt0892769/', 0, 0, 1, '2026-02-21 18:13:40.723', '2026-02-21 18:13:40.723', NULL, 'tt0892769', 0, NULL, 'OK', NULL, NULL),
(263, 'Tangled', 'Tangled', 'tangled', 'The magically long-haired Rapunzel has spent her entire life in a tower, but now that a runaway thief has stumbled upon her, she is about to discover the world for the first time, and who she really is.', 2010, 100, 'Nathan Greno', 'Mandy Moore, Zachary Levi, Donna Murphy', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTAxNDYxMjg0MjNeQTJeQWpwZ15BbWU3MDcyNTk2OTM@._V1_.jpg', NULL, 1, 7.7, 'https://www.imdb.com/title/tt0398286/', 0, 0, 1, '2026-02-21 18:13:43.777', '2026-02-21 18:13:43.777', NULL, 'tt0398286', 0, NULL, 'OK', NULL, NULL),
(264, 'Despicable Me', 'Despicable Me', 'despicable-me', 'Gru, a criminal mastermind, adopts three orphans as pawns to carry out the biggest heist in history. His life takes an unexpected turn when the little girls see the evildoer as their potential father.', 2010, 95, 'Pierre Coffin', 'Steve Carell, Jason Segel, Russell Brand', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY3NjY0MTQ0Nl5BMl5BanBnXkFtZTcwMzQ2MTc0Mw@@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1323594/', 0, 0, 1, '2026-02-21 18:13:46.986', '2026-02-21 18:13:46.986', NULL, 'tt1323594', 0, NULL, 'OK', NULL, NULL),
(265, 'Karigurashi no Arietti', 'Karigurashi no Arietti', 'karigurashi-no-arietti', 'The Clock family consists of three four-inch-tall people who live incognito among humans, borrowing only what they need to survive. Their quiet life changes when their teenage daughter, Arrietty, is discovered.', 2012, 94, 'Hiromasa Yonebayashi', 'Mirai Shida, Ryûnosuke Kamiki, Tatsuya Fujiwara', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTAxNjk3OTYyODReQTJeQWpwZ15BbWU3MDgyODY2OTY@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1568921/', 0, 0, 1, '2026-02-21 18:13:49.670', '2026-02-21 18:13:49.670', NULL, 'tt1568921', 0, NULL, 'OK', NULL, NULL),
(266, 'Megamind', 'Megamind', 'megamind', 'Evil genius Megamind finally defeats his do-gooder nemesis, Metro Man, but is left without a purpose in a superhero-free world.', 2010, 95, 'Tom McGrath', 'Will Ferrell, Jonah Hill, Brad Pitt', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTAzMzI0NTMzNDBeQTJeQWpwZ15BbWU3MDM3NTAyOTM@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1001526/', 0, 0, 1, '2026-02-21 18:13:52.758', '2026-02-21 18:13:52.758', NULL, 'tt1001526', 0, NULL, 'OK', NULL, NULL),
(267, 'Legend of the Guardians: The Owls of Ga\'Hoole', 'Legend of the Guardians: The Owls of Ga\'Hoole', 'legend-of-the-guardians-the-owls-of-gahoole', 'The young owl Soren is kidnapped by the evil owls of St. Aegolious who want to turn him into a soldier. He escapes with some of his friends and warns the mythical guardians about the evil plan.', 2010, 97, 'Zack Snyder', 'Jim Sturgess, Hugo Weaving, David Wenham', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE0NjA5OTA4N15BMl5BanBnXkFtZTcwODA3MTA3Mw@@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt1219342/', 0, 0, 1, '2026-02-21 18:13:55.795', '2026-02-21 18:14:39.782', NULL, 'tt1219342', 0, NULL, 'OK', NULL, 6),
(268, 'Shrek Forever After', 'Shrek Forever After', 'shrek-forever-after', 'Rumpelstiltskin tricks a mid-life crisis burdened Shrek into allowing himself to be erased from existence and cast in a dark alternate timeline where Rumpelstiltskin rules supreme.', 2010, 93, 'Mike Mitchell', 'Mike Myers, Cameron Diaz, Eddie Murphy', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt0892791/', 0, 0, 1, '2026-02-21 18:13:58.848', '2026-02-21 18:13:58.848', NULL, 'tt0892791', 0, NULL, 'OK', NULL, NULL),
(269, 'Spotlight', 'Spotlight', 'spotlight', 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.', 2015, 129, 'Tom McCarthy', 'Mark Ruffalo, Michael Keaton, Rachel McAdams', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt1895587/', 0, 0, 1, '2026-02-21 18:14:03.527', '2026-02-21 18:14:03.527', NULL, 'tt1895587', 0, NULL, 'OK', NULL, NULL),
(270, 'The Big Short', 'The Big Short', 'the-big-short', 'In 2006-2007 a group of investors bet against the United States mortgage market. In their research, they discover how flawed and corrupt the market is.', 2015, 130, 'Adam McKay', 'Christian Bale, Steve Carell, Ryan Gosling', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDZkNDQ3YjktYjBlZC00YTY1LTgxOGYtY2RhMWFhZmNkZGY3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt1596363/', 0, 0, 1, '2026-02-21 18:14:05.011', '2026-02-21 18:14:05.011', NULL, 'tt1596363', 0, NULL, 'OK', NULL, NULL),
(271, 'Straight Outta Compton', 'Straight Outta Compton', 'straight-outta-compton', 'The rap group NWA emerges from the mean streets of Compton in the mid-1980s and revolutionizes hip-hop culture with their music and tales about life in the hood.', 2015, 147, 'F. Gary Gray', 'O&apos;Shea Jackson Jr., Corey Hawkins, Jason Mitchell', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTA5MzkyMzIxNjJeQTJeQWpwZ15BbWU4MDU0MDk0OTUx._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt1398426/', 0, 0, 1, '2026-02-21 18:14:07.988', '2026-02-21 18:14:07.988', NULL, 'tt1398426', 0, NULL, 'OK', NULL, NULL),
(272, 'Amy', 'Amy', 'amy', 'Archival footage and personal testimonials present an intimate portrait of the life and career of British singer/songwriter Amy Winehouse.', 2015, 128, 'Asif Kapadia', 'Amy Winehouse, Mitch Winehouse, Mark Ronson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjAxNTU0MDY3MV5BMl5BanBnXkFtZTgwMzczODA5NDE@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt2870648/', 0, 0, 1, '2026-02-21 18:14:11.574', '2026-02-21 18:14:11.574', NULL, 'tt2870648', 0, NULL, 'OK', NULL, NULL),
(273, 'Trumbo', 'Trumbo', 'trumbo', 'In 1947, Dalton Trumbo was Hollywood&apos;s top screenwriter, until he and other artists were jailed and blacklisted for their political beliefs.', 2015, 124, 'Jay Roach', 'Bryan Cranston, Diane Lane, Helen Mirren', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjM1MDc2OTQ3NV5BMl5BanBnXkFtZTgwNzQ0NjQ1NjE@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt3203606/', 0, 0, 1, '2026-02-21 18:14:14.629', '2026-02-21 18:14:14.629', NULL, 'tt3203606', 0, NULL, 'OK', NULL, NULL),
(274, 'Woman in Gold', 'Woman in Gold', 'woman-in-gold', 'Maria Altmann, an octogenarian Jewish refugee, takes on the Austrian government to recover artwork she believes rightfully belongs to her family.', 2015, 109, 'Simon Curtis', 'Helen Mirren, Ryan Reynolds, Daniel Brühl', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjc0NzY3OTE0Nl5BMl5BanBnXkFtZTgwNDUyODA4MzE@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt2404425/', 0, 0, 1, '2026-02-21 18:14:17.145', '2026-02-21 18:14:17.145', NULL, 'tt2404425', 0, NULL, 'OK', NULL, NULL),
(275, 'Steve Jobs', 'Steve Jobs', 'steve-jobs', 'Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.', 2015, 122, 'Danny Boyle', 'Michael Fassbender, Kate Winslet, Seth Rogen', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt2080374/', 0, 0, 1, '2026-02-21 18:14:20.586', '2026-02-21 18:14:20.586', NULL, 'tt2080374', 0, NULL, 'OK', NULL, NULL),
(276, 'The Man Who Knew Infinity', 'The Man Who Knew Infinity', 'the-man-who-knew-infinity', 'The story of the life and academic career of the pioneer Indian mathematician, Srinivasa Ramanujan, and his friendship with his mentor, Professor G.H. Hardy.', 2016, 108, 'Matt Brown', 'Dev Patel, Jeremy Irons, Malcolm Sinclair', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTU3Njg4MDM3OV5BMl5BanBnXkFtZTgwMjE5ODM3ODE@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt0787524/', 0, 0, 1, '2026-02-21 18:14:23.225', '2026-02-21 18:14:23.225', NULL, 'tt0787524', 0, NULL, 'OK', NULL, NULL),
(277, 'The Danish Girl', 'The Danish Girl', 'the-danish-girl', 'A love story loosely inspired by the lives of Danish artists Lili Elbe and Gerda Wegener. Lili and Gerda&apos;s marriage and work evolve as they navigate Lili&apos;s groundbreaking journey as a transgender pioneer.', 2016, 119, 'Tom Hooper', 'Eddie Redmayne, Alicia Vikander, Amber Heard', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA0NjA4NjE2Nl5BMl5BanBnXkFtZTgwNzIxNTY2NjE@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0810819/', 0, 0, 1, '2026-02-21 18:14:25.910', '2026-02-21 18:14:25.910', NULL, 'tt0810819', 0, NULL, 'OK', NULL, NULL),
(278, 'Concussion', 'Concussion', 'concussion', 'In Pittsburgh, accomplished pathologist Dr. Bennet Omalu uncovers the truth about brain damage in football players who suffer repeated concussions in the course of normal play.', 2015, 123, 'Peter Landesman', 'Will Smith, Alec Baldwin, Albert Brooks', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTYwNjgwNDg0NV5BMl5BanBnXkFtZTgwMzY1MjAyNzE@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt3322364/', 0, 0, 1, '2026-02-21 18:14:29.362', '2026-02-21 18:14:29.362', NULL, 'tt3322364', 0, NULL, 'OK', NULL, NULL),
(279, 'Yip Man 3', 'Yip Man 3', 'yip-man-3', 'When a band of brutal gangsters led by a crooked property developer make a play to take over a local school, Master Ip is forced to take a stand.', 2025, 105, 'Wilson Yip', 'Donnie Yen, Lynn Xiong, Jin Zhang', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMmZhOWNlMDEtN2M1OC00Yzk5LThhOTAtZDA5NTNjNjQyZDM0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt2888046/', 0, 0, 1, '2026-02-21 18:14:32.074', '2026-02-21 18:14:32.074', NULL, 'tt2888046', 0, NULL, 'OK', NULL, NULL),
(280, 'Colonia', 'Colonia', 'colonia', 'A young woman&apos;s desperate search for her abducted boyfriend draws her into the infamous Colonia Dignidad, a sect nobody has ever escaped from.', 2016, 110, 'Florian Gallenberger', 'Emma Watson, Daniel Brühl, Michael Nyqvist', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE3NjQ1MTIxNl5BMl5BanBnXkFtZTgwOTY4OTIzODE@._V1_.jpg', NULL, 1, 7, 'https://www.imdb.com/title/tt4005402/', 0, 0, 1, '2026-02-21 18:14:35.085', '2026-02-21 18:14:35.085', NULL, 'tt4005402', 0, NULL, 'OK', NULL, NULL),
(281, 'Legend', 'Legend', 'legend', 'Identical twin gangsters Ronald and Reginald Kray terrorize London during the 1960s.', 2015, 132, 'Brian Helgeland', 'Tom Hardy, Emily Browning, Taron Egerton', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE0MjkyODQ3NF5BMl5BanBnXkFtZTgwNDM1OTk1NjE@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt3569230/', 0, 0, 1, '2026-02-21 18:14:38.162', '2026-02-21 18:14:39.784', NULL, 'tt3569230', 0, NULL, 'OK', NULL, 6),
(282, 'Black Mass', 'Black Mass', 'black-mass', 'The true story of Whitey Bulger, the brother of a state senator and the most infamous violent criminal in the history of South Boston, who became an FBI informant to take down a Mafia family invading his turf.', 2015, 123, 'Scott Cooper', 'Johnny Depp, Benedict Cumberbatch, Dakota Johnson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzg0ODI3NDQxNF5BMl5BanBnXkFtZTgwMzgzNDA0NjE@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt1355683/', 0, 0, 1, '2026-02-21 18:14:41.048', '2026-02-21 18:14:41.048', NULL, 'tt1355683', 0, NULL, 'OK', NULL, NULL),
(283, 'Joy', 'Joy', 'joy', 'Joy is the story of the title character, who rose to become founder and matriarch of a powerful family business dynasty.', 2015, 124, 'David O. Russell', 'Jennifer Lawrence, Robert De Niro, Bradley Cooper', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzc2MTI5Mzk0MV5BMl5BanBnXkFtZTgwMDIxMDg1NjE@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt2446980/', 0, 0, 1, '2026-02-21 18:14:44.022', '2026-02-21 18:14:44.022', NULL, 'tt2446980', 0, NULL, 'OK', NULL, NULL),
(284, 'True Story', 'True Story', 'true-story', 'When disgraced New York Times reporter Michael Finkel meets accused killer Christian Longo - who has taken on Finkel&apos;s identity - his investigation morphs into a game of cat-and-mouse.', 2015, 99, 'Rupert Goold', 'James Franco, Jonah Hill, Felicity Jones', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BN2IwNTZhMjEtYWViMy00YThmLWFmNWEtZjliZGJjYjAzOTQ4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt2273657/', 0, 0, 1, '2026-02-21 18:14:47.232', '2026-02-21 18:14:47.232', NULL, 'tt2273657', 0, NULL, 'OK', NULL, NULL),
(285, 'La La Land', 'La La Land', 'la-la-land', 'When Sebastian, a pianist, and Mia, an actress, follow their passion and achieve success in their respective fields, they find themselves torn between their love for each other and their careers.', 2016, 128, 'Damien Chazelle', 'Ryan Gosling, Emma Stone, Rosemarie DeWitt', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt3783958/', 0, 0, 1, '2026-02-21 18:14:51.722', '2026-02-21 18:14:51.722', NULL, 'tt3783958', 0, NULL, 'OK', NULL, NULL),
(286, 'Zootopia', 'Zootopia', 'zootopia', 'In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.', 2016, 108, 'Jared Bush', 'Ginnifer Goodwin, Jason Bateman, Idris Elba', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt2948356/', 0, 0, 1, '2026-02-21 18:14:53.227', '2026-02-21 18:14:53.227', NULL, 'tt2948356', 0, NULL, 'OK', NULL, NULL),
(287, 'Deadpool', 'Deadpool', 'deadpool', 'A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.', 2016, 108, 'Tim Miller', 'Ryan Reynolds, Morena Baccarin, T.J. Miller', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzY3ZWU5NGQtOTViNC00ZWVmLTliNjAtNzViNzlkZWQ4YzQ4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8, 'https://www.imdb.com/title/tt1431045/', 0, 0, 1, '2026-02-21 18:14:56.204', '2026-02-21 18:14:57.886', NULL, 'tt1431045', 0, NULL, 'OK', NULL, 7),
(288, 'Sing Street', 'Sing Street', 'sing-street', 'A young lad notices a beautiful girl who begins to occupy his thoughts. While struggling with poverty, personal relationships and life&apos;s woes, he starts a band, hoping to catch her attention.', 2016, 106, 'John Carney', 'Ferdia Walsh-Peelo, Aidan Gillen, Maria Doyle Kennedy', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjEzODA3MDcxMl5BMl5BanBnXkFtZTgwODgxNDk3NzE@._V1_.jpg', NULL, 1, 7.9, 'https://www.imdb.com/title/tt3544112/', 0, 0, 1, '2026-02-21 18:14:59.334', '2026-02-21 18:14:59.334', NULL, 'tt3544112', 0, NULL, 'OK', NULL, NULL),
(289, 'Captain Fantastic', 'Captain Fantastic', 'captain-fantastic', 'A widower who lives in the forest takes his six children into the outside world for the first time.', 2016, 118, 'Matt Ross', 'Viggo Mortensen, George MacKay, Samantha Isler', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE5OTM0OTY5NF5BMl5BanBnXkFtZTgwMDcxOTQ3ODE@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt3553976/', 0, 0, 1, '2026-02-21 18:15:02.412', '2026-02-21 18:15:02.412', NULL, 'tt3553976', 0, NULL, 'OK', NULL, NULL),
(290, 'Hunt for the Wilderpeople', 'Hunt for the Wilderpeople', 'hunt-for-the-wilderpeople', 'A national manhunt is ordered for a rebellious kid and his foster uncle who go missing in the wild New Zealand bush.', 2016, 101, 'Taika Waititi', 'Sam Neill, Julian Dennison, Rima Te Wiata', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjI1MDQ2MDg5Ml5BMl5BanBnXkFtZTgwMjc2NjM5ODE@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt4698684/', 0, 0, 1, '2026-02-21 18:15:05.129', '2026-02-21 18:15:05.129', NULL, 'tt4698684', 0, NULL, 'OK', NULL, NULL),
(291, 'Perfetti sconosciuti', 'Perfetti sconosciuti', 'perfetti-sconosciuti', 'Seven long-time friends meet for dinner. They decide to share their text messages, emails and phone calls. Secrets are unveiled. Harmony trembles.', 2016, 96, 'Paolo Genovese', 'Giuseppe Battiston, Anna Foglietta, Marco Giallini', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzBjZjIwZTMtMmVmMy00NDZjLThlMGYtMjMyODE4NjE0YjFiXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.7, 'https://www.imdb.com/title/tt4901306/', 0, 0, 1, '2026-02-21 18:15:08.300', '2026-02-21 18:15:08.300', NULL, 'tt4901306', 0, NULL, 'OK', NULL, NULL),
(292, 'Moana', 'Moana', 'moana', 'In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana&apos;s island, she answers the Ocean&apos;s call to seek out Maui to set things right.', 2016, 107, 'Ron Clements', 'Auli&apos;i Cravalho, Dwayne Johnson, Rachel House', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt3521164/', 0, 0, 1, '2026-02-21 18:15:11.111', '2026-02-21 18:15:11.111', NULL, 'tt3521164', 0, NULL, 'OK', NULL, NULL),
(293, 'The Nice Guys', 'The Nice Guys', 'the-nice-guys', 'In 1970s Los Angeles, a mismatched pair of private eyes investigate a missing girl and the mysterious death of a porn star.', 2016, 116, 'Shane Black', 'Russell Crowe, Ryan Gosling, Angourie Rice', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BM2YwNWZlZGEtYTEyZi00NjdjLWEwM2ItM2Q2MDMwZjkzMjk0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt3799694/', 0, 0, 1, '2026-02-21 18:15:14.622', '2026-02-21 18:15:14.622', NULL, 'tt3799694', 0, NULL, 'OK', NULL, NULL),
(294, 'The Edge of Seventeen', 'The Edge of Seventeen', 'the-edge-of-seventeen', 'High-school life gets even more unbearable for Nadine when her best friend, Krista, starts dating her older brother.', 2016, 104, 'Kelly Fremon Craig', 'Hailee Steinfeld, Haley Lu Richardson, Blake Jenner', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODE2NjE4NjYyMV5BMl5BanBnXkFtZTgwNzk3MjQ0OTE@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1878870/', 0, 0, 1, '2026-02-21 18:15:17.466', '2026-02-21 18:15:17.466', NULL, 'tt1878870', 0, NULL, 'OK', NULL, NULL),
(295, 'Paterson', 'Paterson', 'paterson', 'A quiet observation of the triumphs and defeats of daily life, along with the poetry evident in its smallest details.', 2016, 118, 'Jim Jarmusch', 'Adam Driver, Golshifteh Farahani, Nellie', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTUzODA4Nzk0OF5BMl5BanBnXkFtZTgwNzE1MDIwMDI@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt5247022/', 0, 0, 1, '2026-02-21 18:15:20.459', '2026-02-21 18:15:20.459', NULL, 'tt5247022', 0, NULL, 'OK', NULL, NULL),
(296, '20th Century Women', '20th Century Women', '20th-century-women', 'In 1979 Santa Barbara, Dorothea is a determined single mother who is raising her son, Jamie. Dorothea enlists the help of two women -- Abbie, a free-spirited punk artist and Julie, a savvy teenager -- to help with Jamie&apos;s upbringing.', 2017, 119, 'Mike Mills', 'Annette Bening, Elle Fanning, Greta Gerwig', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTkwNDE4NzQwM15BMl5BanBnXkFtZTgwNzQ5Nzg0MDI@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt4385888/', 0, 0, 1, '2026-02-21 18:15:23.303', '2026-02-21 18:15:23.303', NULL, 'tt4385888', 0, NULL, 'OK', NULL, NULL),
(297, 'The Fundamentals of Caring', 'The Fundamentals of Caring', 'the-fundamentals-of-caring', 'A man suffering a family loss enrolls in a class about care-giving that changes his perspective on life.', 2016, 97, 'Rob Burnett', 'Craig Roberts, Paul Rudd, Selena Gomez', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTA1Mjc4ODI0NzReQTJeQWpwZ15BbWU4MDQ3MzAwMjkx._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt2452386/', 0, 0, 1, '2026-02-21 18:15:26.613', '2026-02-21 18:15:26.613', NULL, 'tt2452386', 0, NULL, 'OK', NULL, NULL),
(298, 'Toni Erdmann', 'Toni Erdmann', 'toni-erdmann', 'A practical joking father tries to reconnect with his hard working daughter by creating an outrageous alter ego and posing as her CEO&apos;s life coach.', 2016, 162, 'Maren Ade', 'Sandra Hüller, Peter Simonischek, Michael Wittenborn', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BODNiNmE5OWMtNDAxMy00YTQzLThjMGItMTAwOTNlNGM2ZDlhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt4048272/', 0, 0, 1, '2026-02-21 18:15:29.506', '2026-02-21 18:15:29.506', NULL, 'tt4048272', 0, NULL, 'OK', NULL, NULL),
(299, 'Finding Dory', 'Finding Dory', 'finding-dory', 'Friendly but forgetful blue tang Dory begins a search for her long-lost parents and everyone learns a few things about the real meaning of family along the way.', 2016, 97, 'Angus MacLane', 'Ellen DeGeneres, Albert Brooks, Ed O&apos;Neill', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BY2VlYWJjMGMtYjcwZC00MDE2LThmMDItYjVlMzNhYzBhYTk5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt2277860/', 0, 0, 1, '2026-02-21 18:15:32.385', '2026-02-21 18:15:32.385', NULL, 'tt2277860', 0, NULL, 'OK', NULL, NULL),
(300, 'War Dogs', 'War Dogs', 'war-dogs', 'Loosely based on the true story of two young men, David Packouz and Efraim Diveroli, who won a three hundred million dollar contract from the Pentagon to arm America&apos;s allies in Afghanistan.', 2016, 114, 'Todd Phillips', 'Jonah Hill, Miles Teller, Steve Lantz', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjEyNzQ0NzM4MV5BMl5BanBnXkFtZTgwMDI0ODM2OTE@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt2005151/', 0, 0, 1, '2026-02-21 18:15:35.216', '2026-02-21 18:15:35.216', NULL, 'tt2005151', 0, NULL, 'OK', NULL, NULL),
(301, 'Sing', 'Sing', 'sing', 'In a city of humanoid animals, a hustling theater impresario&apos;s attempt to save his theater with a singing competition becomes grander than he anticipates even as its finalists find that their lives will never be the same.', 2016, 108, 'Garth Jennings', 'Matthew McConaughey, Reese Witherspoon, Seth MacFarlane', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTYzODYzODU2Ml5BMl5BanBnXkFtZTgwNTc1MTA2NzE@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt3470600/', 0, 0, 1, '2026-02-21 18:15:38.449', '2026-02-21 18:15:40.138', NULL, 'tt3470600', 0, NULL, 'OK', NULL, 8),
(302, 'Kung Fu Panda 3', 'Kung Fu Panda 3', 'kung-fu-panda-3', 'Continuing his &quot;legendary adventures of awesomeness&quot;, Po must face two hugely epic, but different threats: one supernatural and the other a little closer to home.', 2016, 95, 'Alessandro Carloni', 'Jack Black, Bryan Cranston, Dustin Hoffman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt2267968/', 0, 0, 1, '2026-02-21 18:15:41.253', '2026-02-21 18:15:42.981', NULL, 'tt2267968', 0, NULL, 'OK', NULL, 9),
(303, 'Swiss Army Man', 'Swiss Army Man', 'swiss-army-man', 'A hopeless man stranded on a deserted island befriends a dead body, and together they go on a surreal journey to get home.', 2016, 97, 'Daniel Kwan', 'Paul Dano, Daniel Radcliffe, Mary Elizabeth Winstead', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTk0OTEyMjM1OF5BMl5BanBnXkFtZTgwMzMzODM4ODE@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt4034354/', 0, 0, 1, '2026-02-21 18:15:44.281', '2026-02-21 18:15:44.281', NULL, 'tt4034354', 0, NULL, 'OK', NULL, NULL),
(304, 'Everybody Wants Some!!', 'Everybody Wants Some!!', 'everybody-wants-some', 'In 1980 Texas, a college freshman moves into an old frat house with his new baseball teammates as they party their way through the final weekend of Summer.', 2016, 117, 'Richard Linklater', 'Blake Jenner, Tyler Hoechlin, Ryan Guzman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTk2NDcyNDE5N15BMl5BanBnXkFtZTgwNDA0MzQ1NzE@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt2937696/', 0, 0, 1, '2026-02-21 18:15:47.476', '2026-02-21 18:15:47.476', NULL, 'tt2937696', 0, NULL, 'OK', NULL, NULL),
(305, 'Ghostbusters', 'Ghostbusters', 'ghostbusters', 'Following a ghost invasion of Manhattan, paranormal enthusiasts Erin Gilbert and Abby Yates, nuclear engineer Jillian Holtzmann, and subway worker Patty Tolan band together to stop the otherworldly threat.', 2016, 117, 'Paul Feig', 'Melissa McCarthy, Kristen Wiig, Kate McKinnon', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZjNhMzU5MjgtY2VhMC00NzZmLTk1YTEtMDc5OGU1OWJiMTE4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt1289401/', 0, 0, 1, '2026-02-21 18:15:50.785', '2026-02-21 18:15:52.062', NULL, 'tt1289401', 0, NULL, 'OK', NULL, 10),
(306, 'Storks', 'Storks', 'storks', 'Storks have moved on from delivering babies to packages. But when an order for a baby appears, the best delivery stork must scramble to fix the error by delivering the baby.', 2016, 87, 'Nicholas Stoller', 'Andy Samberg, Katie Crown, Kelsey Grammer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTYxNjI3MzcwMF5BMl5BanBnXkFtZTgwOTIyNDY5OTE@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt4624424/', 0, 0, 1, '2026-02-21 18:15:53.413', '2026-02-21 18:15:53.413', NULL, 'tt4624424', 0, NULL, 'OK', NULL, NULL),
(307, 'Florence Foster Jenkins', 'Florence Foster Jenkins', 'florence-foster-jenkins', 'The story of Florence Foster Jenkins, a New York heiress who dreamed of becoming an opera singer, despite having a terrible singing voice.', 2016, 111, 'Stephen Frears', 'Meryl Streep, Hugh Grant, Simon Helberg', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA0Mzc4MjMxMl5BMl5BanBnXkFtZTgwODIwNTQxODE@._V1_.jpg', NULL, 1, 6.8, 'https://www.imdb.com/title/tt4136084/', 0, 0, 1, '2026-02-21 18:15:56.534', '2026-02-21 18:15:56.534', NULL, 'tt4136084', 0, NULL, 'OK', NULL, NULL),
(308, 'Popstar: Never Stop Never Stopping', 'Popstar: Never Stop Never Stopping', 'popstar-never-stop-never-stopping', 'When it becomes clear that his solo album is a failure, a former boy band member does everything in his power to maintain his celebrity status.', 2016, 87, 'Akiva Schaffer', 'Andy Samberg, Jorma Taccone, Akiva Schaffer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjMxMzk2ODI4N15BMl5BanBnXkFtZTgwNzgzNzQ5ODE@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt3960412/', 0, 0, 1, '2026-02-21 18:15:59.515', '2026-02-21 18:15:59.515', NULL, 'tt3960412', 0, NULL, 'OK', NULL, NULL),
(309, 'Pete\'s Dragon', 'Pete\'s Dragon', 'petes-dragon', 'The adventures of an orphaned boy named Pete and his best friend Elliott, who happens to be a dragon.', 2016, 102, 'David Lowery', 'Bryce Dallas Howard, Robert Redford, Oakes Fegley', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjBiYTdjZDUtYjg3ZS00YTA0LTkzZGUtMzA2OWEyOGZiN2VhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt2788732/', 0, 0, 1, '2026-02-21 18:16:02.817', '2026-02-21 18:16:02.817', NULL, 'tt2788732', 0, NULL, 'OK', NULL, NULL),
(310, 'Whiskey Tango Foxtrot', 'Whiskey Tango Foxtrot', 'whiskey-tango-foxtrot', 'Stuck in a rut, a reporter decides to shake things up by taking a dangerous assignment in Afghanistan. Far from home and out of her comfort zone, she discovers her true strength as she risks it all to find the next big story.', 2016, 112, 'Glenn Ficarra', 'Tina Fey, Margot Robbie, Martin Freeman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjIxOTIzMTM5OF5BMl5BanBnXkFtZTgwNDIxNTA1NzE@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt3553442/', 0, 0, 1, '2026-02-21 18:16:05.565', '2026-02-21 18:16:05.565', NULL, 'tt3553442', 0, NULL, 'OK', NULL, NULL),
(311, 'Café Society', 'Café Society', 'caf-society', 'In the 1930s, a Bronx native moves to Hollywood and falls in love with a young woman who is seeing a married man.', 2016, 96, 'Woody Allen', 'Jesse Eisenberg, Kristen Stewart, Steve Carell', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOGNiYzM4ZGUtYzk3MC00MWQ1LWI5NGEtZWYzMzMxOTQ4ZDA0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.6, 'https://www.imdb.com/title/tt4513674/', 0, 0, 1, '2026-02-21 18:16:09.447', '2026-02-21 18:16:09.447', NULL, 'tt4513674', 0, NULL, 'OK', NULL, NULL),
(312, 'The Secret Life of Pets', 'The Secret Life of Pets', 'the-secret-life-of-pets', 'The quiet life of a terrier named Max is upended when his owner takes in Duke, a stray whom Max instantly dislikes.', 2016, 86, 'Chris Renaud', 'Louis C.K., Eric Stonestreet, Kevin Hart', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjIzMzA1OTkzNV5BMl5BanBnXkFtZTgwODE3MjM4NzE@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt2709768/', 0, 0, 1, '2026-02-21 18:16:11.629', '2026-02-21 18:16:11.629', NULL, 'tt2709768', 0, NULL, 'OK', NULL, NULL),
(313, 'Better Watch Out', 'Better Watch Out', 'better-watch-out', 'On a quiet suburban street, a babysitter must defend a twelve-year-old boy from intruders, only to discover it&apos;s far from a normal home invasion.', 2017, 89, 'Chris Peckover', 'Olivia DeJonge, Levi Miller, Ed Oxenbould', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNmE4NDY5ZDgtZjFhNC00NGU2LTlhMmItNmE2ZjBiNzE5YjM2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.5, 'https://www.imdb.com/title/tt4443658/', 0, 0, 1, '2026-02-21 18:16:14.717', '2026-02-21 18:16:14.717', NULL, 'tt4443658', 0, NULL, 'OK', NULL, NULL),
(314, 'Now You See Me 2', 'Now You See Me 2', 'now-you-see-me-2', 'The Four Horsemen resurface, and are forcibly recruited by a tech genius to pull off their most impossible heist yet.', 2016, 129, 'Jon M. Chu', 'Jesse Eisenberg, Mark Ruffalo, Woody Harrelson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTVjNTA0ZWEtNzU2Ny00Njg1LWE1MmEtZTUyZGQzYTVlY2Q5XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt3110958/', 0, 0, 1, '2026-02-21 18:16:17.478', '2026-02-21 18:16:17.478', NULL, 'tt3110958', 0, NULL, 'OK', NULL, NULL),
(315, 'Trolls', 'Trolls', 'trolls', 'After the Bergens invade Troll Village, Poppy, the happiest Troll ever born, and the curmudgeonly Branch set off on a journey to rescue her friends.', 2016, 92, 'Walt Dohrn', 'Anna Kendrick, Justin Timberlake, Zooey Deschanel', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt1679335/', 0, 0, 1, '2026-02-21 18:16:20.722', '2026-02-21 18:16:20.722', NULL, 'tt1679335', 0, NULL, 'OK', NULL, NULL),
(316, 'Bridget Jones\'s Baby', 'Bridget Jones\'s Baby', 'bridget-joness-baby', 'Bridget Jones&apos; focus on her single and professional life is interrupted when she discovers she is pregnant, but is unsure of the identity of the father.', 2016, 123, 'Sharon Maguire', 'Renée Zellweger, Gemma Jones, Jim Broadbent', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWViMmNmNmEtYTg5Mi00Y2IwLTg4NzgtNzg2ZjNjY2RmYWZlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.4, 'https://www.imdb.com/title/tt1473832/', 0, 0, 1, '2026-02-21 18:16:23.834', '2026-02-21 18:16:23.834', NULL, 'tt1473832', 0, NULL, 'OK', NULL, NULL),
(317, 'Central Intelligence', 'Central Intelligence', 'central-intelligence', 'After he reconnects with an awkward pal from high school through Facebook, a mild-mannered accountant is lured into the world of international espionage.', 2016, 107, 'Rawson Marshall Thurber', 'Dwayne Johnson, Kevin Hart, Danielle Nicolet', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjA2NzEzNjIwNl5BMl5BanBnXkFtZTgwNzgwMTEzNzE@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt1489889/', 0, 0, 1, '2026-02-21 18:16:26.577', '2026-02-21 18:16:26.577', NULL, 'tt1489889', 0, NULL, 'OK', NULL, NULL),
(318, 'Free Fire', 'Free Fire', 'free-fire', 'Set in Boston in 1978, a meeting in a deserted warehouse between two gangs turns into a shoot-out and a game of survival.', 2017, 91, 'Ben Wheatley', 'Sharlto Copley, Brie Larson, Armie Hammer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTk5MzJhNjItZTRlOC00YWRlLTgyYmUtZmZhZjA0NmFmNjE2XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt4158096/', 0, 0, 1, '2026-02-21 18:16:29.684', '2026-02-21 18:16:29.684', NULL, 'tt4158096', 0, NULL, 'OK', NULL, NULL),
(319, 'The Angry Birds Movie', 'The Angry Birds Movie', 'the-angry-birds-movie', 'When an island populated by happy, flightless birds is visited by mysterious green pigs, it&apos;s up to three unlikely outcasts to figure out what the pigs are up to.', 2016, 97, 'Clay Kaytis', 'Jason Sudeikis, Josh Gad, Danny McBride', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY3MjU0NDA0OF5BMl5BanBnXkFtZTgwNTc0MTU3OTE@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt1985949/', 0, 0, 1, '2026-02-21 18:16:34.581', '2026-02-21 18:16:34.581', NULL, 'tt1985949', 0, NULL, 'OK', NULL, NULL),
(320, 'Hail, Caesar!', 'Hail, Caesar!', 'hail-caesar', 'A Hollywood fixer in the 1950s works to keep the studio&apos;s stars in line.', 2016, 106, 'Ethan Coen', 'Josh Brolin, George Clooney, Alden Ehrenreich', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmE1NDE2ODUtZmVmNi00OTM3LWFkOTItZDE2NGUwMTM0YjIyXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.3, 'https://www.imdb.com/title/tt0475290/', 0, 0, 1, '2026-02-21 18:16:36.044', '2026-02-21 18:16:36.044', NULL, 'tt0475290', 0, NULL, 'OK', NULL, NULL),
(321, 'Colossal', 'Colossal', 'colossal', 'Gloria is an out-of-work party girl forced to leave her life in New York City and move back home. When reports surface that a giant creature is destroying Seoul, she gradually comes to the realization that she is somehow connected...', 2017, 109, 'Nacho Vigalondo', 'Anne Hathaway, Jason Sudeikis, Austin Stowell', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY2NTExOTA2MF5BMl5BanBnXkFtZTgwNTMwMjE2MTI@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt4680182/', 0, 0, 1, '2026-02-21 18:16:39.008', '2026-02-21 18:16:39.008', NULL, 'tt4680182', 0, NULL, 'OK', NULL, NULL),
(322, 'Why Him?', 'Why Him?', 'why-him', 'A holiday gathering threatens to go off the rails when Ned Fleming realizes that his daughter&apos;s Silicon Valley millionaire boyfriend is about to pop the question.', 2016, 111, 'John Hamburg', 'Zoey Deutch, James Franco, Tangie Ambrose', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjViYmEzYjMtZTUyZS00NGE5LThiYjYtYWJlZmEwZDI5NGViXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt4501244/', 0, 0, 1, '2026-02-21 18:16:42.124', '2026-02-21 18:16:42.124', NULL, 'tt4501244', 0, NULL, 'OK', NULL, NULL);
INSERT INTO `movie` (`id`, `titleBG`, `titleEN`, `slug`, `description`, `year`, `duration`, `director`, `cast`, `videoUrl`, `trailerUrl`, `posterUrl`, `backdropUrl`, `isHD`, `rating`, `imdbLink`, `views`, `featured`, `published`, `createdAt`, `updatedAt`, `tmdbId`, `imdbId`, `isSeries`, `descriptionEN`, `healthStatus`, `lastChecked`, `collectionId`) VALUES
(323, 'Grimsby', 'Grimsby', 'grimsby', 'A new assignment forces a top spy to team up with his football hooligan brother.', 2016, 83, 'Louis Leterrier', 'Sacha Baron Cohen, Mark Strong, Rebel Wilson', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE0NTE3MjMwNV5BMl5BanBnXkFtZTgwMDc5NjQxODE@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt3381008/', 0, 0, 1, '2026-02-21 18:16:46.013', '2026-02-21 18:16:46.013', NULL, 'tt3381008', 0, NULL, 'OK', NULL, NULL),
(324, 'Bad Moms', 'Bad Moms', 'bad-moms', 'When three overworked and under-appreciated moms are pushed beyond their limits, they ditch their conventional responsibilities for a jolt of long overdue freedom, fun and comedic self-indulgence.', 2016, 100, 'Jon Lucas', 'Mila Kunis, Kathryn Hahn, Kristen Bell', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjIwNzE5MTgwNl5BMl5BanBnXkFtZTgwNjM4OTA0OTE@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt4651520/', 0, 0, 1, '2026-02-21 18:16:48.148', '2026-02-21 18:16:48.148', NULL, 'tt4651520', 0, NULL, 'OK', NULL, NULL),
(325, 'Keanu', 'Keanu', 'keanu', 'When the adorable kitten of an New Orleans crime kingpin suddenly enters the life of two cousins, they will have to go through tough gangs, pitiless hitmen, and ruthless drug dealers who all claim him, to get him back. How hard ca...', 2016, 100, 'Peter Atencio', 'Keegan-Michael Key, Jordan Peele, Tiffany Haddish', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTUwODA0NzQxMl5BMl5BanBnXkFtZTgwNzUyMjY3ODE@._V1_.jpg', NULL, 1, 6.2, 'https://www.imdb.com/title/tt4139124/', 0, 0, 1, '2026-02-21 18:16:52.736', '2026-02-21 18:16:52.736', NULL, 'tt4139124', 0, NULL, 'OK', NULL, NULL),
(326, 'How to Be Single', 'How to Be Single', 'how-to-be-single', 'A group of young adults navigate love and relationships in New York City.', 2016, 110, 'Christian Ditter', 'Dakota Johnson, Rebel Wilson, Leslie Mann', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzI4MDMwMzUwNF5BMl5BanBnXkFtZTgwMDgyNzkyNzE@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt1292566/', 0, 0, 1, '2026-02-21 18:16:54.088', '2026-02-21 18:16:54.088', NULL, 'tt1292566', 0, NULL, 'OK', NULL, NULL),
(327, 'Sausage Party', 'Sausage Party', 'sausage-party', 'A sausage leads a group of supermarket products on a journey to discover the truth about their existence and what really happens when they are picked off the shelf.', 2016, 89, 'Greg Tiernan', 'Seth Rogen, Kristen Wiig, Jonah Hill', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjkxOTk1MzY4MF5BMl5BanBnXkFtZTgwODQzOTU5ODE@._V1_.jpg', NULL, 1, 6.1, 'https://www.imdb.com/title/tt1700841/', 0, 0, 1, '2026-02-21 18:16:57.125', '2026-02-21 18:16:57.125', NULL, 'tt1700841', 0, NULL, 'OK', NULL, NULL),
(328, 'Mike and Dave Need Wedding Dates', 'Mike and Dave Need Wedding Dates', 'mike-and-dave-need-wedding-dates', 'Two hard-partying brothers place an online ad to find the perfect dates for their sister&apos;s Hawaiian wedding. Hoping for a wild getaway, the boys instead find themselves out-hustled by an uncontrollable duo.', 2016, 98, 'Jake Szymanski', 'Zac Efron, Adam Devine, Anna Kendrick', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjM4NDIxNzI5Nl5BMl5BanBnXkFtZTgwMTg4NTY5NzE@._V1_.jpg', NULL, 1, 6, 'https://www.imdb.com/title/tt2823054/', 0, 0, 1, '2026-02-21 18:17:00.414', '2026-02-21 18:17:00.414', NULL, 'tt2823054', 0, NULL, 'OK', NULL, NULL),
(329, 'Teenage Mutant Ninja Turtles: Out of the Shadows', 'Teenage Mutant Ninja Turtles: Out of the Shadows', 'teenage-mutant-ninja-turtles-out-of-the-shadows', 'The Turtles get into another battle with their enemy the Shredder, who has acquired new allies: the mutant thugs Bebop and Rocksteady and the alien being Krang.', 2016, 112, 'Dave Green', 'Megan Fox, Will Arnett, Tyler Perry', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZDgyNWExMzUtOTAyMy00ZjkzLWFhNzgtZTFhOTBmN2RhZGJhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt3949660/', 0, 0, 1, '2026-02-21 18:17:03.360', '2026-02-21 18:17:03.360', NULL, 'tt3949660', 0, NULL, 'OK', NULL, NULL),
(330, 'Dirty Grandpa', 'Dirty Grandpa', 'dirty-grandpa', 'Right before his wedding, an uptight corporate lawyer is tricked into driving his grandfather, a lecherous former Army Lieutenant Colonel, to Florida for Spring Break.', 2016, 102, 'Dan Mazer', 'Robert De Niro, Zac Efron, Zoey Deutch', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzk0NzkyNDk2M15BMl5BanBnXkFtZTgwNDczOTU3NzE@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt1860213/', 0, 0, 1, '2026-02-21 18:17:06.285', '2026-02-21 18:17:06.285', NULL, 'tt1860213', 0, NULL, 'OK', NULL, NULL),
(331, 'Keeping Up with the Joneses', 'Keeping Up with the Joneses', 'keeping-up-with-the-joneses', 'An ordinary couple becomes embroiled in espionage after learning that their gorgeous neighbors are convert operatives.', 2016, 105, 'Greg Mottola', 'Zach Galifianakis, Isla Fisher, Jon Hamm', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDU2OTU1NzE2Ml5BMl5BanBnXkFtZTgwMDQzMzgwMDI@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt2387499/', 0, 0, 1, '2026-02-21 18:17:09.284', '2026-02-21 18:17:09.284', NULL, 'tt2387499', 0, NULL, 'OK', NULL, NULL),
(332, 'Office Christmas Party', 'Office Christmas Party', 'office-christmas-party', 'When his uptight CEO sister threatens to shut down his branch, the branch manager throws an epic Christmas party in order to land a big client and save the day, but the party gets way out of hand...', 2016, 105, 'Josh Gordon', 'Jason Bateman, Olivia Munn, T.J. Miller', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDhiMjg4ODMtYjgyNi00YjZkLWE0ZGItNjU0NGVlMzViZjdlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt1711525/', 0, 0, 1, '2026-02-21 18:17:12.616', '2026-02-21 18:17:12.616', NULL, 'tt1711525', 0, NULL, 'OK', NULL, NULL),
(333, 'Ride Along 2', 'Ride Along 2', 'ride-along-2', 'As his wedding day approaches, Ben heads to Miami with his soon-to-be brother-in-law James to bring down a drug dealer who&apos;s supplying the dealers of Atlanta with product.', 2016, 102, 'Tim Story', 'Ice Cube, Kevin Hart, Tika Sumpter', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTU4ODAzMzcxOV5BMl5BanBnXkFtZTgwODkxMDI1NjE@._V1_.jpg', NULL, 1, 5.9, 'https://www.imdb.com/title/tt2869728/', 0, 0, 1, '2026-02-21 18:17:15.344', '2026-02-21 18:17:15.344', NULL, 'tt2869728', 0, NULL, 'OK', NULL, NULL),
(334, 'Masterminds', 'Masterminds', 'masterminds', 'A guard at an armored car company in the Southern U.S. organizes one of the biggest bank heists in American history.', 2016, 95, 'Jared Hess', 'Zach Galifianakis, Owen Wilson, Kristen Wiig', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTYzMTY5Mzg1Ml5BMl5BanBnXkFtZTgwNTUzODUwNjE@._V1_.jpg', NULL, 1, 5.8, 'https://www.imdb.com/title/tt2461150/', 2, 0, 1, '2026-02-21 18:17:18.413', '2026-02-21 18:18:20.867', NULL, 'tt2461150', 0, NULL, 'OK', NULL, NULL),
(335, 'Reservoir Dogs', 'Reservoir Dogs', 'reservoir-dogs', 'When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.', 1992, 99, 'Quentin Tarantino', 'Harvey Keitel, Tim Roth, Michael Madsen', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMmMzYjg4NDctYWY0Mi00OGViLWIzMTMtYWNlZGY5ZDJmYjk3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.3, 'https://www.imdb.com/title/tt0105236/', 0, 0, 1, '2026-02-21 18:17:22.765', '2026-02-21 18:17:22.765', NULL, 'tt0105236', 0, NULL, 'OK', NULL, NULL),
(336, 'My Cousin Vinny', 'My Cousin Vinny', 'my-cousin-vinny', 'Two New Yorkers accused of murder in rural Alabama while on their way back to college call in the help of one of their cousins, a loudmouth lawyer with no trial experience.', 1992, 120, 'Jonathan Lynn', 'Joe Pesci, Marisa Tomei, Ralph Macchio', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTQxNDYzMTg1M15BMl5BanBnXkFtZTgwNzk4MDgxMTE@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt0104952/', 0, 0, 1, '2026-02-21 18:17:25.134', '2026-02-21 18:17:25.134', NULL, 'tt0104952', 0, NULL, 'OK', NULL, NULL),
(337, 'Glengarry Glen Ross', 'Glengarry Glen Ross', 'glengarry-glen-ross', 'An examination of the machinations behind the scenes at a real estate office. Unscrupulous salesmen try to hawk dubious real estate to suckers.', 1992, 100, 'James Foley', 'Al Pacino, Jack Lemmon, Alec Baldwin', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BM2Q5NDA1ODctNmM4Yy00Yjk4LTg2ZTUtZTJjYzYyMjA2MTdmXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt0104348/', 0, 0, 1, '2026-02-21 18:17:27.360', '2026-02-21 18:17:27.360', NULL, 'tt0104348', 0, NULL, 'OK', NULL, NULL),
(338, 'Batman Returns', 'Batman Returns', 'batman-returns', 'While Batman deals with a deformed man calling himself the Penguin wreaking havoc across Gotham with the help of a cruel businessman, a female employee of the latter becomes the Catwoman with her own vendetta.', 1992, 126, 'Tim Burton', 'Michael Keaton, Danny DeVito, Michelle Pfeiffer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BZTliMDVkYTktZDdlMS00NTAwLWJhNzYtMWIwMDZjN2ViMGFiXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0103776/', 0, 0, 1, '2026-02-21 18:17:30.561', '2026-02-21 18:17:30.561', NULL, 'tt0103776', 0, NULL, 'OK', NULL, NULL),
(339, 'Home Alone 2: Lost in New York', 'Home Alone 2: Lost in New York', 'home-alone-2-lost-in-new-york', 'Kevin is separated from his family again when he accidentally boards a flight to New York City during a Christmas trip to Miami. However he crosses paths with the same burglars, who now plan to rob a toy store on Christmas Eve.', 1992, 120, 'Chris Columbus', 'Macaulay Culkin, Joe Pesci, Daniel Stern', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOGEyYzRmNzYtYzJjZi00ZjhlLWJiNDktYzZhNTgxMzc1NThlXkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.9, 'https://www.imdb.com/title/tt0104431/', 0, 0, 1, '2026-02-21 18:17:34.512', '2026-02-21 18:17:34.512', NULL, 'tt0104431', 0, NULL, 'OK', NULL, NULL),
(340, 'Lethal Weapon 3', 'Lethal Weapon 3', 'lethal-weapon-3', 'Martin Riggs and Roger Murtaugh pursue a former LAPD officer who uses his knowledge of police procedure and policies to steal and sell confiscated guns and ammunition to local street gangs.', 1992, 118, 'Richard Donner', 'Mel Gibson, Danny Glover, Joe Pesci', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNDA3Zjc5NjYtODZiNy00Yjg3LTk0MWEtMDk3NDA4ZjU3YTY0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 6.7, 'https://www.imdb.com/title/tt0104714/', 0, 0, 1, '2026-02-21 18:17:36.816', '2026-02-21 18:17:37.985', NULL, 'tt0104714', 0, NULL, 'OK', NULL, 11),
(341, 'Intouchables', 'Intouchables', 'intouchables', 'After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.', 2011, 112, 'Olivier Nakache', 'François Cluzet, Omar Sy, Anne Le Ny', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_.jpg', NULL, 1, 8.5, 'https://www.imdb.com/title/tt1675434/', 0, 0, 1, '2026-02-21 18:17:41.113', '2026-02-21 18:17:41.113', NULL, 'tt1675434', 0, NULL, 'OK', NULL, NULL),
(342, 'Jodaeiye Nader az Simin', 'Jodaeiye Nader az Simin', 'jodaeiye-nader-az-simin', 'A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer&apos;s disease.', 2011, 123, 'Asghar Farhadi', 'Payman Maadi, Leila Hatami, Sareh Bayat', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMDM0ZWRmMzctM2M5ZS00ZjU0LWIxN2MtNWNlNGY1ZDhjMDVhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.3, 'https://www.imdb.com/title/tt1832382/', 0, 0, 1, '2026-02-21 18:17:42.534', '2026-02-21 18:17:42.534', NULL, 'tt1832382', 0, NULL, 'OK', NULL, NULL),
(343, 'Zindagi Na Milegi Dobara', 'Zindagi Na Milegi Dobara', 'zindagi-na-milegi-dobara', 'Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.', 2011, 155, 'Zoya Akhtar', 'Hrithik Roshan, Farhan Akhtar, Abhay Deol', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOGIzYzg5NzItNDRkYS00NmIzLTk3NzQtZWYwY2VlZDhiYWQ4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 8.2, 'https://www.imdb.com/title/tt1562872/', 0, 0, 1, '2026-02-21 18:17:45.617', '2026-02-21 18:17:45.617', NULL, 'tt1562872', 0, NULL, 'OK', NULL, NULL),
(344, 'The Help', 'The Help', 'the-help', 'An aspiring author during the civil rights movement of the 1960s decides to write a book detailing the African American maids&apos; point of view on the white families for which they work, and the hardships they go through on a daily b...', 2011, 146, 'Tate Taylor', 'Viola Davis, Emma Stone, Octavia Spencer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTM5OTMyMjIxOV5BMl5BanBnXkFtZTcwNzU4MjIwNQ@@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt1454029/', 0, 0, 1, '2026-02-21 18:17:48.927', '2026-02-21 18:17:48.927', NULL, 'tt1454029', 0, NULL, 'OK', NULL, NULL),
(345, 'Warrior', 'Warrior', 'warrior', 'The youngest son of an alcoholic former boxer returns home, where he&apos;s trained by his father for competition in a mixed martial arts tournament - a path that puts the fighter on a collision course with his estranged, older brother.', 2011, 140, 'Gavin O&apos;Connor', 'Tom Hardy, Nick Nolte, Joel Edgerton', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTk4ODk5MTMyNV5BMl5BanBnXkFtZTcwMDMyNTg0Ng@@._V1_.jpg', NULL, 1, 8.1, 'https://www.imdb.com/title/tt1291584/', 0, 0, 1, '2026-02-21 18:17:51.667', '2026-02-21 18:17:51.667', NULL, 'tt1291584', 0, NULL, 'OK', NULL, NULL),
(346, 'Drive', 'Drive', 'drive', 'A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor&apos;s husband rob a pawn shop while serving as his getaway driver.', 2011, 100, 'Nicolas Winding Refn', 'Ryan Gosling, Carey Mulligan, Bryan Cranston', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYTFmNTFlOTAtNzEyNi00MWU2LTg3MGEtYjA2NWY3MDliNjlkXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt0780504/', 0, 0, 1, '2026-02-21 18:17:54.625', '2026-02-21 18:17:54.625', NULL, 'tt0780504', 0, NULL, 'OK', NULL, NULL),
(347, 'The Girl with the Dragon Tattoo', 'The Girl with the Dragon Tattoo', 'the-girl-with-the-dragon-tattoo', 'Journalist Mikael Blomkvist is aided in his search for a woman who has been missing for 40 years by hacker Lisbeth Salander.', 2011, 158, 'David Fincher', 'Daniel Craig, Rooney Mara, Christopher Plummer', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt1568346/', 0, 0, 1, '2026-02-21 18:17:57.652', '2026-02-21 18:17:57.652', NULL, 'tt1568346', 0, NULL, 'OK', NULL, NULL),
(348, 'The Artist', 'The Artist', 'the-artist', 'When George, a silent movie superstar, meets Peppy Miller, a dancer, sparks fly between the two. However, after the introduction of talking pictures, their fortunes change, affecting their dynamic.', 2012, 100, 'Michel Hazanavicius', 'Jean Dujardin, Bérénice Bejo, John Goodman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjEwOGZmM2QtNjY4Mi00NjI0LTkyZjItZDEzZGI1YTEzMDg1XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt1655442/', 2, 0, 1, '2026-02-21 18:18:00.483', '2026-02-21 18:18:15.113', NULL, 'tt1655442', 0, NULL, 'OK', NULL, NULL),
(349, 'Bir Zamanlar Anadolu\'da', 'Bir Zamanlar Anadolu\'da', 'bir-zamanlar-anadoluda', 'A group of men set out in search of a dead body in the Anatolian steppes.', 2011, 157, 'Nuri Bilge Ceylan', 'Muhammet Uzuner, Yılmaz Erdoğan, Taner Birsel', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMzg3OTMyODQ1M15BMl5BanBnXkFtZTcwNjMwMTEwNw@@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt1827487/', 0, 0, 1, '2026-02-21 18:18:03.553', '2026-02-21 18:18:03.553', NULL, 'tt1827487', 0, NULL, 'OK', NULL, NULL),
(350, 'Rockstar', 'Rockstar', 'rockstar', 'Janardhan Jakhar chases his dreams of becoming a big Rock star, during which he falls in love with Heer.', 2011, 159, 'Imtiaz Ali', 'Ranbir Kapoor, Nargis Fakhri, Shammi Kapoor', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BOTc3NzAxMjg4M15BMl5BanBnXkFtZTcwMDc2ODQwNw@@._V1_.jpg', NULL, 1, 7.8, 'https://www.imdb.com/title/tt1839596/', 0, 0, 1, '2026-02-21 18:18:07.124', '2026-02-21 18:18:07.124', NULL, 'tt1839596', 0, NULL, 'OK', NULL, NULL),
(351, 'Detachment', 'Detachment', 'detachment', 'A substitute teacher who drifts from classroom to classroom finds a connection to the students and teachers during his latest assignment.', 2012, 98, 'Tony Kaye', 'Adrien Brody, Christina Hendricks, Marcia Gay Harden', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTM3NzQzMDA5Ml5BMl5BanBnXkFtZTcwODA5NTcyNw@@._V1_.jpg', NULL, 1, 7.7, 'https://www.imdb.com/title/tt1683526/', 0, 0, 1, '2026-02-21 18:18:10.165', '2026-02-21 18:18:10.165', NULL, 'tt1683526', 0, NULL, 'OK', NULL, NULL),
(352, 'La piel que habito', 'La piel que habito', 'la-piel-que-habito', 'A brilliant plastic surgeon, haunted by past tragedies, creates a type of synthetic skin that withstands any kind of damage. His guinea pig: a mysterious and volatile woman who holds the key to his obsession.', 2011, 120, 'Pedro Almodóvar', 'Antonio Banderas, Elena Anaya, Jan Cornet', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYjgzMDNlOTgtMDM1Ny00MjdmLWIwNjItN2IzYzRiZGY4MWY3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1189073/', 0, 0, 1, '2026-02-21 18:18:12.862', '2026-02-21 18:18:12.862', NULL, 'tt1189073', 0, NULL, 'OK', NULL, NULL),
(353, 'Rise of the Planet of the Apes', 'Rise of the Planet of the Apes', 'rise-of-the-planet-of-the-apes', 'A substance designed to help the brain repair itself gives advanced intelligence to a chimpanzee who leads an ape uprising.', 2011, 105, 'Rupert Wyatt', 'James Franco, Andy Serkis, Freida Pinto', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjllODU1NDItODU1Ni00N2Y2LTg4Y2ItOTJjMTczZDliN2FhXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1318514/', 0, 0, 1, '2026-02-21 18:18:15.715', '2026-02-21 18:18:15.715', NULL, 'tt1318514', 0, NULL, 'OK', NULL, NULL),
(354, '50/50', '50/50', '5050', 'Inspired by a true story, a comedy centered on a 27-year-old guy who learns of his cancer diagnosis and his subsequent struggle to beat the disease.', 2011, 100, 'Jonathan Levine', 'Joseph Gordon-Levitt, Seth Rogen, Anna Kendrick', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjg3ODQyNTIyN15BMl5BanBnXkFtZTcwMjUzNzM5NQ@@._V1_.jpg', NULL, 1, 7.6, 'https://www.imdb.com/title/tt1306980/', 0, 0, 1, '2026-02-21 18:18:19.312', '2026-02-21 18:46:16.033', NULL, 'tt1306980', 0, NULL, 'OK', NULL, NULL),
(355, 'Source Code', 'Source Code', 'source-code', 'A soldier wakes up in someone else&apos;s body and discovers he&apos;s part of an experimental government program to find the bomber of a commuter train within 8 minutes.', 2011, 93, 'Duncan Jones', 'Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTY0MTc3MzMzNV5BMl5BanBnXkFtZTcwNDE4MjE0NA@@._V1_.jpg', NULL, 1, 7.5, 'https://www.imdb.com/title/tt0945513/', 0, 0, 1, '2026-02-21 18:18:22.154', '2026-02-21 18:46:16.027', NULL, 'tt0945513', 0, NULL, 'OK', NULL, NULL),
(356, 'Hugo', 'Hugo', 'hugo', 'In 1931 Paris, an orphan living in the walls of a train station gets wrapped up in a mystery involving his late father and an automaton.', 2011, 126, 'Martin Scorsese', 'Asa Butterfield, Chloë Grace Moretz, Christopher Lee', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjAzNzk5MzgyNF5BMl5BanBnXkFtZTcwOTE4NDU5Ng@@._V1_.jpg', NULL, 1, 7.5, 'https://www.imdb.com/title/tt0970179/', 0, 0, 1, '2026-02-21 18:18:24.781', '2026-02-21 19:14:59.973', NULL, 'tt0970179', 0, NULL, 'OK', '2026-02-21 19:15:00.242', NULL),
(357, 'Jin ling shi san chai', 'Jin ling shi san chai', 'jin-ling-shi-san-chai', 'An American finds refuge during the 1937 Japanese invasion of Nanking in a church with a group of women. Posing as a priest, he attempts to lead the women to safety.', 2011, 146, 'Yimou Zhang', 'Christian Bale, Ni Ni, Xinyi Zhang', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE3OTUzODA3Ml5BMl5BanBnXkFtZTcwNDk5NTUyNw@@._V1_.jpg', NULL, 1, 7.5, 'https://www.imdb.com/title/tt1410063/', 18, 0, 1, '2026-02-21 18:18:28.437', '2026-02-21 18:54:43.466', NULL, 'tt1410063', 0, NULL, 'OK', NULL, NULL),
(358, 'Crazy, Stupid, Love.', 'Crazy, Stupid, Love.', 'crazy-stupid-love', 'A middle-aged husband&apos;s life changes dramatically when his wife asks him for a divorce. He seeks to rediscover his manhood with the help of a newfound friend, Jacob, learning to pick up girls at bars.', 2011, 118, 'Glenn Ficarra', 'Steve Carell, Ryan Gosling, Julianne Moore', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt1570728/', 0, 0, 1, '2026-02-21 18:18:30.688', '2026-02-21 18:18:30.688', NULL, 'tt1570728', 0, NULL, 'OK', NULL, NULL),
(359, 'We Need to Talk About Kevin', 'We Need to Talk About Kevin', 'we-need-to-talk-about-kevin', 'Kevin&apos;s mother struggles to love her strange child despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.', 2011, 112, 'Lynne Ramsay', 'Tilda Swinton, John C. Reilly, Ezra Miller', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE0NDE0MjYxNF5BMl5BanBnXkFtZTcwNjM2NTY5Ng@@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt1242460/', 0, 0, 1, '2026-02-21 18:18:33.686', '2026-02-21 18:18:33.686', NULL, 'tt1242460', 0, NULL, 'OK', NULL, NULL),
(360, 'Kokuriko-zaka kara', 'Kokuriko-zaka kara', 'kokuriko-zaka-kara', 'A group of Yokohama teens look to save their school&apos;s clubhouse from the wrecking ball in preparations for the 1964 Tokyo Olympics.', 2011, 91, 'Gorô Miyazaki', 'Sarah Bolger, Chris Noth, Anton Yelchin', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMWVjMWRhMzYtOGRmMi00ODExLTk2M2YtZDhjNGY5OWQ5NDY4XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.4, 'https://www.imdb.com/title/tt1798188/', 0, 0, 1, '2026-02-21 18:18:36.845', '2026-02-21 18:18:36.845', NULL, 'tt1798188', 0, NULL, 'OK', NULL, NULL),
(361, 'The Lincoln Lawyer', 'The Lincoln Lawyer', 'the-lincoln-lawyer', 'Defence lawyer Mick Haller lands a case defending a wealthy realtor&apos;s son who is accused of raping a prostitute. Believing his client to be innocent, Haller soon finds evidence that proves otherwise.', 2011, 118, 'Brad Furman', 'Matthew McConaughey, Marisa Tomei, Ryan Phillippe', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTQ4NDE4NTY5MV5BMl5BanBnXkFtZTcwODQyMTkxNA@@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1189340/', 0, 0, 1, '2026-02-21 18:18:39.591', '2026-02-21 18:18:39.591', NULL, 'tt1189340', 0, NULL, 'OK', NULL, NULL),
(362, 'Jane Eyre', 'Jane Eyre', 'jane-eyre', 'A mousy governess who softens the heart of her employer soon discovers that he&apos;s hiding a terrible secret.', 2011, 120, 'Cary Joji Fukunaga', 'Mia Wasikowska, Michael Fassbender, Jamie Bell', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNjU0Mjc0NzU3NF5BMl5BanBnXkFtZTcwMTU4OTkwNA@@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1229822/', 0, 0, 1, '2026-02-21 18:18:42.662', '2026-02-21 18:18:42.662', NULL, 'tt1229822', 0, NULL, 'OK', NULL, NULL),
(363, 'Rango', 'Rango', 'rango', 'Rango is an ordinary chameleon who accidentally winds up in the town of Dirt, a lawless outpost in the Wild West in desperate need of a new sheriff.', 2011, 107, 'Gore Verbinski', 'Johnny Depp, Isla Fisher, Timothy Olyphant', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTc4NjEyODE1OV5BMl5BanBnXkFtZTcwMjYzNTkxNA@@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1192628/', 0, 0, 1, '2026-02-21 18:18:45.612', '2026-02-21 18:18:45.612', NULL, 'tt1192628', 0, NULL, 'OK', NULL, NULL),
(364, 'The Descendants', 'The Descendants', 'the-descendants', 'A land baron tries to reconnect with his two daughters after his wife is seriously injured in a boating accident.', 2011, 115, 'Alexander Payne', 'George Clooney, Shailene Woodley, Amara Miller', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjAyNTA1MTcyN15BMl5BanBnXkFtZTcwNjEyODczNQ@@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1033575/', 0, 0, 1, '2026-02-21 18:18:48.558', '2026-02-21 18:18:48.558', NULL, 'tt1033575', 0, NULL, 'OK', NULL, NULL),
(365, 'Kung Fu Panda 2', 'Kung Fu Panda 2', 'kung-fu-panda-2', 'Po and his friends fight to stop a peacock villain from conquering China with a deadly new weapon, but first the Dragon Warrior must come to terms with his past.', 2011, 90, 'Jennifer Yuh Nelson', 'Jack Black, Angelina Jolie, Jackie Chan', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BYmIxMGYzMTUtZDQzYy00ODc4LWE1YzQtZGMwYTc0YTYyYTE0XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1302011/', 0, 0, 1, '2026-02-21 18:18:51.752', '2026-02-21 18:18:56.513', NULL, 'tt1302011', 0, NULL, 'OK', NULL, 9),
(366, 'Take Shelter', 'Take Shelter', 'take-shelter', 'Frightening visions convince an Ohio man that disaster looms on the horizon.', 2011, 120, 'Jeff Nichols', 'Michael Shannon, Jessica Chastain, Shea Whigham', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNzgzODA5MTU3MF5BMl5BanBnXkFtZTcwODY4MDEwNg@@._V1_.jpg', NULL, 1, 7.3, 'https://www.imdb.com/title/tt1675192/', 0, 0, 1, '2026-02-21 18:18:57.863', '2026-02-21 18:18:57.863', NULL, 'tt1675192', 0, NULL, 'OK', NULL, NULL),
(367, 'Shame', 'Shame', 'shame', 'A nymphomaniac&apos;s carefully cultivated private life falls apart after his sister arrives for an indefinite stay.', 2026, 101, 'Steve McQueen', 'Michael Fassbender, Carey Mulligan, James Badge Dale', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BM2I4YjYzYmQtNGM4Yy00NmYwLWEzYjUtMDBmNjYzZmViZWE3XkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt1723811/', 0, 0, 1, '2026-02-21 18:19:00.093', '2026-02-21 18:19:00.093', NULL, 'tt1723811', 0, NULL, 'OK', NULL, NULL),
(368, 'War Horse', 'War Horse', 'war-horse', 'A young farm boy enlists to serve in World War I after his beloved horse is sold to the cavalry. His hopeful journey takes him out of England and onto the front lines as the war rages on.', 2011, 146, 'Steven Spielberg', 'Jeremy Irvine, Emily Watson, David Thewlis', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjExNzkxOTYyNl5BMl5BanBnXkFtZTcwODA0MjU4Ng@@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt1568911/', 0, 0, 1, '2026-02-21 18:19:04.835', '2026-02-21 18:19:04.835', NULL, 'tt1568911', 0, NULL, 'OK', NULL, NULL),
(369, 'The Best Exotic Marigold Hotel', 'The Best Exotic Marigold Hotel', 'the-best-exotic-marigold-hotel', 'British retirees travel to India to take up residence in what they believe is a newly restored hotel. Less luxurious than advertised, the Marigold Hotel nevertheless slowly begins to charm in unexpected ways.', 2012, 124, 'John Madden', 'Judi Dench, Bill Nighy, Maggie Smith', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjIwNjkwMDI2NV5BMl5BanBnXkFtZTcwNDc1ODIyNw@@._V1_.jpg', NULL, 1, 7.2, 'https://www.imdb.com/title/tt1412386/', 0, 0, 1, '2026-02-21 18:19:06.342', '2026-02-21 18:19:06.342', NULL, 'tt1412386', 0, NULL, 'OK', NULL, NULL),
(370, 'Margin Call', 'Margin Call', 'margin-call', 'Follows the key people at an investment bank over a 24-hour period during the early stages of the 2008 financial crisis.', 2011, 107, 'J.C. Chandor', 'Zachary Quinto, Stanley Tucci, Kevin Spacey', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjE5NzkyNDI2Nl5BMl5BanBnXkFtZTcwMTYzNDc2Ng@@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt1615147/', 0, 0, 1, '2026-02-21 18:19:09.727', '2026-02-21 18:19:09.727', NULL, 'tt1615147', 0, NULL, 'OK', NULL, NULL),
(371, 'Real Steel', 'Real Steel', 'real-steel', 'In a near future where robot boxing is a top sport, a struggling ex-boxer feels he&apos;s found a champion in a discarded robot.', 2011, 127, 'Shawn Levy', 'Hugh Jackman, Evangeline Lilly, Dakota Goyo', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMjEzMzEzNjg0N15BMl5BanBnXkFtZTcwMzg4NDk0Ng@@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt0433035/', 0, 0, 1, '2026-02-21 18:19:12.370', '2026-02-21 18:19:12.370', NULL, 'tt0433035', 0, NULL, 'OK', NULL, NULL),
(372, 'Melancholia', 'Melancholia', 'melancholia', 'Two sisters find their already strained relationship challenged as a mysterious new planet threatens to collide with Earth.', 2011, 135, 'Lars von Trier', 'Kirsten Dunst, Charlotte Gainsbourg, Kiefer Sutherland', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BMTk4NjM0MjI3MV5BMl5BanBnXkFtZTcwNjcxMDYzNg@@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt1527186/', 0, 0, 1, '2026-02-21 18:19:15.743', '2026-02-21 18:19:15.743', NULL, 'tt1527186', 0, NULL, 'OK', NULL, NULL),
(373, 'God Bless America', 'God Bless America', 'god-bless-america', 'On a mission to rid society of its most repellent citizens, terminally ill Frank makes an unlikely accomplice in 16-year-old Roxy.', 2012, 105, 'Bobcat Goldthwait', 'Joel Murray, Tara Lynne Barr, Mackenzie Brooke Smith', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BN2ZkYjU5ZjAtNTRjZS00MzUwLWJmMzctZDdhNDBiMWI2ZWRiXkEyXkFqcGc@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt1912398/', 0, 0, 1, '2026-02-21 18:19:18.278', '2026-02-21 18:19:18.278', NULL, 'tt1912398', 0, NULL, 'OK', NULL, NULL),
(374, 'The Ides of March', 'The Ides of March', 'the-ides-of-march', 'A campaign press secretary becomes involved in a scandal that threatens his candidate&apos;s election chances.', 2011, 101, 'George Clooney', 'Paul Giamatti, George Clooney, Philip Seymour Hoffman', NULL, NULL, 'https://m.media-amazon.com/images/M/MV5BNTU4MjkzNTY0OF5BMl5BanBnXkFtZTcwNDI5ODIxNg@@._V1_.jpg', NULL, 1, 7.1, 'https://www.imdb.com/title/tt1124035/', 0, 0, 1, '2026-02-21 18:19:21.997', '2026-02-21 18:19:21.997', NULL, 'tt1124035', 0, NULL, 'OK', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `moviecategory`
--

CREATE TABLE `moviecategory` (
  `movieId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `moviecategory`
--

INSERT INTO `moviecategory` (`movieId`, `categoryId`) VALUES
(71, 1),
(71, 3),
(71, 5),
(72, 1),
(72, 7),
(72, 17),
(73, 1),
(73, 6),
(73, 21),
(74, 1),
(74, 7),
(74, 17),
(75, 1),
(75, 7),
(76, 1),
(76, 6),
(76, 17),
(77, 1),
(77, 7),
(77, 17),
(78, 1),
(78, 3),
(78, 4),
(79, 1),
(79, 2),
(79, 17),
(80, 1),
(80, 6),
(80, 17),
(81, 1),
(81, 2),
(81, 5),
(82, 1),
(82, 3),
(82, 5),
(83, 1),
(83, 7),
(83, 17),
(84, 1),
(84, 7),
(84, 17),
(85, 1),
(85, 5),
(85, 6),
(86, 1),
(86, 3),
(86, 6),
(87, 1),
(87, 2),
(87, 5),
(88, 1),
(88, 3),
(88, 7),
(89, 1),
(89, 5),
(89, 16),
(90, 1),
(90, 5),
(90, 6),
(91, 1),
(91, 5),
(91, 16),
(92, 2),
(92, 5),
(92, 8),
(93, 2),
(93, 5),
(93, 8),
(94, 1),
(94, 5),
(94, 7),
(95, 1),
(95, 5),
(95, 16),
(96, 2),
(96, 5),
(96, 17),
(97, 2),
(97, 5),
(97, 8),
(98, 1),
(98, 5),
(98, 8),
(99, 1),
(99, 2),
(99, 5),
(100, 1),
(100, 5),
(100, 8),
(101, 1),
(101, 2),
(101, 5),
(102, 2),
(102, 5),
(102, 16),
(103, 3),
(103, 5),
(103, 6),
(104, 1),
(104, 5),
(104, 6),
(105, 1),
(105, 3),
(105, 5),
(106, 5),
(106, 6),
(106, 16),
(107, 1),
(107, 2),
(107, 5),
(108, 1),
(108, 5),
(108, 7),
(109, 1),
(109, 5),
(109, 17),
(110, 1),
(110, 5),
(110, 16),
(111, 1),
(111, 5),
(111, 16),
(112, 1),
(112, 5),
(112, 17),
(113, 1),
(113, 5),
(113, 17),
(114, 1),
(114, 4),
(114, 5),
(115, 1),
(115, 5),
(115, 6),
(116, 1),
(116, 5),
(116, 7),
(117, 3),
(117, 5),
(117, 7),
(118, 2),
(118, 5),
(118, 8),
(119, 6),
(119, 8),
(119, 18),
(120, 2),
(120, 5),
(120, 8),
(121, 1),
(121, 5),
(121, 8),
(122, 1),
(122, 5),
(122, 8),
(123, 2),
(123, 8),
(123, 18),
(124, 2),
(124, 5),
(124, 8),
(125, 2),
(125, 6),
(125, 8),
(126, 2),
(126, 5),
(126, 8),
(127, 1),
(127, 5),
(127, 8),
(128, 2),
(128, 5),
(128, 8),
(129, 2),
(129, 5),
(129, 8),
(130, 6),
(130, 19),
(130, 22),
(131, 6),
(131, 18),
(131, 19),
(132, 1),
(132, 17),
(132, 19),
(133, 6),
(133, 7),
(133, 19),
(134, 6),
(134, 19),
(135, 2),
(135, 17),
(135, 19),
(136, 1),
(136, 17),
(136, 19),
(137, 6),
(137, 19),
(137, 23),
(138, 6),
(138, 19),
(138, 23),
(139, 6),
(139, 19),
(140, 2),
(140, 5),
(140, 8),
(141, 1),
(141, 2),
(141, 20),
(142, 2),
(143, 2),
(143, 6),
(144, 2),
(144, 6),
(144, 23),
(145, 2),
(145, 5),
(145, 6),
(146, 2),
(147, 2),
(147, 5),
(147, 8),
(148, 2),
(148, 5),
(148, 6),
(149, 2),
(149, 5),
(149, 8),
(150, 2),
(150, 6),
(150, 23),
(151, 1),
(151, 2),
(151, 4),
(152, 2),
(152, 6),
(152, 19),
(153, 2),
(153, 23),
(154, 2),
(154, 5),
(154, 8),
(155, 2),
(155, 6),
(155, 23),
(156, 2),
(156, 6),
(156, 24),
(157, 2),
(157, 5),
(157, 8),
(158, 2),
(158, 4),
(159, 1),
(159, 2),
(159, 7),
(160, 2),
(160, 23),
(160, 25),
(161, 2),
(161, 18),
(162, 2),
(162, 22),
(163, 1),
(163, 2),
(163, 17),
(164, 2),
(164, 18),
(164, 22),
(165, 2),
(165, 5),
(165, 8),
(166, 2),
(166, 5),
(166, 8),
(167, 2),
(167, 23),
(168, 2),
(168, 23),
(169, 1),
(169, 2),
(169, 5),
(170, 2),
(170, 16),
(170, 18),
(171, 2),
(171, 5),
(171, 8),
(172, 2),
(172, 5),
(172, 16),
(173, 1),
(173, 7),
(173, 17),
(174, 6),
(174, 17),
(174, 20),
(175, 6),
(175, 17),
(176, 6),
(176, 17),
(176, 20),
(177, 1),
(177, 6),
(177, 15),
(178, 1),
(178, 6),
(178, 21),
(179, 1),
(179, 7),
(179, 17),
(180, 1),
(180, 5),
(180, 6),
(181, 1),
(181, 6),
(181, 17),
(182, 1),
(182, 5),
(182, 8),
(183, 1),
(183, 2),
(183, 5),
(184, 1),
(184, 3),
(184, 5),
(185, 1),
(185, 7),
(185, 21),
(186, 1),
(186, 3),
(186, 5),
(187, 1),
(187, 2),
(187, 5),
(188, 1),
(188, 2),
(188, 6),
(189, 1),
(189, 2),
(189, 21),
(190, 1),
(190, 6),
(190, 17),
(191, 1),
(191, 5),
(191, 6),
(192, 1),
(192, 7),
(192, 17),
(193, 1),
(193, 7),
(194, 1),
(194, 5),
(194, 6),
(195, 1),
(195, 5),
(195, 7),
(196, 1),
(196, 2),
(196, 17),
(197, 1),
(197, 2),
(197, 5),
(198, 1),
(198, 7),
(198, 17),
(199, 1),
(199, 2),
(199, 17),
(200, 1),
(200, 7),
(200, 17),
(201, 1),
(201, 5),
(201, 8),
(202, 1),
(202, 6),
(202, 7),
(203, 1),
(203, 2),
(203, 5),
(204, 1),
(204, 6),
(205, 1),
(205, 5),
(205, 16),
(206, 1),
(206, 6),
(206, 17),
(207, 1),
(207, 4),
(207, 16),
(208, 1),
(208, 5),
(208, 16),
(209, 1),
(209, 2),
(209, 7),
(210, 1),
(210, 2),
(210, 17),
(211, 1),
(211, 5),
(211, 6),
(212, 1),
(212, 5),
(212, 7),
(213, 1),
(213, 2),
(213, 7),
(214, 1),
(214, 5),
(214, 6),
(215, 1),
(215, 2),
(215, 5),
(216, 1),
(216, 6),
(216, 17),
(217, 1),
(217, 7),
(218, 1),
(218, 3),
(218, 5),
(219, 2),
(219, 5),
(219, 8),
(220, 2),
(220, 5),
(220, 6),
(221, 5),
(221, 6),
(221, 26),
(222, 3),
(222, 5),
(222, 6),
(223, 1),
(223, 3),
(223, 5),
(224, 2),
(224, 5),
(224, 8),
(225, 1),
(225, 5),
(225, 7),
(226, 2),
(226, 5),
(226, 19),
(227, 1),
(227, 3),
(227, 5),
(228, 5),
(228, 6),
(228, 19),
(229, 1),
(229, 2),
(229, 5),
(230, 2),
(230, 5),
(230, 17),
(231, 5),
(231, 6),
(231, 19),
(232, 2),
(232, 5),
(232, 8),
(233, 1),
(233, 3),
(233, 5),
(234, 5),
(234, 6),
(234, 18),
(235, 1),
(235, 5),
(235, 19),
(236, 1),
(236, 5),
(236, 7),
(237, 1),
(237, 3),
(237, 5),
(238, 1),
(238, 5),
(238, 8),
(239, 1),
(239, 3),
(239, 5),
(240, 2),
(240, 5),
(240, 8),
(241, 2),
(241, 5),
(241, 8),
(242, 2),
(242, 5),
(242, 8),
(243, 1),
(243, 5),
(243, 18),
(244, 1),
(244, 3),
(244, 5),
(245, 1),
(245, 3),
(245, 5),
(246, 2),
(246, 5),
(246, 18),
(247, 2),
(247, 5),
(248, 1),
(248, 5),
(248, 23),
(249, 2),
(249, 5),
(249, 6),
(250, 1),
(250, 5),
(250, 7),
(251, 2),
(251, 5),
(251, 8),
(252, 1),
(252, 5),
(252, 16),
(253, 1),
(253, 5),
(253, 17),
(254, 1),
(254, 2),
(254, 5),
(255, 1),
(255, 2),
(255, 5),
(256, 1),
(256, 2),
(256, 5),
(257, 1),
(257, 5),
(257, 8),
(258, 1),
(258, 5),
(258, 17),
(259, 1),
(259, 2),
(259, 5),
(260, 1),
(260, 3),
(260, 5),
(261, 2),
(261, 5),
(261, 8),
(262, 1),
(262, 5),
(262, 8),
(263, 2),
(263, 5),
(263, 8),
(264, 2),
(264, 5),
(264, 8),
(265, 5),
(265, 6),
(265, 8),
(266, 1),
(266, 5),
(266, 8),
(267, 1),
(267, 5),
(267, 8),
(268, 2),
(268, 5),
(268, 8),
(269, 6),
(269, 17),
(269, 19),
(270, 2),
(270, 6),
(270, 19),
(271, 6),
(271, 15),
(271, 19),
(272, 19),
(272, 25),
(272, 27),
(273, 6),
(273, 19),
(274, 6),
(274, 15),
(274, 19),
(275, 6),
(275, 19),
(276, 6),
(276, 19),
(277, 6),
(277, 19),
(278, 6),
(278, 19),
(278, 22),
(279, 1),
(279, 17),
(279, 19),
(280, 6),
(280, 15),
(280, 19),
(281, 6),
(281, 17),
(281, 19),
(282, 6),
(282, 17),
(282, 19),
(283, 6),
(283, 19),
(284, 6),
(284, 17),
(284, 19),
(285, 2),
(285, 6),
(285, 25),
(286, 1),
(286, 5),
(286, 8),
(287, 1),
(287, 2),
(287, 3),
(288, 2),
(288, 6),
(288, 25),
(289, 2),
(289, 5),
(289, 6),
(290, 2),
(290, 5),
(290, 6),
(291, 2),
(291, 6),
(291, 7),
(292, 2),
(292, 5),
(292, 8),
(293, 1),
(293, 2),
(293, 17),
(294, 2),
(294, 6),
(294, 23),
(295, 2),
(295, 6),
(295, 23),
(296, 2),
(296, 6),
(297, 2),
(297, 6),
(298, 2),
(298, 6),
(299, 2),
(299, 5),
(299, 8),
(300, 2),
(300, 17),
(300, 19),
(301, 2),
(301, 8),
(301, 18),
(302, 1),
(302, 5),
(302, 8),
(303, 2),
(303, 6),
(303, 16),
(304, 2),
(305, 1),
(305, 2),
(305, 16),
(306, 2),
(306, 5),
(306, 8),
(307, 2),
(307, 6),
(307, 19),
(308, 2),
(308, 6),
(308, 25),
(309, 1),
(309, 2),
(309, 5),
(310, 2),
(310, 6),
(310, 19),
(311, 2),
(311, 6),
(311, 23),
(312, 2),
(312, 5),
(312, 8),
(313, 2),
(313, 4),
(313, 7),
(314, 1),
(314, 2),
(314, 5),
(315, 2),
(315, 5),
(315, 8),
(316, 2),
(316, 6),
(316, 23),
(317, 1),
(317, 2),
(317, 17),
(318, 1),
(318, 2),
(318, 17),
(319, 1),
(319, 5),
(319, 8),
(320, 2),
(320, 6),
(320, 20),
(321, 2),
(321, 6),
(321, 16),
(322, 2),
(323, 1),
(323, 2),
(323, 5),
(324, 2),
(325, 1),
(325, 2),
(325, 17),
(326, 2),
(326, 6),
(326, 23),
(327, 2),
(327, 5),
(327, 8),
(328, 2),
(328, 23),
(329, 1),
(329, 5),
(329, 8),
(330, 2),
(331, 1),
(331, 2),
(332, 2),
(333, 1),
(333, 2),
(333, 17),
(334, 2),
(334, 17),
(334, 19),
(335, 7),
(335, 17),
(336, 2),
(336, 17),
(337, 6),
(337, 17),
(337, 20),
(338, 1),
(338, 16),
(338, 17),
(339, 2),
(339, 5),
(339, 17),
(340, 1),
(340, 7),
(340, 17),
(341, 2),
(341, 6),
(342, 6),
(343, 2),
(343, 6),
(343, 24),
(344, 6),
(345, 1),
(345, 6),
(345, 22),
(346, 1),
(346, 6),
(347, 6),
(347, 17),
(347, 20),
(348, 2),
(348, 6),
(348, 23),
(349, 6),
(349, 7),
(349, 17),
(350, 6),
(350, 23),
(350, 25),
(351, 6),
(352, 6),
(352, 7),
(352, 20),
(353, 1),
(353, 3),
(353, 6),
(354, 2),
(354, 6),
(354, 23),
(355, 1),
(355, 6),
(355, 20),
(356, 5),
(356, 6),
(356, 18),
(357, 6),
(357, 15),
(357, 23),
(358, 2),
(358, 6),
(358, 23),
(359, 6),
(359, 7),
(359, 20),
(360, 2),
(360, 6),
(360, 8),
(361, 6),
(361, 17),
(361, 20),
(362, 6),
(362, 20),
(362, 23),
(363, 1),
(363, 5),
(363, 8),
(364, 2),
(364, 6),
(365, 1),
(365, 5),
(365, 8),
(366, 6),
(366, 7),
(367, 6),
(368, 5),
(368, 6),
(368, 15),
(369, 2),
(369, 6),
(369, 23),
(370, 6),
(370, 7),
(371, 1),
(371, 3),
(371, 6),
(372, 3),
(372, 6),
(373, 2),
(373, 6),
(373, 17),
(374, 6),
(374, 7);

-- --------------------------------------------------------

--
-- Table structure for table `movie_fix_log`
--

CREATE TABLE `movie_fix_log` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movie_fix_log`
--

INSERT INTO `movie_fix_log` (`id`, `movieId`, `action`, `notes`, `createdAt`) VALUES
(1, 97, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:51:31.032'),
(2, 99, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:51:48.851'),
(3, 100, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:51:58.687'),
(4, 101, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:52:06.994'),
(5, 102, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:52:16.409'),
(6, 103, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:52:25.290'),
(7, 104, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:52:34.649'),
(8, 105, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:52:42.648'),
(9, 106, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:52:51.668'),
(10, 107, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:00.063'),
(11, 108, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:08.174'),
(12, 109, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:17.613'),
(13, 111, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:30.357'),
(14, 112, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:38.050'),
(15, 113, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:47.057'),
(16, 114, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:53:56.486'),
(17, 115, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:04.987'),
(18, 116, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:13.175'),
(19, 117, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:22.973'),
(20, 118, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:31.345'),
(21, 116, 'rejected', 'No servers found', '2026-02-19 13:54:37.896'),
(22, 119, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:42.893'),
(23, 120, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:52.333'),
(24, 121, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:54:59.912'),
(25, 122, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:55:09.047'),
(26, 123, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:55:17.432'),
(27, 124, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:55:25.388'),
(28, 125, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:55:34.541'),
(29, 126, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:55:43.042'),
(30, 127, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:55:51.180'),
(31, 128, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:00.132'),
(32, 129, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:09.647'),
(33, 130, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:17.922'),
(34, 131, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:25.587'),
(35, 132, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:34.410'),
(36, 133, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:42.714'),
(37, 134, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:51.166'),
(38, 135, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:56:59.185'),
(39, 136, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:57:08.703'),
(40, 137, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:57:17.780'),
(41, 138, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:57:26.842'),
(42, 139, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:57:36.475'),
(43, 140, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:57:47.174'),
(44, 141, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:57:55.144'),
(45, 142, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:04.017'),
(46, 143, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:12.044'),
(47, 144, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:21.580'),
(48, 145, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:29.448'),
(49, 146, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:38.205'),
(50, 147, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:46.136'),
(51, 148, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:58:55.245'),
(52, 149, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:04.050'),
(53, 150, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:12.581'),
(54, 151, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:21.141'),
(55, 152, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:28.711'),
(56, 153, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:37.917'),
(57, 154, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:46.168'),
(58, 155, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 13:59:53.980'),
(59, 156, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:02.521'),
(60, 157, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:13.320'),
(61, 158, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:20.961'),
(62, 159, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:28.488'),
(63, 160, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:38.034'),
(64, 161, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:46.572'),
(65, 162, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:00:55.643'),
(66, 163, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:01:05.165'),
(67, 164, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:01:14.017'),
(68, 165, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:01:22.841'),
(69, 166, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:01:32.905'),
(70, 167, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:01:42.331'),
(71, 168, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:01:52.008'),
(72, 169, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:01.634'),
(73, 170, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:10.516'),
(74, 171, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:20.023'),
(75, 172, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:27.714'),
(76, 173, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:37.219'),
(77, 174, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:45.993'),
(78, 175, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:02:54.519'),
(79, 177, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:07:37.405'),
(80, 178, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:07:41.191'),
(81, 179, 'archived', 'Invalid vidsrc detected during import', '2026-02-19 14:07:45.468'),
(82, 354, 'archived', 'Invalid vidsrc detected during import', '2026-02-21 18:18:20.307'),
(83, 355, 'archived', 'Invalid vidsrc detected during import', '2026-02-21 18:18:23.284'),
(84, 356, 'archived', 'Invalid vidsrc detected during import', '2026-02-21 18:18:26.350'),
(85, 357, 'archived', 'Invalid vidsrc detected during import', '2026-02-21 18:18:29.298'),
(86, 356, 'published', 'Validation was false negative during import', '2026-02-21 18:46:16.021'),
(87, 355, 'published', 'Validation was false negative during import', '2026-02-21 18:46:16.031'),
(88, 354, 'published', 'Validation was false negative during import', '2026-02-21 18:46:16.039'),
(89, 357, 'published', 'Validation was false negative during import', '2026-02-21 18:46:16.047');

-- --------------------------------------------------------

--
-- Table structure for table `popcorn_transaction`
--

CREATE TABLE `popcorn_transaction` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `targetName` varchar(255) DEFAULT NULL,
  `metadata` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `popcorn_transaction`
--

INSERT INTO `popcorn_transaction` (`id`, `userId`, `type`, `amount`, `targetName`, `metadata`, `createdAt`) VALUES
(1, 1, 'GIFT_SENT', -10, 'test', '{\"giftType\":\"Роза 🌹\"}', '2026-02-21 12:39:03.478'),
(2, 2, 'GIFT_RECEIVED', 6, 'Admin User', '{\"giftType\":\"Роза 🌹\",\"originalAmount\":10}', '2026-02-21 12:39:03.480'),
(3, 1, 'GIFT_SENT', -50, 'test', '{\"giftType\":\"Пуканки 🍿\"}', '2026-02-21 12:39:15.161'),
(4, 2, 'GIFT_RECEIVED', 30, 'Admin User', '{\"giftType\":\"Пуканки 🍿\",\"originalAmount\":50}', '2026-02-21 12:39:15.164'),
(5, 1, 'GIFT_SENT', -15, 'test', '{\"giftType\":\"Сърце ❤️\"}', '2026-02-21 12:54:30.692'),
(6, 2, 'GIFT_RECEIVED', 9, 'Admin User', '{\"giftType\":\"Сърце ❤️\",\"originalAmount\":15}', '2026-02-21 12:54:30.696'),
(7, 2, 'GIFT_SENT', -10, 'Admin User', '{\"giftType\":\"Роза 🌹\"}', '2026-02-21 12:54:57.483'),
(8, 1, 'GIFT_RECEIVED', 6, 'test', '{\"giftType\":\"Роза 🌹\",\"originalAmount\":10}', '2026-02-21 12:54:57.485'),
(9, 1, 'GIFT_SENT', -10, 'test', '{\"giftType\":\"Роза 🌹\"}', '2026-02-21 13:02:56.874'),
(10, 2, 'GIFT_RECEIVED', 6, 'Admin User', '{\"giftType\":\"Роза 🌹\",\"originalAmount\":10}', '2026-02-21 13:02:56.876'),
(11, 1, 'GIFT_SENT', -50, 'test', '{\"giftType\":\"Пуканки 🍿\"}', '2026-02-21 13:03:06.529'),
(12, 2, 'GIFT_RECEIVED', 30, 'Admin User', '{\"giftType\":\"Пуканки 🍿\",\"originalAmount\":50}', '2026-02-21 13:03:06.609'),
(13, 1, 'GIFT_SENT', -10, 'test', '{\"giftType\":\"Роза 🌹\"}', '2026-02-21 13:05:44.001'),
(14, 2, 'GIFT_RECEIVED', 6, 'Admin User', '{\"giftType\":\"Роза 🌹\",\"originalAmount\":10}', '2026-02-21 13:05:44.003'),
(15, 1, 'GIFT_SENT', -1000, 'test', '{\"giftType\":\"Шоколад 🍫\"}', '2026-02-21 17:29:12.918'),
(16, 2, 'GIFT_RECEIVED', 600, 'Admin User', '{\"giftType\":\"Шоколад 🍫\",\"originalAmount\":1000}', '2026-02-21 17:29:12.922'),
(17, 1, 'GIFT_SENT', -5000, 'test', '{\"giftType\":\"Пръстен 💍\"}', '2026-02-21 17:29:34.924'),
(18, 2, 'GIFT_RECEIVED', 3000, 'Admin User', '{\"giftType\":\"Пръстен 💍\",\"originalAmount\":5000}', '2026-02-21 17:29:34.928'),
(19, 1, 'GIFT_SENT', -100, 'test', '{\"giftType\":\"Popcorn 🍿\"}', '2026-02-21 22:58:05.947'),
(20, 2, 'GIFT_RECEIVED', 60, 'Admin User', '{\"giftType\":\"Popcorn 🍿\",\"originalAmount\":100}', '2026-02-21 22:58:05.955'),
(21, 1, 'GIFT_SENT', -1000, 'test', '{\"giftType\":\"Chocolate 🍫\"}', '2026-02-21 22:58:16.365'),
(22, 2, 'GIFT_RECEIVED', 600, 'Admin User', '{\"giftType\":\"Chocolate 🍫\",\"originalAmount\":1000}', '2026-02-21 22:58:16.367');

-- --------------------------------------------------------

--
-- Table structure for table `scraperjob`
--

CREATE TABLE `scraperjob` (
  `id` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `progress` longtext DEFAULT NULL,
  `startedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scraperjob`
--

INSERT INTO `scraperjob` (`id`, `type`, `status`, `progress`, `startedAt`, `updatedAt`) VALUES
('92e92fde-b0ac-4f38-a71f-5f334b34d92a', 'MAINTENANCE', 'STOPPED', '{\"checked\":2,\"broken\":0,\"fixed\":0,\"unpublished\":0}', '2026-02-21 19:14:59.981', '2026-02-21 19:15:20.441'),
('cc8f9903-68b2-46ed-b7ba-a80092446008', 'MAINTENANCE', 'STOPPED', '{\"checked\":2,\"broken\":0,\"fixed\":0,\"unpublished\":0}', '2026-02-21 19:11:58.001', '2026-02-21 19:12:18.619'),
('imdb-1771504994580', 'import', 'stopped', '{\"total\":69,\"processed\":68,\"success\":0,\"failed\":68,\"skipped\":0,\"noStream\":0,\"current\":\"Processing: Inside Out\",\"state\":{\"genreIndex\":5,\"pagesProcessed\":5}}', '2026-02-19 12:43:14.580', '2026-02-19 12:47:45.092'),
('imdb-1771505543545', 'import', 'stopped', '{\"total\":3,\"processed\":2,\"success\":2,\"failed\":0,\"skipped\":0,\"noStream\":0,\"current\":\"Processing: 1917\",\"state\":{\"genreIndex\":1,\"pagesProcessed\":1}}', '2026-02-19 12:52:23.545', '2026-02-19 12:52:40.089'),
('imdb-1771508985133', 'import', 'stopped', '{\"total\":103,\"processed\":102,\"success\":102,\"failed\":0,\"skipped\":0,\"noStream\":77,\"current\":\"Processing: Mystic River\",\"state\":{\"genreIndex\":6,\"pagesProcessed\":6}}', '2026-02-19 13:49:45.133', '2026-02-19 14:07:21.634'),
('imdb-1771510051138', 'import', 'stopped', '{\"total\":3,\"processed\":2,\"success\":2,\"failed\":0,\"skipped\":0,\"noStream\":2,\"current\":\"Processing: Spy Game\",\"state\":{\"genreIndex\":1,\"pagesProcessed\":1}}', '2026-02-19 14:07:31.138', '2026-02-19 14:07:47.377'),
('imdb-1771697371704', 'import', 'stopped', '{\"total\":196,\"processed\":195,\"success\":194,\"failed\":0,\"skipped\":1,\"noStream\":4,\"current\":\"Processing: The Ides of March\",\"state\":{\"genreIndex\":7,\"pagesProcessed\":7}}', '2026-02-21 18:09:31.704', '2026-02-21 18:19:21.243');

-- --------------------------------------------------------

--
-- Table structure for table `scraperlog`
--

CREATE TABLE `scraperlog` (
  `id` int(11) NOT NULL,
  `jobId` varchar(100) NOT NULL,
  `level` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `metadata` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scraperlog`
--

INSERT INTO `scraperlog` (`id`, `jobId`, `level`, `message`, `metadata`, `createdAt`) VALUES
(179, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt15239678\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:33.401'),
(180, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt26548265\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTFlMTIxOGItZTk0Zi00MTk2LWJiM2UtMzlhZWYzNjQ4N2Y3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:35.086'),
(181, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt8864596\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZWJkM2FlYTktNzYxYy00MGY2LWE0MGMtMzQ3NWQwODZhZTcyXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:38.064'),
(182, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt6263850\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:40.975'),
(183, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt12037194\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:43.985'),
(184, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt17279496\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYTkzMjc0YzgtY2E0Yi00NDBlLWI0MWUtODY1ZjExMDAyOWZiXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:46.999'),
(185, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt12735488\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:50.012'),
(186, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt18259086\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYzRmYmY1ZmUtMDg2ZS00MTYyLWExZTAtZTNmOGE3MmY5MTczXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:53.172'),
(187, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1684562\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BM2U0MTJiYTItMjNiZS00MzU4LTkxYTAtYTU0ZGY1ODJhMjRhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:56.094'),
(188, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt5177120\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYmIxODc5ZjMtYzZmZS00OTE5LThkZDktNWNmODNiZjFhMDgyXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:09:59.231'),
(189, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt11301886\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYTE4ZDE5ZTktZWZkMC00MGY4LWFkZDUtZTc5YWU3NzM2YmM3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:03.659'),
(190, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt11389872\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZDRlZTc3YTItOTk3Yi00NmU4LWFiOGUtNjgwMDZjNjIzNTU1XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:05.607'),
(191, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt9214772\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODM2ZmZjYmQtNTA3NC00MmYzLWEwOTItMDNjYzc3MzI1NWNmXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:08.592'),
(192, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt19864802\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOWI2YjMwMGEtZDJlZC00NGVkLTk2OTktMjhjNTZiNTIxOTg3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:11.615'),
(193, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt9218128\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMWYzZTM5ZGQtOGE5My00NmM2LWFlMDEtMGNjYjdmOWM1MzA1XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:14.684'),
(194, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt12584954\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjM4MWEwMTEtNTcwYi00ZDI4LWEwMzUtNDMzODBhZmI5MWE1XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:17.658'),
(195, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt27489557\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNmUxMDRiNjQtYjE0NS00OWZkLTlhZjktYjQ1MmNjNDlhNDdkXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:20.732'),
(196, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4919268\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZWNjZWUwNDgtYTM4ZC00Zjk0LTg3ZWItNGEyZmVkZTIxZDk0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:23.768'),
(197, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt21382296\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTNkMjQzNmQtNzE4ZC00NDlmLTkyYjAtZDZkYTQ5NjBmYThlXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:26.665'),
(198, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3083016\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMDVhYWNkNTUtZWVjMC00Y2M1LWEzNmItZjFiMzA4ZjNiODI4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:29.679'),
(199, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt15314262\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzg3YjVmZGYtOTc5MC00MDdiLTllOTYtZWQ0ODQ1MmMyNTExXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:32.714'),
(200, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt21692408\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzJlNGYxYzQtOTg4MC00OTMyLTkwYzMtZDRlNTgwY2YwOWYxXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:35.678'),
(201, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3359350\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODVkYjlkM2UtNWVlMS00N2U1LTgxOTYtODlmNmE1YTgzMjczXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:38.657'),
(202, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt14948432\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZmFkMjE4NjQtZTVmZS00MDZjLWE2ZmEtZTkzODljNjhlNWUxXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:41.663'),
(203, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt13818368\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZjdkNDRjNzEtZDY1MS00ZDZkLWJjYzAtZWM0MzEwMjdmY2MxXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:44.674'),
(204, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt13452446\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZTAzODc1ZjUtNGQwZS00YTc2LTliNzQtMDdlNzllNmU5Yzk4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:47.683'),
(205, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt16539454\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDM3N2UzM2UtMjEwMC00NGUzLThmMmQtNGMyM2VmMDA0ZWEwXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:50.684'),
(206, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt16366836\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:53.700'),
(207, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt14539740\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTY0N2MzODctY2ExYy00OWYxLTkyNDItMTVhZGIxZjliZjU5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:57.241'),
(208, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt15009428\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDkzMTU2OWUtZjA2ZS00ZmYxLWE2MzgtZDlhZDc1YjM4Yjk5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:10:59.749'),
(209, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt14371878\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOWRkYmNiNDUtYTY0OC00YTZlLTlmMTYtMTJhMTU4OTBkMDY5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:03.034'),
(210, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt14856980\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDUwNTFkNzYtMGM5NS00NTc4LWEwMDUtMmE5MzgyMjcwOWM4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:05.886'),
(211, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt8790086\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZDU0YTI5ODAtN2NmMS00YTg3LTgyNDItN2RmOWEzOTkzZjcyXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:09.303'),
(212, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt12610390\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BY2I0YmNiNmEtNWI2My00NDU5LWIwZWItNWNkNjFmYWJjNTMxXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:11.844'),
(213, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt23137904\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOGYzMDQ1ZWItNjMyYi00ZjM4LWE5YTctYTJhNTYxZDI4OTU0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:14.874'),
(214, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4978420\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMDhkMzQzZmQtOGQ1NS00Y2FhLTkzYjAtNWE1MmRiOWM1MjUzXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:17.806'),
(215, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt11976134\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjQzZDExZDEtYjAxYy00ZGVhLWE4YWItNTVkZjA5ZjVjZWM3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:20.815'),
(216, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt11057302\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODViOTZiOTQtOTc4ZC00ZjUxLWEzMjItY2ExMmNlNDliNjE4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:23.832'),
(217, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1392190\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZDRkODJhOTgtOTc1OC00NTgzLTk4NjItNDgxZDY4YjlmNDY2XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:28.856'),
(218, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2096673\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_.jpg\"}', '2026-02-21 18:11:30.190'),
(219, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3863552\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYzVjMjZiNGUtZjZiNy00Yzg4LWEzYzYtMmI1NDg5NWNiNjUwXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:33.250'),
(220, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1663202\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYTgwNmQzZDctMjNmOS00OTExLTkwM2UtNzJmOTJhODFjOTdlXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:36.127'),
(221, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3659388\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_.jpg\"}', '2026-02-21 18:11:39.097'),
(222, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2488496\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg\"}', '2026-02-21 18:11:42.157'),
(223, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1754656\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjg0OTM5OTQyNV5BMl5BanBnXkFtZTgwNDg5NDQ0NTE@._V1_.jpg\"}', '2026-02-21 18:11:45.176'),
(224, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2381249\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZjUwZjg2ZjAtY2RhZi00YmZjLTlhNGQtOWQwNDk1MjhhM2NhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:48.117'),
(225, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1083452\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTUxOTc5MTU1NF5BMl5BanBnXkFtZTgwODYyNTA1NzE@._V1_.jpg\"}', '2026-02-21 18:11:51.130'),
(226, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2395427\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODBhYTg1NGQtNGVmNS00ZTdiLThjYTYtZDFkNzRiNTZmNDZjXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:11:54.130'),
(227, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3488710\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTY4MzA4Mzc5Nl5BMl5BanBnXkFtZTgwNDIzMzk5NjE@._V1_.jpg\"}', '2026-02-21 18:11:57.248'),
(228, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1638355\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMDFjN2NlOGItYjZiZi00OThhLTlhYWUtYjgyNWFjMWJlNGU4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:12:00.303'),
(229, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3850214\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA3MjYyNTk0Nl5BMl5BanBnXkFtZTgwODc1NzQ1NTE@._V1_.jpg\"}', '2026-02-21 18:12:03.203'),
(230, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2719848\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDAzOTYxMTctY2ViNi00NDI3LTgwMGItY2FhN2JjZWE5MjRkXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:12:06.188'),
(231, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2452042\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTE5NzMxNzkwNl5BMl5BanBnXkFtZTgwOTQ0Nzk5NzE@._V1_.jpg\"}', '2026-02-21 18:12:09.255'),
(232, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0369610\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:12:12.400'),
(233, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1661199\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjMxODYyODEzN15BMl5BanBnXkFtZTgwMDk4OTU0MzE@._V1_.jpg\"}', '2026-02-21 18:12:15.302'),
(234, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1390411\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA5NzUwODExM15BMl5BanBnXkFtZTgwNjM0MzE4NjE@._V1_.jpg\"}', '2026-02-21 18:12:18.341'),
(235, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2379713\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzA5MzFiNDAtYTI0NC00MDE5LTljYTctYTNkODk1OTZlODI5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:12:21.242'),
(236, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3072482\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjIzNTcwMDc3Nl5BMl5BanBnXkFtZTgwNzU5NTY5NzE@._V1_.jpg\"}', '2026-02-21 18:12:24.327'),
(237, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1979388\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTc5MTg2NjQ4MV5BMl5BanBnXkFtZTgwNzcxOTY5NjE@._V1_.jpg\"}', '2026-02-21 18:12:27.507'),
(238, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1951266\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjQzNDI2NTU1Ml5BMl5BanBnXkFtZTgwNTAyMDQ5NjE@._V1_.jpg\"}', '2026-02-21 18:12:30.310'),
(239, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2510894\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BY2ExYWJhMDYtYjcwMy00YjA2LTk2YzQtY2FhMWYxZThiNDQzXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:12:33.319'),
(240, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2224026\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjExOTQ4MDMyMV5BMl5BanBnXkFtZTgwMTE3NDM2MzE@._V1_.jpg\"}', '2026-02-21 18:12:36.311'),
(241, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2293640\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODI4NzMyNjE0MF5BMl5BanBnXkFtZTgwMTcwNzI0MzE@._V1_.jpg\"}', '2026-02-21 18:12:39.376'),
(242, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1964418\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTQ4OTgzNTkwNF5BMl5BanBnXkFtZTgwMzI3MDE3NDE@._V1_.jpg\"}', '2026-02-21 18:12:42.326'),
(243, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1340138\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjM1NTc0NzE4OF5BMl5BanBnXkFtZTgwNDkyNjQ1NTE@._V1_.jpg\"}', '2026-02-21 18:12:45.290'),
(244, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4046784\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_.jpg\"}', '2026-02-21 18:12:48.288'),
(245, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1051904\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA1OTUzNTQ5Ml5BMl5BanBnXkFtZTgwODQ4NDkxNjE@._V1_.jpg\"}', '2026-02-21 18:12:51.296'),
(246, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1524930\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZWJmYTcwN2QtNTc4MC00YjcwLTk4YmUtOWQwM2RkMmVlYThhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:12:54.509'),
(247, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2908446\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTgxOTYxMTg3OF5BMl5BanBnXkFtZTgwMDgyMzA2NDE@._V1_.jpg\"}', '2026-02-21 18:12:57.343'),
(248, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3622592\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE2ODQxODMwOF5BMl5BanBnXkFtZTgwNDY5NjY3NDE@._V1_.jpg\"}', '2026-02-21 18:13:00.336'),
(249, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2126355\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYmQzNDEzMzMtM2U5OS00YTUzLWI2NDYtYjI2NjAyNWE5YzMzXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:13:03.437'),
(250, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2279373\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDhlMDM3ZDUtMGNhZi00ZTFmLTg1YjYtZTM3ZTE1MGIwNWFjXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:13:06.462'),
(251, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1618442\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjM5Njk5MzYzM15BMl5BanBnXkFtZTgwNzM1Mjk4NjE@._V1_.jpg\"}', '2026-02-21 18:13:09.572'),
(252, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2679042\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTBiYjg1ZGYtZjQxZS00NDBkLTgyZjEtZGIzYWNmNjhiOGRjXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:13:12.419'),
(253, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3332064\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzk2MDg5MDczMl5BMl5BanBnXkFtZTgwNTE2NjYyNjE@._V1_.jpg\"}', '2026-02-21 18:13:15.453'),
(254, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2120120\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzIyNTc1NmUtOTBlNS00YzEwLTlkZTMtZjJkMGM2YzNkYmY3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:13:18.366'),
(255, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3045616\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjM3NDcxOTM5Ml5BMl5BanBnXkFtZTgwNTEwNzE0MzE@._V1_.jpg\"}', '2026-02-21 18:13:21.429'),
(256, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1617661\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTQyNzk2MjA2NF5BMl5BanBnXkFtZTgwMjEwNzk3MjE@._V1_.jpg\"}', '2026-02-21 18:13:24.439'),
(257, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2058673\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjIxNDkzOTAyNV5BMl5BanBnXkFtZTgwNjEyOTY3NjE@._V1_.jpg\"}', '2026-02-21 18:13:27.405'),
(258, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2479478\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzM2NWQzMzAtYzdiNi00YTk0LWEyNjQtOTJkMTk4YTdlYmY2XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:13:30.400'),
(259, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1502712\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTk0OTMyMDA0OF5BMl5BanBnXkFtZTgwMzY5NTkzNTE@._V1_.jpg\"}', '2026-02-21 18:13:33.405'),
(260, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0435761\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_.jpg\"}', '2026-02-21 18:13:37.582'),
(261, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0892769\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_.jpg\"}', '2026-02-21 18:13:39.419'),
(262, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0398286\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTAxNDYxMjg0MjNeQTJeQWpwZ15BbWU3MDcyNTk2OTM@._V1_.jpg\"}', '2026-02-21 18:13:42.477'),
(263, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1323594\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTY3NjY0MTQ0Nl5BMl5BanBnXkFtZTcwMzQ2MTc0Mw@@._V1_.jpg\"}', '2026-02-21 18:13:45.447'),
(264, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1568921\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTAxNjk3OTYyODReQTJeQWpwZ15BbWU3MDgyODY2OTY@._V1_.jpg\"}', '2026-02-21 18:13:48.461'),
(265, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1001526\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTAzMzI0NTMzNDBeQTJeQWpwZ15BbWU3MDM3NTAyOTM@._V1_.jpg\"}', '2026-02-21 18:13:51.532'),
(266, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1219342\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE0NjA5OTA4N15BMl5BanBnXkFtZTcwODA3MTA3Mw@@._V1_.jpg\"}', '2026-02-21 18:13:54.462'),
(267, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0892791\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_.jpg\"}', '2026-02-21 18:13:57.470'),
(268, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1895587\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_.jpg\"}', '2026-02-21 18:14:02.046'),
(269, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1596363\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZDZkNDQ3YjktYjBlZC00YTY1LTgxOGYtY2RhMWFhZmNkZGY3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:14:03.645'),
(270, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1398426\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTA5MzkyMzIxNjJeQTJeQWpwZ15BbWU4MDU0MDk0OTUx._V1_.jpg\"}', '2026-02-21 18:14:06.688'),
(271, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2870648\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjAxNTU0MDY3MV5BMl5BanBnXkFtZTgwMzczODA5NDE@._V1_.jpg\"}', '2026-02-21 18:14:09.688'),
(272, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3203606\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjM1MDc2OTQ3NV5BMl5BanBnXkFtZTgwNzQ0NjQ1NjE@._V1_.jpg\"}', '2026-02-21 18:14:12.861'),
(273, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2404425\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjc0NzY3OTE0Nl5BMl5BanBnXkFtZTgwNDUyODA4MzE@._V1_.jpg\"}', '2026-02-21 18:14:15.703'),
(274, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2080374\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZWViMzkyZGUtYTA4Ni00MmI3LWIzODgtZTJiNGI4ODBjZjkwXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:14:18.767'),
(275, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0787524\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTU3Njg4MDM3OV5BMl5BanBnXkFtZTgwMjE5ODM3ODE@._V1_.jpg\"}', '2026-02-21 18:14:21.892'),
(276, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0810819\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA0NjA4NjE2Nl5BMl5BanBnXkFtZTgwNzIxNTY2NjE@._V1_.jpg\"}', '2026-02-21 18:14:24.733'),
(277, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3322364\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTYwNjgwNDg0NV5BMl5BanBnXkFtZTgwMzY1MjAyNzE@._V1_.jpg\"}', '2026-02-21 18:14:27.865'),
(278, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2888046\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMmZhOWNlMDEtN2M1OC00Yzk5LThhOTAtZDA5NTNjNjQyZDM0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:14:30.697'),
(279, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4005402\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE3NjQ1MTIxNl5BMl5BanBnXkFtZTgwOTY4OTIzODE@._V1_.jpg\"}', '2026-02-21 18:14:33.701'),
(280, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3569230\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE0MjkyODQ3NF5BMl5BanBnXkFtZTgwNDM1OTk1NjE@._V1_.jpg\"}', '2026-02-21 18:14:36.794'),
(281, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1355683\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzg0ODI3NDQxNF5BMl5BanBnXkFtZTgwMzgzNDA0NjE@._V1_.jpg\"}', '2026-02-21 18:14:39.793'),
(282, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2446980\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzc2MTI5Mzk0MV5BMl5BanBnXkFtZTgwMDIxMDg1NjE@._V1_.jpg\"}', '2026-02-21 18:14:42.771'),
(283, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2273657\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BN2IwNTZhMjEtYWViMy00YThmLWFmNWEtZjliZGJjYjAzOTQ4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:14:45.728'),
(284, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3783958\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg\"}', '2026-02-21 18:14:50.496'),
(285, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2948356\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg\"}', '2026-02-21 18:14:51.832'),
(286, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1431045\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzY3ZWU5NGQtOTViNC00ZWVmLTliNjAtNzViNzlkZWQ4YzQ4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:14:54.920'),
(287, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3544112\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjEzODA3MDcxMl5BMl5BanBnXkFtZTgwODgxNDk3NzE@._V1_.jpg\"}', '2026-02-21 18:14:57.893'),
(288, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3553976\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE5OTM0OTY5NF5BMl5BanBnXkFtZTgwMDcxOTQ3ODE@._V1_.jpg\"}', '2026-02-21 18:15:00.854'),
(289, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4698684\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjI1MDQ2MDg5Ml5BMl5BanBnXkFtZTgwMjc2NjM5ODE@._V1_.jpg\"}', '2026-02-21 18:15:03.874'),
(290, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4901306\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzBjZjIwZTMtMmVmMy00NDZjLThlMGYtMjMyODE4NjE0YjFiXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:06.952'),
(291, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3521164\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_.jpg\"}', '2026-02-21 18:15:09.932'),
(292, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3799694\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BM2YwNWZlZGEtYTEyZi00NjdjLWEwM2ItM2Q2MDMwZjkzMjk0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:12.986'),
(293, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1878870\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODE2NjE4NjYyMV5BMl5BanBnXkFtZTgwNzk3MjQ0OTE@._V1_.jpg\"}', '2026-02-21 18:15:15.981'),
(294, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt5247022\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTUzODA4Nzk0OF5BMl5BanBnXkFtZTgwNzE1MDIwMDI@._V1_.jpg\"}', '2026-02-21 18:15:19.012'),
(295, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4385888\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTkwNDE4NzQwM15BMl5BanBnXkFtZTgwNzQ5Nzg0MDI@._V1_.jpg\"}', '2026-02-21 18:15:22.015'),
(296, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2452386\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTA1Mjc4ODI0NzReQTJeQWpwZ15BbWU4MDQ3MzAwMjkx._V1_.jpg\"}', '2026-02-21 18:15:25.209'),
(297, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4048272\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BODNiNmE5OWMtNDAxMy00YTQzLThjMGItMTAwOTNlNGM2ZDlhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:28.122'),
(298, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2277860\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BY2VlYWJjMGMtYjcwZC00MDE2LThmMDItYjVlMzNhYzBhYTk5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:31.154'),
(299, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2005151\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjEyNzQ0NzM4MV5BMl5BanBnXkFtZTgwMDI0ODM2OTE@._V1_.jpg\"}', '2026-02-21 18:15:33.955'),
(300, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3470600\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZWQxNGYzMDctN2Y4Yi00Y2U2LTlmNjItZWRjZmM0NzkxM2NlXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:37.005'),
(301, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2267968\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_.jpg\"}', '2026-02-21 18:15:40.160'),
(302, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4034354\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTk0OTEyMjM1OF5BMl5BanBnXkFtZTgwMzMzODM4ODE@._V1_.jpg\"}', '2026-02-21 18:15:42.989'),
(303, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2937696\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTk2NDcyNDE5N15BMl5BanBnXkFtZTgwNDA0MzQ1NzE@._V1_.jpg\"}', '2026-02-21 18:15:46.036'),
(304, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1289401\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZjNhMzU5MjgtY2VhMC00NzZmLTk1YTEtMDc5OGU1OWJiMTE4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:49.129'),
(305, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4624424\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDU2YzBjYjEtYTRjMS00N2ViLTk5YmMtODI2ZDk4YjE4YWQxXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:15:52.179'),
(306, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4136084\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA0Mzc4MjMxMl5BMl5BanBnXkFtZTgwODIwNTQxODE@._V1_.jpg\"}', '2026-02-21 18:15:55.066'),
(307, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3960412\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjMxMzk2ODI4N15BMl5BanBnXkFtZTgwNzgzNzQ5ODE@._V1_.jpg\"}', '2026-02-21 18:15:58.041'),
(308, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2788732\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjBiYTdjZDUtYjg3ZS00YTA0LTkzZGUtMzA2OWEyOGZiN2VhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:01.209'),
(309, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3553442\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjIxOTIzMTM5OF5BMl5BanBnXkFtZTgwNDIxNTA1NzE@._V1_.jpg\"}', '2026-02-21 18:16:04.120'),
(310, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4513674\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOGNiYzM4ZGUtYzk3MC00MWQ1LWI5NGEtZWYzMzMxOTQ4ZDA0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:07.257'),
(311, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2709768\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZGI1MWEyNDMtYmRmNi00ODZiLWJmYjMtODM1NmYyNGEyMWI5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:10.306'),
(312, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4443658\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNmE4NDY5ZDgtZjFhNC00NGU2LTlhMmItNmE2ZjBiNzE5YjM2XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:13.226'),
(313, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3110958\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTVjNTA0ZWEtNzU2Ny00Njg1LWE1MmEtZTUyZGQzYTVlY2Q5XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:16.131'),
(314, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1679335\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTkxNDc3OTcxMV5BMl5BanBnXkFtZTgwODk2NjAzOTE@._V1_.jpg\"}', '2026-02-21 18:16:19.292'),
(315, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1473832\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMWViMmNmNmEtYTg5Mi00Y2IwLTg4NzgtNzg2ZjNjY2RmYWZlXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:22.272'),
(316, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1489889\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjA2NzEzNjIwNl5BMl5BanBnXkFtZTgwNzgwMTEzNzE@._V1_.jpg\"}', '2026-02-21 18:16:25.234'),
(317, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4158096\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTk5MzJhNjItZTRlOC00YWRlLTgyYmUtZmZhZjA0NmFmNjE2XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:28.119'),
(318, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1985949\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTY3MjU0NDA0OF5BMl5BanBnXkFtZTgwNTc0MTU3OTE@._V1_.jpg\"}', '2026-02-21 18:16:31.368'),
(319, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0475290\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYmE1NDE2ODUtZmVmNi00OTM3LWFkOTItZDE2NGUwMTM0YjIyXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:34.746'),
(320, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4680182\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTY2NTExOTA2MF5BMl5BanBnXkFtZTgwNTMwMjE2MTI@._V1_.jpg\"}', '2026-02-21 18:16:37.690'),
(321, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4501244\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjViYmEzYjMtZTUyZS00NGE5LThiYjYtYWJlZmEwZDI5NGViXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:16:40.721'),
(322, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3381008\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE0NTE3MjMwNV5BMl5BanBnXkFtZTgwMDc5NjQxODE@._V1_.jpg\"}', '2026-02-21 18:16:43.885'),
(323, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4651520\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjIwNzE5MTgwNl5BMl5BanBnXkFtZTgwNjM4OTA0OTE@._V1_.jpg\"}', '2026-02-21 18:16:46.731'),
(324, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt4139124\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTUwODA0NzQxMl5BMl5BanBnXkFtZTgwNzUyMjY3ODE@._V1_.jpg\"}', '2026-02-21 18:16:49.724'),
(325, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1292566\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzI4MDMwMzUwNF5BMl5BanBnXkFtZTgwMDgyNzkyNzE@._V1_.jpg\"}', '2026-02-21 18:16:52.874'),
(326, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1700841\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjkxOTk1MzY4MF5BMl5BanBnXkFtZTgwODQzOTU5ODE@._V1_.jpg\"}', '2026-02-21 18:16:55.910'),
(327, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2823054\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjM4NDIxNzI5Nl5BMl5BanBnXkFtZTgwMTg4NTY5NzE@._V1_.jpg\"}', '2026-02-21 18:16:58.882'),
(328, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt3949660\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZDgyNWExMzUtOTAyMy00ZjkzLWFhNzgtZTFhOTBmN2RhZGJhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:01.912'),
(329, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1860213\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzk0NzkyNDk2M15BMl5BanBnXkFtZTgwNDczOTU3NzE@._V1_.jpg\"}', '2026-02-21 18:17:04.985'),
(330, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2387499\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDU2OTU1NzE2Ml5BMl5BanBnXkFtZTgwMDQzMzgwMDI@._V1_.jpg\"}', '2026-02-21 18:17:07.964'),
(331, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1711525\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMDhiMjg4ODMtYjgyNi00YjZkLWE0ZGItNjU0NGVlMzViZjdlXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:11.020'),
(332, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2869728\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTU4ODAzMzcxOV5BMl5BanBnXkFtZTgwODkxMDI1NjE@._V1_.jpg\"}', '2026-02-21 18:17:13.971'),
(333, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt2461150\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTYzMTY5Mzg1Ml5BMl5BanBnXkFtZTgwNTUzODUwNjE@._V1_.jpg\"}', '2026-02-21 18:17:16.941'),
(334, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0105236\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMmMzYjg4NDctYWY0Mi00OGViLWIzMTMtYWNlZGY5ZDJmYjk3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:21.067'),
(335, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0104952\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTQxNDYzMTg1M15BMl5BanBnXkFtZTgwNzk4MDgxMTE@._V1_.jpg\"}', '2026-02-21 18:17:22.990'),
(336, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0104348\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BM2Q5NDA1ODctNmM4Yy00Yjk4LTg2ZTUtZTJjYzYyMjA2MTdmXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:25.953'),
(337, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0103776\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BZTliMDVkYTktZDdlMS00NTAwLWJhNzYtMWIwMDZjN2ViMGFiXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:29.007'),
(338, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0104431\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOGEyYzRmNzYtYzJjZi00ZjhlLWJiNDktYzZhNTgxMzc1NThlXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:32.031'),
(339, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0104714\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNDA3Zjc5NjYtODZiNy00Yjg3LTk0MWEtMDk3NDA4ZjU3YTY0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:34.986'),
(340, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1675434\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYjIwNjM4M2UtYzYzZC00N2E3LWEwMTUtNDRkMzA3MTJkMzg0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:39.981'),
(341, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1832382\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMDM0ZWRmMzctM2M5ZS00ZjU0LWIxN2MtNWNlNGY1ZDhjMDVhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:41.233'),
(342, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1562872\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOGIzYzg5NzItNDRkYS00NmIzLTk3NzQtZWYwY2VlZDhiYWQ4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:44.256'),
(343, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1454029\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTM5OTMyMjIxOV5BMl5BanBnXkFtZTcwNzU4MjIwNQ@@._V1_.jpg\"}', '2026-02-21 18:17:47.245'),
(344, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1291584\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTk4ODk5MTMyNV5BMl5BanBnXkFtZTcwMDMyNTg0Ng@@._V1_.jpg\"}', '2026-02-21 18:17:50.266'),
(345, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0780504\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYTFmNTFlOTAtNzEyNi00MWU2LTg3MGEtYjA2NWY3MDliNjlkXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:53.273'),
(346, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1568346\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_.jpg\"}', '2026-02-21 18:17:56.274'),
(347, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1655442\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYjEwOGZmM2QtNjY4Mi00NjI0LTkyZjItZDEzZGI1YTEzMDg1XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:17:59.275'),
(348, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1827487\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMzg3OTMyODQ1M15BMl5BanBnXkFtZTcwNjMwMTEwNw@@._V1_.jpg\"}', '2026-02-21 18:18:02.329'),
(349, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1839596\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BOTc3NzAxMjg4M15BMl5BanBnXkFtZTcwMDc2ODQwNw@@._V1_.jpg\"}', '2026-02-21 18:18:05.538'),
(350, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1683526\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTM3NzQzMDA5Ml5BMl5BanBnXkFtZTcwODA5NTcyNw@@._V1_.jpg\"}', '2026-02-21 18:18:08.405'),
(351, 'imdb-1771697371704', 'skip', 'Already exists in database', '{\"imdbId\":\"tt1210166\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjAxOTU3Mzc1M15BMl5BanBnXkFtZTcwMzk1ODUzNg@@._V1_.jpg\"}', '2026-02-21 18:18:11.493'),
(352, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1189073\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYjgzMDNlOTgtMDM1Ny00MjdmLWIwNjItN2IzYzRiZGY4MWY3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:18:11.543'),
(353, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1318514\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjllODU1NDItODU1Ni00N2Y2LTg4Y2ItOTJjMTczZDliN2FhXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:18:14.369'),
(354, 'imdb-1771697371704', 'broken', '🔴 Broken Link - Movie imported to review queue', '{\"imdbId\":\"tt1306980\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjg3ODQyNTIyN15BMl5BanBnXkFtZTcwMjUzNzM5NQ@@._V1_.jpg\"}', '2026-02-21 18:18:17.319'),
(355, 'imdb-1771697371704', 'broken', '🔴 Broken Link - Movie imported to review queue', '{\"imdbId\":\"tt0945513\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTY0MTc3MzMzNV5BMl5BanBnXkFtZTcwNDE4MjE0NA@@._V1_.jpg\"}', '2026-02-21 18:18:20.330'),
(356, 'imdb-1771697371704', 'broken', '🔴 Broken Link - Movie imported to review queue', '{\"imdbId\":\"tt0970179\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjAzNzk5MzgyNF5BMl5BanBnXkFtZTcwOTE4NDU5Ng@@._V1_.jpg\"}', '2026-02-21 18:18:23.300'),
(357, 'imdb-1771697371704', 'broken', '🔴 Broken Link - Movie imported to review queue', '{\"imdbId\":\"tt1410063\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE3OTUzODA3Ml5BMl5BanBnXkFtZTcwNDk5NTUyNw@@._V1_.jpg\"}', '2026-02-21 18:18:26.378'),
(358, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1570728\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_.jpg\"}', '2026-02-21 18:18:29.316'),
(359, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1242460\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE0NDE0MjYxNF5BMl5BanBnXkFtZTcwNjM2NTY5Ng@@._V1_.jpg\"}', '2026-02-21 18:18:32.349'),
(360, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1798188\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMWVjMWRhMzYtOGRmMi00ODExLTk2M2YtZDhjNGY5OWQ5NDY4XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:18:35.363'),
(361, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1189340\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTQ4NDE4NTY5MV5BMl5BanBnXkFtZTcwODQyMTkxNA@@._V1_.jpg\"}', '2026-02-21 18:18:38.366'),
(362, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1229822\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNjU0Mjc0NzU3NF5BMl5BanBnXkFtZTcwMTU4OTkwNA@@._V1_.jpg\"}', '2026-02-21 18:18:41.356'),
(363, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1192628\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTc4NjEyODE1OV5BMl5BanBnXkFtZTcwMjYzNTkxNA@@._V1_.jpg\"}', '2026-02-21 18:18:44.383'),
(364, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1033575\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjAyNTA1MTcyN15BMl5BanBnXkFtZTcwNjEyODczNQ@@._V1_.jpg\"}', '2026-02-21 18:18:47.362'),
(365, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1302011\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BYmIxMGYzMTUtZDQzYy00ODc4LWE1YzQtZGMwYTc0YTYyYTE0XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:18:50.372'),
(366, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1675192\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNzgzODA5MTU3MF5BMl5BanBnXkFtZTcwODY4MDEwNg@@._V1_.jpg\"}', '2026-02-21 18:18:56.521'),
(367, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1723811\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BM2I4YjYzYmQtNGM4Yy00NmYwLWEzYjUtMDBmNjYzZmViZWE3XkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:18:58.058'),
(368, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1568911\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjExNzkxOTYyNl5BMl5BanBnXkFtZTcwODA0MjU4Ng@@._V1_.jpg\"}', '2026-02-21 18:19:01.012'),
(369, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1412386\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjIwNjkwMDI2NV5BMl5BanBnXkFtZTcwNDc1ODIyNw@@._V1_.jpg\"}', '2026-02-21 18:19:05.017'),
(370, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1615147\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjE5NzkyNDI2Nl5BMl5BanBnXkFtZTcwMTYzNDc2Ng@@._V1_.jpg\"}', '2026-02-21 18:19:08.202'),
(371, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt0433035\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMjEzMzEzNjg0N15BMl5BanBnXkFtZTcwMzg4NDk0Ng@@._V1_.jpg\"}', '2026-02-21 18:19:11.145'),
(372, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1527186\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BMTk4NjM0MjI3MV5BMl5BanBnXkFtZTcwNjcxMDYzNg@@._V1_.jpg\"}', '2026-02-21 18:19:14.012'),
(373, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1912398\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BN2ZkYjU5ZjAtNTRjZS00MzUwLWJmMzctZDdhNDBiMWI2ZWRiXkEyXkFqcGc@._V1_.jpg\"}', '2026-02-21 18:19:16.964'),
(374, 'imdb-1771697371704', 'success', '✅ Imported successfully', '{\"imdbId\":\"tt1124035\",\"posterUrl\":\"https://m.media-amazon.com/images/M/MV5BNTU4MjkzNTY0OF5BMl5BanBnXkFtZTcwNDI5ODIxNg@@._V1_.jpg\"}', '2026-02-21 18:19:19.985'),
(375, 'cc8f9903-68b2-46ed-b7ba-a80092446008', 'INFO', '🏥 Health check started', NULL, '2026-02-21 19:11:58.005'),
(376, 'cc8f9903-68b2-46ed-b7ba-a80092446008', 'SUCCESS', '✅ Mystic River - Auto-published (was PENDING)', NULL, '2026-02-21 19:11:58.314'),
(377, 'cc8f9903-68b2-46ed-b7ba-a80092446008', 'SUCCESS', '✅ Hugo - Auto-published (was PENDING)', NULL, '2026-02-21 19:12:08.602'),
(378, 'cc8f9903-68b2-46ed-b7ba-a80092446008', 'INFO', '🛑 Health check stopped', NULL, '2026-02-21 19:12:13.028'),
(379, '92e92fde-b0ac-4f38-a71f-5f334b34d92a', 'INFO', '🏥 Health check started', NULL, '2026-02-21 19:14:59.985'),
(380, '92e92fde-b0ac-4f38-a71f-5f334b34d92a', 'SUCCESS', '✅ Hugo - Auto-published (was PENDING)', NULL, '2026-02-21 19:15:00.246'),
(381, '92e92fde-b0ac-4f38-a71f-5f334b34d92a', 'SUCCESS', '✅ 1917 - 1 server(s) OK', NULL, '2026-02-21 19:15:10.427'),
(382, '92e92fde-b0ac-4f38-a71f-5f334b34d92a', 'INFO', '🛑 Health check stopped', NULL, '2026-02-21 19:15:14.992');

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE `season` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `seasonNumber` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `posterUrl` varchar(1000) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `sessionToken` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` varchar(36) NOT NULL,
  `userId` int(11) NOT NULL,
  `stripeCustomerId` varchar(255) NOT NULL,
  `stripeSubscriptionId` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ACTIVE',
  `priceId` varchar(255) DEFAULT NULL,
  `currentPeriodEnd` datetime(3) NOT NULL,
  `cancelAtPeriodEnd` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'FREE',
  `image` varchar(500) DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `banned` tinyint(1) NOT NULL DEFAULT 0,
  `popcornBalance` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `image`, `emailVerified`, `createdAt`, `updatedAt`, `banned`, `popcornBalance`) VALUES
(1, 'admin@example.com', '$2b$10$ihYN5D1sWCmFPILGIbTjCe1JCYIH4XN90NIEhYYZ6sjdglgFiVVua', 'Admin User', 'ADMIN', NULL, NULL, '2026-02-19 12:32:25.134', '2026-02-21 22:58:16.346', 0, 2761),
(2, 'test@gmail.com', '$2b$10$3n7dymYFVCdeU5Tm0V8N9uh.v51k/iLd//hP7PE9v8.bcA31T3CS6', 'test', 'FREE', NULL, NULL, '2026-02-21 12:06:17.352', '2026-02-21 22:58:16.358', 0, 4337);

-- --------------------------------------------------------

--
-- Table structure for table `user_collection`
--

CREATE TABLE `user_collection` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_collection`
--

INSERT INTO `user_collection` (`id`, `name`, `slug`, `userId`, `isPublic`, `createdAt`, `updatedAt`) VALUES
(1, 'митко', '', 1, 1, '2026-02-19 13:52:31.044', '2026-02-19 13:52:31.044');

-- --------------------------------------------------------

--
-- Table structure for table `user_collection_movie`
--

CREATE TABLE `user_collection_movie` (
  `collectionId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_collection_movie`
--

INSERT INTO `user_collection_movie` (`collectionId`, `movieId`) VALUES
(1, 95),
(1, 98),
(1, 180);

-- --------------------------------------------------------

--
-- Table structure for table `user_gift`
--

CREATE TABLE `user_gift` (
  `id` int(11) NOT NULL,
  `giftId` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verificationtoken`
--

CREATE TABLE `verificationtoken` (
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videoserver`
--

CREATE TABLE `videoserver` (
  `id` int(11) NOT NULL,
  `movieId` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `episodeId` int(11) DEFAULT NULL,
  `language` varchar(10) NOT NULL DEFAULT 'en'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videoserver`
--

INSERT INTO `videoserver` (`id`, `movieId`, `name`, `url`, `order`, `createdAt`, `updatedAt`, `episodeId`, `language`) VALUES
(70, 71, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4154796', 1, '2026-02-19 12:52:28.991', '2026-02-19 12:52:28.991', NULL, 'en'),
(71, 72, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9900782', 1, '2026-02-19 12:52:34.419', '2026-02-19 12:52:34.419', NULL, 'en'),
(72, 73, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt8579674', 1, '2026-02-19 12:52:37.604', '2026-02-19 12:52:37.604', NULL, 'en'),
(73, 74, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0130827', 1, '2026-02-19 13:49:50.892', '2026-02-19 13:49:50.892', NULL, 'en'),
(74, 75, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120660', 1, '2026-02-19 13:49:54.893', '2026-02-19 13:49:54.893', NULL, 'en'),
(75, 76, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120768', 1, '2026-02-19 13:49:59.329', '2026-02-19 13:49:59.329', NULL, 'en'),
(76, 77, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0122690', 1, '2026-02-19 13:50:02.717', '2026-02-19 13:50:02.717', NULL, 'en'),
(77, 78, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120611', 1, '2026-02-19 13:50:06.925', '2026-02-19 13:50:06.925', NULL, 'en'),
(78, 79, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120812', 1, '2026-02-19 13:50:11.360', '2026-02-19 13:50:11.360', NULL, 'en'),
(79, 80, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0119099', 1, '2026-02-19 13:50:15.633', '2026-02-19 13:50:15.633', NULL, 'en'),
(80, 81, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120746', 1, '2026-02-19 13:50:20.516', '2026-02-19 13:50:20.516', NULL, 'en'),
(81, 82, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120591', 1, '2026-02-19 13:50:24.618', '2026-02-19 13:50:24.618', NULL, 'en'),
(82, 83, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120873', 1, '2026-02-19 13:50:29.133', '2026-02-19 13:50:29.133', NULL, 'en'),
(83, 84, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0122151', 1, '2026-02-19 13:50:33.447', '2026-02-19 13:50:33.447', NULL, 'en'),
(84, 85, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120744', 1, '2026-02-19 13:50:36.728', '2026-02-19 13:50:36.728', NULL, 'en'),
(85, 86, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120647', 1, '2026-02-19 13:50:40.742', '2026-02-19 13:50:40.742', NULL, 'en'),
(86, 87, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0122718', 1, '2026-02-19 13:50:45.209', '2026-02-19 13:50:45.209', NULL, 'en'),
(87, 88, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0120685', 1, '2026-02-19 13:50:49.315', '2026-02-19 13:50:49.315', NULL, 'en'),
(88, 89, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt10872600', 1, '2026-02-19 13:50:53.663', '2026-02-19 13:50:53.663', NULL, 'en'),
(89, 90, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1160419', 1, '2026-02-19 13:50:57.653', '2026-02-19 13:50:57.653', NULL, 'en'),
(90, 91, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt12361974', 1, '2026-02-19 13:51:00.451', '2026-02-19 13:51:00.451', NULL, 'en'),
(91, 92, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt7979580', 1, '2026-02-19 13:51:04.604', '2026-02-19 13:51:04.604', NULL, 'en'),
(92, 93, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt12801262', 1, '2026-02-19 13:51:08.003', '2026-02-19 13:51:08.003', NULL, 'en'),
(93, 94, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2382320', 1, '2026-02-19 13:51:12.008', '2026-02-19 13:51:12.008', NULL, 'en'),
(94, 95, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9376612', 1, '2026-02-19 13:51:16.551', '2026-02-19 13:51:16.551', NULL, 'en'),
(95, 96, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3228774', 1, '2026-02-19 13:51:21.083', '2026-02-19 13:51:21.083', NULL, 'en'),
(96, 97, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt6467266', 1, '2026-02-19 13:51:26.005', '2026-02-19 13:51:26.005', NULL, 'en'),
(97, 98, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt5109280', 1, '2026-02-19 13:51:34.944', '2026-02-19 13:51:34.944', NULL, 'en'),
(98, 99, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt6334354', 1, '2026-02-19 13:51:43.806', '2026-02-19 13:51:43.806', NULL, 'en'),
(99, 100, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt11657662', 1, '2026-02-19 13:51:53.661', '2026-02-19 13:51:53.661', NULL, 'en'),
(100, 101, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt6264654', 1, '2026-02-19 13:52:01.956', '2026-02-19 13:52:01.956', NULL, 'en'),
(101, 102, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4513678', 1, '2026-02-19 13:52:11.377', '2026-02-19 13:52:11.377', NULL, 'en'),
(102, 103, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3420504', 1, '2026-02-19 13:52:20.275', '2026-02-19 13:52:20.275', NULL, 'en'),
(103, 104, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9777666', 1, '2026-02-19 13:52:29.633', '2026-02-19 13:52:29.633', NULL, 'en'),
(104, 105, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3480822', 1, '2026-02-19 13:52:37.613', '2026-02-19 13:52:37.613', NULL, 'en'),
(105, 106, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9243804', 1, '2026-02-19 13:52:46.648', '2026-02-19 13:52:46.648', NULL, 'en'),
(106, 107, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0870154', 1, '2026-02-19 13:52:55.022', '2026-02-19 13:52:55.022', NULL, 'en'),
(107, 108, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt6856242', 1, '2026-02-19 13:53:03.142', '2026-02-19 13:53:03.142', NULL, 'en'),
(108, 109, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt7737528', 1, '2026-02-19 13:53:12.588', '2026-02-19 13:53:12.588', NULL, 'en'),
(109, 110, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9032400', 1, '2026-02-19 13:53:20.674', '2026-02-19 13:53:20.674', NULL, 'en'),
(110, 111, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0293429', 1, '2026-02-19 13:53:25.308', '2026-02-19 13:53:25.308', NULL, 'en'),
(111, 112, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt7097896', 1, '2026-02-19 13:53:33.025', '2026-02-19 13:53:33.025', NULL, 'en'),
(112, 113, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0993840', 1, '2026-02-19 13:53:42.021', '2026-02-19 13:53:42.021', NULL, 'en'),
(113, 114, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9844522', 1, '2026-02-19 13:53:51.463', '2026-02-19 13:53:51.463', NULL, 'en'),
(114, 115, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2076822', 1, '2026-02-19 13:53:59.972', '2026-02-19 13:53:59.972', NULL, 'en'),
(115, 116, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3758814', 1, '2026-02-19 13:54:08.142', '2026-02-19 13:54:08.142', NULL, 'en'),
(116, 117, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9203694', 1, '2026-02-19 13:54:17.946', '2026-02-19 13:54:17.946', NULL, 'en'),
(117, 118, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3554046', 1, '2026-02-19 13:54:26.330', '2026-02-19 13:54:26.330', NULL, 'en'),
(118, 119, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2140203', 1, '2026-02-19 13:54:37.863', '2026-02-19 13:54:37.863', NULL, 'en'),
(119, 120, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1772341', 1, '2026-02-19 13:54:47.309', '2026-02-19 13:54:47.309', NULL, 'en'),
(120, 121, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1446192', 1, '2026-02-19 13:54:54.887', '2026-02-19 13:54:54.887', NULL, 'en'),
(121, 122, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1217209', 1, '2026-02-19 13:55:04.019', '2026-02-19 13:55:04.019', NULL, 'en'),
(122, 123, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0837562', 1, '2026-02-19 13:55:12.414', '2026-02-19 13:55:12.414', NULL, 'en'),
(123, 124, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1623288', 1, '2026-02-19 13:55:20.357', '2026-02-19 13:55:20.357', NULL, 'en'),
(124, 125, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1142977', 1, '2026-02-19 13:55:29.514', '2026-02-19 13:55:29.514', NULL, 'en'),
(125, 126, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1277953', 1, '2026-02-19 13:55:38.026', '2026-02-19 13:55:38.026', NULL, 'en'),
(126, 127, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1430626', 1, '2026-02-19 13:55:46.159', '2026-02-19 13:55:46.159', NULL, 'en'),
(127, 128, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1667889', 1, '2026-02-19 13:55:55.097', '2026-02-19 13:55:55.097', NULL, 'en'),
(128, 129, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1482459', 1, '2026-02-19 13:56:04.608', '2026-02-19 13:56:04.608', NULL, 'en'),
(129, 130, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1210166', 1, '2026-02-19 13:56:12.770', '2026-02-19 13:56:12.770', NULL, 'en'),
(130, 131, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1596346', 1, '2026-02-19 13:56:20.463', '2026-02-19 13:56:20.463', NULL, 'en'),
(131, 132, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1416801', 1, '2026-02-19 13:56:29.385', '2026-02-19 13:56:29.385', NULL, 'en'),
(132, 133, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1270262', 1, '2026-02-19 13:56:37.679', '2026-02-19 13:56:37.679', NULL, 'en'),
(133, 134, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1655420', 1, '2026-02-19 13:56:46.097', '2026-02-19 13:56:46.097', NULL, 'en'),
(134, 135, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1704573', 1, '2026-02-19 13:56:54.080', '2026-02-19 13:56:54.080', NULL, 'en'),
(135, 136, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1586752', 1, '2026-02-19 13:57:03.676', '2026-02-19 13:57:03.676', NULL, 'en'),
(136, 137, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1616195', 1, '2026-02-19 13:57:12.751', '2026-02-19 13:57:12.751', NULL, 'en'),
(137, 138, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1571222', 1, '2026-02-19 13:57:21.825', '2026-02-19 13:57:21.825', NULL, 'en'),
(138, 139, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1007029', 1, '2026-02-19 13:57:31.446', '2026-02-19 13:57:31.446', NULL, 'en'),
(139, 140, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0382932', 1, '2026-02-19 13:57:42.114', '2026-02-19 13:57:42.114', NULL, 'en'),
(140, 141, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0425112', 1, '2026-02-19 13:57:50.125', '2026-02-19 13:57:50.125', NULL, 'en'),
(141, 142, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0829482', 1, '2026-02-19 13:57:58.994', '2026-02-19 13:57:58.994', NULL, 'en'),
(142, 143, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0467406', 1, '2026-02-19 13:58:07.023', '2026-02-19 13:58:07.023', NULL, 'en'),
(143, 144, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0805564', 1, '2026-02-19 13:58:16.569', '2026-02-19 13:58:16.569', NULL, 'en'),
(144, 145, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0825232', 1, '2026-02-19 13:58:24.416', '2026-02-19 13:58:24.416', NULL, 'en'),
(145, 146, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0795368', 1, '2026-02-19 13:58:33.189', '2026-02-19 13:58:33.189', NULL, 'en'),
(146, 147, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0462538', 1, '2026-02-19 13:58:41.111', '2026-02-19 13:58:41.111', NULL, 'en'),
(147, 148, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0838221', 1, '2026-02-19 13:58:50.222', '2026-02-19 13:58:50.222', NULL, 'en'),
(148, 149, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0461770', 1, '2026-02-19 13:58:59.023', '2026-02-19 13:58:59.023', NULL, 'en'),
(149, 150, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0431308', 1, '2026-02-19 13:59:07.555', '2026-02-19 13:59:07.555', NULL, 'en'),
(150, 151, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1077258', 1, '2026-02-19 13:59:16.127', '2026-02-19 13:59:16.127', NULL, 'en'),
(151, 152, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0472062', 1, '2026-02-19 13:59:23.697', '2026-02-19 13:59:23.697', NULL, 'en'),
(152, 153, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0478311', 1, '2026-02-19 13:59:32.894', '2026-02-19 13:59:32.894', NULL, 'en'),
(153, 154, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0396555', 1, '2026-02-19 13:59:41.148', '2026-02-19 13:59:41.148', NULL, 'en'),
(154, 155, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0480242', 1, '2026-02-19 13:59:48.940', '2026-02-19 13:59:48.940', NULL, 'en'),
(155, 156, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0427327', 1, '2026-02-19 13:59:57.508', '2026-02-19 13:59:57.508', NULL, 'en'),
(156, 157, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0423294', 1, '2026-02-19 14:00:08.305', '2026-02-19 14:00:08.305', NULL, 'en'),
(157, 158, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0862856', 1, '2026-02-19 14:00:15.937', '2026-02-19 14:00:15.937', NULL, 'en'),
(158, 159, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0465602', 1, '2026-02-19 14:00:23.473', '2026-02-19 14:00:23.473', NULL, 'en'),
(159, 160, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0758766', 1, '2026-02-19 14:00:32.957', '2026-02-19 14:00:32.957', NULL, 'en'),
(160, 161, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0453451', 1, '2026-02-19 14:00:41.550', '2026-02-19 14:00:41.550', NULL, 'en'),
(161, 162, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0445934', 1, '2026-02-19 14:00:50.595', '2026-02-19 14:00:50.595', NULL, 'en'),
(162, 163, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0293564', 1, '2026-02-19 14:01:00.095', '2026-02-19 14:01:00.095', NULL, 'en'),
(163, 164, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0492956', 1, '2026-02-19 14:01:08.955', '2026-02-19 14:01:08.955', NULL, 'en'),
(164, 165, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0413267', 1, '2026-02-19 14:01:17.795', '2026-02-19 14:01:17.795', NULL, 'en'),
(165, 166, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0389790', 1, '2026-02-19 14:01:27.891', '2026-02-19 14:01:27.891', NULL, 'en'),
(166, 167, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0408839', 1, '2026-02-19 14:01:37.307', '2026-02-19 14:01:37.307', NULL, 'en'),
(167, 168, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0762107', 1, '2026-02-19 14:01:46.987', '2026-02-19 14:01:46.987', NULL, 'en'),
(168, 169, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0486946', 1, '2026-02-19 14:01:56.340', '2026-02-19 14:01:56.340', NULL, 'en'),
(169, 170, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0413099', 1, '2026-02-19 14:02:05.500', '2026-02-19 14:02:05.500', NULL, 'en'),
(170, 171, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0952640', 1, '2026-02-19 14:02:14.963', '2026-02-19 14:02:14.963', NULL, 'en'),
(171, 172, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0799949', 1, '2026-02-19 14:02:22.692', '2026-02-19 14:02:22.692', NULL, 'en'),
(172, 173, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0266697', 1, '2026-02-19 14:02:32.197', '2026-02-19 14:02:32.197', NULL, 'en'),
(173, 174, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0353969', 1, '2026-02-19 14:02:40.970', '2026-02-19 14:02:40.970', NULL, 'en'),
(174, 175, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0276919', 1, '2026-02-19 14:02:49.505', '2026-02-19 14:02:49.505', NULL, 'en'),
(175, 176, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0327056', 1, '2026-02-19 14:02:57.115', '2026-02-19 14:02:57.115', NULL, 'en'),
(176, 177, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0265086', 1, '2026-02-19 14:07:36.919', '2026-02-19 14:07:36.919', NULL, 'en'),
(177, 178, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0215750', 1, '2026-02-19 14:07:41.128', '2026-02-19 14:07:41.128', NULL, 'en'),
(178, 179, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0266987', 1, '2026-02-19 14:07:45.332', '2026-02-19 14:07:45.332', NULL, 'en'),
(179, 180, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt15239678', 1, '2026-02-21 18:09:34.829', '2026-02-21 18:09:34.829', NULL, 'en'),
(180, 181, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt26548265', 1, '2026-02-21 18:09:36.430', '2026-02-21 18:09:36.430', NULL, 'en'),
(181, 182, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt8864596', 1, '2026-02-21 18:09:39.674', '2026-02-21 18:09:39.674', NULL, 'en'),
(182, 183, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt6263850', 1, '2026-02-21 18:09:42.572', '2026-02-21 18:09:42.572', NULL, 'en'),
(183, 184, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt12037194', 1, '2026-02-21 18:09:45.600', '2026-02-21 18:09:45.600', NULL, 'en'),
(184, 185, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt17279496', 1, '2026-02-21 18:09:49.314', '2026-02-21 18:09:49.314', NULL, 'en'),
(185, 186, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt12735488', 1, '2026-02-21 18:09:51.334', '2026-02-21 18:09:51.334', NULL, 'en'),
(186, 187, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt18259086', 1, '2026-02-21 18:09:55.264', '2026-02-21 18:09:55.264', NULL, 'en'),
(187, 188, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1684562', 1, '2026-02-21 18:09:57.494', '2026-02-21 18:09:57.494', NULL, 'en'),
(188, 189, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt5177120', 1, '2026-02-21 18:10:00.782', '2026-02-21 18:10:00.782', NULL, 'en'),
(189, 190, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt11301886', 1, '2026-02-21 18:10:05.481', '2026-02-21 18:10:05.481', NULL, 'en'),
(190, 191, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt11389872', 1, '2026-02-21 18:10:07.357', '2026-02-21 18:10:07.357', NULL, 'en'),
(191, 192, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9214772', 1, '2026-02-21 18:10:10.595', '2026-02-21 18:10:10.595', NULL, 'en'),
(192, 193, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt19864802', 1, '2026-02-21 18:10:12.892', '2026-02-21 18:10:12.892', NULL, 'en'),
(193, 194, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt9218128', 1, '2026-02-21 18:10:16.135', '2026-02-21 18:10:16.135', NULL, 'en'),
(194, 195, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt12584954', 1, '2026-02-21 18:10:19.444', '2026-02-21 18:10:19.444', NULL, 'en'),
(195, 196, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt27489557', 1, '2026-02-21 18:10:22.441', '2026-02-21 18:10:22.441', NULL, 'en'),
(196, 197, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4919268', 1, '2026-02-21 18:10:25.370', '2026-02-21 18:10:25.370', NULL, 'en'),
(197, 198, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt21382296', 1, '2026-02-21 18:10:28.443', '2026-02-21 18:10:28.443', NULL, 'en'),
(198, 199, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3083016', 1, '2026-02-21 18:10:31.217', '2026-02-21 18:10:31.217', NULL, 'en'),
(199, 200, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt15314262', 1, '2026-02-21 18:10:34.393', '2026-02-21 18:10:34.393', NULL, 'en'),
(200, 201, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt21692408', 1, '2026-02-21 18:10:36.934', '2026-02-21 18:10:36.934', NULL, 'en'),
(201, 202, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3359350', 1, '2026-02-21 18:10:39.900', '2026-02-21 18:10:39.900', NULL, 'en'),
(202, 203, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt14948432', 1, '2026-02-21 18:10:43.060', '2026-02-21 18:10:43.060', NULL, 'en'),
(203, 204, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt13818368', 1, '2026-02-21 18:10:45.839', '2026-02-21 18:10:45.839', NULL, 'en'),
(204, 205, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt13452446', 1, '2026-02-21 18:10:50.358', '2026-02-21 18:10:50.358', NULL, 'en'),
(205, 206, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt16539454', 1, '2026-02-21 18:10:52.052', '2026-02-21 18:10:52.052', NULL, 'en'),
(206, 207, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt16366836', 1, '2026-02-21 18:10:55.573', '2026-02-21 18:10:55.573', NULL, 'en'),
(207, 208, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt14539740', 1, '2026-02-21 18:10:58.594', '2026-02-21 18:10:58.594', NULL, 'en'),
(208, 209, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt15009428', 1, '2026-02-21 18:11:01.372', '2026-02-21 18:11:01.372', NULL, 'en'),
(209, 210, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt14371878', 1, '2026-02-21 18:11:04.768', '2026-02-21 18:11:04.768', NULL, 'en'),
(210, 211, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt14856980', 1, '2026-02-21 18:11:07.782', '2026-02-21 18:11:07.782', NULL, 'en'),
(211, 212, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt8790086', 1, '2026-02-21 18:11:11.304', '2026-02-21 18:11:11.304', NULL, 'en'),
(212, 213, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt12610390', 1, '2026-02-21 18:11:13.409', '2026-02-21 18:11:13.409', NULL, 'en'),
(213, 214, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt23137904', 1, '2026-02-21 18:11:16.342', '2026-02-21 18:11:16.342', NULL, 'en'),
(214, 215, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4978420', 1, '2026-02-21 18:11:19.194', '2026-02-21 18:11:19.194', NULL, 'en'),
(215, 216, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt11976134', 1, '2026-02-21 18:11:21.960', '2026-02-21 18:11:21.960', NULL, 'en'),
(216, 217, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt11057302', 1, '2026-02-21 18:11:25.428', '2026-02-21 18:11:25.428', NULL, 'en'),
(217, 218, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1392190', 1, '2026-02-21 18:11:29.966', '2026-02-21 18:11:29.966', NULL, 'en'),
(218, 219, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2096673', 1, '2026-02-21 18:11:31.472', '2026-02-21 18:11:31.472', NULL, 'en'),
(219, 220, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3863552', 1, '2026-02-21 18:11:34.582', '2026-02-21 18:11:34.582', NULL, 'en'),
(220, 221, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1663202', 1, '2026-02-21 18:11:37.470', '2026-02-21 18:11:37.470', NULL, 'en'),
(221, 222, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3659388', 1, '2026-02-21 18:11:40.601', '2026-02-21 18:11:40.601', NULL, 'en'),
(222, 223, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2488496', 1, '2026-02-21 18:11:44.778', '2026-02-21 18:11:44.778', NULL, 'en'),
(223, 224, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1754656', 1, '2026-02-21 18:11:46.513', '2026-02-21 18:11:46.513', NULL, 'en'),
(224, 225, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2381249', 1, '2026-02-21 18:11:49.438', '2026-02-21 18:11:49.438', NULL, 'en'),
(225, 226, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1083452', 1, '2026-02-21 18:11:52.408', '2026-02-21 18:11:52.408', NULL, 'en'),
(226, 227, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2395427', 1, '2026-02-21 18:11:55.334', '2026-02-21 18:11:55.334', NULL, 'en'),
(227, 228, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3488710', 1, '2026-02-21 18:11:58.543', '2026-02-21 18:11:58.543', NULL, 'en'),
(228, 229, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1638355', 1, '2026-02-21 18:12:01.611', '2026-02-21 18:12:01.611', NULL, 'en'),
(229, 230, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3850214', 1, '2026-02-21 18:12:04.585', '2026-02-21 18:12:04.585', NULL, 'en'),
(230, 231, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2719848', 1, '2026-02-21 18:12:08.457', '2026-02-21 18:12:08.457', NULL, 'en'),
(231, 232, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2452042', 1, '2026-02-21 18:12:10.572', '2026-02-21 18:12:10.572', NULL, 'en'),
(232, 233, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0369610', 1, '2026-02-21 18:12:13.944', '2026-02-21 18:12:13.944', NULL, 'en'),
(233, 234, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1661199', 1, '2026-02-21 18:12:17.081', '2026-02-21 18:12:17.081', NULL, 'en'),
(234, 235, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1390411', 1, '2026-02-21 18:12:19.690', '2026-02-21 18:12:19.690', NULL, 'en'),
(235, 236, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2379713', 1, '2026-02-21 18:12:22.714', '2026-02-21 18:12:22.714', NULL, 'en'),
(236, 237, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3072482', 1, '2026-02-21 18:12:25.618', '2026-02-21 18:12:25.618', NULL, 'en'),
(237, 238, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1979388', 1, '2026-02-21 18:12:28.718', '2026-02-21 18:12:28.718', NULL, 'en'),
(238, 239, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1951266', 1, '2026-02-21 18:12:32.019', '2026-02-21 18:12:32.019', NULL, 'en'),
(239, 240, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2510894', 1, '2026-02-21 18:12:34.984', '2026-02-21 18:12:34.984', NULL, 'en'),
(240, 241, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2224026', 1, '2026-02-21 18:12:37.642', '2026-02-21 18:12:37.642', NULL, 'en'),
(241, 242, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2293640', 1, '2026-02-21 18:12:40.840', '2026-02-21 18:12:40.840', NULL, 'en'),
(242, 243, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1964418', 1, '2026-02-21 18:12:43.528', '2026-02-21 18:12:43.528', NULL, 'en'),
(243, 244, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1340138', 1, '2026-02-21 18:12:46.448', '2026-02-21 18:12:46.448', NULL, 'en'),
(244, 245, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4046784', 1, '2026-02-21 18:12:49.478', '2026-02-21 18:12:49.478', NULL, 'en'),
(245, 246, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1051904', 1, '2026-02-21 18:12:53.597', '2026-02-21 18:12:53.597', NULL, 'en'),
(246, 247, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1524930', 1, '2026-02-21 18:12:55.778', '2026-02-21 18:12:55.778', NULL, 'en'),
(247, 248, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2908446', 1, '2026-02-21 18:12:58.665', '2026-02-21 18:12:58.665', NULL, 'en'),
(248, 249, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3622592', 1, '2026-02-21 18:13:01.994', '2026-02-21 18:13:01.994', NULL, 'en'),
(249, 250, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2126355', 1, '2026-02-21 18:13:04.986', '2026-02-21 18:13:04.986', NULL, 'en'),
(250, 251, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2279373', 1, '2026-02-21 18:13:08.544', '2026-02-21 18:13:08.544', NULL, 'en'),
(251, 252, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1618442', 1, '2026-02-21 18:13:10.755', '2026-02-21 18:13:10.755', NULL, 'en'),
(252, 253, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2679042', 1, '2026-02-21 18:13:13.637', '2026-02-21 18:13:13.637', NULL, 'en'),
(253, 254, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3332064', 1, '2026-02-21 18:13:16.995', '2026-02-21 18:13:16.995', NULL, 'en'),
(254, 255, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2120120', 1, '2026-02-21 18:13:19.694', '2026-02-21 18:13:19.694', NULL, 'en'),
(255, 256, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3045616', 1, '2026-02-21 18:13:22.575', '2026-02-21 18:13:22.575', NULL, 'en'),
(256, 257, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1617661', 1, '2026-02-21 18:13:25.763', '2026-02-21 18:13:25.763', NULL, 'en'),
(257, 258, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2058673', 1, '2026-02-21 18:13:29.004', '2026-02-21 18:13:29.004', NULL, 'en'),
(258, 259, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2479478', 1, '2026-02-21 18:13:31.597', '2026-02-21 18:13:31.597', NULL, 'en'),
(259, 260, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1502712', 1, '2026-02-21 18:13:34.946', '2026-02-21 18:13:34.946', NULL, 'en'),
(260, 261, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0435761', 1, '2026-02-21 18:13:39.113', '2026-02-21 18:13:39.113', NULL, 'en'),
(261, 262, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0892769', 1, '2026-02-21 18:13:40.723', '2026-02-21 18:13:40.723', NULL, 'en'),
(262, 263, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0398286', 1, '2026-02-21 18:13:43.777', '2026-02-21 18:13:43.777', NULL, 'en'),
(263, 264, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1323594', 1, '2026-02-21 18:13:46.986', '2026-02-21 18:13:46.986', NULL, 'en'),
(264, 265, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1568921', 1, '2026-02-21 18:13:49.670', '2026-02-21 18:13:49.670', NULL, 'en'),
(265, 266, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1001526', 1, '2026-02-21 18:13:52.758', '2026-02-21 18:13:52.758', NULL, 'en'),
(266, 267, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1219342', 1, '2026-02-21 18:13:55.795', '2026-02-21 18:13:55.795', NULL, 'en'),
(267, 268, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0892791', 1, '2026-02-21 18:13:58.848', '2026-02-21 18:13:58.848', NULL, 'en'),
(268, 269, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1895587', 1, '2026-02-21 18:14:03.527', '2026-02-21 18:14:03.527', NULL, 'en'),
(269, 270, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1596363', 1, '2026-02-21 18:14:05.011', '2026-02-21 18:14:05.011', NULL, 'en'),
(270, 271, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1398426', 1, '2026-02-21 18:14:07.988', '2026-02-21 18:14:07.988', NULL, 'en'),
(271, 272, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2870648', 1, '2026-02-21 18:14:11.574', '2026-02-21 18:14:11.574', NULL, 'en'),
(272, 273, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3203606', 1, '2026-02-21 18:14:14.629', '2026-02-21 18:14:14.629', NULL, 'en'),
(273, 274, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2404425', 1, '2026-02-21 18:14:17.145', '2026-02-21 18:14:17.145', NULL, 'en'),
(274, 275, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2080374', 1, '2026-02-21 18:14:20.586', '2026-02-21 18:14:20.586', NULL, 'en'),
(275, 276, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0787524', 1, '2026-02-21 18:14:23.225', '2026-02-21 18:14:23.225', NULL, 'en'),
(276, 277, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0810819', 1, '2026-02-21 18:14:25.910', '2026-02-21 18:14:25.910', NULL, 'en'),
(277, 278, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3322364', 1, '2026-02-21 18:14:29.362', '2026-02-21 18:14:29.362', NULL, 'en'),
(278, 279, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2888046', 1, '2026-02-21 18:14:32.074', '2026-02-21 18:14:32.074', NULL, 'en'),
(279, 280, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4005402', 1, '2026-02-21 18:14:35.085', '2026-02-21 18:14:35.085', NULL, 'en'),
(280, 281, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3569230', 1, '2026-02-21 18:14:38.162', '2026-02-21 18:14:38.162', NULL, 'en'),
(281, 282, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1355683', 1, '2026-02-21 18:14:41.048', '2026-02-21 18:14:41.048', NULL, 'en'),
(282, 283, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2446980', 1, '2026-02-21 18:14:44.022', '2026-02-21 18:14:44.022', NULL, 'en'),
(283, 284, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2273657', 1, '2026-02-21 18:14:47.232', '2026-02-21 18:14:47.232', NULL, 'en'),
(284, 285, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3783958', 1, '2026-02-21 18:14:51.722', '2026-02-21 18:14:51.722', NULL, 'en'),
(285, 286, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2948356', 1, '2026-02-21 18:14:53.227', '2026-02-21 18:14:53.227', NULL, 'en'),
(286, 287, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1431045', 1, '2026-02-21 18:14:56.204', '2026-02-21 18:14:56.204', NULL, 'en'),
(287, 288, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3544112', 1, '2026-02-21 18:14:59.334', '2026-02-21 18:14:59.334', NULL, 'en'),
(288, 289, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3553976', 1, '2026-02-21 18:15:02.412', '2026-02-21 18:15:02.412', NULL, 'en'),
(289, 290, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4698684', 1, '2026-02-21 18:15:05.129', '2026-02-21 18:15:05.129', NULL, 'en'),
(290, 291, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4901306', 1, '2026-02-21 18:15:08.300', '2026-02-21 18:15:08.300', NULL, 'en'),
(291, 292, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3521164', 1, '2026-02-21 18:15:11.111', '2026-02-21 18:15:11.111', NULL, 'en'),
(292, 293, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3799694', 1, '2026-02-21 18:15:14.622', '2026-02-21 18:15:14.622', NULL, 'en'),
(293, 294, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1878870', 1, '2026-02-21 18:15:17.466', '2026-02-21 18:15:17.466', NULL, 'en'),
(294, 295, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt5247022', 1, '2026-02-21 18:15:20.459', '2026-02-21 18:15:20.459', NULL, 'en'),
(295, 296, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4385888', 1, '2026-02-21 18:15:23.303', '2026-02-21 18:15:23.303', NULL, 'en'),
(296, 297, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2452386', 1, '2026-02-21 18:15:26.613', '2026-02-21 18:15:26.613', NULL, 'en'),
(297, 298, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4048272', 1, '2026-02-21 18:15:29.506', '2026-02-21 18:15:29.506', NULL, 'en'),
(298, 299, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2277860', 1, '2026-02-21 18:15:32.385', '2026-02-21 18:15:32.385', NULL, 'en'),
(299, 300, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2005151', 1, '2026-02-21 18:15:35.216', '2026-02-21 18:15:35.216', NULL, 'en'),
(300, 301, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3470600', 1, '2026-02-21 18:15:38.449', '2026-02-21 18:15:38.449', NULL, 'en'),
(301, 302, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2267968', 1, '2026-02-21 18:15:41.253', '2026-02-21 18:15:41.253', NULL, 'en'),
(302, 303, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4034354', 1, '2026-02-21 18:15:44.281', '2026-02-21 18:15:44.281', NULL, 'en'),
(303, 304, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2937696', 1, '2026-02-21 18:15:47.476', '2026-02-21 18:15:47.476', NULL, 'en'),
(304, 305, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1289401', 1, '2026-02-21 18:15:50.785', '2026-02-21 18:15:50.785', NULL, 'en'),
(305, 306, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4624424', 1, '2026-02-21 18:15:53.413', '2026-02-21 18:15:53.413', NULL, 'en'),
(306, 307, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4136084', 1, '2026-02-21 18:15:56.534', '2026-02-21 18:15:56.534', NULL, 'en'),
(307, 308, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3960412', 1, '2026-02-21 18:15:59.515', '2026-02-21 18:15:59.515', NULL, 'en'),
(308, 309, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2788732', 1, '2026-02-21 18:16:02.817', '2026-02-21 18:16:02.817', NULL, 'en'),
(309, 310, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3553442', 1, '2026-02-21 18:16:05.565', '2026-02-21 18:16:05.565', NULL, 'en'),
(310, 311, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4513674', 1, '2026-02-21 18:16:09.447', '2026-02-21 18:16:09.447', NULL, 'en'),
(311, 312, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2709768', 1, '2026-02-21 18:16:11.629', '2026-02-21 18:16:11.629', NULL, 'en'),
(312, 313, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4443658', 1, '2026-02-21 18:16:14.717', '2026-02-21 18:16:14.717', NULL, 'en'),
(313, 314, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3110958', 1, '2026-02-21 18:16:17.478', '2026-02-21 18:16:17.478', NULL, 'en'),
(314, 315, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1679335', 1, '2026-02-21 18:16:20.722', '2026-02-21 18:16:20.722', NULL, 'en'),
(315, 316, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1473832', 1, '2026-02-21 18:16:23.834', '2026-02-21 18:16:23.834', NULL, 'en'),
(316, 317, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1489889', 1, '2026-02-21 18:16:26.577', '2026-02-21 18:16:26.577', NULL, 'en'),
(317, 318, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4158096', 1, '2026-02-21 18:16:29.684', '2026-02-21 18:16:29.684', NULL, 'en'),
(318, 319, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1985949', 1, '2026-02-21 18:16:34.581', '2026-02-21 18:16:34.581', NULL, 'en'),
(319, 320, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0475290', 1, '2026-02-21 18:16:36.044', '2026-02-21 18:16:36.044', NULL, 'en'),
(320, 321, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4680182', 1, '2026-02-21 18:16:39.008', '2026-02-21 18:16:39.008', NULL, 'en'),
(321, 322, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4501244', 1, '2026-02-21 18:16:42.124', '2026-02-21 18:16:42.124', NULL, 'en'),
(322, 323, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3381008', 1, '2026-02-21 18:16:46.013', '2026-02-21 18:16:46.013', NULL, 'en'),
(323, 324, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4651520', 1, '2026-02-21 18:16:48.148', '2026-02-21 18:16:48.148', NULL, 'en'),
(324, 325, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt4139124', 1, '2026-02-21 18:16:52.736', '2026-02-21 18:16:52.736', NULL, 'en'),
(325, 326, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1292566', 1, '2026-02-21 18:16:54.088', '2026-02-21 18:16:54.088', NULL, 'en'),
(326, 327, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1700841', 1, '2026-02-21 18:16:57.125', '2026-02-21 18:16:57.125', NULL, 'en'),
(327, 328, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2823054', 1, '2026-02-21 18:17:00.414', '2026-02-21 18:17:00.414', NULL, 'en'),
(328, 329, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt3949660', 1, '2026-02-21 18:17:03.360', '2026-02-21 18:17:03.360', NULL, 'en'),
(329, 330, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1860213', 1, '2026-02-21 18:17:06.285', '2026-02-21 18:17:06.285', NULL, 'en'),
(330, 331, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2387499', 1, '2026-02-21 18:17:09.284', '2026-02-21 18:17:09.284', NULL, 'en'),
(331, 332, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1711525', 1, '2026-02-21 18:17:12.616', '2026-02-21 18:17:12.616', NULL, 'en'),
(332, 333, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2869728', 1, '2026-02-21 18:17:15.344', '2026-02-21 18:17:15.344', NULL, 'en'),
(333, 334, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt2461150', 1, '2026-02-21 18:17:18.413', '2026-02-21 18:17:18.413', NULL, 'en'),
(334, 335, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0105236', 1, '2026-02-21 18:17:22.765', '2026-02-21 18:17:22.765', NULL, 'en'),
(335, 336, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0104952', 1, '2026-02-21 18:17:25.134', '2026-02-21 18:17:25.134', NULL, 'en'),
(336, 337, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0104348', 1, '2026-02-21 18:17:27.360', '2026-02-21 18:17:27.360', NULL, 'en'),
(337, 338, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0103776', 1, '2026-02-21 18:17:30.561', '2026-02-21 18:17:30.561', NULL, 'en'),
(338, 339, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0104431', 1, '2026-02-21 18:17:34.512', '2026-02-21 18:17:34.512', NULL, 'en'),
(339, 340, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0104714', 1, '2026-02-21 18:17:36.816', '2026-02-21 18:17:36.816', NULL, 'en'),
(340, 341, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1675434', 1, '2026-02-21 18:17:41.113', '2026-02-21 18:17:41.113', NULL, 'en'),
(341, 342, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1832382', 1, '2026-02-21 18:17:42.534', '2026-02-21 18:17:42.534', NULL, 'en'),
(342, 343, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1562872', 1, '2026-02-21 18:17:45.617', '2026-02-21 18:17:45.617', NULL, 'en'),
(343, 344, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1454029', 1, '2026-02-21 18:17:48.927', '2026-02-21 18:17:48.927', NULL, 'en'),
(344, 345, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1291584', 1, '2026-02-21 18:17:51.667', '2026-02-21 18:17:51.667', NULL, 'en'),
(345, 346, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0780504', 1, '2026-02-21 18:17:54.625', '2026-02-21 18:17:54.625', NULL, 'en'),
(346, 347, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1568346', 1, '2026-02-21 18:17:57.652', '2026-02-21 18:17:57.652', NULL, 'en'),
(347, 348, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1655442', 1, '2026-02-21 18:18:00.483', '2026-02-21 18:18:00.483', NULL, 'en'),
(348, 349, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1827487', 1, '2026-02-21 18:18:03.553', '2026-02-21 18:18:03.553', NULL, 'en'),
(349, 350, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1839596', 1, '2026-02-21 18:18:07.124', '2026-02-21 18:18:07.124', NULL, 'en'),
(350, 351, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1683526', 1, '2026-02-21 18:18:10.165', '2026-02-21 18:18:10.165', NULL, 'en'),
(351, 352, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1189073', 1, '2026-02-21 18:18:12.862', '2026-02-21 18:18:12.862', NULL, 'en'),
(352, 353, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1318514', 1, '2026-02-21 18:18:15.715', '2026-02-21 18:18:15.715', NULL, 'en'),
(353, 354, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1306980', 1, '2026-02-21 18:18:19.312', '2026-02-21 18:18:19.312', NULL, 'en'),
(354, 355, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0945513', 1, '2026-02-21 18:18:22.154', '2026-02-21 18:18:22.154', NULL, 'en'),
(355, 356, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0970179', 1, '2026-02-21 18:18:24.781', '2026-02-21 18:18:24.781', NULL, 'en'),
(356, 357, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1410063', 1, '2026-02-21 18:18:28.437', '2026-02-21 18:18:28.437', NULL, 'en'),
(357, 358, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1570728', 1, '2026-02-21 18:18:30.688', '2026-02-21 18:18:30.688', NULL, 'en'),
(358, 359, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1242460', 1, '2026-02-21 18:18:33.686', '2026-02-21 18:18:33.686', NULL, 'en'),
(359, 360, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1798188', 1, '2026-02-21 18:18:36.845', '2026-02-21 18:18:36.845', NULL, 'en'),
(360, 361, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1189340', 1, '2026-02-21 18:18:39.591', '2026-02-21 18:18:39.591', NULL, 'en'),
(361, 362, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1229822', 1, '2026-02-21 18:18:42.662', '2026-02-21 18:18:42.662', NULL, 'en'),
(362, 363, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1192628', 1, '2026-02-21 18:18:45.612', '2026-02-21 18:18:45.612', NULL, 'en'),
(363, 364, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1033575', 1, '2026-02-21 18:18:48.558', '2026-02-21 18:18:48.558', NULL, 'en'),
(364, 365, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1302011', 1, '2026-02-21 18:18:51.752', '2026-02-21 18:18:51.752', NULL, 'en'),
(365, 366, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1675192', 1, '2026-02-21 18:18:57.863', '2026-02-21 18:18:57.863', NULL, 'en'),
(366, 367, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1723811', 1, '2026-02-21 18:19:00.093', '2026-02-21 18:19:00.093', NULL, 'en'),
(367, 368, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1568911', 1, '2026-02-21 18:19:04.835', '2026-02-21 18:19:04.835', NULL, 'en'),
(368, 369, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1412386', 1, '2026-02-21 18:19:06.342', '2026-02-21 18:19:06.342', NULL, 'en'),
(369, 370, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1615147', 1, '2026-02-21 18:19:09.727', '2026-02-21 18:19:09.727', NULL, 'en'),
(370, 371, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt0433035', 1, '2026-02-21 18:19:12.370', '2026-02-21 18:19:12.370', NULL, 'en'),
(371, 372, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1527186', 1, '2026-02-21 18:19:15.743', '2026-02-21 18:19:15.743', NULL, 'en'),
(372, 373, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1912398', 1, '2026-02-21 18:19:18.278', '2026-02-21 18:19:18.278', NULL, 'en'),
(373, 374, 'Vidsrc', 'https://vidsrc.xyz/embed/movie/tt1124035', 1, '2026-02-21 18:19:21.997', '2026-02-21 18:19:21.997', NULL, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `watchhistory`
--

CREATE TABLE `watchhistory` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `lastPosition` int(11) NOT NULL DEFAULT 0,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `watchhistory`
--

INSERT INTO `watchhistory` (`id`, `userId`, `movieId`, `lastPosition`, `updatedAt`) VALUES
(1, 1, 71, 0, '2026-02-19 13:48:30.494'),
(2, 1, 76, 0, '2026-02-19 13:56:19.381'),
(3, 1, 116, 0, '2026-02-19 13:54:35.243'),
(4, 1, 118, 0, '2026-02-19 13:54:47.359'),
(5, 1, 73, 0, '2026-02-19 14:24:48.481'),
(6, 1, 179, 0, '2026-02-21 22:57:32.498'),
(428, 1, 92, 0, '2026-02-19 19:10:06.883'),
(429, 2, 179, 0, '2026-02-21 22:58:19.954'),
(430, 1, 348, 0, '2026-02-21 18:18:15.134'),
(431, 1, 334, 0, '2026-02-21 18:18:20.845'),
(432, 1, 357, 0, '2026-02-21 18:54:43.473'),
(433, 1, 180, 0, '2026-02-21 22:56:05.227');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`userId`, `movieId`) VALUES
(1, 95),
(1, 180);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_idx` (`userId`);

--
-- Indexes for table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Analytics_createdAt_idx` (`createdAt`),
  ADD KEY `Analytics_event_idx` (`event`),
  ADD KEY `Analytics_movieId_idx` (`movieId`),
  ADD KEY `Analytics_userId_idx` (`userId`);

--
-- Indexes for table `broken_servers`
--
ALTER TABLE `broken_servers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BrokenServers_movieId_serverId_key` (`movieId`,`serverId`),
  ADD KEY `BrokenServers_movieId_idx` (`movieId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`),
  ADD UNIQUE KEY `Category_slug_key` (`slug`),
  ADD KEY `Category_slug_idx` (`slug`);

--
-- Indexes for table `cinema_library`
--
ALTER TABLE `cinema_library`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cinema_library_movieId_key` (`movieId`),
  ADD KEY `CinemaLibrary_movieId_idx` (`movieId`);

--
-- Indexes for table `cinema_message`
--
ALTER TABLE `cinema_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CinemaMessage_userId_idx` (`userId`);

--
-- Indexes for table `cinema_presence`
--
ALTER TABLE `cinema_presence`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `CinemaPresence_lastSeen_idx` (`lastSeen`);

--
-- Indexes for table `cinema_schedule`
--
ALTER TABLE `cinema_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CinemaSchedule_movieId_idx` (`movieId`),
  ADD KEY `CinemaSchedule_startTime_idx` (`startTime`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Collection_name_key` (`name`),
  ADD UNIQUE KEY `Collection_slug_key` (`slug`),
  ADD KEY `Collection_slug_idx` (`slug`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comment_movieId_idx` (`movieId`),
  ADD KEY `Comment_userId_idx` (`userId`),
  ADD KEY `Comment_parentId_idx` (`parentId`);

--
-- Indexes for table `comment_like`
--
ALTER TABLE `comment_like`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CommentLike_commentId_userId_key` (`commentId`,`userId`),
  ADD KEY `CommentLike_userId_fkey` (`userId`);

--
-- Indexes for table `critical_movies`
--
ALTER TABLE `critical_movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CriticalMovies_movieId_idx` (`movieId`),
  ADD KEY `CriticalMovies_imdbId_idx` (`imdbId`);

--
-- Indexes for table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Episode_seasonId_episodeNumber_key` (`seasonId`,`episodeNumber`),
  ADD KEY `Episode_seasonId_idx` (`seasonId`);

--
-- Indexes for table `fixed_movies_review`
--
ALTER TABLE `fixed_movies_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FixedMoviesReview_movieId_idx` (`movieId`);

--
-- Indexes for table `gift`
--
ALTER TABLE `gift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Movie_slug_key` (`slug`),
  ADD UNIQUE KEY `Movie_tmdbId_key` (`tmdbId`),
  ADD UNIQUE KEY `Movie_imdbId_key` (`imdbId`),
  ADD KEY `Movie_featured_idx` (`featured`),
  ADD KEY `Movie_imdbId_idx` (`imdbId`),
  ADD KEY `Movie_isSeries_idx` (`isSeries`),
  ADD KEY `Movie_published_idx` (`published`),
  ADD KEY `Movie_slug_idx` (`slug`),
  ADD KEY `Movie_tmdbId_idx` (`tmdbId`),
  ADD KEY `Movie_year_idx` (`year`),
  ADD KEY `Movie_collectionId_idx` (`collectionId`);

--
-- Indexes for table `moviecategory`
--
ALTER TABLE `moviecategory`
  ADD PRIMARY KEY (`movieId`,`categoryId`),
  ADD KEY `MovieCategory_categoryId_idx` (`categoryId`),
  ADD KEY `MovieCategory_movieId_idx` (`movieId`);

--
-- Indexes for table `movie_fix_log`
--
ALTER TABLE `movie_fix_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MovieFixLog_movieId_idx` (`movieId`);

--
-- Indexes for table `popcorn_transaction`
--
ALTER TABLE `popcorn_transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PopcornTransaction_userId_idx` (`userId`),
  ADD KEY `PopcornTransaction_createdAt_idx` (`createdAt`);

--
-- Indexes for table `scraperjob`
--
ALTER TABLE `scraperjob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scraperlog`
--
ALTER TABLE `scraperlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ScraperLog_jobId_idx` (`jobId`);

--
-- Indexes for table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Season_movieId_seasonNumber_key` (`movieId`,`seasonNumber`),
  ADD KEY `Season_movieId_idx` (`movieId`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_idx` (`userId`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Subscription_userId_key` (`userId`),
  ADD UNIQUE KEY `Subscription_stripeCustomerId_key` (`stripeCustomerId`),
  ADD UNIQUE KEY `Subscription_stripeSubscriptionId_key` (`stripeSubscriptionId`),
  ADD KEY `Subscription_stripeCustomerId_idx` (`stripeCustomerId`),
  ADD KEY `Subscription_userId_idx` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_email_idx` (`email`),
  ADD KEY `User_role_idx` (`role`);

--
-- Indexes for table `user_collection`
--
ALTER TABLE `user_collection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserCollection_slug_idx` (`slug`),
  ADD KEY `UserCollection_userId_idx` (`userId`);

--
-- Indexes for table `user_collection_movie`
--
ALTER TABLE `user_collection_movie`
  ADD PRIMARY KEY (`collectionId`,`movieId`),
  ADD KEY `UserCollectionMovie_movieId_fkey` (`movieId`);

--
-- Indexes for table `user_gift`
--
ALTER TABLE `user_gift`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserGift_giftId_fkey` (`giftId`),
  ADD KEY `UserGift_senderId_fkey` (`senderId`),
  ADD KEY `UserGift_receiverId_fkey` (`receiverId`);

--
-- Indexes for table `verificationtoken`
--
ALTER TABLE `verificationtoken`
  ADD UNIQUE KEY `VerificationToken_token_key` (`token`),
  ADD UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`);

--
-- Indexes for table `videoserver`
--
ALTER TABLE `videoserver`
  ADD PRIMARY KEY (`id`),
  ADD KEY `VideoServer_episodeId_idx` (`episodeId`),
  ADD KEY `VideoServer_language_idx` (`language`),
  ADD KEY `VideoServer_movieId_idx` (`movieId`);

--
-- Indexes for table `watchhistory`
--
ALTER TABLE `watchhistory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `WatchHistory_userId_movieId_key` (`userId`,`movieId`),
  ADD KEY `WatchHistory_movieId_idx` (`movieId`),
  ADD KEY `WatchHistory_userId_idx` (`userId`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`userId`,`movieId`),
  ADD KEY `Watchlist_movieId_idx` (`movieId`),
  ADD KEY `Watchlist_userId_idx` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `analytics`
--
ALTER TABLE `analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=818;

--
-- AUTO_INCREMENT for table `broken_servers`
--
ALTER TABLE `broken_servers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `cinema_library`
--
ALTER TABLE `cinema_library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cinema_message`
--
ALTER TABLE `cinema_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `cinema_schedule`
--
ALTER TABLE `cinema_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comment_like`
--
ALTER TABLE `comment_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `critical_movies`
--
ALTER TABLE `critical_movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `episode`
--
ALTER TABLE `episode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fixed_movies_review`
--
ALTER TABLE `fixed_movies_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `gift`
--
ALTER TABLE `gift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=375;

--
-- AUTO_INCREMENT for table `movie_fix_log`
--
ALTER TABLE `movie_fix_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `popcorn_transaction`
--
ALTER TABLE `popcorn_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `scraperlog`
--
ALTER TABLE `scraperlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=383;

--
-- AUTO_INCREMENT for table `season`
--
ALTER TABLE `season`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_collection`
--
ALTER TABLE `user_collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_gift`
--
ALTER TABLE `user_gift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videoserver`
--
ALTER TABLE `videoserver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=374;

--
-- AUTO_INCREMENT for table `watchhistory`
--
ALTER TABLE `watchhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=434;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `broken_servers`
--
ALTER TABLE `broken_servers`
  ADD CONSTRAINT `BrokenServers_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cinema_library`
--
ALTER TABLE `cinema_library`
  ADD CONSTRAINT `CinemaLibrary_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cinema_message`
--
ALTER TABLE `cinema_message`
  ADD CONSTRAINT `CinemaMessage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cinema_presence`
--
ALTER TABLE `cinema_presence`
  ADD CONSTRAINT `CinemaPresence_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cinema_schedule`
--
ALTER TABLE `cinema_schedule`
  ADD CONSTRAINT `CinemaSchedule_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `Comment_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment_like`
--
ALTER TABLE `comment_like`
  ADD CONSTRAINT `CommentLike_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CommentLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `critical_movies`
--
ALTER TABLE `critical_movies`
  ADD CONSTRAINT `CriticalMovies_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `Episode_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `season` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fixed_movies_review`
--
ALTER TABLE `fixed_movies_review`
  ADD CONSTRAINT `FixedMoviesReview_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `Movie_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `collection` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `moviecategory`
--
ALTER TABLE `moviecategory`
  ADD CONSTRAINT `MovieCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `MovieCategory_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movie_fix_log`
--
ALTER TABLE `movie_fix_log`
  ADD CONSTRAINT `MovieFixLog_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `popcorn_transaction`
--
ALTER TABLE `popcorn_transaction`
  ADD CONSTRAINT `PopcornTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scraperlog`
--
ALTER TABLE `scraperlog`
  ADD CONSTRAINT `ScraperLog_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `scraperjob` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `season`
--
ALTER TABLE `season`
  ADD CONSTRAINT `Season_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_collection`
--
ALTER TABLE `user_collection`
  ADD CONSTRAINT `UserCollection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_collection_movie`
--
ALTER TABLE `user_collection_movie`
  ADD CONSTRAINT `UserCollectionMovie_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `user_collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserCollectionMovie_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_gift`
--
ALTER TABLE `user_gift`
  ADD CONSTRAINT `UserGift_giftId_fkey` FOREIGN KEY (`giftId`) REFERENCES `gift` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserGift_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserGift_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videoserver`
--
ALTER TABLE `videoserver`
  ADD CONSTRAINT `VideoServer_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `episode` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `VideoServer_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `watchhistory`
--
ALTER TABLE `watchhistory`
  ADD CONSTRAINT `WatchHistory_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `WatchHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `Watchlist_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
