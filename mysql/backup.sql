-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: bohios-pro
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenity`
--

DROP TABLE IF EXISTS `amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenity` (
  `id` int NOT NULL,
  `description` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenity`
--

LOCK TABLES `amenity` WRITE;
/*!40000 ALTER TABLE `amenity` DISABLE KEYS */;
INSERT INTO `amenity` VALUES (1,'Ascensor'),(2,'Piscina'),(3,'Gimnacio'),(4,'Área de juegos'),(5,'Patio'),(6,'Cuarto de servicio'),(7,'Área de lavado'),(8,'Área común'),(9,'Intercom'),(10,'Sistema de alarma');
/*!40000 ALTER TABLE `amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenity_vs_estate`
--

DROP TABLE IF EXISTS `amenity_vs_estate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenity_vs_estate` (
  `amenity_id` int NOT NULL,
  `estate_id` int NOT NULL,
  PRIMARY KEY (`amenity_id`,`estate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenity_vs_estate`
--

LOCK TABLES `amenity_vs_estate` WRITE;
/*!40000 ALTER TABLE `amenity_vs_estate` DISABLE KEYS */;
INSERT INTO `amenity_vs_estate` VALUES (1,4),(2,3),(2,4),(3,3),(4,1),(4,3),(5,3),(6,3),(7,3),(8,3);
/*!40000 ALTER TABLE `amenity_vs_estate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_type`
--

DROP TABLE IF EXISTS `contract_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_type` (
  `id` int NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_type`
--

LOCK TABLES `contract_type` WRITE;
/*!40000 ALTER TABLE `contract_type` DISABLE KEYS */;
INSERT INTO `contract_type` VALUES (1,'Venta'),(2,'Alquiler (a corto plazo)'),(3,'Alquiler (a largo plazo)');
/*!40000 ALTER TABLE `contract_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1,'RD$'),(2,'US$');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estate`
--

DROP TABLE IF EXISTS `estate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estate` (
  `id` int NOT NULL,
  `title` varchar(64) NOT NULL,
  `description` varchar(265) NOT NULL,
  `geo_x` varchar(16) NOT NULL,
  `geo_y` varchar(16) NOT NULL,
  `bedrooms` int NOT NULL DEFAULT '0',
  `bathrooms` int NOT NULL DEFAULT '0',
  `parking` int NOT NULL,
  `tour_id` int NOT NULL,
  `contract_type` int NOT NULL,
  `estate_type` int NOT NULL,
  `province_id` varchar(2) NOT NULL,
  `municipality_id` varchar(6) NOT NULL,
  `sector_id` varchar(13) NOT NULL,
  `currency_id` int NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `date_limit` date NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estate`
--

LOCK TABLES `estate` WRITE;
/*!40000 ALTER TABLE `estate` DISABLE KEYS */;
INSERT INTO `estate` VALUES (3,'Apartamento Viejo','Apartamento en 3er nivel nuevo.','19.484023','-70.712379',2,1,1,0,3,1,'25','250101','2501010600200',1,12000.00,'2020-07-31',1),(4,'Apartamento 3r Nivel Nuevo','Apartamento en 3er nivel.','19.484023','-70.712379',2,1,1,0,2,2,'25','250101','2501010102001',1,12000.00,'2020-07-31',1);
/*!40000 ALTER TABLE `estate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estate_type`
--

DROP TABLE IF EXISTS `estate_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estate_type` (
  `id` int NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estate_type`
--

LOCK TABLES `estate_type` WRITE;
/*!40000 ALTER TABLE `estate_type` DISABLE KEYS */;
INSERT INTO `estate_type` VALUES (1,'Casa'),(2,'Apartamento'),(3,'Local');
/*!40000 ALTER TABLE `estate_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(256) NOT NULL,
  `estate_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (7,'gallery_1.jpg',4),(8,'gallery_2.jpg',4);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipality_district`
--

DROP TABLE IF EXISTS `municipality_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipality_district` (
  `id` varchar(6) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipality_district`
--

LOCK TABLES `municipality_district` WRITE;
/*!40000 ALTER TABLE `municipality_district` DISABLE KEYS */;
INSERT INTO `municipality_district` VALUES ('250101','Santiago de los Caballeros'),('250102','Pedro García'),('250105','La Canela'),('250106','San Francisco de Jacagua'),('250107','Hato del Yaque'),('250201','Bisonó'),('250301','Jánico'),('250302','Juncalito'),('250303','El Caimito'),('250401','Licey al Medio'),('250402','Las Palomas'),('250501','San José de las Matas'),('250502','El Rubio'),('250503','La Cuesta'),('250504','Las Placetas'),('250601','Tamboril'),('250602','Canca La Piedra'),('250701','Villa González'),('250702','Palmar Arriba'),('250703','El Limón'),('250801','Puñal'),('250802','Guayabal'),('250803','Canabacoa'),('250901','Sabana Iglesia'),('251001','Baitoa');
/*!40000 ALTER TABLE `municipality_district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `province` (
  `id` varchar(2) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES ('01','Distrito Nacional'),('02','Azua'),('03','Baoruco'),('04','Barahona'),('05','Dabajón'),('06','Duarte'),('07','Elías Piña'),('08','El Seibo'),('09','Espalliat'),('10','Indenpendencia'),('11','La Altagracia'),('12','La Romana'),('13','La Vega'),('14','María Trinidad Sánchez'),('15','Monte Cristi'),('16','Pedernales'),('17','Peravia'),('18','Puerto Plata'),('19','Hermanas Mirabal'),('20','Samaná'),('21','San Cristóbal'),('22','San Juan'),('23','San Pedro de Macorís'),('24','Sanchez Ramírez'),('25','Santiago'),('26','Santiago Rodríquez'),('27','Valverde'),('28','Monseñor Nouel'),('29','Monte Plata'),('30','Hato Mayor'),('31','San José de Ocoa'),('32','Santo Domingo');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` varchar(13) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES ('2501010100101','Cienfuegos'),('2501010100102','Duarte'),('2501010100103','Los Rieles'),('2501010100104','Brisas del Canal'),('2501010100105','Ensanche La Fe'),('2501010100106','Ciudad Satélite'),('2501010100107','El Semillero'),('2501010100108','Ensanche José Manuel'),('2501010100109','Fondo de Botella'),('2501010100110','Ingenio Arriba'),('2501010100111','La Gloria'),('2501010100112','La Mosca'),('2501010100113','La Piña'),('2501010100114','La Pulga'),('2501010100115','Llanos del Ingenio'),('2501010100116','Monte Bonito'),('2501010100117','San Antonio'),('2501010100118','San Lorenzo o Cerros de San Lorenzo'),('2501010100119','Villa Gloria'),('2501010100120','Villa Rosa'),('2501010100121','Las Colinas de Cienfuegos'),('2501010100122','Alto Bonito'),('2501010100123','San Lorenzo'),('2501010100124','La Paz'),('2501010100125','Pinar del Rio'),('2501010100126','La Javilla'),('2501010100127','Sector Macario Sánchez'),('2501010100128','Duarte I'),('2501010100129','Duarte II'),('2501010100130','Villa Hermosa'),('2501010100131','Nuevo Milenio (Villa Gloria)'),('2501010100132','La Gloria de Cienfuegos (Centro)'),('2501010100133','Ciudad de Dios'),('2501010100134','Villa Rosa I'),('2501010100135','Villa Rosa II'),('2501010100136','Bendición del Norte'),('2501010100137','Bendición'),('2501010100138','San Lorenzo II'),('2501010100201','Monte Rico'),('2501010100202','Ingenio'),('2501010100203','La Unión'),('2501010100204','Mella I'),('2501010100205','Mella II'),('2501010100206','Monte Rico 1'),('2501010100301','Los Salados'),('2501010100302','Manolo Tavárez Justo'),('2501010100303','Los Salados Viejos'),('2501010100304','Ensanche La Rotonda'),('2501010100401','Ensanche Libertad'),('2501010100402','Jardines del Oeste'),('2501010100403','Reparto Los Robles'),('2501010100404','Urbanización Libertad'),('2501010100405','Urbanización Ejecutivo'),('2501010100406','El Rincón'),('2501010100501','Altos de Vireya'),('2501010100502','Cuesta Colorada'),('2501010100503','Ensanche Ramos'),('2501010100504','Las Américas'),('2501010100505','Urbanización Las Palmas'),('2501010100506','Ingco'),('2501010100507','Urbanización Ingco'),('2501010100508','América Palma'),('2501010100601','Espaillat'),('2501010100701','Ensanche Bermúdez'),('2501010100702','Gurabito'),('2501010100703','Hoyo de Puchula'),('2501010100704','Ensanche Yaqué ó Cuesta Colorada'),('2501010100705','La Caoba'),('2501010100801','La Otra Banda'),('2501010100802','Bella Vista'),('2501010100803','Las Praderas'),('2501010100804','Suelo Duro'),('2501010100805','Urbanización Mirador Sur'),('2501010100806','Villa Liberación'),('2501010100807','Hacienda Palmeral'),('2501010100808','Viejo Villa Liberación'),('2501010100809','Hacienda Palmeral'),('2501010100810','Cerro de Luz'),('2501010100811','La Antena ó La Torre'),('2501010100812','Alto de San Rafael'),('2501010100813','Los Manchegos'),('2501010100814','Urbanización La Paz'),('2501010100815','Colinas del Yaque'),('2501010100816','Residencial Nicolás Vargas'),('2501010100901','Baracoa'),('2501010100902','Ensanche Román'),('2501010100903','Ensanche Dolores'),('2501010100904','Ensanche Román II'),('2501010101001','La Joya'),('2501010101002','Multifamiliares Tabacalera'),('2501010101003','Hospedaje Yaque'),('2501010101004','Parte Alta de La Joya'),('2501010101005','Framboyán'),('2501010101101','Bella Vista'),('2501010101102','Mirador del Yaque'),('2501010101103','Piña de Oro'),('2501010101104','Reparto Primavera'),('2501010101105','Cerros de Bella Vista'),('2501010101106','Cerro Alto'),('2501010101107','Cerro de Papatín'),('2501010101108','Vista Hermosa'),('2501010101109','Cerro Alto II'),('2501010101110','El Hoyo de la Cacata'),('2501010101111','Cerro de Tuna'),('2501010101112','Loma de La Tayota'),('2501010101113','Pastor Arriba'),('2501010101114','Alto Cerro'),('2501010101115','La Altagracia'),('2501010101116','El Esfuerzo'),('2501010101117','Reparto Peralta'),('2501010101201','Peralta'),('2501010101202','Residencial Paseo del Prado'),('2501010101203','Residencial Paseo Verde'),('2501010101204','Residencial Los Castillos'),('2501010101205','Residencial Paseo Yoryi Morel'),('2501010101206','La Mina'),('2501010101301','Yagüita de Pastor'),('2501010101302','Pastor Arriba'),('2501010101303','Residencial Las Charcas'),('2501010101305','Asfalto'),('2501010101306','Hoyo de Justa'),('2501010101401','Los Jazmines'),('2501010101402','Colinas del Sur'),('2501010101403','Cristo Rey'),('2501010101404','Los Prados'),('2501010101405','Vietnam'),('2501010101406','La Unión'),('2501010101501','Nibaje'),('2501010101601','Centro de la Ciudad'),('2501010101602','Los Pepines'),('2501010101603','Centro Historico'),('2501010101701','Pueblo Nuevo'),('2501010101702','El Congo (Los Multi)'),('2501010101801','Ensanche  Bolívar'),('2501010101802','Ensanche Caonabo (Los Platanitos)'),('2501010101803','Hermanas Mirabal'),('2501010101804','Ciudad Deportiva'),('2501010101805','Urbanización Domingo Bermúdez'),('2501010101901','Los Ciruelitos'),('2501010101902','Coronel Francisco Alberto Caamaño Deñó'),('2501010102001','Las Colinas'),('2501010102002','Altos del INVI'),('2501010102003','Reparto Manhattan'),('2501010102004','Tierra Alta'),('2501010102101','Urbanización Los Reyes'),('2501010102102','Urbanización Los Reyes II'),('2501010102103','Urbanización Real'),('2501010102104','Residencial Vista del Cerro'),('2501010102105','Residencial Brisas del Norte'),('2501010102106','Urbanización Alta Vista'),('2501010102107','Diego de Ocampo o Los Jardines del Norte'),('2501010102108','Francisco del Rosario Sánchez'),('2501010102109','Urbanización Imperial'),('2501010102201','Buenos Aires'),('2501010102202','Camboya'),('2501010102301','Gregorio Luperón'),('2501010102302','Cerro Alto'),('2501010102303','Cerro Alto II'),('2501010102304','Pradera del Cerro'),('2501010102305','Residencial Brisol'),('2501010102306','Residencial Don Simón'),('2501010102307','Residencial Paradise III'),('2501010102308','Las Mercedes'),('2501010102309','Residencial Cerro Diego de Ocampo'),('2501010102310','Residencial Julisa'),('2501010102401','Mejoramiento Social'),('2501010102402','El Ejido'),('2501010102403','Savica'),('2501010102404','Reparto Perelló'),('2501010102405','Hermanas Mirabal o Las Yagüitas del Ejido'),('2501010102406','Simón Díaz'),('2501010102501','Los Jardines Metropolitanos'),('2501010102502','Reparto Oquet'),('2501010102503','Ensanche Julia'),('2501010102601','La Trinitaria'),('2501010102602','Cerro del Castillo'),('2501010102603','Santiago Apóstol'),('2501010102604','Los Colegios'),('2501010102605','Panorama'),('2501010102701','Reparto Tavárez'),('2501010102702','La Lotería'),('2501010102703','La Zurza I'),('2501010102704','La Zurza II'),('2501010102705','La Zurza III'),('2501010102706','Tavárez Oeste'),('2501010102707','Reparto 30 de Marzo'),('2501010102708','Cañada Burgos'),('2501010102801','El Ensueño'),('2501010102802','Los Guandules'),('2501010102803','Ensanche Ortega'),('2501010102804','Villa Jagua'),('2501010102805','El Retiro'),('2501010102806','Los Santos'),('2501010102807','El Retiro I'),('2501010102808','El Retiro II'),('2501010102901','Pekín'),('2501010102902','Camboya'),('2501010102903','CONANI'),('2501010102904','Corea'),('2501010102905','Urbanización Villa Elena'),('2501010102906','Urbanización Fernando Valerio'),('2501010102907','Las Praderas'),('2501010102908','Residencial Los Cerros de Doña Julia'),('2501010102909','Villa Ángel'),('2501010102910','Los Quemados'),('2501010102911','Pekín Abajo'),('2501010103001','Reparto Universitario'),('2501010103002','Reparto Imperial'),('2501010103003','Quintas de Rincón Largo'),('2501010103004','Residencial El Embrujo II'),('2501010103005','Residencial El Embrujo III'),('2501010103006','Residencial El Portal'),('2501010103101','Villa Olga'),('2501010103102','La Esmeralda'),('2501010103103','La Moraleja'),('2501010103104','La Rinconada'),('2501010103105','La Rosaleda'),('2501010103106','Pinos de Villa Olga'),('2501010103107','Rincón Largo'),('2501010103108','Residencial Amapola'),('2501010103109','Reparto Framboyán'),('2501010103110','Reparto Ilusión'),('2501010103111','Residencial Nicole'),('2501010103112','Urbanización Monumental'),('2501010103113','El Despertar'),('2501010103114','Urbanización Sara'),('2501010103115','Urbanización La Española'),('2501010103201','Reparto del Este'),('2501010103202','Reparto Kokette'),('2501010103203','Los Cajuiles'),('2501010103204','Reparto Haché'),('2501010103205','La Junta'),('2501010103206','Villa Progreso'),('2501010103207','Reparto Los Robles'),('2501010103301','Los Cerros de Gurabo'),('2501010103302','Casilda'),('2501010103303','Cerro Hermoso'),('2501010103304','Cerros de Gurabo I'),('2501010103305','Cerros de Gurabo II'),('2501010103306','Cerros de Gurabo III'),('2501010103307','Hoya del Caimito'),('2501010103308','Villa Progreso'),('2501010103309','Los Cerritos'),('2501010103310','Villa Progreso II'),('2501010103311','Residencial Mainardi Reina'),('2501010103401','Reparto Consuelo'),('2501010103402','Urbanización Paraíso'),('2501010103403','Urbanización El Edén'),('2501010103404','La Gallera'),('2501010103405','Residencial Consuelo V'),('2501010103501','Gurabo Abajo'),('2501010103502','Gurabo Arriba'),('2501010103503','Gurabo al Medio'),('2501010103504','Villa Verde'),('2501010103505','Residencial Margarita'),('2501010103506','Urbanización Alejo'),('2501010103507','Los Ríos'),('2501010103508','Padre Las Casas'),('2501010103601','Hoya del Caimito'),('2501010103701','Arroyo Hondo Abajo'),('2501010103702','Valle Verde I'),('2501010103703','Valle Verde II'),('2501010103704','Sector Rivera del Valle'),('2501010103801','Los Álamos'),('2501010103802','El Embrujo III Primera Etapa'),('2501010103803','Residencial Iris'),('2501010103804','Urbanización Monte Verde'),('2501010103806','Hato Mayor'),('2501010103807','Residencial Iris'),('2501010103901','Arroyo Hondo Arriba'),('2501010103902','Los Girasoles'),('2501010103903','Villa Magisterial'),('2501010103904','Vista Linda'),('2501010103905','Residencial Villa de los Imperios'),('2501010103906','Residencial Los Rosales'),('2501010103907','La Flor'),('2501010103908','Construcción Urbanización Vista Monumental'),('2501010104001','Hato Mayor'),('2501010104002','Los Ángeles'),('2501010104003','El Bronx'),('2501010104104','Villa Los Hidalgos'),('2501010104105','Quintas de Pontezuela'),('2501010104106','Urbanizacion Cerros de Villa Olga Embrujo I'),('2501010104107','Urbanizacion Miami'),('2501010104201','Arboleda'),('2501010104301','El Dorado I'),('2501010104302','El Dorado II'),('2501010104303','Las Damas'),('2501010104304','Los Hidalgos'),('2501010104305','Las Dianas'),('2501010104306','Residencial Vargas'),('2501010104401','Los Rieles'),('2501010104402','Gurabo o Flor de Gurabo'),('2501010104403','Los Llanos de Gurabo'),('2501010104404','Quinto Centenario'),('2501010104405','Mi Sueño'),('2501010104501','La Herradura'),('2501010104502','Nuevo'),('2501010104503','Residencial Corona'),('2501010104504','Residencial Corona Plaza'),('2501010104505','Residencial Mainardi'),('2501010104506','Residencial Los Maestros o Brisas de la Herradura'),('2501010104507','Residencial El Doral'),('2501010104508','Los Mera'),('2501010104509','Villa Hortensia'),('2501010104510','Alto de La Herradura'),('2501010104511','Llano de La Barranquita o La Herradura'),('2501010104512','La Isla'),('2501010104513','La Estancia'),('2501010104601','La Barranquita'),('2501010104602','El INVI o Ciudad Universitaria'),('2501010104603','Rapa Jicao'),('2501010104604','Barrio Motocross'),('2501010104605','Llano de La Barranquita'),('2501010104606','Ciudad Universitaria'),('2501010104701','La Fardiquera'),('2501010104702','Residencial Villa del Norte'),('2501010104703','Residencial Villa María'),('2501010104704','Limonal Abajo'),('2501010104705','Los Laureles'),('2501010104706','Los Samanes'),('2501010104707','Los Militares'),('2501010104708','La Rosa'),('2501010104801','Buena Vista'),('2501010104802','Villa Buena Vista'),('2501010104803','Prolongación Padre Las Casas'),('2501010104804','Miraflores'),('2501010104805','Urbanización Padre Las Casas'),('2501010104807','San Martin'),('2501010104901','Las Antillas'),('2501010104902','Cerros Don Antonio'),('2501010104903','Los Pérez'),('2501010105001','Los Morán'),('2501010105101','Altos de Rafey'),('2501010105102','Rafey'),('2501010105103','Rincón de Oro'),('2501010105104','Urbanización Paraíso del Yaqué'),('2501010105105','Hoyo de Lima'),('2501010105106','Altos de Rafey I'),('2501010105107','Altos de Rafey II'),('2501010105201','Zona Industrial'),('2501010105202','Multifamiliares Zona Franca'),('2501010105203','Urbanización Don Jaime'),('2501010105301','La Terraza'),('2501010105302','La Rosa'),('2501010105303','Villa Esperanza'),('2501010105304','La Terraza Abajo'),('2501010105401','Urbanización Henríquez'),('2501010105402','Urbanización Las Cayenas'),('2501010105403','Cecara'),('2501010105404','Urbanización Coronel Fernández Domínguez'),('2501010105405','Pedro Francisco Bonó'),('2501010105406','Reparto Montero'),('2501010105501','Los Santos'),('2501010105502','Hoyo de Bartola'),('2501010105601','Rincón Largo'),('2501010105701','Villa Olímpica'),('2501010105702','Lindo'),('2501010105703','Los Mina'),('2501010105704','Obrero'),('2501010105705','San José'),('2501010105706','Marilópez'),('2501010105707','Residencial Pradera del Norte'),('2501010105708','Urbanización Fernández'),('2501010105709','Villa Noa'),('2501010105710','Zamarrilla'),('2501010105711','La Islita'),('2501010105712','Primavera'),('2501010105713','Villa Lucero'),('2501010105801','Área Monumental'),('2501010105901','Pontezuela al Medio'),('2501010105902','Brisas del Este'),('2501010105903','Urbanización Amanecer'),('2501010105904','Residencial Pontezuela'),('2501010105905','Urbanización Jardines Dorado'),('2501010105906','Llanos de Gurabo II'),('2501010105907','Altos de Chavón'),('2501010106001','Parque Metropolitano de Santiago'),('2501010200100','El Ingenio Abajo'),('2501010200200','El Ingenio Arriba'),('2501010200300','La Cacata'),('2501010200400','Mejía'),('2501010200500','Los Campeches'),('2501010200600','Callejón de los Sánchez'),('2501010200700','La Emboscada'),('2501010300100','Quebrada Honda'),('2501010300200','La Noriega'),('2501010300300','El Papayo'),('2501010400100','La Chichigua'),('2501010500100','La Herradura Abajo'),('2501010500200','La Herradura Arriba'),('2501010500300','Los Naranjos'),('2501010600100','La Cruz'),('2501010600200','Las Charcas'),('2501010600300','Las Charcas Abajo'),('2501010700100','Pontezuela Abajo'),('2501010700200','Monte Adentro Abajo o Las Aromas'),('2501010700300','Don Pedro Abajo'),('2501010700400','Kilómetro 4 1/2 (Antiguo Kilómetro 6)'),('2501010700500','Kilómetro 5 1/2 (Antiguo Kilómetro 6 1/2)'),('2501010700600','Kilómetro 6 1/2 (Antiguo Kilómetro 7)'),('2501010700700','Los Cirises'),('2501010700800','Don Pedro Arriba (Monte Peña)'),('2501010800100','La Guama'),('2501010800200','La Cumbre'),('2501010800300','Pulido'),('2501010800400','Palma Limpia'),('2501010800500','La Jabilla'),('2501010800600','Río Arriba'),('2501010800700','Puerto Rico'),('2501010800800','Los Higos'),('2501010800900','El Arroyo Arriba'),('2501010801000','Kilómetro 11'),('2501010801100','El Meso'),('2501010801200','Bellaco'),('2501010801300','Palo Quemado'),('2501010801400','Cuesta de Piedra'),('2501010801500','Rancho Viejo'),('2501010801600','El Arroyo'),('2501010801700','El Caimito'),('2501010900100','Pontezuela Arriba'),('2501020100101','El Play'),('2501020100201','Centro del Pueblo'),('2501020100301','Las Mercedes'),('2501020100401','La Altagracia'),('2501020200100','El Hoyazo'),('2501020200200','Los Bueyes'),('2501020200300','Piedras Azules Abajo'),('2501020200400','El Puerto'),('2501020200500','Los Lirios'),('2501020200600','El Coral'),('2501020200700','Cayas Quemadas'),('2501020200800','La Canasta'),('2501020200900','Los Naranjos'),('2501020201000','Piedras Azules Arriba'),('2501020201100','Arroyo Prieto'),('2501020201200','Las Caobas'),('2501020201300','El Piñón'),('2501020201400','Lomas Frías'),('2501020201500','El Congo'),('2501020201600','La Catalina'),('2501020201700','Arroyo Ancho'),('2501020201800','La Guama'),('2501020201900','La Yallita'),('2501020202000','Los Mates'),('2501020202100','Las Auyamas'),('2501020202200','Los Ramones'),('2501020202300','El Ribón'),('2501020202400','Alto Gordo'),('2501020202500','La Finca'),('2501020202600','La Guamita'),('2501020202700','Las Cayas'),('2501020202800','El Maizal'),('2501020202900','La Guázara'),('2501020203000','Los Rincones'),('2501020203100','Alto de Cedro'),('2501050200500','Platanal Afuera o Arriba'),('2501050200600','Platanal Abajo'),('2501050200700','Platanal La Joya'),('2501050200800','Capilla'),('2501050200900','Piedra Grande o Gorda'),('2501050201000','El Túnel'),('2501050300100','Sabana Grande de Batey I'),('2501050300200','Cuesta Arena'),('2501050300300','Los Almácigos'),('2501060100101','San Francisco Arriba'),('2501060100201','Los Cocos o San Francisco Abajo'),('2501060100301','Palmarito'),('2501060100401','Quinigua'),('2501060200100','La Búcara'),('2501060200200','Auqueyes'),('2501060200300','Loma de Agua Honda'),('2501060200400','El Buzo'),('2501060200500','Jacagua Adentro'),('2501060200600','El Play'),('2501060200700','El Níspero'),('2501060200800','La Tinaja'),('2501060300100','Jacagua Abajo'),('2501060300200','Jacagua al Medio'),('2501060300300','La Playa'),('2501060400100','La Ciénaga'),('2501060400200','Los Tocones'),('2501060500100','Piche'),('2501060500200','La Guazumita'),('2501060500300','Los Manantiales'),('2501060500400','El Ranchito'),('2501060500500','Loma de Sabana'),('2501060500600','Cuesta de Quinigua'),('2501060500700','La Hondura'),('2501060600100','Las Tres Cruces'),('2501060600200','Jacagua'),('2501060600300','Monte Adentro'),('2501060600400','Jacagua Arriba'),('2501060600500','La Furnia'),('2501060600600','El Buzo'),('2501060600700','Palmarito'),('2501060600800','Quinigua'),('2501060700100','El Aguacate de Jacagua'),('2501060700200','La Calabacita'),('2501060800100','Palo Alto'),('2501060900100','Los Guineos'),('2501060900200','Palmar Arriba'),('2501061000100','La Delgada'),('2501061000200','La Delgada Arriba'),('2501061100100','El Alto del Jamo'),('2501061100200','Los Arroyos de Salamanca'),('2501061100300','Salamanca'),('2501070100101','El Portón'),('2501070100201','El Tamarindo'),('2501070100202','San Ramón'),('2501070100301','Ensanche Hermanas Mirabal'),('2501070100401','La Mina'),('2501070100402','La Mina Arriba ó La Rotonda'),('2501070100403','La Mina Abajo'),('2501070100501','La Paz'),('2501070100601','La Rinconada'),('2501070100701','Los Jiménez'),('2501070100702','Los Jiménez Arriba'),('2501070100801','Monseñor Eliseo Pérez'),('2501070100901','Praderas del Yaque'),('2501070100902','Los Letreros'),('2501070100903','Reparto Las Colinas'),('2501070101001','San Antonio'),('2501070101101','Urbanización Grullón'),('2501070101102','Brisas del Yaque'),('2501070101201','Villa Fátima'),('2501070101202','Los Guandules'),('2501070101301','Villa Progreso'),('2501070101401','Mateo Pelón'),('2501070200100','San Antonio'),('2501070200200','Hato del Yaque Abajo'),('2501070200300','Villa Tabacalera'),('2501070300100','Villa Bao Arriba'),('2501070300200','Villa Bao Abajo'),('2501070400100','El Flúmer'),('2501070400200','Barceló'),('2501070400300','El Muro'),('2501070500100','Guayacanal'),('2501070500200','Finca de Aciba'),('2501070500300','El Salao'),('2502010100101','El Cerro'),('2502010100102','Juan Goris'),('2502010100103','La Justicia'),('2502010100201','Centro del Pueblo'),('2502010100301','Los Candelones'),('2502010100302','El Acueducto'),('2502010100303','Urbanización Portela'),('2502010100401','Duarte'),('2502010100501','Jeremías o Nuevo'),('2502010100601','Jalisco'),('2502010100701','La Mella'),('2502010100801','San Antonio (El Bolsillo)'),('2502010100901','La Trinitaria'),('2502010101001','La Rotonda'),('2502010101101','27 de Febrero'),('2502010101102','Reparto Peralta'),('2502010101201','La Altagracia'),('2502010101301','San Miguel'),('2502010101401','Duarte \"A\"'),('2502010101501','Hermanas Mirabal'),('2502010101502','Augusto Batista'),('2502010101601','Manolo Tavárez Justo'),('2502010101701','El Abanico'),('2502010101801','Pica Piedra (El Canal)'),('2502010101901','Minerva o Simón Bolívar'),('2502010102001','La Escuela o El Callejón de La Toma'),('2502010102101','Mejía Arriba'),('2502010102201','Mejía Abajo'),('2502010102301','Loma de Perro'),('2502010102302','Viejo Carril'),('2502010102401','San José'),('2502010102501','Pontón'),('2502010102601','La Estación'),('2502010200100','Cañada Bonita'),('2502010200200','El Catey'),('2502010200300','Guanábano del Limón'),('2502010200400','El Caimito'),('2502010200500','Agua Hedionda'),('2502010200600','La Atravesada'),('2502010200700','Las Raíces'),('2502010200800','Los Cachimbos'),('2502010200900','Las Caobas'),('2502010201000','El Estado'),('2502010201100','Gancho de Jobo'),('2502010201200','El Túnel'),('2502010201300','Los Cedros'),('2502010201400','La Estación'),('2502010300100','Estancia del Yaque'),('2502010400100','El Puente'),('2502010400200','Los Muñoz'),('2502010400300','El Cabirmal'),('2502010400400','Los Cabrera o La Lometa'),('2502010400500','Alto de La Sierra (La Sierra)'),('2502010400600','Los Brazos'),('2502010400700','Los Ruales'),('2502010400800','Cayota'),('2502010500100','La Villa Nueva'),('2502010500200','El Abra'),('2502010500300','Cañada Higüero'),('2502010500400','Los Higos'),('2502010500500','La Tunita'),('2502010500600','El Abra Arriba'),('2502010500700','Cañada Sucia'),('2502010500800','Agua Hedionda'),('2502010500900','Aguacate de Navarrete'),('2502010600100','Barrancón'),('2502010600200','Los Candelones'),('2502010700100','Pedro García'),('2502010700200','Canal Cañeo'),('2502010700300','Kilómetro 7'),('2502010700400','Villa Tabacalera'),('2502010700500','Cruce de Barrero'),('2502010700600','Pontoncito'),('2502010700700','Pun Pun'),('2502010800100','Vuelta Larga'),('2503010100101','Centro del Pueblo'),('2503010100102','Joliu'),('2503010100103','Las Monjas'),('2503010100201','El Play'),('2503010100202','La Gallera'),('2503010100301','San José'),('2503010100302','El Tanque'),('2503010100401','Pueblo Nuevo'),('2503010200100','Guayabales'),('2503010200200','Las Cejitas'),('2503010200300','Boca Naranjos'),('2503010200400','Damajagua'),('2503010200500','El Barco'),('2503010200600','Las Yayas'),('2503010200700','Cagüeyes'),('2503010200800','El Palero'),('2503010300100','Arroyo Piedra'),('2503010300200','Batey'),('2503010300300','Cebú'),('2503010300400','Damajagua'),('2503010300500','Los Jazmines'),('2503010300600','Guatiniquín'),('2503010300700','La Caoba'),('2503010400100','Arroyo Seco'),('2503010400200','El Verde'),('2503010400300','Los Indios'),('2503010400400','Zalaya'),('2503010400500','Los Robles'),('2503010400600','Dicayagua Abajo'),('2503010400700','Los Altos'),('2503010400800','Dicayagua Arriba'),('2503010500100','Jagua Abajo'),('2503010500200','El Naranjo'),('2503010500300','Los Guanos'),('2503010500400','Llano de Jagua'),('2503010500500','Henequén'),('2503010500600','Loma de la Vaca'),('2503010500700','La Piña'),('2503010500800','Los Lavaderos'),('2503010500900','Cañada Grande'),('2503010501000','La Cuchilla'),('2503010501100','Los Calabozos'),('2503010501200','Jagua Arriba'),('2503010600100','Loma del Corral'),('2503010600200','La Caña'),('2503010600300','La Fortaleza'),('2503010600400','Los Lirios'),('2503010600500','Málaga'),('2503010600600','Piedra Gorda'),('2503010600700','Loma Sucia'),('2503010700100','Babocico'),('2503010700200','Gurabo'),('2503010700300','Boca de Jánico'),('2503010700400','Las Mesetas'),('2503010700500','Bao'),('2503010700600','Monterías'),('2503010700700','Los Asientos'),('2503010700800','Hoyo de Bao'),('2503010700900','Baiguaque'),('2503020100101','Juncalito Abajo'),('2503020200100','Cerro Prieto'),('2503020200200','Baiguaque'),('2503020200300','Franco Bidó'),('2503020200400','Los Cadillos'),('2503020200500','Lora de Los Auqueyes'),('2503020200600','Sabaneta Abajo'),('2503020200700','Los Auqueyes'),('2503020200800','Los Cirises'),('2503020200900','El Pinazo'),('2503020201000','Zalzamora (Zarzamora)'),('2503020201100','Arroyo Malo'),('2503020201200','Los Guayuyos'),('2503020300100','Río Abajo'),('2503020300200','Los Lora'),('2503020300300','El Palero'),('2503020300400','El Tuerto'),('2503020300500','Quebrada'),('2503020300600','El Quemado'),('2503020300700','La Laguna'),('2503020300800','La Calabaza'),('2503020300900','Janey'),('2503020301000','Los Auyenes'),('2503020301100','Sabaneta Arriba'),('2503020301200','El Naranjo'),('2503020301300','La Berenjena'),('2503020301400','Los Montazos'),('2503020301500','Río Arriba'),('2503020400100','Dójima'),('2503020400200','La Norita'),('2503020400300','La Lechuza'),('2503020400400','La Estaca'),('2503020400500','El Higüero'),('2503020400600','Loma de La Cruz'),('2503020400700','El Naranjito'),('2503020400800','Piedra Blanca'),('2503020400900','La Calaberna'),('2503020401000','Juncalito Arriba'),('2503020401100','La Culebra'),('2503020401200','Los Arroyos'),('2503020401300','Loma Prieta'),('2503020401400','Los Granizos'),('2503020401500','Rincón del Novillo'),('2503020401600','El Cacique'),('2503020401700','Pico Alto'),('2503020500100','Naranjo Dulce'),('2503020500200','El Mocho'),('2503020500300','Los Positos'),('2503020500400','Rincón Largo'),('2503020600100','Rincón Llano'),('2503020600200','La Paría'),('2503020600300','Cerro Prieto'),('2503020600400','El Peñón'),('2503020600500','El Cerrazo'),('2503020600600','Lomita Prieta'),('2503020600700','Parque Nacional'),('2503020600800','Loma del Rancho'),('2503020600900','Pajarito'),('2503020601000','La Guajaca'),('2503030100101','El Caimito'),('2503030100201','El Palero'),('2503030100301','Los Corocitos'),('2503030100401','Los Caballos'),('2503030100501','Paso Afuera'),('2503030200100','El Aguacate'),('2503030200200','El Brujo (Yaque Abajo)'),('2503030200300','El Corral'),('2503030200400','El Yagual o El Jagual'),('2503030200500','Yaque Arriba'),('2503030200600','La Pocilguita'),('2503030200700','Los Camarones'),('2503030200800','Los Palmaritos'),('2503030300100','El Hoyo u Hoyo Bello'),('2503030300200','El Presentado'),('2503030400100','Pinalito'),('2503030400200','Botoncillo'),('2503030400300','Guanajuma'),('2503030400400','El Anón'),('2503030400500','Las Auyamas'),('2503030400600','Damajagua'),('2503030400700','Henequén'),('2503030400800','Cañete'),('2503030400900','Loma Alta'),('2503030500100','Arenilla'),('2503030500200','Bejucal'),('2503030500300','El Córbano'),('2503030500400','El Monteadero'),('2503030500500','El Papayo'),('2503030500600','El Pescadero'),('2503030500700','El Roblito'),('2503030500800','El Turco'),('2503030500900','La Cidra'),('2503030501000','La Cueva'),('2503030501100','La Faldiquera'),('2503030501200','La Guamita'),('2503030501300','La Horqueta'),('2503030501400','La Jagua o La Vagua'),('2503030501500','Las Ánimas'),('2503030501600','Los Calimetes'),('2503030501700','Los Pilones'),('2503030501800','El Pie de Los Pilones'),('2503030501900','Potranquita'),('2503030502000','Rancho Viejo'),('2503030502100','Rincón Llano'),('2503030502200','Hundidera'),('2503030600100','Aguacate'),('2503030600200','El Corral'),('2503030600300','El Cerrazo'),('2503030600400','La Guama o La Guania'),('2503030600500','Los Negros'),('2503030600600','Piedra Blanca'),('2503030600700','Las Palerías'),('2503030600800','Los Limones'),('2503030600900','La Cidra'),('2503030601000','Paso Hondo'),('2503030601100','Los Tomates'),('2504010100101','Villa Alba'),('2504010100201','Los Osorias'),('2504010100202','Los Cocos o El Coco'),('2504010100301','Los Solano'),('2504010100401','El Centro'),('2504010100402','Residencial Alma Rosa'),('2504010100403','Residencial Jardines de Licey'),('2504010100404','Urbanización Los Rodríguez'),('2504010100405','Urbanización Las Gaviotas'),('2504010100501','Urbanización Las Esmeraldas'),('2504010200100','La Cruz de María Francisca'),('2504010200200','Limonal Arriba'),('2504010300100','Licey Arriba'),('2504010300200','Monte Adentro Arriba'),('2504010400100','Licey Abajo'),('2504010500100','Cruz de Isalguez'),('2504020100101','Las Palomas o Centro del Pueblo'),('2504020100201','Limonal'),('2504020100202','Callejón de la Alegría'),('2504020100203','Callejón Julio Blanco'),('2504020100204','Callejón Los Torres'),('2504020100205','Callejón Polito'),('2504020100206','Los Otilio'),('2504020100207','Salsa I'),('2504020100208','Salsa II'),('2504020100301','Las Palomas Abajo'),('2504020100302','Urbanización San Gregorio'),('2504020100303','Entrada de Paulino'),('2504020100304','Urbanización Los Ureña'),('2504020100305','Calle Bordón'),('2504020100306','Los Rodríguez'),('2504020100307','Los Santos o Los Macos'),('2504020100401','Los Aritas'),('2504020100402','Los Lindanas'),('2504020100403','Los Martes'),('2504020100404','La Poza Prieta'),('2504020100405','La Rusia'),('2504020100406','Los Burgos'),('2504020100501','Las Palomas Arriba'),('2504020100502','Los Castillos'),('2504020100503','Urbanización Caraballo'),('2504020100504','Los Triunfel'),('2504020100505','Los Matas'),('2504020100506','Los Acevedos'),('2504020100507','Chuchu Jorge'),('2504020100601','Los Mirandas'),('2504020100701','Cruce de Chón'),('2504020100801','Los Portes'),('2504020100901','Triple Play'),('2504020101001','Los Colelos'),('2504020101101','Los Cruces'),('2504020200100','Uveral'),('2505010100101','Pueblo Nuevo'),('2505010100102','Balaguer'),('2505010100103','Don Luis'),('2505010100201','Centro del Pueblo'),('2505010100202','La Piñita'),('2505010100301','Villa Duarte Arriba'),('2505010100302','Urbanización Estrella'),('2505010100303','Vietnam'),('2505010100304','Urbanizacón Zarzuela'),('2505010100401','Villa Duarte Abajo'),('2505010100402','Ensanche Las Palmas'),('2505010100403','Ensanche Las Caobas'),('2505010100404','Ensanche Los Jardines'),('2505010100501','Paraíso de Las Matas'),('2505010100601','Cañada del Caimito'),('2505010100602','Cerro Hermoso'),('2505010100603','Villa Verdúm'),('2505010100701','La Mansión'),('2505010100801','Ojo de Agua'),('2505010100901','Villa Esperanza'),('2505010101001','Paraíso'),('2505010101101','Urbanización Ofelia'),('2505010200100','La Mara'),('2505010200200','Los Payasos o Los Parayases'),('2505010200300','Los Palmaritos'),('2505010200400','Barrancón'),('2505010200500','El Caimito'),('2505010200600','Nava'),('2505010200700','Caobanico'),('2505010200800','Pinalito'),('2505010200900','El Corozo'),('2505010201000','Quebrada Honda'),('2505010201100','Vereda de Amina'),('2505010201200','Los Platanitos'),('2505010201300','Inoa Abajo'),('2505010201400','Bernabé'),('2505010201500','Boca de Higua'),('2505010201600','Las Brujas'),('2505010201700','Ceja de Higüero'),('2505010201800','Los Naranjos'),('2505010201900','Bejucal'),('2505010202000','Las Yayas'),('2505010202100','La Cabirma'),('2505010202200','Higua'),('2505010202300','Los Arroyos'),('2505010202400','Los Pinos'),('2505010202500','Inoa'),('2505010300100','Pavón'),('2505010300200','Limbao'),('2505010300300','Guzmán'),('2505010300400','Vidal Pichardo'),('2505010300500','El Alto'),('2505010300600','Higüero'),('2505010300700','Pedro Disla'),('2505010300800','Paralimón'),('2505010300900','Proyecto Monción'),('2505010301000','La Breña'),('2505010301100','La Cabuya'),('2505010301200','Moscoso'),('2505010301300','La Guázuma'),('2505010400100','Mata Grande'),('2505010400200','Arroyo Prieto'),('2505010400300','Los Junquitos'),('2505010400400','Antonsape'),('2505010400500','La Mina'),('2505010400600','Loma Prieta'),('2505010400700','Sabaneta'),('2505010400800','Rancho al Medio'),('2505010400900','Los Aposentos'),('2505010401000','Guacaritas'),('2505010401100','El Valle'),('2505010401200','Montellano'),('2505010401300','Mohoso'),('2505010401400','Loma del Loro'),('2505010500100','Bohío Viejo'),('2505010500200','Los dos Pinos'),('2505010500300','La Fortuna'),('2505010500400','Arroyo al Medio'),('2505010500500','Loma de Mara'),('2505010500600','La Guazarita'),('2505010500700','Loma Bajita'),('2505010500800','Los Montones Abajo'),('2505010500900','Damajagua'),('2505010501000','La Guázuma'),('2505010501100','Boca de Guázuma'),('2505010501200','Cañada Llana'),('2505010501300','Corocitos'),('2505010501400','Mezquino'),('2505010501500','Loma de Jánico'),('2505010501600','San Bartolo'),('2505010501700','Lomita de Piedras'),('2505010501800','Rincón de Piedras'),('2505010501900','El Tallado'),('2505010502000','Capita'),('2505010502100','Rancho de Copey'),('2505010502200','Río Arriba'),('2505010502300','La Ceiba'),('2505010502400','Don Juan'),('2505010502500','Los Montones Arriba'),('2505010502600','La Cana'),('2505010502700','La Bija'),('2505010502800','Los Lirios'),('2505010502900','Llano de la Cana'),('2505010503000','La Ceja'),('2505010503100','Cepito'),('2505010503200','Ortega'),('2505010503300','Magueyal'),('2505010503400','Piedra Gorda'),('2505010600100','Botoncillo'),('2505010600200','Pedregal'),('2505010600300','Loma de la Vaca'),('2505010600400','Arroyo Jánico'),('2505010600500','La Ceiba'),('2505010600600','Motolón'),('2505010600700','Cerro Gordo'),('2505010600800','Hoya Bellaca'),('2505010600900','Guajaca'),('2505010601000','El Verde'),('2505010601100','Sui'),('2505010601200','Loma de la Ciénaga'),('2505010601300','Mejía'),('2505010601400','La Guázuma'),('2505010700100','Las Piedras'),('2505010700200','El Guano'),('2505010700300','Los Jíbaros'),('2505010700400','El Llano de las Piedras'),('2505010700500','Aguacate'),('2505010700600','Manaclar'),('2505010700700','Arroyo Puerto'),('2505010700800','Alto del Dajao'),('2505010700900','El Limón'),('2505010701000','Loma de los Ríos'),('2505010701100','Arroyo la Vieja'),('2505010701200','Tierra Colorada'),('2505010701300','El Carrizal'),('2505010701400','Arroyo Carrizal'),('2505010701500','Palo de Burro'),('2505010701600','El Rodeo'),('2505010701700','Dajao Abajo'),('2505010701800','Arroyo Malo o Arroyo del Dajao'),('2505010701900','Laguna del Dajao'),('2505010702000','La Sierrecita'),('2505010702100','El Dajao'),('2505010702200','El Dajao de Las Piedras'),('2505010800100','Llano de la Tala'),('2505010800200','Los Llanos'),('2505010800300','Mariana'),('2505010800400','Yerba Buena'),('2505010800500','Quebrada Llana'),('2505010800600','Carpintero'),('2505010800700','Los Cedros'),('2505010800800','Llano del Jobo'),('2505010800900','Copey'),('2505010801000','Loma al Medio'),('2505010801100','La Peña'),('2505010801200','Higua'),('2505010801300','El Limpio'),('2505010801400','El Naranjo'),('2505010801500','Los Corrales'),('2505010801600','Cerro Malo'),('2505010801700','Arroyo Hondo'),('2505010801800','El Mamey'),('2505010801900','Jaquey'),('2505010802000','Quebradita'),('2505010802100','Hoyo de Ramón'),('2505010802200','Cañada del Caimito'),('2505010802300','Inoa Arriba'),('2505020100101','El Rubio'),('2505020200100','El Córbano'),('2505020200200','Cañafístol'),('2505020200300','Los Borno o La Vieja Mea'),('2505020200400','Los Ramones o Bulla'),('2505020300100','El Orégano'),('2505020300200','Bohío Viejo'),('2505020300300','Las Cuevas'),('2505020300400','Los Fogones'),('2505020300500','Los Corralitos'),('2505020300600','Los Hoyitos'),('2505020300700','Las Altamisas'),('2505020300800','Sabana Abajo'),('2505020300900','Los Cacaos'),('2505020301000','Cañada Grande'),('2505020301100','La Penda'),('2505020301200','Sierrecita'),('2505020301300','Los Helechos'),('2505020301400','Celestina'),('2505020301500','La Batea'),('2505020301600','Los Jicacos'),('2505020301700','Los Espatiles'),('2505020301800','Don Domingo'),('2505020400100','Cañada Bonita'),('2505020400200','Corocito'),('2505020400300','Loma de las Canas'),('2505020400400','Los Naranjos'),('2505020400500','Los Ramones'),('2505020400600','El Polvazo'),('2505020400700','Las Minas'),('2505020400800','Las Guajacas'),('2505020400900','Loma Llana'),('2505020401000','Corocito Abajo'),('2505020401100','El Atacador'),('2505020500100','Rancho del Cojo'),('2505020500200','Río los Palos'),('2505020500300','Cerro Negro'),('2505020500400','Monte Llano'),('2505020500500','Los Arroyos'),('2505020500600','Mata de Palma'),('2505020500700','Marilope'),('2505020500800','Diferencia'),('2505020500900','Paso del Ganado'),('2505020501000','Sierrecita'),('2505020501100','Paredes Prietas'),('2505020501200','El Dajao'),('2505020501300','El Crucero'),('2505020501400','Cerrito Pelado'),('2505020501500','Loma de Guayabo'),('2505020600100','Bañaderos'),('2505020600200','Roncador'),('2505020600300','Sonador'),('2505020600400','La Sierrecita'),('2505020600500','El Guayabo'),('2505020600600','Jicomé'),('2505020600700','Loma del Medio'),('2505020600800','Juan Fino'),('2505020600900','La Piña'),('2505020601000','Loma Bajita'),('2505020601100','Calimetal'),('2505020601200','El Gallo'),('2505020601300','Loma Vieja'),('2505020601400','Rincón de Higüero'),('2505020601500','Vallecito'),('2505020601600','Palero'),('2505020700100','Los Limones'),('2505020700200','La Guaranita'),('2505020700300','Maguá Arriba'),('2505020700400','La Mina'),('2505020700500','Palmarito'),('2505020700600','Las Auyamas'),('2505020700700','Maguá al Medio'),('2505020700800','La Hoya'),('2505020700900','Maguá Abajo'),('2505020701000','Cerro Bonito'),('2505020701100','Hoyo de Los Corozos'),('2505020701200','Mata de Tuna'),('2505020701300','El Estribo'),('2505020701400','El Centro'),('2505020701500','Los Cercadillos'),('2505020701600','El Crucero'),('2505020800100','Paso del Ganado'),('2505020800200','Manacla'),('2505020800300','Racho de La Cana'),('2505020800400','Cabismal'),('2505020800500','El Manaclar'),('2505020800600','Los Malcotes'),('2505020800700','La Navaja'),('2505020900100','Palo Amarillo'),('2505020900200','Mata del Dajao'),('2505020900300','Los Cacaos'),('2505020900400','El Dajao'),('2505020900500','Los Mosquitos'),('2505020900600','Cabuya'),('2505020900700','La Ceiba'),('2505020900800','Cerro de la Cana'),('2505020900900','La Ciénaga'),('2505020901000','El Cajuil'),('2505020901100','El Anisetal'),('2505020901200','La Guárana'),('2505020901300','La Isleta'),('2505021000100','Bojón'),('2505021000200','Naranjo'),('2505021000300','Naranjo Bojón'),('2505021000400','Mata de Cana'),('2505021000500','Valeonor'),('2505021000600','Caña Llana'),('2505021000700','Recodo'),('2505021000800','Los Baos'),('2505021000900','Naranjo Abajo'),('2505021100100','Las Auyamas'),('2505021100200','Pananao Arriba'),('2505021100300','La Potranca'),('2505021100400','Los Sillones'),('2505021100500','Pananao'),('2505021100600','Pananao al Medio'),('2505021100700','La Toza'),('2505021100800','Los Rincones'),('2505021100900','La Estrechura de la Negra'),('2505021101000','El Córbano'),('2505021101100','Pananao Abajo'),('2505021101200','La Sábana'),('2505021101300','La Vereda'),('2505021101400','La Sabaneta'),('2505021101500','Bajo del Pino'),('2505021101600','Los Cajuiles'),('2505021200100','Cuatro Esquinas'),('2505021200200','Las Guáranas'),('2505021200300','Rincón Llano'),('2505021200400','La Culata'),('2505021200500','El Cabrejito'),('2505021200600','El Naranjito'),('2505021200700','Los Guayuyos'),('2505021200800','La Palmita'),('2505021200900','La Laguna'),('2505021201000','Cabreja'),('2505021201100','Rubio Adentro'),('2505021201200','El Pinar'),('2505021201300','El Bambú'),('2505021201400','Los Hornilos'),('2505021201500','El Corralito'),('2505021201600','Los Higos Gordos'),('2505030100101','La Cuesta'),('2505030100201','Guaralbana o Guanalbana'),('2505030100301','El Cruce'),('2505030100401','Hipólito Peralta'),('2505030200100','Arroyo Hondo'),('2505030200200','Albanita o La Boca de Albanita'),('2505030200300','El Corozo'),('2505030200400','Jaiqui Picao Arriba (Ají Picao Arriba)'),('2505030200500','Jaiqui Picao Abajo (Ají Picao Abajo)'),('2505030200600','Los Rancheros'),('2505030200700','Pozo Colorado (Hoyito San Lorenzo)'),('2505030300100','Albana'),('2505030300200','Eugenio Perdomo'),('2505030300300','La Cueva'),('2505030300400','La Guanita'),('2505030300500','La Tuna'),('2505030300600','Loma Albanita'),('2505030300700','Lo Melmonto'),('2505030300800','Pared Limpia'),('2505030300900','Sabaneta'),('2505030400100','El Molino'),('2505030400200','Loma Sucia'),('2505030400300','El Chorrerón'),('2505030400400','Guama Arriba o La Guama'),('2505030400500','Guamita o Guama Abajo'),('2505030400600','Hoya Bellaca'),('2505030400700','La Chorrera'),('2505030400800','Lorenzo'),('2505030400900','Los Calabozos o La Calabaza'),('2505030401000','Los Ciruelos'),('2505030500100','Las Auyamas'),('2505030500200','Loma del Toro'),('2505030500300','Loma de los Palos'),('2505030500400','Pueblo Nuevo'),('2505030500500','Sierra del Guano'),('2505030600100','El Limpio'),('2505030600200','Loma Quemada'),('2505030600300','Los Ciruelos'),('2505030700100','Anayo'),('2505030700200','Cañada de la Tabla'),('2505030700300','Cañete'),('2505030700400','Cuesta Arriba'),('2505030700500','Cueto'),('2505030700600','Caimonal'),('2505030700700','El Pinal'),('2505030700800','Gurabo'),('2505030700900','La Anacahuíta'),('2505030701000','Loma Amarilla'),('2505030701100','Loma del Pinal'),('2505030701200','Loma del Viento'),('2505030701300','Los Paleros'),('2505030701400','Los Positos'),('2505030701500','Ojo de Agua'),('2505030701600','La Sierrecita'),('2505030701700','Aciba'),('2505030701800','La Bozúa'),('2505040100101','Las Placetas'),('2505040200100','Bohío Viejo'),('2505040200200','Damajagua Adentro'),('2505040200300','Guayabales'),('2505040200400','La Bija'),('2505040200500','La Cabirma'),('2505040200600','La Jagua'),('2505040200700','Las Carreras'),('2505040200800','Los Corrales'),('2505040200900','Manaclar'),('2505040201000','Palero'),('2505040201100','Palmarito'),('2505040201200','Rincón Largo'),('2505040201300','Río Arriba'),('2505040201400','Damajagua'),('2505040300100','Arroyo Hondo'),('2505040300200','Las Placetas al Medio'),('2505040300300','Las Placetas Arriba'),('2505040300400','Loma El Colorado'),('2505040300500','Los Limones'),('2505040300600','Piedra Partida'),('2505040300700','Rincón del Junco'),('2505040400100','Calimetal'),('2505040400200','Cercadillo'),('2505040400300','Jamamú'),('2505040400400','Jamamucito'),('2505040500100','Donajá'),('2505040500200','Laguna Arriba'),('2505040500300','Las Lagunas'),('2505040500400','Loma los Ríos'),('2505040500500','Parte Bellaca'),('2505040500600','Ranchito Postrero'),('2506010100101','Hico Martínez'),('2506010100102','Los Martínez'),('2506010100201','Centro del Pueblo'),('2506010100202','El Calientísimo'),('2506010100301','Valentín'),('2506010100401','Manolo Dájer'),('2506010100402','Los Cerros de Tamboril'),('2506010100501','Los Recio'),('2506010100601','Haina'),('2506010100701','Vista Alegre'),('2506010100801','Boca de Licey'),('2506010100901','Moncada'),('2506010101001','Don Manuel'),('2506010101101','Carlos Díaz'),('2506010101102','Los Cacaos'),('2506010101201','La Cacata'),('2506010101301','Los Polanco'),('2506010101401','La Ermita de Tamboril'),('2506010200100','El Caño'),('2506010200200','El Molino'),('2506010200300','Ojo de Agua'),('2506010200400','Maizal'),('2506010200500','Haina'),('2506010200600','Niño de Antorcha'),('2506010200700','Boca de Maizal'),('2506010200800','Guazumal Abajo'),('2506010300100','Los Leones'),('2506010300200','Gurabo'),('2506010300300','La China'),('2506010300400','El Coco'),('2506010300500','Canturria Abajo'),('2506010300600','Guazumal Arriba'),('2506010300700','Los Rieles'),('2506010300800','El Caño'),('2506010300900','Guazumal Licey (Guazumal Abajo)'),('2506010400100','Boca de Licey'),('2506010400200','Los Liceyes'),('2506010400300','Arroyo las Bellacas'),('2506010400400','La Sabana'),('2506010400500','Miguel Sánchez'),('2506010400600','Los Cacaos'),('2506010400700','Los Guineos'),('2506010500100','Kilómetro 1'),('2506010500200','Licey al Medio'),('2506010500300','Los Marcano'),('2506010500400','Los Santana'),('2506010600100','Pontezuela'),('2506010600200','Don Pedro Abajo'),('2506010600300','Don Pedro Arriba Licey'),('2506010600400','Pontezuela Arriba'),('2506020100101','La Hoya'),('2506020100201','La Piedra'),('2506020100301','Los Rieles'),('2506020100401','Arenoso'),('2506020200100','El Molino'),('2506020200200','El Palmar'),('2506020200300','Juan Antonio Alix'),('2506020200400','Canca Abajo'),('2506020300100','Amaceyes Arriba'),('2506020300200','Amaceyes Abajo'),('2506020300300','La Lomita'),('2506020300400','Palma Picada de Los Amaceyes'),('2506020300500','La Boca del Sonador'),('2506020300600','El Alto'),('2506020400100','Los Factores o Carlos Díaz'),('2506020400200','Seboruco'),('2506020400300','La Hoya'),('2506020400400','Palma Picada de Carlos Díaz'),('2506020400500','Guatemala'),('2506020500100','Canca Arriba'),('2506020500200','Canca Las Aromas'),('2506020500300','Canca Arriba la Nueva'),('2506020500400','Alto del Aguacate'),('2506020500500','Nigua'),('2507010100101','Cementerio'),('2507010100102','Alba Rosa'),('2507010100201','Espaillat'),('2507010100301','Centro del Pueblo'),('2507010100401','Arrenquillo'),('2507010100501','Nueva Esperanza'),('2507010100502','Los Vineles'),('2507010100601','La Lomita'),('2507010100602','La Jabilla'),('2507010100603','El Paraíso'),('2507010100701','Vidal Guillén'),('2507010200100','Las Lavas'),('2507010200200','Palmarejo'),('2507010200300','El Boquerón'),('2507010200400','El Martillo'),('2507010200500','La Lomita del Palmar Abajo'),('2507010200600','Arrenquillo'),('2507010300100','Loma Mata Puercos'),('2507010300200','El Jamo'),('2507010300300','La Lomita'),('2507010300400','Palmar Abajo'),('2507010300500','El Rincón'),('2507010300600','La Breña'),('2507010300700','Villa Duarte'),('2507010400100','Ingenio Abajo'),('2507010400200','Cruce de Quinigua'),('2507010400300','Quinigua de La Yuca (La Yuca)'),('2507010400400','Villa del Yaque'),('2507010400500','Banegas'),('2507010400600','Quinigua'),('2507020100101','Palmar Arriba'),('2507020100201','El Pozo'),('2507020100301','Lindo'),('2507020200100','La Piedra'),('2507020200200','Loma de La Llanada'),('2507020200300','Arroyo del Agua'),('2507020200400','Quebrada Honda'),('2507020200500','El Pozo'),('2507020200600','Los Manantiales'),('2507030100101','El Limón'),('2507030100201','La Cuesta'),('2507030100301','La Sabana'),('2507030200100','Llano Grande'),('2507030200200','Macorís'),('2507030200300','Los Pérez'),('2507030200400','Higo de Agua'),('2507030200500','La Aguaíta'),('2507030200600','Pérez de Los Mates'),('2507030200700','Los Mates'),('2507030200800','Mata Puercos'),('2507030200900','Altos de Los Mates'),('2507030201000','Los Jobos'),('2507030201100','Los Lebrillos (La 14)'),('2507030201200','La U'),('2507030300100','El Aguacate'),('2507030300200','La Cumbre'),('2507030300300','Palo Blanco'),('2507030300400','Ranchito'),('2507030400100','La Pocilguita'),('2507030400200','Barrio Lindo o La Finquita'),('2507030400300','Vuelta Larga'),('2507030400400','Las Aromas'),('2507030400500','Los Uveros'),('2507030500100','Caracol'),('2507030500200','La Calabaza'),('2507030500300','Los Robles'),('2508010100101','Puñal'),('2508010100102','Puñal Adentro'),('2508010100103','Puñal Afuera'),('2508010200100','Los Cocos'),('2508010300100','Arenoso o Arenoso Arriba'),('2508010300200','Los Albinos'),('2508010300300','Los González'),('2508010300400','Los Cabral'),('2508010300500','Los Rodríguez'),('2508010300600','Los Estrella'),('2508010300700','Tierra Blanca'),('2508010400100','La Jabilla'),('2508010400200','Los Cercadillos'),('2508010400300','San Antonio'),('2508010500100','Monte Adentro'),('2508010500200','Matanzas Adentro'),('2508010500300','Mantanzas Afuera'),('2508010500400','Alto de Matanzas'),('2508010600100','Laguna Prieta al Centro'),('2508010600200','Monte Adentro'),('2508010600300','Laguna Prieta Abajo'),('2508010600400','Laguna Prieta Arriba'),('2508020100101','Guayabal'),('2508020100102','Guayabal Afuera'),('2508020100103','Guayabal al Medio o Centro'),('2508020100104','Residencial Nono'),('2508020100105','Urbanización Arturo Grullón'),('2508020100106','Los Delgadillos'),('2508020200100','Estancia Nueva'),('2508020200200','Estancia Nueva Arriba'),('2508020200300','Estancia Nueva Abajo'),('2508020200400','Mora'),('2508020200500','La Guázara'),('2508020300100','Palo Amarillo'),('2508020300200','La Angostura'),('2508020300300','El Guano'),('2508020300400','La Jagua Abajo'),('2508020400100','La Guázara'),('2508020400200','Guayabal Arriba'),('2508030100101','Canabacoa Abajo'),('2508030200100','Canabacoa'),('2508030200200','La Capilla'),('2508030300100','Colorado'),('2508030300200','Los Castillos'),('2508030300300','Sabaneta de las Palomas'),('2508030300400','Limonal Abajo'),('2508030300500','La Freiduría o Fardiquera'),('2509010100101','La Arcilla'),('2509010100102','Los Mamoneros'),('2509010100103','Los Gringos'),('2509010100201','La Corporación'),('2509010100202','La Piedra'),('2509010200100','Boca de Bao'),('2509010200200','El Hoyo del Cercado'),('2509010200300','La Barranca'),('2509010200400','La Furnia (La Boca)'),('2509010200500','La Galeta o La Goleta'),('2509010300100','Los Ranchos de Babosico Abajo'),('2509010300200','Los Ranchos de Babosico Arriba'),('2509010300300','Palo Amarillo'),('2509010300400','La Joya (Rincón)'),('2509010300500','Rancho Abajo (Vuelta Larga)'),('2509010300600','Sabaneta'),('2509010300700','Terrero'),('2509010300800','Zalaya'),('2509010400100','Guardarraya'),('2509010400200','La Caoba o Caobeta'),('2509010400300','Boca de Corral'),('2509010400400','Cañaveral'),('2509010400500','El Fraile'),('2509010400600','La Zanja'),('2509010400700','Piedra Gorda'),('2509010400800','Yerba de Culebra'),('2510010100101','Boca de Los Ríos'),('2510010100201','La Loma'),('2510010100301','Camboya'),('2510010100401','Ciudad Nueva'),('2510010100501','Los Prados'),('2510010100601','Los Sanchéz'),('2510010100701','Cañada Bonita'),('2510010100801','El Paraíso'),('2510010100901','La Cruz Roja'),('2510010101001','La Lima Abajo'),('2510010101101','Los Peñas'),('2510010101201','Los Platanitos'),('2510010101301','La Jagua'),('2510010101401','Lima Adentro'),('2510010200100','El Callejón De Guano'),('2510010200200','Los Picos'),('2510010200300','Doña Águeda'),('2510010200400','La Jagua'),('2510010300100','La Colmena'),('2510010300200','López'),('2510010300300','La Angostura'),('2510010300400','Los Melaos Arriba'),('2510010300500','Los Melaos Abajo'),('2510010300600','Los Limones'),('2510010300700','Los Campeches'),('2510010300800','López Abajo'),('2510010300900','Boca De López'),('2510010301000','Loma De Cana'),('2510010400100','San José Adentro'),('2510010400200','Guardarraya Abajo (Guardarraya De Baitoa)'),('2510010400300','Los Cedros'),('2510010400400','La Mina Del 4'),('2510010400500','La Lomita'),('2510010400600','Mocán De San José'),('2510010400700','Kilómetro 5'),('2510010400800','Kilómetro 6'),('2510010400900','Cruce De Gaspar'),('2510010401000','Jagüey (SD)'),('2510010401100','Mocán (SD)'),('2510010500100','San José Afuera'),('2510010500200','Los Alto'),('2510010500300','Doña María (Cruce De Doña María)'),('2510010500400','La Sabana'),('2510010500500','Los Indios'),('2510010500600','Yabanal (SD)'),('2510010500700','Los Peladeros (SD)'),('2510010600100','Castillo Arriba'),('2510010600200','Don Juan'),('2510010600300','Castillo Abajo'),('2510010600400','La Estancia (Estancia Nueva Abajo)'),('2510010600500','Kilómetro 13'),('2510010600600','Kilómetro 12'),('2510010600700','Los Ciruelos O Los Ciruelitos'),('2510010600800','La Jagua Arriba'),('2510010700100','La Lima'),('2510010700200','Loma Del Coco'),('2510010700300','Loma Quemada'),('2510010700400','Arroyo Arriba'),('2510010700500','La Capilla'),('2510010700600','Lima Adentro'),('2510010700700','Santa Rosa');
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_link`
--

DROP TABLE IF EXISTS `tour_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_link` (
  `id` int NOT NULL,
  `tour_id` int NOT NULL,
  `link` int NOT NULL,
  `x` varchar(32) NOT NULL,
  `y` varchar(32) NOT NULL,
  `z` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`,`tour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_link`
--

LOCK TABLES `tour_link` WRITE;
/*!40000 ALTER TABLE `tour_link` DISABLE KEYS */;
INSERT INTO `tour_link` VALUES (621776,795244,633642,'-3.470968111092096','-0.5495123710989844','1.8926111429118762'),(759604,633642,795244,'3.284523061897272','-0.6981547384734224','-2.0446009522391226');
/*!40000 ALTER TABLE `tour_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_scene`
--

DROP TABLE IF EXISTS `tour_scene`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_scene` (
  `id` int NOT NULL,
  `estate_id` int NOT NULL,
  `title` varchar(16) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`,`estate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_scene`
--

LOCK TABLES `tour_scene` WRITE;
/*!40000 ALTER TABLE `tour_scene` DISABLE KEYS */;
INSERT INTO `tour_scene` VALUES (795244,4,'Sala 1','054c1bf6e7776b38b48aa9abf92e4165.jpeg');
/*!40000 ALTER TABLE `tour_scene` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bohios-pro'
--
/*!50003 DROP PROCEDURE IF EXISTS `saveEstate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `saveEstate`(
	IN `_id` int,
	IN `_title` varchar(64),
	IN `_description` varchar(265),
	IN `_geo_x` varchar(16),
	IN `_geo_y` varchar(16),
	IN `_bedrooms` int,
	IN `_bathrooms` int,
	IN `_parking` int,
	IN `_tour_id` int,
	IN `_contract_type` int,
	IN `_estate_type` int,
	IN `_province_id` varchar(2),
	IN `_municipality_id` varchar(6),
	IN `_sector_id` varchar(13),
	IN `_currency_id` int,
	IN `_price` decimal(15,2),
	IN `_date_limit` date,
	IN `_active` tinyint(1)
)
BEGIN
	
	set @currentId = (select id from estate where id = _id);
    if (@currentId is null) then 
    	set @newId = (select max(id) from estate);
    	if(@newId is null) then
    		set @newId = 0;
    	end if;
    	
    	set @newId = @newId + 1;
    	
		insert into estate values (
				@newId,
            _title,
            _description,
            _geo_x,
            _geo_y,
            _bedrooms,
            _bathrooms,
            _parking,
            _tour_id,
            _contract_type,
            _estate_type,
            _province_id,
            _municipality_id,
            _sector_id,
            _currency_id,
            _price,
            _date_limit,
            _active
        );
        select 'INSERTED' as message, @newId as _id;
    else 
		update estate set 
        title = _title,
        description = _description,
        geo_x = _geo_x,
		geo_y = _geo_y,
        bedrooms = _bedrooms,
        bathrooms = _bathrooms,
        parking = _parking,
        tour_id = _tour_id,
        contract_type = _contract_type,
        estate_type = _estate_type,
        province_id = _province_id,
        municipality_id = _municipality_id,
        sector_id = _sector_id,
        currency_id = _currency_id,
        price = _price,
        date_limit = _date_limit,
        active = _active
        where id = _id;
        select 'UPDATED' as message, _id;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `saveTourScene` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `saveTourScene`(
	IN `_id` int,
	IN `_estate_id` int,
	IN `_title` varchar(16),
	IN `_file_name` varchar(100)
)
BEGIN
	set @currentId = (select id from tour_scene where id = _id and estate_id = _estate_id);
    if (@currentId is null) then 
		insert into tour_scene values (
			_id,
			_estate_id,
            _title,
            _file_name
        );
        select 'INSERTED' as message, _id;
    else
		update tour_scene set 
        title = _title
        where id = _id and estate_id = _estate_id;
        select 'UPDATED' as message, _id;
       	/*UPDATE IMAGE NAME*/
       	if (_file_name != '') then
       		update tour_scene set 
	        title = _title,
	        file_name = _file_name
	        where id = _id and estate_id = _estate_id;
	        select 'UPDATED' as message, _id;
       	end if;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-04 23:08:44
