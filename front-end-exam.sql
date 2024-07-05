/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.5-10.6.15-MariaDB : Database - code_exam
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`code_exam` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;

USE `code_exam`;

/*Table structure for table `exam` */

DROP TABLE IF EXISTS `exam`;

CREATE TABLE `exam` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL,
  `body` text NOT NULL,
  `category` char(20) NOT NULL,
  `level` char(10) NOT NULL,
  `answer` char(255) NOT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `exam` */

insert  into `exam`(`seq`,`title`,`body`,`category`,`level`,`answer`,`reg_date`,`edit_date`) values (1,'푸드 파이트 대회','<h6><span style=\"color: #f8f8f8\">문제 설명</span></h6><p><span style=\"color: #f8f8f8\">수웅이는 매달 주어진 음식을 빨리 먹는 푸드 파이트 대회를 개최합니다. 이 대회에서 선수들은 1대 1로 대결하며, 매 대결마다 음식의 종류와 양이 바뀝니다. 대결은 준비된 음식들을 일렬로 배치한 뒤, 한 선수는 제일 왼쪽에 있는 음식부터 오른쪽으로, 다른 선수는 제일 오른쪽에 있는 음식부터 왼쪽으로 순서대로 먹는 방식으로 진행됩니다. 중앙에는 물을 배치하고, 물을 먼저 먹는 선수가 승리하게 됩니다.</span></p><p><span style=\"color: #f8f8f8\">이때, 대회의 공정성을 위해 두 선수가 먹는 음식의 종류와 양이 같아야 하며, 음식을 먹는 순서도 같아야 합니다. 또한, 이번 대회부터는 칼로리가 낮은 음식을 먼저 먹을 수 있게 배치하여 선수들이 음식을 더 잘 먹을 수 있게 하려고 합니다. 이번 대회를 위해 수웅이는 음식을 주문했는데, 대회의 조건을 고려하지 않고 음식을 주문하여 몇 개의 음식은 대회에 사용하지 못하게 되었습니다.</span></p><p><span style=\"color: #f8f8f8\">예를 들어, 3가지의 음식이 준비되어 있으며, 칼로리가 적은 순서대로 1번 음식을 3개, 2번 음식을 4개, 3번 음식을 6개 준비했으며, 물을 편의상 0번 음식이라고 칭한다면, 두 선수는 1번 음식 1개, 2번 음식 2개, 3번 음식 3개씩을 먹게 되므로 음식의 배치는 \"1223330333221\"이 됩니다. 따라서 1번 음식 1개는 대회에 사용하지 못합니다.</span></p><p><span style=\"color: #f8f8f8\">수웅이가 준비한 음식의 양을 칼로리가 적은 순서대로 나타내는 정수 배열 </span><code><span style=\"color: #f8f8f8\">food</span></code><span style=\"color: #f8f8f8\">가 주어졌을 때, 대회를 위한 음식의 배치를 나타내는 문자열을 return 하는 solution 함수를 완성해주세요.</span></p><div contenteditable=\"false\"><hr></div><h5><span style=\"color: #f8f8f8\">제한사항</span></h5><ul><li><p><span style=\"color: #f8f8f8\">2 ≤ </span><code><span style=\"color: #f8f8f8\">food</span></code><span style=\"color: #f8f8f8\">의 길이 ≤ 9</span></p></li><li><p><span style=\"color: #f8f8f8\">1 ≤ </span><code><span style=\"color: #f8f8f8\">food</span></code><span style=\"color: #f8f8f8\">의 각 원소 ≤ 1,000</span></p></li><li><p><code><span style=\"color: #f8f8f8\">food[i]</span></code><span style=\"color: #f8f8f8\">에는 칼로리가 적은 순서대로 음식의 양이 담겨 있습니다.</span></p></li><li><p><code><span style=\"color: #f8f8f8\">food[i]</span></code><span style=\"color: #f8f8f8\">는 i번 음식의 수입니다.</span></p></li><li><p><code><span style=\"color: #f8f8f8\">food[0]</span></code><span style=\"color: #f8f8f8\">은 수웅이가 준비한 물의 양이며, 항상 1입니다.</span></p></li><li><p><span style=\"color: #f8f8f8\">정답의 길이가 3 이상인 경우만 입력으로 주어집니다.</span></p></li></ul><div contenteditable=\"false\"><hr></div><h5><span style=\"color: #f8f8f8\">입출력 예</span></h5><table><thead><tr><th><p><span style=\"color: #f8f8f8\">food</span></p></th><th><p><span style=\"color: #f8f8f8\">result</span></p></th></tr></thead><tbody><tr><td><p><span style=\"color: #f8f8f8\">[1, 3, 4, 6]</span></p></td><td><p><span style=\"color: #f8f8f8\">\"1223330333221\"</span></p></td></tr><tr><td><p><span style=\"color: #f8f8f8\">[1, 7, 1, 2]</span></p></td><td><p><span style=\"color: #f8f8f8\">\"111303111\"</span></p></td></tr></tbody></table><div contenteditable=\"false\"><hr></div><h5><span style=\"color: #f8f8f8\">입출력 예 설명</span></h5><p><strong><span style=\"color: #f8f8f8\">입출력 예 #1</span></strong></p><ul><li><p><span style=\"color: #f8f8f8\">문제 예시와 같습니다.</span></p></li></ul><p><strong><span style=\"color: #f8f8f8\">입출력 예 #1</span></strong></p><ul><li><p><span style=\"color: #f8f8f8\">두 선수는 1번 음식 3개, 3번 음식 1개를 먹게 되므로 음식의 배치는 \"111303111\"입니다.</span></p></li></ul>','','0','[{\"input\":[1,3,4,6],\"answer\":\"1223330333221\"},{\"input\":[1,7,1,2],\"answer\":\"111303111\"}]\n','2022-11-04 16:26:42','2022-11-04 16:26:42');

/*Table structure for table `exam_result` */

DROP TABLE IF EXISTS `exam_result`;

CREATE TABLE `exam_result` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `user_seq` int(12) NOT NULL,
  `exam_seq` int(12) NOT NULL,
  `result_body` text DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `exam_result` */

/*Table structure for table `file` */

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `origin_name` char(100) DEFAULT NULL,
  `path` char(30) DEFAULT NULL,
  `mime` char(50) DEFAULT NULL,
  `byte` char(20) DEFAULT NULL,
  `target_table` char(10) DEFAULT NULL,
  `target_seq` int(12) DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `file` */

/*Table structure for table `question` */

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `user_seq` int(12) NOT NULL,
  `exam_seq` int(12) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `question` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `user` */

insert  into `user`(`seq`,`name`,`email`,`password`,`reg_date`,`edit_date`) values (1,'성민','dureotkd123@naver.com','slsksh33',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
