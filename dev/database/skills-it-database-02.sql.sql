-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Júl 12. 13:18
-- Kiszolgáló verziója: 10.4.19-MariaDB
-- PHP verzió: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `skills_it_02`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `accomodations`
--

CREATE TABLE `accomodations` (
  `id` int(11) NOT NULL,
  `name` varchar(511) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `img` varchar(511) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `accomodations`
--

INSERT INTO `accomodations` (`id`, `name`, `description`, `price`, `img`) VALUES
(1, 'Hotel President', 'Located right in the business, governmental and historical area of Budapest, Hotel President is a perfect choice for world explorers and business travellers as well.', '59.50', '1.webp'),
(2, 'Gold Hotel', '30 comfortably furnished rooms are offered by Gold Hotel **** Zakopane to guests looking for accommodation in Zakopane. The hotel ensures a pleasant stay for you and your family by offering chield-friendly services. You are also welcome at the hotel for a fine local meal in the restaurant.', '35.00', '2.jpg'),
(3, 'Alta Moda Fashion Hotel', 'The Alta Moda Fashion Hotel is a fully renovated four-star hotel, that represents fashionable elegance in the heart of the city to meet our guests’ needs.', '50.00', '3.webp'),
(4, 'Vila Malinska', 'This property is 3 minutes walk from the beach. Located in the centre of Malinska, less than 100 m from the sea, Guesthouse Villa Adria offers a shared terrace and free Wi-Fi in public areas. An on-site à la carte restaurant and a breakfast buffet cater to the guests\' culinary needs', '75.00', '4.jpg'),
(5, 'Danubius Health Spa', 'Voted the best hotel in Romania in 2004, the first four-star hotel in Sovata standing just 200m from the unique salty Bear Lake.', '100.00', '5.webp'),
(6, 'Ferienhaus Regina Werfenweng', 'This peaceful and friendly holiday house in Salzburg is surrounded by mountains and forests and is the best choice for those who want to have a good rest. Our house is situated in a calm place with a view of the Hochkönig-mountain mass, right at the valley station of the cableway IKARUS. In winter you can spend here many of days skiing and in summer you can use it for long walking trips and glider flights.', '60.00', '6.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `accomodationId` int(11) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `bookingDate` date NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `accomodationId`, `checkIn`, `checkOut`, `bookingDate`, `comment`) VALUES
(1, 1, '2021-07-01', '2021-07-04', '2021-07-01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
(2, 1, '2021-07-06', '2021-07-11', '2021-07-03', 'Vestibulum scelerisque nulla non cursus consequat'),
(3, 1, '2021-07-15', '2021-07-22', '2021-07-05', 'Phasellus id lobortis risus'),
(4, 1, '2021-07-28', '2021-07-30', '2021-07-07', 'Fusce eleifend felis in nulla fringilla efficitur'),
(5, 1, '2021-08-07', '2021-08-11', '2021-07-09', 'Ut euismod lorem sed libero cursus viverra'),
(6, 1, '2021-08-21', '2021-08-29', '2021-07-11', 'Duis placerat mi sodales odio accumsan, sed dignissim nisi tincidunt'),
(7, 2, '2021-07-01', '2021-07-03', '2021-07-01', 'Phasellus varius fermentum malesuada'),
(8, 2, '2021-07-05', '2021-07-12', '2021-07-03', 'Etiam elementum eros ac lacus rhoncus, sed aliquet ligula aliquam'),
(9, 2, '2021-07-16', '2021-07-20', '2021-07-05', 'Nam sed ex condimentum, venenatis dolor eget, hendrerit sem'),
(10, 2, '2021-07-26', '2021-08-04', '2021-07-07', 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus'),
(11, 2, '2021-08-12', '2021-08-17', '2021-07-09', 'Mauris eu feugiat magna, quis vestibulum nisi'),
(12, 2, '2021-08-27', '2021-08-29', '2021-07-11', 'Aliquam lobortis suscipit libero, vitae consectetur est bibendum dictum'),
(13, 2, '2021-09-10', '2021-09-17', '2021-07-13', 'Mauris sagittis erat nec tellus sollicitudin sodales'),
(14, 3, '2021-07-01', '2021-07-02', '2021-07-01', 'Fusce id pharetra est, a porttitor dui'),
(15, 3, '2021-07-04', '2021-07-10', '2021-07-03', 'Morbi vitae ex vitae velit convallis pulvinar vitae eget justo'),
(16, 3, '2021-07-14', '2021-07-18', '2021-07-05', 'Sed iaculis ultricies purus dictum semper'),
(17, 3, '2021-07-24', '2021-08-01', '2021-07-07', 'Suspendisse potenti'),
(18, 3, '2021-08-09', '2021-08-11', '2021-07-09', 'Quisque sit amet congue est'),
(19, 3, '2021-08-21', '2021-08-26', '2021-07-11', 'Donec ligula nibh, vulputate non magna a, rhoncus aliquam purus'),
(20, 3, '2021-09-07', '2021-09-10', '2021-07-13', 'Mauris ac nisl ac ex aliquet convallis'),
(21, 3, '2021-09-24', '2021-09-28', '2021-07-15', 'Integer at pretium urna, eu dapibus dui'),
(22, 4, '2021-07-01', '2021-07-05', '2021-07-01', 'Aenean convallis tincidunt eros eu tristique'),
(23, 4, '2021-07-07', '2021-07-10', '2021-07-03', 'Aenean venenatis nunc orci, a fringilla mi consectetur vel'),
(24, 4, '2021-07-14', '2021-07-20', '2021-07-05', 'Praesent nisl tellus, tempor a neque sit amet, maximus malesuada orci'),
(25, 4, '2021-07-26', '2021-07-30', '2021-07-07', 'Nunc auctor nunc sed magna suscipit, quis condimentum mauris tincidunt'),
(27, 4, '2021-08-22', '2021-08-24', '2021-07-11', 'Integer quis scelerisque augue, vitae pretium est'),
(28, 4, '2021-09-05', '2021-09-13', '2021-07-13', 'Maecenas consectetur commodo dui, id vestibulum ex vestibulum non'),
(29, 4, '2021-07-11', '2021-07-12', '2021-07-12', 'Test Booking from Postman'),
(33, 4, '2021-07-22', '2021-07-23', '2021-07-12', 'Test Booking from Postman');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `accomodations`
--
ALTER TABLE `accomodations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ACCOM_ID` (`accomodationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `accomodations`
--
ALTER TABLE `accomodations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FK_ACCOM_ID` FOREIGN KEY (`accomodationId`) REFERENCES `accomodations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
